import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const HomeIcon = ({ isActive = false }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.iconContainer, isActive && styles.activeIconContainer]}>
        <Ionicons 
          name={isActive ? "home" : "home-outline"} 
          size={24} 
          color={isActive ? "#000" : "#fff"} 
        />
      </View>
      <Text style={[styles.label, isActive && styles.activeLabel]}>
        Home
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60, // Ensures enough space for text
    height: 60, // Ensures enough space for text
  },
  iconContainer: {
    width: 45, // Bigger circle
    height: 45, // Bigger circle
    borderRadius: 22.5, // Half of width/height for perfect circle
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 3, // Space between icon and text
  },
  activeIconContainer: {
    backgroundColor: '#FFA500', // Orange background when active
  },
  label: {
    fontSize: 11, // Slightly bigger text
    color: '#fff',
    fontFamily: 'PoppinsRegular',
    textAlign: 'center',
    fontWeight: '500', // Medium weight
    letterSpacing: 0.5,
  },
  activeLabel: {
    color: '#FFA500', // Orange text when active
    fontFamily: 'PoppinsBold',
    fontWeight: '700', // Bold weight
  },
});


export default HomeIcon;