// src/screens/HomeScreen.tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { RootState } from '../redux/store';
import { setMessage } from '../redux/slices/messageSlice';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();
  const message = useSelector((state: RootState) => state.message.text);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the App</Text>
      <Text style={styles.subtitle}>{message}</Text>
      <Button title="Login" onPress={() => navigation.navigate('Login')} />
      <View style={{ height: 10 }} />
      <Button title="Sign Up" onPress={() => navigation.navigate('Signup')} />
      <View style={{ height: 20 }} />
      <Button title="Change Message" onPress={() => dispatch(setMessage('Redux is working!'))} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20,
  },
  title: {
    fontSize: 24, marginBottom: 10,
  },
  subtitle: {
    fontSize: 18, marginBottom: 20,
  },
});
