// App.tsx
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux'; // ✅ ADD THIS
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import MainScreen from './src/screens/MainScreen';
import NotesScreen from './src/screens/NotesScreen';
import { getToken } from './src/storage/mmkv';
import { RootStackParamList } from './src/navigation/types';
import store from './src/redux/store'; // ✅ ADD THIS
import LoadingScreen from './src/screens/LoadingScreen'; // 👈 import this

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      // Wait exactly 5 seconds no matter what
      await new Promise(resolve => setTimeout(resolve, 5000));

      const token = getToken(); // sync function, still fast
      setAuthenticated(!!token);
    };

    checkAuth(); // run the async function
  }, []);

  if (authenticated === null) return <LoadingScreen />; // splash/loading screen placeholder

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: true }}>
          {authenticated === null ? (
            // 👇 Show loading screen as part of the navigation stack
            <Stack.Screen name="Loading" component={LoadingScreen} />
          ) : authenticated ? (
            <>
              <Stack.Screen name="Main">
                {props => (
                  <MainScreen
                    {...props}
                    logoutCallback={() => setAuthenticated(false)}
                  />
                )}
              </Stack.Screen>
              <Stack.Screen name="Notes" component={NotesScreen} />
            </>
          ) : (
            <>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Login">
                {props => (
                  <LoginScreen
                    {...props}
                    loginCallback={() => setAuthenticated(true)}
                  />
                )}
              </Stack.Screen>
              <Stack.Screen name="Signup" component={SignupScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
