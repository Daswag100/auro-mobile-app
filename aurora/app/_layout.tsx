import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

SplashScreen.preventAutoHideAsync();


export default function RootLayout() {
 
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    PoppinsRegular: require ('../assets/fonts/Poppins-Regular.ttf'),
    PoppinsBold: require ('../assets/fonts/Poppins-Bold.ttf'),
    SemiBold: require ('../assets/fonts/Poppins-SemiBold.ttf'),
    PoppinsMedium: require ('../assets/fonts/Poppins-Medium.ttf'),
  });

 useEffect(() => {
  if (loaded) {
    SplashScreen.hideAsync();
  }
  }, [loaded]);

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
   
      <Stack screenOptions={{ headerShown: false}}>
        <Stack.Screen name="index" />
        <Stack.Screen name = "(auth)" />
        <Stack.Screen name="(tabs)"  />
        <Stack.Screen name="(tabs)/home" />
        <Stack.Screen name="+not-found" />
      </Stack>
      
   
  );
}
