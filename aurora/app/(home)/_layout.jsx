import { Stack } from "expo-router"




const HomeLayout = ({ children }) => {

    return (

        <Stack screenOptions={{
    headerShown: false}}>
            <Stack.Screen name='details'/>



        </Stack>



    )
}

export default HomeLayout;