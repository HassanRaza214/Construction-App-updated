import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../configs/FireBaseConfig';
import { View, ActivityIndicator } from 'react-native';
import { SplashScreen } from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(null);
  
  // Load fonts
  const [fontsLoaded, error] = useFonts({
    'outfit-regular': require('../assets/fonts/Outfit-Regular.ttf'),
    'outfit-medium': require('../assets/fonts/Outfit-Medium.ttf'),
    'outfit-bold': require('../assets/fonts/Outfit-Bold.ttf')
  });

  // Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsUserAuthenticated(!!user);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (fontsLoaded && isUserAuthenticated !== null) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, isUserAuthenticated]);

  // Show loading screen while we're initializing
  if (!fontsLoaded || isUserAuthenticated === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#4F46E5" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {isUserAuthenticated ? (
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      ) : (
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      )}
      {/* Any universal screens outside of auth flow can go here */}
    </Stack>
  );
}