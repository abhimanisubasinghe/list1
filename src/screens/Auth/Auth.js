import React, {Component} from 'react'
import { ImageBackground, StyleSheet, View, Text, KeyboardAvoidingView } from 'react-native'
import {H1} from 'native-base'
import AwesomeAlert from 'react-native-awesome-alerts'

import bgImage from '../../assets/login.jpeg'
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput'
import DefaultButton from '../../components/UI/DefaultButton/DefaultButton'
import validate from '../../utils/validation'

class Auth extends Component {

    state = {
        mode: 'login',
        controls: {
            contactNo: {
                value: "",
                valid: false,  
                validationRules:{
                    isPhone: true
                },
                touched : false
            },
            userName: {
                value: "",
                valid: false,  
                validationRules:{
                    notEmpty: true
                },
                touched : false
            },
            password: {
                value: "",
                valid: false,
                validationRules:{
                    minLength: 6
                },
                touched : false
            },
            confirmPassword: {
                value: "",
                valid: false,
                validationRules:{
                    equalTo: 'password'
                },
                touched : false
            },
        },
        errorAlert: false,
        successAlert: false
    }

    showErrorAlert = () => {
        this.setState(prevState => {
          return{
              errorAlert: true
          }
        })
      }
    
      hideErrorAlert = () => {
        this.setState(prevState => {
          return{
              errorAlert: false
          }
        })
      }
    
    showSuccessAlert = () => {
    this.setState(prevState => {
        return{
            successAlert: true
        }
    })
    }

    hideSuccessAlert = (prevState => {
    return{
        successAlert: false
    }
    })  

    updateMode = () => {
        this.setState(prevState => {
            return{
                mode: prevState.mode === 'login' ? 'signup' : 'login'
            }
        })
    }

    updateInputState = (key, value) => {
        let connectedValue = {};
        if(this.state.controls[key].validationRules.equalTo){
            const equalControl = this.state.controls[key].validationRules.equalTo;
            const equalValue = this.state.controls[equalControl].value;
            connectedValue ={
                ...connectedValue,
                equalTo: equalValue
            }
        }
        if(key === 'password'){
            const equalControl = "password"
            connectedValue ={
                ...connectedValue,
                equalTo: value
            }
        }
        this.setState(prevState => {
            return{
                controls: {
                    ...prevState.controls,
                    confirmPassword:{
                        ...prevState.controls.confirmPassword,
                        valid: key === 'password'? validate(prevState.controls.confirmPassword.value,prevState.controls.confirmPassword.validationRules,connectedValue) 
                        : prevState.controls.confirmPassword.valid
                    },
                    [key]: {
                        ...prevState.controls[key],
                        value: value,
                        valid: validate(value, prevState.controls[key].validationRules, connectedValue),
                        touched: true
                        
                    }
                }
            }
        })
    }

    submitHandler = () => {
        if(this.state.mode === 'login'){
            const loginData = {
                contactNo : this.state.controls.contactNo,
                password: this.state.controls.password
            }
            if(this.state.controls.contactNo.valid === true && this.state.controls.password.valid === true){
                alert('Pass')
                this.props.navigation.navigate('Drawer')
            }
            else{
               this.showErrorAlert()
            }
        }
        else{
            const signupData = {
                contactNo : this.state.controls.contactNo,
                password: this.state.controls.password,
                userName: this.state.controls.userName,
            }
            if(this.state.controls.contactNo.valid === true && this.state.controls.password.valid === true && this.state.controls.userName === true && this.state.controls.confirmPassword.valid === true){
                alert('Pass')
                this.props.navigation.navigate('Drawer')
            }
            else{
                this.showErrorAlert()
            }
        }
    }

    render(){
        const {errorAlert} = this.state;
        let userName = null
        let confirmPassword = null
        let heading = <Text style={styles.heading}>Login</Text>

        if(this.state.mode === 'signup'){
            heading = (
                <Text style={styles.heading}>Signup</Text>
            )
            userName = (
                <DefaultInput
                    placeholder='Username'
                    style={styles.input}
                    value={this.state.controls.userName.value}
                    onChangeText = {(val) => this.updateInputState('userName',val)}
                    valid = {this.state.controls.userName.valid}
                    touched= {this.state.controls.userName.touched}
                />
            )
            confirmPassword = (
                <DefaultInput
                    placeholder='Confirm password'
                    style={styles.input}
                    value={this.state.controls.confirmPassword.value}
                    onChangeText = {(val) => this.updateInputState('confirmPassword',val)}
                    valid = {this.state.controls.confirmPassword.valid}
                    touched= {this.state.controls.confirmPassword.touched}
                    secureTextEntry
                />
            )
        }

        return(
            <ImageBackground source={bgImage} style={styles.backgroundImg}>
                <KeyboardAvoidingView behavior='bottom'>
                <View style={styles.form}>
                    {heading}
                    <DefaultButton color='#6a3982' onPress={() => this.updateMode()}>
                        {this.state.mode === 'login' ? <Text style={styles.subHeading}> Switch to SignUP </Text> : <Text style={styles.subHeading}> Switch to Login </Text>}
                    </DefaultButton>
                    {userName}
                    <DefaultInput
                        placeholder='Contact number'
                        style={styles.input}
                        value={this.state.controls.contactNo.value}
                        onChangeText = {(val) => this.updateInputState('contactNo',val)}
                        valid = {this.state.controls.contactNo.valid}
                        touched= {this.state.controls.contactNo.touched}
                    />
                    <DefaultInput
                        placeholder='Password'
                        style={styles.input}
                        value={this.state.controls.password.value}
                        onChangeText = {(val) => this.updateInputState('password',val)}
                        valid = {this.state.controls.password.valid}
                        touched= {this.state.controls.password.touched}
                        secureTextEntry
                    />
                    {confirmPassword}
                    <DefaultButton style={styles.submitButton} color='#6a3982' onPress = {() => this.submitHandler()}>
                        Submit
                    </DefaultButton>    
                </View>
                <AwesomeAlert
                show={errorAlert}
                useNativeDriver = {true}
                showProgress={false}
                contentContainerStyle={styles.errorMsg}
                titleStyle={styles.titleStyle}
                messageStyle={styles.messageStyle}
                title="Error!"
                message="Validation Error, Try Again!"
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showConfirmButton={true}
                confirmText="Ok"
                confirmButtonColor="#DD6B55"
                onConfirmPressed={() => {
                    this.hideErrorAlert()
                }}
                />
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
        justifyContent: 'flex-end',
    },
    form: {
        backgroundColor: 'rgba(255,255,255,0.5)',
        padding: 15,
        //paddingBottom: 50,
        margin: 15,
        marginBottom: '25%',
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
    },
    errorMsg: {
        backgroundColor: 'rgba(237, 199, 192,0.9)',
        fontStyle: 'normal',
        color: 'black'
    } ,
    titleStyle: {
        color: 'black',
        fontWeight: 'bold'
    },
    messageStyle:{
        color: '#262626'
    }
})

export default Auth