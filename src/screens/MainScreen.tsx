import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { clearToken, clearEmail } from '../storage/mmkv';

interface MainScreenProps {
  logoutCallback: () => void;
  navigation: any;
}

const MainScreen: React.FC<MainScreenProps> = ({
  logoutCallback,
  navigation,
}) => {
  const logout = () => {
    clearToken();
    clearEmail(); // optional
    logoutCallback();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <Text style={styles.subtitle}>Welcome!</Text>

      <View style={styles.section}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Notes')}
        >
          <Text style={styles.buttonText}>Notes CRUD</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <TouchableOpacity
          style={[styles.button, styles.schemaButton]}
          onPress={() => navigation.navigate('NoteFormScreen')}
        >
          <Text style={styles.buttonText}>Schema</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <TouchableOpacity
          style={[styles.button, styles.logoutButton]}
          onPress={logout}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 30 },
  section: {
    width: '100%',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  schemaButton: {
    backgroundColor: 'green',
  },
  logoutButton: {
    backgroundColor: '#dc3545',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MainScreen;
