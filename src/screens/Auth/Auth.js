import React, {Component} from 'react'
import { ImageBackground, StyleSheet, View, Text, KeyboardAvoidingView } from 'react-native'
import {H1} from 'native-base'

import bgImage from '../../assets/login.jpeg'
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput'
import DefaultButton from '../../components/UI/DefaultButton/DefaultButton'

class Auth extends Component {

    

    render(){
        return(
            <ImageBackground source={bgImage} style={styles.backgroundImg}>
                <KeyboardAvoidingView behavior='padding'>
                <View style={styles.form}>
                    <Text style={styles.heading}>Login</Text>
                    <DefaultButton color='purple'>
                    <Text style={styles.subHeading}> Switch to SignUP </Text>
                    </DefaultButton>
                    <DefaultInput
                        placeholder='Your contact number'
                        style={styles.input}
                    />
                    <DefaultInput
                        placeholder='Password'
                        style={styles.input}
                        secureTextEntry
                    />
                    <DefaultButton style={styles.submitButton} color='purple'>
                        Submit
                    </DefaultButton>    
                </View>
                </KeyboardAvoidingView>
            </ImageBackground>    
        )
    }
}

const styles = StyleSheet.create({
    backgroundImg:{
        width: '100%',
        flex:1,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    form: {
        backgroundColor: 'rgba(255,255,255,0.5)',
        padding: 15,
        margin: 15,
        width: 300,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        borderRadius: 15,
        borderColor: 'violet'
    },
    heading: {
        fontSize: 30,
        textTransform: 'uppercase',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    subHeading:{
       // fontSize: 18,
        textTransform: 'uppercase',
        textAlign: 'center',

    },
    input: {
        borderColor: '#bbb',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        textAlign: 'center'
    }, 
    submitButton:{
        color: 'black',
        //borderRadius: 1
    } 
})

export default Auth