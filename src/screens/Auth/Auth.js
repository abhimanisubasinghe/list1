import React, {Component} from 'react'
import { ImageBackground, StyleSheet, View, Text, KeyboardAvoidingView, ActivityIndicator } from 'react-native'
import {H1} from 'native-base'
import AwesomeAlert from 'react-native-awesome-alerts'
import {connect} from 'react-redux' 

import bgImage from '../../assets/login.jpeg'
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput'
import DefaultButton from '../../components/UI/DefaultButton/DefaultButton'
import validate from '../../utils/validation'
import {tryAuth, authAutoSignIn } from '../../store/actions/index'

class Auth extends Component {

    state = {
        mode: 'login',
        controls: {
            email: {
                value: "",
                valid: false,  
                validationRules:{
                    isEmail: true
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
                email : this.state.controls.email.value,
                password: this.state.controls.password.value
            }
            if(this.state.controls.email.valid === true && this.state.controls.password.valid === true){
                this.props.onAuth(loginData,this.props,this.state.mode)
            }
            else{
               this.showErrorAlert()
            }
        }
        else{
            const signupData = {
                email : this.state.controls.email.value,
                password: this.state.controls.password.value,
                userName: this.state.controls.userName.value,
            }
            if(this.state.controls.email.valid === true && this.state.controls.password.valid === true && this.state.controls.userName.valid === true && this.state.controls.confirmPassword.valid === true){
                this.props.onAuth(signupData,this.props,this.state.mode)
            }
            else{
                this.showErrorAlert()
                console.log(this.state.controls.email.valid)
                console.log(this.state.controls.password.valid)
                console.log(this.state.controls.userName.valid)
                console.log( this.state.controls.confirmPassword.valid)
            }
        }
    }

    render(){
        const {errorAlert} = this.state;
        let userName = null
        let confirmPassword = null
        let heading = <Text style={styles.heading}>Login</Text>

        let submitButton = (
        <DefaultButton style={styles.submitButton} color='#6a3982' onPress = {() => this.submitHandler()}>
            Submit
        </DefaultButton>  
        )

        if(this.props.isLoading){
            submitButton = <ActivityIndicator/>
        }

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
                        placeholder='Email'
                        style={styles.input}
                        value={this.state.controls.email.value}
                        onChangeText = {(val) => this.updateInputState('email',val)}
                        valid = {this.state.controls.email.valid}
                        touched= {this.state.controls.email.touched}
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
                    {submitButton}
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

const mapStateToProps = state => {
    return{
        isLoading: state.ui.isLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (authData,nav,authMode) => dispatch(tryAuth(authData,nav,authMode)),
        onAutoSignIn: (nav) => dispatch(authAutoSignIn(nav)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Auth);
