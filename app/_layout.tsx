import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { createTamagui, TamaguiProvider } from "@tamagui/core";
import { themes, tokens } from '@tamagui/themes';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import "../firebaseConfig";



import { useColorScheme } from '@/hooks/useColorScheme';

// const tokens = createTokens({
//   color: {
//     dark_blue_cyan: '#1D3D47',
//     light_green: '#A1CEDC',
//     white: '#FFFFFF',
//     light_gray: '#F5F5F5',
//     black: '#000000',
//     ...color,
//   },
//   size,
//   space,
//   zIndex,
//   radius,
// });

const themese = {
  ...themes,
  dark: {
    ...themes.dark,
    background: "#302736",
    text: "#000000",
    primary_color: "#FFFFFF",
    secondary_color: tokens.color.gray10Light,
  },
  // light: {
  //   colors: {
  //     background: tokens.color.light_green,
  //     text: tokens.color.dark_blue_cyan,
  //   }
  // }
};

// const appConfig = createTamagui(config);
const appConfig = createTamagui({
  tokens,
  themes: themese,
});
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Inter: require("../assets/fonts/Inter-VariableFont_opsz,wght.ttf"), // necessary for Tamagui
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <TamaguiProvider config={appConfig} defaultTheme='dark'>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack initialRouteName='(tabs)'>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
          <Stack.Screen name="workout-selection-pages" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </TamaguiProvider>
  );
}
