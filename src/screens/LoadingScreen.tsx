import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing, ActivityIndicator } from 'react-native';

const LoadingScreen = () => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Scale and fade in animation
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
        easing: Easing.out(Easing.exp),
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
    ]).start();

    // Looping bounce animation for ActivityIndicator
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: -10,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 10,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.logoBox, { transform: [{ scale: scaleAnim }] }]}>
        <Text style={styles.logo}>🚀</Text>
      </Animated.View>

      <Animated.Text style={[styles.text, { opacity: fadeAnim }]}>
        Loading your experience...
      </Animated.Text>

      <Animated.View style={{ marginTop: 30 }}>
        <ActivityIndicator size="large" color="#007bff" />
      </Animated.View>
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center',
  },
  logoBox: {
    backgroundColor: '#007bff10',
    padding: 20,
    borderRadius: 100,
    marginBottom: 20,
  },
  logo: {
    fontSize: 48,
  },
  text: {
    fontSize: 18,
    color: '#333',
  },
});
