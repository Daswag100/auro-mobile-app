import { SafeAreaView } from 'react-native-safe-area-context';
import { Platform, StyleSheet,View, Text, Image} from 'react-native';
import Colors from '../../constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles';
import React, { useEffect, useState } from 'react';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';


const Saved =()=> {

  const [savedMovies, setSavedMovies] = useState([]);

  useEffect(() => {

    const getSavedMovie = async () => {
  
      try {
        const movie = await AsyncStorage.getItem('movie')

        const parsedMovie = JSON.parse(movie);

        setSavedMovies(parsedMovie);
        
          console.log('my saved movie', movie);
        }

      catch (e) {

        console.log('Error fetching saved movie', e);
      
      }
    }

    getSavedMovie() 

    }, []);

  return (

    <SafeAreaView style= {styles.container}>
      <Text style = {{color: 'white', fontFamily: 'PoppinsBold',}}>
      {savedMovies?.originalTitle}
      </Text>


    </SafeAreaView>
    
  );
}

export default Saved