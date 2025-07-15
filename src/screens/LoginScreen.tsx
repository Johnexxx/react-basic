import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Q } from '@nozbe/watermelondb';
import { database } from '../models/database';
import User from '../models/User';
import { setEmail, setToken } from '../storage/mmkv';

interface LoginScreenProps {
  navigation: any;
  loginCallback: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation, loginCallback }) => {
  const [email, setEmailInput] = useState('');
  const [password, setPasswordInput] = useState('');

  const onLogin = async () => {
    try {
      const userCollection = database.get<User>('users');
      const users = await userCollection
        .query(
          Q.where('email', email.trim()),
          Q.where('password', password)
        )
        .fetch();

      if (users.length > 0) {
        // ✅ Store session
        setToken('dummy-token');
        setEmail(email.trim());

        // ✅ Notify App that login succeeded
        loginCallback();
      } else {
        Alert.alert('Login Failed', 'Invalid email or password');
      }
    } catch (err) {
      console.error('Login error:', err);
      Alert.alert('Error', 'Something went wrong during login');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        value={email}
        onChangeText={setEmailInput}
        placeholder="Email"
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        value={password}
        onChangeText={setPasswordInput}
        placeholder="Password"
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={onLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.link}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 16,
    borderRadius: 8,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  link: {
    marginTop: 20,
    color: '#007bff',
    textAlign: 'center',
    fontSize: 14,
  },
});
