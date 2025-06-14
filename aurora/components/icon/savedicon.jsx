import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SavedIcon = ({ isActive = false }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.iconContainer, isActive && styles.activeIconContainer]}>
        <Ionicons 
          name={isActive ? "bookmark" : "bookmark-outline"} 
          size={24} 
          color={isActive ? "#000" : "#fff"} 
        />
      </View>
      <Text style={[styles.label, isActive && styles.activeLabel]}>
        Saved
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60, // Fixed width for consistent spacing
    height: 60, // Fixed height
  },
  iconContainer: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 3,
  },
  activeIconContainer: {
    backgroundColor: '#FFA500', // Orange background when active
  },
  label: {
    fontSize: 11,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  activeLabel: {
    color: '#FFA500',
    fontWeight: '700',
  },
});

export default SavedIcon;