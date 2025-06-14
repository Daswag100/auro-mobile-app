

import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

const authStyles = StyleSheet.create({
authText: {
    color: Colors.white,
    fontFamily: 'SemiBold',
    fontSize: 25,
    },

    secondaryContainer: {
        marginTop: 30,
    },

    formContainer: {
        gap: 10,
        marginVertical: 15,
    },

    formText: {
       fontFamily: 'PoppinsMedium',
       fontSize: 20,
       color: Colors.text2,
    },

    formInput: {
        height: 58,
        backgroundColor: Colors.background2,
        borderRadius: 8,
        color: Colors.white,
        paddingLeft: 20,
        // fontSize: 20,

    },
    
    buttonContainer:{
        marginVertical: 20,
    },

    footerNote: {
        color: Colors.text,
        fontFamily: 'PoppinRegular',
        fontSize: 20, 
        textAlign: 'center',
        marginTop: 5,
    },

    login: {
        color: Colors.primary,
        fontFamily: 'SemiBold',
    },


    forgotPassword: {
        color: Colors.text,
        fontFamily: 'PopinsRegular',
        textAlign: 'right',
        fontSize: 15,
        marginTop: 10,
    },

    image: {
        width: 150,
    },

    positionPassword: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        // backgroundColor: Colors.background2,
    },




});






export default authStyles;