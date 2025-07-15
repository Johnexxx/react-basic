import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { getEmail, clearToken, clearEmail } from '../storage/mmkv';

interface MainScreenProps {
  logoutCallback: () => void;
  navigation: any;
}

const MainScreen: React.FC<MainScreenProps> = ({ logoutCallback, navigation }) => {
  const [email, setEmail] = useState('');

  useEffect(() => {
    const currentEmail = getEmail();
    setEmail(currentEmail);
  }, []);

  const logout = () => {
    clearToken();
    clearEmail();
    logoutCallback(); // Let App.tsx switch back to login screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <Text style={styles.subtitle}>Welcome{email ? `, ${email}` : ''}!</Text>

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

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
  },
  section: {
    width: '100%',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  schemaButton: {
    backgroundColor: '#28a745',
  },
  logoutButton: {
    backgroundColor: '#dc3545',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
