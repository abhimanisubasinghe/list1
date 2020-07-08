import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

const defaultInput = props => {
    return(
        <TextInput
            
            underlineColorAndroid= 'transparent'
            {...props}
            style= {[styles.input, props.style, !props.valid && props.touched ? styles.invalid: null]}
        />
    )
}

const styles = StyleSheet.create({
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#eee',
        padding: 5,
        margin: 8,
        borderRadius: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    invalid: {
        backgroundColor: 'rgba(249, 192, 192, 0.5)',
        borderColor: 'red'
    }
})

export default defaultInput;