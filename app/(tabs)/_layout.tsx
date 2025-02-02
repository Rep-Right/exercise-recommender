import { Redirect, Tabs } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';


export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const auth = getAuth();
  useEffect(() => {
    // onAuthStateChanged(auth, setUser);
    const unsub = onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        // console.log("HERE!");
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsub();
  }, []);

  if (user === undefined) {
    // Optionally, return a loading indicator here
    return null;
  }

  return (
    <>
      {user ? (
        <Tabs
          initialRouteName="index"
          screenOptions={{
            tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
            headerShown: false,
            tabBarButton: HapticTab,
            tabBarBackground: TabBarBackground,
            tabBarStyle: Platform.select({
              ios: {
                // Use a transparent background on iOS to show the blur effect
                position: 'absolute',
              },
              default: {},
            }),
          }}
        >
          <Tabs.Screen
            name="workout-selection"
            options={{
              title: 'Workout Selection',
              tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
            }}
          />
          <Tabs.Screen
            name="index"
            options={{
              title: 'Exercise Selection',
              tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
            }}
          />
        </Tabs>
      ) : (
        <Redirect href="/signin" />
      )}
    </>
  );
}
