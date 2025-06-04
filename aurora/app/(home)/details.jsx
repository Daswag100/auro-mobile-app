import { SafeAreaView } from "react-native-safe-area-context";
import {Text, Image, View, ScrollView, TouchableOpacity, Linking, Pressable, Alert} from "react-native";
import { useLocalSearchParams } from "expo-router";
import styles from "../styles";
import Colors from '../../constants/Colors';
import Button from "@/components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import Webview, { WebView } from "react-native-webview";

const Details = () => {

const data = useLocalSearchParams();
// console.log('Details Page Data', data.film);

const movie = JSON.parse(data.film)
console.log('Parsed Movie Data', movie.item.originalTitle, typeof movie);

const saveToWatchLater = async () => {
  try {

    await AsyncStorage.setItem('movie', JSON.stringify (movie.item), (error)=> {

    }).then((error) => {
      // Alert.alert('Success!!!', 'You have successfully saved ' + movie.item.originalTitle 
      //    +  ' to your watch later list');

          Alert.alert('Success!!!',
            ` You have successfully saved ${movie.item.originalTitle} to your watch later list.`);


         console.log('Movie saved successfully:', movie.item.originalTitle);
  }).catch((error) => {
    Alert.alert('Error!!!',
     ` Error occured while saving ${movie.item.originalTitle} to your watch later list.`);
      console.error('Error saving movie:', error);
    });
}



  catch (error) {
    Alert.alert('Error!!!', 'There was an error saving the movie');
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
                
        
            <Image resizeMode='contain' 
                    style={{width: '100%', height: 500, marginTop: -30}}
                     source={{uri:movie?.item.primaryImage}} />

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
                              Genres: {movie?.item?.genres.join(', ')} </Text>

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
                                 
                                  <View style ={{height: 150, width: '104%',
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