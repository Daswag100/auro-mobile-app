import { SafeAreaView } from "react-native-safe-area-context";
import {Text, View, ScrollView, TouchableOpacity, Linking, Pressable, Alert, ActivityIndicator} from "react-native";
import { Image } from 'expo-image'; // Use expo-image for faster loading
import { useLocalSearchParams } from "expo-router";
import styles from "../styles";
import Colors from '../../constants/Colors';
import Button from "@/components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { WebView } from "react-native-webview";
import { useState } from "react";

const Details = () => {

const data = useLocalSearchParams();
const [imageLoading, setImageLoading] = useState(true);
// console.log('Details Page Data', data.film);

const movie = JSON.parse(data.film)
console.log('Parsed Movie Data', movie.item.originalTitle, typeof movie);

// Optimize image URL for 2MB quality - excellent detail and sharpness
const optimizedImageUrl = movie?.item?.primaryImage 
  ? movie.item.primaryImage.replace('._V1_', '._V1_UY750_CR0,0,500,750_AL_')
  : null;

const saveToWatchLater = async () => {
  try {
    // Get all existing saved movie keys
    const allKeys = await AsyncStorage.getAllKeys();
    const movieKeys = allKeys.filter(key => key.startsWith('movie'));
    
    // Check if this movie is already saved
    const movieTitle = movie.item.originalTitle?.toLowerCase().replace(/[^a-zA-Z0-9]/g, '_') || 'unknown';
    const existingMovie = movieKeys.find(key => 
      key.toLowerCase().includes(movieTitle.toLowerCase())
    );
    
    if (existingMovie) {
      Alert.alert('Already Saved!', 
        `"${movie.item.originalTitle}" is already in your saved list.`);
      return;
    }
    
    // Create a unique key for new movie
    const movieKey = `movie_${movieTitle}_${Date.now()}`;
    
    // Save movie with unique key
    await AsyncStorage.setItem(movieKey, JSON.stringify(movie.item));
    
    Alert.alert('Success!!!',
      `You have successfully saved "${movie.item.originalTitle}" to your watch later list.`);

    console.log('✅ Movie saved successfully:', movie.item.originalTitle);
    
  } catch (error) {
    Alert.alert('Error!!!', 'There was an error saving the movie');
    console.error('❌ Error saving movie:', error);
  }
}

    return (

        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 50, paddingHorizontal: 20, paddingTop: 70}}>

              <Pressable onPress={() => {
                router.back();
              }} style={{position: 'absolute', top: 10, left: -5, zIndex: 1}}>

                <Ionicons name="arrow-back" size={30} color='white' />
              </Pressable>

              <TouchableOpacity onPress={() => {
                Linking.openURL(movie?.item.url)
              }}>
                
                <View style={{
                  width: '100%', 
                  height: 500, 
                  marginTop: -30, 
                  borderRadius: 12,
                  backgroundColor: '#1a1a1a',
                  justifyContent: 'center',
                  alignItems: 'center',
                  overflow: 'hidden'
                }}>
                  
                  {/* Loading indicator - shows while image loads */}
                  {imageLoading && (
                    <View style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#1a1a1a',
                      zIndex: 1
                    }}>
                      <ActivityIndicator size="large" color={Colors.primary} />
                      <Text style={{
                        color: 'white',
                        marginTop: 10,
                        fontFamily: 'PoppinsRegular'
                      }}>
                        Loading image...
                      </Text>
                    </View>
                  )}
                  
                  {/* The actual image */}
                  <Image 
                    contentFit='cover' 
                    style={{width: '100%', height: '100%'}}
                    source={optimizedImageUrl}
                    transition={300}
                    cachePolicy="memory-disk"
                    priority="high"
                    allowDownscaling={true}
                    onLoad={() => setImageLoading(false)}
                    onError={() => setImageLoading(false)}
                  />
                </View>

              </TouchableOpacity>

                     <View style= {{flexDirection: 'row',
                       justifyContent: 'space-between', marginTop: 20,}}>

                  <Text style= {{color: 'white', fontFamily: 'PoppinsBold', 
                    fontSize: 20}}>
                    {movie?.item?.originalTitle} </Text>

                     <Text style= {{color: Colors.primary, fontFamily: 'SemiBold',
                       fontSize: 16, bottom: -2}}>
                          {movie?.item?.averageRating} </Text>

                          </View>

                          <View>

                          <Text style= {{color: 'white', fontFamily: 'SemiBold', 
                      textAlign: 'justify'}}>
                          {movie?.item?.description} </Text>

                          </View>

                          <View>
                            <Text style= {{color: 'white', fontFamily: 'SemiBold',
                              fontSize: 16, marginVertical: 20}}>
                              Release Date: {movie?.item?.releaseDate} </Text>

                            <Text style= {{color: 'white', fontFamily: 'SemiBold',
                              fontSize: 16, marginTop: 10}}>
                              Countries of Origin: {movie?.item?.countriesOfOrigin} </Text>

                            <Text style= {{color: 'white', fontFamily: 'SemiBold',
                              fontSize: 16, marginTop: 10}}>
                              Genres: {movie?.item?.genres?.join(', ')} </Text>

                            <Text style= {{color: 'white', fontFamily: 'SemiBold',
                              fontSize: 16, marginTop: 10}}>
                             Budget: ${movie?.item?.budget} </Text>

                            <Text style= {{color: 'white', fontFamily: 'SemiBold',  
                              fontSize: 16, marginTop: 10}}>
                             Runtime Minutes: {movie?.item?.runtimeMinutes}mins </Text>

                            <Text style= {{color: 'white', fontFamily: 'SemiBold',
                              fontSize: 16, marginTop: 10}}>
                           Gross Worldwide: ${movie?.item?.grossWorldwide} </Text>

                           <Text style= {{color: 'white', fontFamily: 'SemiBold',
                              fontSize: 16, marginTop: 10}}>
                              Type: {movie?.item?.type} </Text>

                               <Text style = {{color: 'white',
                                fontFamily: 'PoppinsRegular',
                                fontSize: 20, marginTop:20}}>Watch Trailer </Text>

                              {
                                movie?.item.trailer && (
                                 
                                  <View style ={{height: 150, width: '117%',
                                   marginTop: 20, borderRadius: 10, overflow: 'hidden'}}>
                                    <WebView

                                    source={{uri: movie?.item.trailer}}
                                    style = {{flex:1}}
                                     javaScriptEnabled={true}
                                    domStorageEnabled={true}
                                     allowsInlineMediaPlayback={true}
                                    allowsFullscreenVideo={true} 
                                    />
                                    </View>
                                )
                              }

                              <View style={{marginTop: 50}}> 

                                <Button text={'Watch Later'} textColor={'white'}
                                onPress={saveToWatchLater}
                                
                                  />
                                
                                </View>
                                
                                
                                </View>
                          </ScrollView>

            


        </SafeAreaView>
    )
};

export default Details;