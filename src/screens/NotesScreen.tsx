import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Modal,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { Q } from '@nozbe/watermelondb';
import { database } from '../models/database';
import Note from '../models/Note';
import { getEmail } from '../storage/mmkv';

const NotesScreen = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isAddMode, setIsAddMode] = useState(true);

  const loadNotes = async () => {
    try {
      const email = getEmail();
      const notesCollection = database.get<Note>('notes');
      const userNotes = await notesCollection
        .query(Q.where('user_id', email))
        .fetch();
      setNotes(userNotes);
    } catch (e) {
      console.error('❌ Failed to load notes:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveNote = async () => {
    const email = getEmail();
    if (!title.trim() || !body.trim()) return;

    await database.write(async () => {
      if (isAddMode) {
        const notesCollection = database.get<Note>('notes');
        await notesCollection.create(note => {
          note.title = title;
          note.body = body;
          note.user_id = email;
        });
      } else if (editingNote) {
        await editingNote.update(n => {
          n.title = title;
          n.body = body;
        });
      }
    });

    closeModal();
    loadNotes();
  };

  const deleteNote = async (note: Note) => {
    await database.write(async () => {
      await note.markAsDeleted();
    });
    loadNotes();
  };

  const openAddModal = () => {
    setIsAddMode(true);
    setTitle('');
    setBody('');
    setModalVisible(true);
  };

  const openEditModal = (note: Note) => {
    setIsAddMode(false);
    setEditingNote(note);
    setTitle(note.title);
    setBody(note.body);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setTitle('');
    setBody('');
    setEditingNote(null);
  };

  useEffect(() => {
    loadNotes();
  }, []);

  if (loading)
    return <ActivityIndicator style={{ marginTop: 100 }} size="large" />;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Notes</Text>

      <FlatList
        data={notes}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.noteCard}>
            <View style={{ flex: 1 }}>
              <Text style={styles.noteTitle}>{item.title}</Text>
              <Text style={styles.noteBody}>{item.body}</Text>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => openEditModal(item)}>
                <Text style={styles.actionEdit}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteNote(item)}>
                <Text style={styles.actionDelete}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No notes yet. Tap + to create one.
          </Text>
        }
      />

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab} onPress={openAddModal}>
        <Text style={styles.fabText}>＋</Text>
      </TouchableOpacity>

      {/* Modal for Add/Edit */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.modalWrapper}
        >
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>
              {isAddMode ? 'Add Note' : 'Edit Note'}
            </Text>
            <TextInput
              placeholder="Title"
              value={title}
              onChangeText={setTitle}
              style={styles.input}
            />
            <TextInput
              placeholder="Body"
              value={body}
              onChangeText={setBody}
              multiline
              style={[styles.input, { height: 80 }]}
            />
          </View>
          <View style={styles.modalActions}>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleSaveNote}
            >
              <Text style={styles.modalButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={closeModal}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f2f2', padding: 16 },
  header: {
    fontSize: 22,
    
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 16,
    color: '#222',
  },
  noteCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    alignItems: 'center',
    elevation: 1,
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#000',
  },
  noteBody: { fontSize: 14, color: '#444' },
  actions: {
    marginLeft: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionEdit: {
    fontSize: 18,
    padding: 4,
    color: 'green',
  },
  actionDelete: {
    fontSize: 18,
    padding: 4,
    color: '#dc3545',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    backgroundColor: '#007bff',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  fabText: {
    fontSize: 30,
    color: '#fff',
    lineHeight: 32,
  },
  modalWrapper: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
    color: '#222',
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    fontSize: 14,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 8,
    backgroundColor: '#007bff',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#6c757d',
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 40,
    fontSize: 14,
  },
});

export default NotesScreen;
