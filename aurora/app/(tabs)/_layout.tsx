// app/(tabs)/_layout.jsx - CLEAN VERSION using styles2
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
<<<<<<< Updated upstream
import Colors from '@/constants/Colors';
import { HomeIcon, CreateIcon, ProfileIcon, SavedIcon } from '../../components/icon';
import styles2 from './styles'; // Import your clean styles
=======
// Update the import path below to the correct relative path if the file exists, for example:
import Colors from '../../constants/Colors';

>>>>>>> Stashed changes

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#FFA500',
        tabBarInactiveTintColor: '#ffffff',
        tabBarStyle: styles2.professionalTabBar, // Use styles from styles2
        tabBarItemStyle: styles2.tabBarItem, // Use styles from styles2
      }}>
      
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <HomeIcon isActive={focused} />
          ),
        }}
      />
      
      <Tabs.Screen
        name="create"
        options={{
          title: 'Create',
          tabBarIcon: ({ focused }) => (
            <CreateIcon isActive={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <ProfileIcon isActive={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="saved"
        options={{
          title: 'Saved',
          tabBarIcon: ({ focused }) => (
            <SavedIcon isActive={focused} />
          ),
        }}
      />

      {/* Hide styles.js from showing as a tab */}
      <Tabs.Screen
        name="styles"
        options={{
          href: null, // This hides the styles2.js file from navigation
        }}
      />
    </Tabs>
  );
}