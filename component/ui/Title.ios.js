import {Text,StyleSheet, Platform } from "react-native";

function Title({children}){
    return(
        <Text style={styles.title}>{children}</Text>
    )
}
export default Title;
const styles= StyleSheet.create({

    title :{
        fontFamily: 'open-sans-bold',
        fontSize: 24,
        // fontWeight: 'bold',
        color: 'white' ,
        textAlign: 'center',
        // borderWidth : Platform.OS ==='android' ? 2: 0, // to remove border from ios device but not from android devices
        // another method to write
        //borderWidth : Platform.select({ios: 0, android: 1}),
        borderWidth: 0, //because this file is for ios
        borderColor: 'white' ,
        padding: 12,
        maxWidth: '80%',
        width: 300,
        maxHeight:'70%'
    }
})