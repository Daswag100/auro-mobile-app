import { SafeAreaView } from "react-native-safe-area-context"
import {Text, } from "react-native"
import { useLocalSearchParams } from "expo-router"


const Details = () => {

const {movie} = useLocalSearchParams();

    return (

        <SafeAreaView>
            <Text> This Is My Details Page</Text>


        </SafeAreaView>
    )
}

export default Details;