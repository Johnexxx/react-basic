import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { database } from '../models/database';
import { Q } from '@nozbe/watermelondb';
import User from '../models/User';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'Signup'>;

const SignupScreen: React.FC<Props> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmailInput] = useState('');
  const [password, setPassword] = useState('');

  const onSignup = async () => {
    try {
      const userCollection = database.get<User>('users');
      const trimmedEmail = email.trim();

      const existing = await userCollection
        .query(Q.where('email', trimmedEmail))
        .fetch();

      if (existing.length > 0) {
        Alert.alert('User already exists');
        return;
      }

      await database.write(async () => {
        await userCollection.create(user => {
          user.name = name;
          user.email = trimmedEmail;
          user.password = password;
        });
      });

      Alert.alert('Signup successful!');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (err: any) {
      console.error('Signup error:', err);
      Alert.alert('Signup failed', err.message || 'Unexpected error occurred');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Full Name"
        autoCapitalize="words"
        style={styles.input}
      />

      <TextInput
        value={email}
        onChangeText={setEmailInput}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
      />

      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={onSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 12,
    borderRadius: 6,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  link: {
    marginTop: 15,
    color: '#007bff',
    textAlign: 'center',
    fontSize: 14,
  },
});
