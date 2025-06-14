import { SafeAreaView } from 'react-native-safe-area-context';
import { Platform, StyleSheet, View, Text, ScrollView, TouchableOpacity, Alert, ActivityIndicator} from 'react-native';
import { Image } from 'expo-image'; // Use expo-image for faster loading
import Colors from '../../constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles';
import React, { useEffect, useState } from 'react';
import { router } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFocusEffect } from '@react-navigation/native';

const Saved = () => {
  const [savedMovies, setSavedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageLoadingStates, setImageLoadingStates] = useState({});

  // Load ALL saved movies
  const loadSavedMovies = async () => {
    try {
      setLoading(true);
      
      // Get all keys from AsyncStorage
      const allKeys = await AsyncStorage.getAllKeys();
      
      // Filter keys that contain saved movies
      const movieKeys = allKeys.filter(key => 
        key.startsWith('movie') && key !== 'movie' // Exclude old single 'movie' key
      );
      
      if (movieKeys.length === 0) {
        setSavedMovies([]);
        console.log('ℹ️ No saved movies found');
        return;
      }

      // Get all saved movies at once
      const savedData = await AsyncStorage.multiGet(movieKeys);
      
      // Track seen movie titles to prevent duplicates
      const seenTitles = new Set();
      
      const movies = savedData.map(([key, value], index) => {
        try {
          const parsedMovie = JSON.parse(value);
          
          // Skip if we've already seen this movie title
          const movieTitle = parsedMovie.originalTitle?.toLowerCase();
          if (seenTitles.has(movieTitle)) {
            return null; // Skip duplicate
          }
          seenTitles.add(movieTitle);
          
          // Optimize image URL for 2MB quality
          return {
            id: key, // Use the storage key as unique ID
            ...parsedMovie,
            optimizedImage: parsedMovie.primaryImage 
              ? parsedMovie.primaryImage.replace('._V1_', '._V1_UY750_CR0,0,500,750_AL_')
              : null,
            savedAt: new Date().getTime() + index // Use index to ensure uniqueness
          };
        } catch (error) {
          console.error('Error parsing saved movie:', error);
          return null;
        }
      }).filter(movie => movie !== null); // Remove null entries

      // Sort by most recently saved
      movies.sort((a, b) => b.savedAt - a.savedAt);
      
      setSavedMovies(movies);
      console.log('✅ Loaded saved movies:', movies.length, 'unique movies');
      
    } catch (error) {
      console.log('❌ Error loading saved movies:', error);
      setSavedMovies([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle individual image loading states
  const handleImageLoad = (movieId) => {
    setImageLoadingStates(prev => ({
      ...prev,
      [movieId]: false
    }));
  };

  const handleImageError = (movieId) => {
    setImageLoadingStates(prev => ({
      ...prev,
      [movieId]: false
    }));
  };

  // Remove specific movie from saved
  const removeFromSaved = async (movieId, movieTitle) => {
    Alert.alert(
      'Remove Movie',
      `Are you sure you want to remove "${movieTitle}" from your saved list?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem(movieId);
              
              // Also remove any duplicates with similar titles
              const allKeys = await AsyncStorage.getAllKeys();
              const movieKeys = allKeys.filter(key => 
                key.startsWith('movie') && 
                key.toLowerCase().includes(movieTitle.toLowerCase().replace(/[^a-zA-Z0-9]/g, '_'))
              );
              
              // Remove all matching keys
              await AsyncStorage.multiRemove(movieKeys);
              
              setSavedMovies(prev => prev.filter(movie => movie.id !== movieId));
              Alert.alert('Success', `"${movieTitle}" removed from saved list`);
              
              // Reload to ensure clean state
              loadSavedMovies();
            } catch (error) {
              console.error('Error removing movie:', error);
              Alert.alert('Error', 'Failed to remove movie');
            }
          }
        }
      ]
    );
  };

  // View movie details
  const viewMovieDetails = (movie) => {
    // Create the structure that details page expects (same as home page)
    const movieForDetails = {
      item: {
        originalTitle: movie.originalTitle,
        primaryImage: movie.primaryImage, // Use original image for details
        averageRating: movie.averageRating,
        description: movie.description,
        releaseDate: movie.releaseDate,
        countriesOfOrigin: movie.countriesOfOrigin,
        genres: movie.genres,
        budget: movie.budget,
        runtimeMinutes: movie.runtimeMinutes,
        grossWorldwide: movie.grossWorldwide,
        type: movie.type,
        trailer: movie.trailer,
        url: movie.url
      }
    };

    router.push({
      pathname: '/(home)/details',  // Add (home) to match your file location
      params: { film: JSON.stringify(movieForDetails) }
    });
  };

  // Auto-reload when screen is focused (real-time updates)
  useFocusEffect(
    React.useCallback(() => {
      loadSavedMovies();
    }, [])
  );

  useEffect(() => {
    loadSavedMovies();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={{
            color: 'white',
            marginTop: 15,
            fontSize: 16,
            fontFamily: 'PoppinsRegular'
          }}>
            Loading saved movies...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={{flex: 1}}
        contentContainerStyle={{paddingHorizontal: 20, paddingTop: 20, paddingBottom: 120}}
        showsVerticalScrollIndicator={false}
      >
        
        {/* Header - Same style as home page */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 30
        }}>
          <View>
            <Text style={{
              color: Colors.text,
              fontFamily: 'PoppinsBold',
              fontSize: 20
            }}>
              Saved Movies
            </Text>
            <Text style={{
              color: Colors.white,
              fontFamily: 'SemiBold',
              fontSize: 24
            }}>
              {savedMovies.length === 0 ? 'No Movies Saved' : 
               savedMovies.length === 1 ? '1 Movie Saved' : 
               `${savedMovies.length} Movies Saved`}
            </Text>
          </View>

          <TouchableOpacity onPress={loadSavedMovies}>
            <Image source={require('@/assets/images/logo2.png')}
             contentFit='contain' style={{width: 30, height: 34}} />
          </TouchableOpacity>
        </View>

        {/* Content */}
        {savedMovies.length === 0 ? (
          // Empty State
          <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 100
          }}>
            <Text style={{
              color: '#666',
              fontSize: 20,
              fontFamily: 'PoppinsBold',
              marginTop: 20,
              textAlign: 'center'
            }}>
              No Saved Movies
            </Text>
            <Text style={{
              color: '#888',
              fontSize: 16,
              fontFamily: 'SemiBold',
              marginTop: 10,
              textAlign: 'center',
              paddingHorizontal: 40,
              lineHeight: 24
            }}>
              Movies you save will appear here. Go to the home page and save some movies!
            </Text>
            
            <TouchableOpacity 
              style={{
                backgroundColor: Colors.primary,
                paddingHorizontal: 30,
                paddingVertical: 15,
                borderRadius: 10,
                marginTop: 30
              }}
              onPress={() => router.push('/(tabs)/home')}
            >
              <Text style={{
                color: 'white',
                fontFamily: 'PoppinsBold',
                fontSize: 16
              }}>
                Browse Movies
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          // Saved Movies List - ORIGINAL TALL DESIGN like home page
          savedMovies.map((movie, index) => {
            const isImageLoading = imageLoadingStates[movie.id] !== false;
            
            return (
              <TouchableOpacity 
                key={`${movie.id}_${index}`} // Use both ID and index for unique keys
                onPress={() => viewMovieDetails(movie)}
                style={{marginVertical: 20}} // Same as home page movieItemContainer
              >
                {/* Image container with loading indicator - SAME AS HOME PAGE */}
                <View style={{position: 'relative'}}>
                  
                  {/* Loading indicator overlay */}
                  {isImageLoading && (
                    <View style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#333',
                      zIndex: 1,
                      borderRadius: 8
                    }}>
                      <ActivityIndicator size="large" color={Colors.primary} />
                      <Text style={{
                        color: 'white',
                        marginTop: 10,
                        fontSize: 14,
                        fontFamily: 'PoppinsRegular'
                      }}>
                        Loading image...
                      </Text>
                    </View>
                  )}
                  
                  <Image 
                    contentFit='cover' 
                    style={{
                      width: '100%', 
                      height: 500, // SAME HEIGHT AS HOME PAGE
                      borderRadius: 8,
                      backgroundColor: '#333'
                    }}
                    source={movie.optimizedImage}
                    transition={300}
                    cachePolicy="memory-disk"
                    priority="normal"
                    allowDownscaling={true}
                    onLoad={() => handleImageLoad(movie.id)}
                    onError={() => handleImageError(movie.id)}
                  />
                </View>

                {/* Movie Info - SAME LAYOUT AS HOME PAGE */}
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between', 
                  marginTop: 20,
                  alignItems: 'flex-start',
                }}>
                  <Text style={{
                    color: 'white', 
                    fontFamily: 'PoppinsBold', 
                    fontSize: 20,
                    flex: 1,
                    marginRight: 10,
                  }}>
                    {movie.originalTitle}
                  </Text>

                  <Text style={{
                    color: Colors.primary, 
                    fontFamily: 'SemiBold',
                    fontSize: 16,
                  }}>
                    {movie.averageRating}
                  </Text>
                </View>
                
                {/* Description - SAME AS HOME PAGE */}
                <Text style={{
                  color: 'white', 
                  fontFamily: 'SemiBold', 
                  textAlign: 'justify',
                  marginTop: 10,
                  lineHeight: 22
                }}>
                  {movie.description}
                </Text>

                {/* Remove Button - Small and unobtrusive */}
                <TouchableOpacity 
                  style={{
                    alignSelf: 'flex-end',
                    marginTop: 15,
                    backgroundColor: '#ff4444',
                    paddingHorizontal: 15,
                    paddingVertical: 8,
                    borderRadius: 6
                  }}
                  onPress={() => removeFromSaved(movie.id, movie.originalTitle)}
                >
                  <Text style={{
                    color: 'white',
                    fontSize: 14,
                    fontFamily: 'PoppinsBold'
                  }}>
                    Remove from Saved
                  </Text>
                </TouchableOpacity>
              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

export default Saved;