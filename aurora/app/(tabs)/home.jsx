// app/(tabs)/home.jsx - OPTIMIZED VERSION
import { Platform, StyleSheet, View, Text, TextInput, FlatList, ScrollView,
TouchableOpacity, ActivityIndicator}
 from 'react-native';
import { Image } from 'expo-image'; // Use expo-image for faster loading
 import { SafeAreaView } from 'react-native-safe-area-context';
import styles2 from './styles'; // Your clean styles
import styles from '../styles';
import Colors from '../../constants/Colors';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import authStyles from '@/app/(auth)/styles3';
import axios from 'axios'
import { useState, useEffect } from 'react';
import { router } from 'expo-router';

// Global cache variables - stored outside component
let movieCache = null;
let cacheTimestamp = null;
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes cache

export default function Homescreen () {
  const [topMovieData, setTopMovieData] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [imageLoadingStates, setImageLoadingStates] = useState({});

  console.log('user query', query)

  const getMovieData = async () => {
    try {
      // Check if we have valid cached data
      const now = Date.now();
      if (movieCache && cacheTimestamp && (now - cacheTimestamp) < CACHE_DURATION) {
        console.log('✅ Using cached movie data - no API call needed!');
        setTopMovieData(movieCache);
        setLoading(false);
        return;
      }

      console.log('🔄 Fetching fresh movie data from API...');
      setLoading(true);

      const options = {
        method: 'GET',
        url: 'https://imdb236.p.rapidapi.com/api/imdb/most-popular-movies',
        headers: {
          'x-rapidapi-key': 'e777e75c78msha1a0b07ce74e895p1315b2jsn9ac8c298bba8',
          'x-rapidapi-host': 'imdb236.p.rapidapi.com'
        }
      };

      const response = await axios.request(options);
      
      console.log('📊 Raw API Response:', response.data);
      console.log('📊 First item structure:', response.data[0]);
      console.log('📊 Data length:', response.data?.length);
      
      // Check if we need to optimize images or use original data
      let processedData;
      
      if (response.data && response.data.length > 0) {
        // Check the structure and optimize if needed
        if (response.data[0]?.item?.primaryImage) {
          // Structure: movie.item.primaryImage - apply high quality optimization
          processedData = response.data.map(movie => ({
            ...movie,
            item: {
              ...movie.item,
              primaryImage: movie?.item?.primaryImage 
                ? movie.item.primaryImage.replace('._V1_', '._V1_UY900_CR0,0,600,900_AL_')
                : null
            }
          }));
          console.log('✅ Applied HIGH QUALITY 3MB image optimization to movie.item structure');
        } else if (response.data[0]?.primaryImage) {
          // Structure: movie.primaryImage - apply high quality optimization
          processedData = response.data.map(movie => ({
            ...movie,
            primaryImage: movie?.primaryImage 
              ? movie.primaryImage.replace('._V1_', '._V1_UY900_CR0,0,600,900_AL_')
              : null
          }));
          console.log('✅ Applied HIGH QUALITY 3MB image optimization to movie structure');
        } else {
          // Use original data if structure is different
          processedData = response.data;
          console.log('⚠️ Using original data - unknown structure');
        }
      } else {
        processedData = [];
        console.log('❌ No data received from API');
      }
      
      // Cache the processed data
      movieCache = processedData;
      cacheTimestamp = Date.now();
      
      setTopMovieData(processedData);
      console.log('✅ Fresh movie data loaded and cached:', processedData.length, 'movies');
    } 
    catch (error) {
      console.log ('❌ API Error:', error);
      
      // If API fails but we have cached data, use it
      if (movieCache) {
        console.log('🔄 API failed, using cached data as fallback');
        setTopMovieData(movieCache);
      }
    } finally {
      setLoading(false);
    }
  }

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

  useEffect(() => {
    getMovieData();
  }, []);

  return (
    <SafeAreaView style={styles2.professionalContainer}>
      <View style={styles2.contentWrapper}>
        
        {/* Header Section */}
        <View style={styles2.headerSection}> 
          <View>
            <Text style={styles2.text1}> Welcome Back </Text>
            <Text style={styles2.text2}> Sheriff Olanlokun </Text>
          </View>

          <Image source={require('@/assets/images/logo2.png')}
           contentFit='contain' style={{width: 30, height: 34}} />
        </View>

        {/* Search Section */}
        <View style={styles2.searchSection}>
          <TextInput style={[authStyles.formInput, {width: '90%',
           fontFamily: 'PoppinsRegular'}]} 
          placeholder='Search for a video topic'
          placeholderTextColor={Colors.text}
          onChangeText={(text)=> setQuery(text)}
          value={query}
          />

          <EvilIcons name="search" size={30} color="white"/>
        </View>

        {/* Popular Videos Section */}
        <View style={styles2.popularVideosSection}>
          <Text style={styles2.text1}> Popular Videos </Text>
        </View>

        {/* Movies List with proper spacing for tab bar */}
        <View style={styles2.listContainer}>
          <FlatList
            data={topMovieData.filter(movie=>{
              // Handle both possible data structures
              const title = movie?.item?.originalTitle || movie?.originalTitle || '';
              if (!title) return false;
              
              const film = title.toLowerCase().includes(query.toLowerCase());
              return film;
            })}

            renderItem={(movie)=> {
              const movieId = movie?.item?.id || movie?.id || movie.index;
              const isImageLoading = imageLoadingStates[movieId] !== false;
              
              // Handle both possible data structures
              const movieData = movie?.item || movie;
              const imageUrl = movieData?.primaryImage;
              const title = movieData?.originalTitle || 'Unknown Title';
              const rating = movieData?.averageRating || 'N/A';
              const description = movieData?.description || 'No description available';
              
              return (
                <TouchableOpacity 
                  onPress={()=>{
                   router.push({
                    pathname: '/details',  // Add (home) to match your file location
                    params: {film : JSON.stringify(movie)}
                   }) 
                  }}
                  style={styles2.movieItemContainer}>

                  {/* Image container with loading indicator */}
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
                      style={styles2.movieImage}
                      source={imageUrl || require('@/assets/images/logo2.png')}
                      transition={300}
                      cachePolicy="memory-disk"
                      priority="normal"
                      allowDownscaling={true}
                      recyclingKey={movieId}
                      onLoad={() => handleImageLoad(movieId)}
                      onError={() => handleImageError(movieId)}
                    />
                  </View>

                  <View style={styles2.movieInfoContainer}>
                    <Text style={styles2.movieTitle}>
                      {title}
                    </Text>

                    <Text style={styles2.movieRating}>
                      {rating}
                    </Text>
                  </View>
                  
                  <Text style={styles2.movieDescription}>
                    {description}
                  </Text>
                </TouchableOpacity>
              )
            }}

            ListEmptyComponent={()=>{
              return(
                <View style={styles2.loadingContainer}>
                  {loading ? (
                    <>
                      <ActivityIndicator size='large' color={Colors.primary} />
                      <Text style={{
                        color: 'white',
                        marginTop: 15,
                        fontSize: 16,
                        fontFamily: 'PoppinsRegular'
                      }}>
                        Loading movies...
                      </Text>
                    </>
                  ) : (
                    <Text style={styles2.text1}>No movies found</Text>
                  )}
                </View>
              )
            }}
            
            showsVerticalScrollIndicator={false}

            // Optimized performance settings for smooth scrolling with images
            removeClippedSubviews={true}
            maxToRenderPerBatch={5}
            initialNumToRender={4}
            windowSize={8}
            updateCellsBatchingPeriod={100}
            getItemLayout={(data, index) => ({
              length: 600, // Back to original tall image height
              offset: 600 * index,
              index,
            })}
            keyExtractor={(item, index) => `${item?.item?.id || item?.item?.originalTitle || index}_${index}`}

          />
        </View>
      </View>
    </SafeAreaView>
  );
}