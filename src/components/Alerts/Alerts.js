import React, {Component} from 'react'
import { ImageBackground, StyleSheet, View, Text, KeyboardAvoidingView, ActivityIndicator } from 'react-native'
import AwesomeAlert from 'react-native-awesome-alerts'

const Alerts = (props) => {
    //console.log('p',props)
    return (
        <AwesomeAlert
            show={props.alert}
            useNativeDriver = {true}
            showProgress={false}
            contentContainerStyle={props.type === 'error'? styles.errorMsg: props.type === 'success'? styles.successMsg: styles.infoMsg}
            titleStyle={styles.titleStyle}
            messageStyle={styles.messageStyle}
            title={props.title}
            message={props.message}
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showConfirmButton={true}
            showCancelButton= {true}
            confirmText="Ok"
            cancelText = "Cancel"
            confirmButtonColor={props.type === 'error'? "#DD6B55": props.type === 'success'? "#28a852": "#3371a1"}
            cancelButtonColor = "#3d3d3d"
            onConfirmPressed={props.onHideAlert}
            onCancelPressed={props.onHideAlert}
            /> 
    );
};

const styles = StyleSheet.create({
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
    },
    successMsg: {
        backgroundColor: 'rgba(143, 227, 179,0.9)',
        fontStyle: 'normal',
        color: 'black'
    } ,
    infoMsg:{
        backgroundColor: 'rgba(155, 200, 235,0.9)',
        fontStyle: 'normal',
        color: 'black'
    },
    succeessConfirm: {
        color: '#28a852'
    },
    errorConfirm: {
        color: '#DD6B55'
    }

})

export default Alerts;