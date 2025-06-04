
import { Platform, StyleSheet,View, Text, Image, TextInput, FlatList, ScrollView,
TouchableOpacity, ActivityIndicator}
 from 'react-native';
 import { SafeAreaView } from 'react-native-safe-area-context';
import styles2 from './styles';
import styles from '../styles';
import Colors from '../../constants/Colors';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import authStyles from '@/app/(auth)/styles3';
import axios from 'axios'
import { useState, useEffect } from 'react';
import { router } from 'expo-router';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';


 export default function Homescreen () {

  const [topMovieData, setTopMovieData] = useState([]);
  const [query, setQuery] = useState('');

  console.log('user query', query)

  // console.log('My Movie Data', topMovieData[8]);

  const getMovieData = async () => {

    try {

      const options = {
  method: 'GET',
  url: 'https://imdb236.p.rapidapi.com/api/imdb/most-popular-movies',
  headers: {
    'x-rapidapi-key': 'e777e75c78msha1a0b07ce74e895p1315b2jsn9ac8c298bba8',
    'x-rapidapi-host': 'imdb236.p.rapidapi.com'
  }
};

    const response = await axios.request(options);
    
    setTopMovieData(response.data);
    // console.log('My Movie Data', response.data);
    console.log('My Movie Data', response.data[8]);
    // console.log('My Movie Data', response.data[1].title);
    

  } 
  catch (error) {
    console.log ('error', error);

  }
}

useEffect(() => {
  getMovieData();

}, []);



  return (

    <SafeAreaView style = {styles2.container}>
      

      <View style ={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}} > 

      
    <View>
      <Text style= {styles2.text1}> Welcome Back </Text>
      <Text style= {styles2.text2}> Sheriff Olanlokun </Text>
      </View>

      <Image source={require ('@/assets/images/logo2.png')}
       resizeMode='contain' style= {{width: 30, height: 34}}  />

      </View>

      <View style= {{flexDirection: 'row', alignItems: 'center',
         backgroundColor: Colors.background2, borderRadius: 8,
          paddingRight: 20, marginTop: 30 }}>

        <TextInput style= {[authStyles.formInput, {width: '90%',
         fontFamily: 'PoppinsRegular', }]} 
        placeholder='Search for a video topic'
        placeholderTextColor={Colors.text}
        onChangeText={(text)=> setQuery(text)}
        />

        <EvilIcons name="search" size={30} color="white"/>

        </View>


        <View style= {{marginVertical: 30}}>
          <Text style= {styles2.text1}> Popular Videos  </Text>
          </View>

          {/* <View style= {{flexDirection: 'row', position: 'absolute', top: '38%', right: -25, borderRadius: 8}}>

            <Image source={require ('@/assets/images/card1.png')}
             resizeMode='contain' style={{height: 250, width: 148, borderRadius: 8}} />

            <Image source={require ('@/assets/images/card2.png')}
             resizeMode='contain' style={{height: 268, width: 168, borderRadius: 8}} />

            <Image source={require ('@/assets/images/card3.png')}
             resizeMode='contain' style={{height: 250, width: 148, borderRadius: 8 }} />
             </View> */}

             <View style= {{marginBottom: 280}}>

              {/* {
                topMovieData.length < 1 ? <ActivityIndicator size='large' color={Colors.primary}/> :
               */}

              <FlatList

              data={topMovieData.filter(movie=>{

              const film = movie.originalTitle?.toLowerCase().includes
              (query.toLowerCase())

                return film;
              })}

              renderItem={(movie)=> {

                return (

                  <TouchableOpacity onPress={()=>{
                   router.push({
                    pathname: '/details',

                    params: {film : JSON.stringify (movie)}
                    

                   }) 
                  }}
                   
                   
                   style= {{marginVertical: 20,}}>

                    <Image resizeMode='contain' 
                    style={{width: '100%', height: 500,}}
                     source={{uri:movie?.item.primaryImage}} />

                     <View style= {{flexDirection: 'row',
                       justifyContent: 'space-between', marginTop: 20,}}>

                  <Text style= {{color: 'white', fontFamily: 'PoppinsBold', 
                    fontSize: 20}}>
                    {movie?.item?.originalTitle} </Text>

                     <Text style= {{color: Colors.primary, fontFamily: 'SemiBold',
                       fontSize: 16, bottom: -2}}>
                          {movie?.item?.averageRating} </Text>

                          </View>
                    
                    <Text style= {{color: 'white', fontFamily: 'SemiBold', 
                      textAlign: 'justify'}}>
                          {movie?.item?.description} </Text>


                    
                   

                          {/* <Text style= {{color: 'white'}}>
                            {movie?.item?.releaseDate} </Text> */}

                            {/* <Text style= {{color: 'white'}}>
                            {movie?.item?.countriesOfOrigin} </Text> */}

                            

                                

                          

              
                  </TouchableOpacity>


                )
                }}

                ListEmptyComponent={()=>{
                  return(
                    <View>
                      <ActivityIndicator size='large' color={Colors.primary} />
                      </View>
                  )
                  
              }}
              
              
              
            />
 
           




             </View>



        





     
    </SafeAreaView>
  );
}
