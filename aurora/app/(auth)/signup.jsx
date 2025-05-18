import { SafeAreaView } from "react-native-safe-area-context"
import {Text, Image, TextInput, View, TouchableOpacity, Pressable} from 'react-native'
import styles from '../styles.js'
import Colors from '../../constants/Colors'
import authStyles from './style.js'
import Button from '../../components/Button';
import { router } from "expo-router"
import { useState } from "react"
import Ionicons from '@expo/vector-icons/Ionicons';


const SignUp = () => {
  
    const [passswordShown, setPasswordShown] = useState(false)
    const [usernameFocused, setUsernameFocused] = useState(false)
    const [emailFocused, setEmailFocused] = useState(false)
    const [passwordFocused, setPasswordFocused] = useState(false)



return (
<SafeAreaView style = {styles.container}>
    <Image resizeMode='center' 
    source={require('../../assets/images/logo.png')}
     style={authStyles.image} />

    <Text style = {authStyles.authText}> Sign Up </Text>

    <View style = {authStyles.secondaryContainer}>

    <View style = {authStyles.formContainer}>
        <Text style = {authStyles.formText}> Username </Text>
        <TextInput style = {[authStyles.formInput, {borderWidth: usernameFocused ? 2 : 0,
    borderColor: usernameFocused ? Colors.primary : 'transparent'}]}
          cursorColor={Colors.primary} 
            onBlur={()=>{
            setUsernameFocused(false) 
            }}
         onFocus={()=>{
            setUsernameFocused(true)



         }}/>
    </View>

    <View style = {authStyles.formContainer}>
        <Text style = {authStyles.formText}> Email </Text>
        <TextInput style = {[authStyles.formInput, 
        {borderWidth: emailFocused ? 2 : 0,
    borderColor: emailFocused ? Colors.primary : 'transparent'}]}
          cursorColor={Colors.primary} 
            onBlur={()=>{
            setEmailFocused(false) 
            }}
         onFocus={()=>{
            setEmailFocused(true)
            }} keyboardType='email-address' />
    </View>
    


    <View style = {authStyles.formContainer}>
        <Text style = {authStyles.formText}> Password</Text>

        <View style = {{backgroundColor: Colors.background2 , 
        borderWidth: passwordFocused ? 2 : 0,
    borderColor: passwordFocused ? Colors.primary :
     'transparent', borderRadius: 8,}}>

        <TextInput style = {[authStyles.formInput, {width:'90%'}]}
         secureTextEntry={!passswordShown} cursorColor={Colors.primary} 
            onBlur={()=>{
            setPasswordFocused(false) 
            }}
         onFocus={()=>{
            setPasswordFocused(true)



         }} keyboardType= 'numeric'/>

        <View style = {authStyles.positionPassword}>
            
            {
        passswordShown ? <Pressable onPress = {() =>{ 
        setPasswordShown(false)
        setPasswordFocused(true)
     }}>
        <Ionicons name= 'eye-off' size = {20} color= '#7B7BBB' />
</Pressable> : <Pressable onPress = {() =>{ 
        setPasswordShown(true)
        setPasswordFocused(true)
     }}>
        <Ionicons name= 'eye' size = {20} color= '#7B7BBB' />
</Pressable>



     }
     </View>
     </View>

     








</View>
   </View>

    <View style = {authStyles.buttonContainer}>
<Button text = {'Sign Up'}/>
</View>

<TouchableOpacity onPress = {() => router.navigate ('/login')}>

<Text style = {authStyles.footerNote}> Already have an account? 
    <Text style = {authStyles.login} > Login </Text> </Text>
 </TouchableOpacity>   



</SafeAreaView>

    

)

}

export default SignUp