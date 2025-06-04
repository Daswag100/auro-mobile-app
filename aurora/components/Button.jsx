import { TouchableOpacity, Text } from "react-native";
import Colors from "../constants/Colors";


const Button =({text, onPress, textColor})=>  {
return (

    <TouchableOpacity onPress= {onPress} style= {{height: 58, backgroundColor: Colors.primary,
     borderRadius: 8, justifyContent: 'center'}}>
    <Text style={{color: textColor ? textColor :  Colors.background,
         textAlign: 'center', fontFamily: 'SemiBold', fontSize:18}}> {text}
    </Text>
   
       
    </TouchableOpacity>
) 

}

export default Button;