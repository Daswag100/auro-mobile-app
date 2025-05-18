import { View, Text, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from './styles';
import  Colors from '../constants/Colors';
import Button from '../components/Button';
import {router} from 'expo-router';


const Page = ()=> {
return (

   <SafeAreaView style={styles.container}>
    <Image resizeMode='center'
     source={require('../assets/images/logo.png')} style={{width: 160,
      alignSelf: 'center' }} />

      <Image resizeMode='center' 
      source={require('../assets/images/onboarding.png')} style={{width: 400,
      height: 295, alignSelf: 'center' }} />

<View>
      <Text style={{color:'white', fontFamily: 'PoppinsBold', 
        textAlign: 'center', fontSize: 30}}>
        Discover Endless Possibilities with <Text style={{color: Colors.primary}}>Aora</Text>
      </Text>
      <Image resizeMethod='contain' 
      source={require('../assets/images/path.png')} 
      style={{width:70, height: 13, position: 'absolute', right: 20, bottom: 5}}/>

      </View>

      <Text style={{color: Colors.text, 
      fontFamily: 'PoppinsRegular', textAlign: 'center',
      fontSize: 16, marginVertical: 10}}>
      Where Creativity Meets Innovation: Embark on a Journey of Limitless Exploration with Aora
      </Text>
      

      
<View style= {{marginTop: 40}}>

      <Button  onPress={()=>{

       router.navigate ('/signup')   

      }}   text= {'Continue with Email'}/>

      </View>
 
 </SafeAreaView> 


)
}

export default Page;