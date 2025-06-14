// app/(tabs)/profile.jsx
import { SafeAreaView } from 'react-native-safe-area-context';
import { Platform, StyleSheet, View, Text, ScrollView, TouchableOpacity, Alert} from 'react-native';
import { Image } from 'expo-image';
import Colors from '../../constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles';
import React, { useEffect, useState } from 'react';
import { router } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFocusEffect } from '@react-navigation/native';

const Profile = () => {
  const [savedMoviesCount, setSavedMoviesCount] = useState(0);
  const [totalViews, setTotalViews] = useState(0);

  // Calculate user stats
  const calculateStats = async () => {
    try {
      // Get saved movies count
      const allKeys = await AsyncStorage.getAllKeys();
      const movieKeys = allKeys.filter(key => key.startsWith('movie') && key !== 'movie');
      setSavedMoviesCount(movieKeys.length);
      
      // Simulate total views (you can replace this with actual view tracking)
      setTotalViews(movieKeys.length * 156); // Each saved movie = ~156 views
    } catch (error) {
      console.error('Error calculating stats:', error);
    }
  };

  // Auto-reload when screen is focused
  useFocusEffect(
    React.useCallback(() => {
      calculateStats();
    }, [])
  );

  useEffect(() => {
    calculateStats();
  }, []);

  // Clear all saved movies
  const clearAllSavedMovies = () => {
    Alert.alert(
      'Clear All Saved Movies',
      'Are you sure you want to remove all saved movies? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: async () => {
            try {
              const allKeys = await AsyncStorage.getAllKeys();
              const movieKeys = allKeys.filter(key => key.startsWith('movie'));
              await AsyncStorage.multiRemove(movieKeys);
              setSavedMoviesCount(0);
              setTotalViews(0);
              Alert.alert('Success', 'All saved movies have been cleared');
            } catch (error) {
              console.error('Error clearing saved movies:', error);
              Alert.alert('Error', 'Failed to clear saved movies');
            }
          }
        }
      ]
    );
  };

  // Navigate to saved movies
  const goToSavedMovies = () => {
    router.push('/(tabs)/saved');
  };

  // Navigate to home
  const goToHome = () => {
    router.push('/(tabs)/home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={{flex: 1}}
        contentContainerStyle={{paddingHorizontal: 20, paddingTop: 20, paddingBottom: 120}}
        showsVerticalScrollIndicator={false}
      >
        
        {/* Profile Header */}
        <View style={{alignItems: 'center', marginBottom: 40}}>
          {/* Profile Image - Circular with your photo */}
          <View style={{
            width: 100,
            height: 100,
            borderRadius: 50, // Makes it perfectly circular
            backgroundColor: Colors.primary,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 20,
            borderWidth: 3,
            borderColor: '#333',
            overflow: 'hidden' // Ensures image respects border radius
          }}>
            {/* Replace with your actual profile image */}
            <Image 
              source={require('@/assets/images/shery.jpg')} // Replace this with your profile photo
              contentFit='cover' 
              style={{
                width: '100%', 
                height: '100%',
                borderRadius: 50 // Additional border radius for the image itself
              }} 
            />
          </View>

          {/* Username */}
          <Text style={{
            color: 'white',
            fontFamily: 'PoppinsBold',
            fontSize: 24,
            marginBottom: 10
          }}>
            Sheriff Olanlokun
          </Text>

          {/* User Handle */}
          <Text style={{
            color: '#888',
            fontFamily: 'PoppinsRegular',
            fontSize: 16,
            marginBottom: 30
          }}>
            @sheriff_movies
          </Text>
        </View>

        {/* Stats Section */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          backgroundColor: '#1a1a1a',
          borderRadius: 12,
          paddingVertical: 20,
          paddingHorizontal: 20,
          marginBottom: 30,
          borderWidth: 1,
          borderColor: '#333'
        }}>
          <TouchableOpacity 
            style={{alignItems: 'center'}}
            onPress={goToSavedMovies}
          >
            <Text style={{
              color: 'white',
              fontFamily: 'PoppinsBold',
              fontSize: 28
            }}>
              {savedMoviesCount}
            </Text>
            <Text style={{
              color: '#888',
              fontFamily: 'PoppinsRegular',
              fontSize: 14
            }}>
              Saved Movies
            </Text>
          </TouchableOpacity>

          <View style={{width: 1, backgroundColor: '#333'}} />

          <View style={{alignItems: 'center'}}>
            <Text style={{
              color: 'white',
              fontFamily: 'PoppinsBold',
              fontSize: 28
            }}>
              {totalViews.toLocaleString()}
            </Text>
            <Text style={{
              color: '#888',
              fontFamily: 'PoppinsRegular',
              fontSize: 14
            }}>
              Total Views
            </Text>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={{marginBottom: 30}}>
          <Text style={{
            color: Colors.text,
            fontFamily: 'PoppinsBold',
            fontSize: 18,
            marginBottom: 15
          }}>
            Recent Activity
          </Text>

          {/* Activity Items */}
          <View style={{
            backgroundColor: '#1a1a1a',
            borderRadius: 12,
            padding: 15,
            marginBottom: 10,
            borderWidth: 1,
            borderColor: '#333'
          }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: Colors.primary,
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 15
              }}>
                <Ionicons name="bookmark" size={20} color="white" />
              </View>
              <View style={{flex: 1}}>
                <Text style={{
                  color: 'white',
                  fontFamily: 'PoppinsBold',
                  fontSize: 16
                }}>
                  Saved {savedMoviesCount} movies
                </Text>
                <Text style={{
                  color: '#888',
                  fontFamily: 'PoppinsRegular',
                  fontSize: 14
                }}>
                  Building your watchlist
                </Text>
              </View>
            </View>
          </View>

          <View style={{
            backgroundColor: '#1a1a1a',
            borderRadius: 12,
            padding: 15,
            borderWidth: 1,
            borderColor: '#333'
          }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: '#4CAF50',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 15
              }}>
                <Ionicons name="play" size={20} color="white" />
              </View>
              <View style={{flex: 1}}>
                <Text style={{
                  color: 'white',
                  fontFamily: 'PoppinsBold',
                  fontSize: 16
                }}>
                  Browsing popular movies
                </Text>
                <Text style={{
                  color: '#888',
                  fontFamily: 'PoppinsRegular',
                  fontSize: 14
                }}>
                  Discovering new content
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={{marginBottom: 30}}>
          <Text style={{
            color: Colors.text,
            fontFamily: 'PoppinsBold',
            fontSize: 18,
            marginBottom: 15
          }}>
            Quick Actions
          </Text>

          <TouchableOpacity 
            style={{
              backgroundColor: Colors.primary,
              borderRadius: 12,
              padding: 15,
              marginBottom: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onPress={goToSavedMovies}
          >
            <Ionicons name="bookmark-outline" size={20} color="white" style={{marginRight: 10}} />
            <Text style={{
              color: 'white',
              fontFamily: 'PoppinsBold',
              fontSize: 16
            }}>
              View Saved Movies
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={{
              backgroundColor: '#333',
              borderRadius: 12,
              padding: 15,
              marginBottom: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onPress={goToHome}
          >
            <Ionicons name="home-outline" size={20} color="white" style={{marginRight: 10}} />
            <Text style={{
              color: 'white',
              fontFamily: 'PoppinsBold',
              fontSize: 16
            }}>
              Browse More Movies
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={{
              backgroundColor: '#ff4444',
              borderRadius: 12,
              padding: 15,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onPress={clearAllSavedMovies}
          >
            <Ionicons name="trash-outline" size={20} color="white" style={{marginRight: 10}} />
            <Text style={{
              color: 'white',
              fontFamily: 'PoppinsBold',
              fontSize: 16
            }}>
              Clear All Saved Movies
            </Text>
          </TouchableOpacity>
        </View>

        {/* App Info */}
        <View style={{
          backgroundColor: '#1a1a1a',
          borderRadius: 12,
          padding: 20,
          alignItems: 'center',
          borderWidth: 1,
          borderColor: '#333'
        }}>
          <Image 
            source={require('@/assets/images/logo2.png')}
            contentFit='contain' 
            style={{width: 40, height: 40, marginBottom: 10}} 
          />
          <Text style={{
            color: 'white',
            fontFamily: 'PoppinsBold',
            fontSize: 18,
            marginBottom: 5
          }}>
            Aurora Movies
          </Text>
          <Text style={{
            color: '#888',
            fontFamily: 'PoppinsRegular',
            fontSize: 14,
            textAlign: 'center'
          }}>
            Discover and save your favorite movies with lightning-fast performance
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Profile;