import React, {Component} from 'react';
import {View, Button, Image, StyleSheet} from 'react-native';
import ImagePicker from 'react-native-image-picker';

class PickImage extends Component{

    state= {
        pickedImage : null
    }

    reset = () => {
        this.setState({
            pickedImage: null
        })
    }

    pickImageHandler = () => {
        ImagePicker.showImagePicker({title: 'Pick an Image', maxWidth: 800, maxHeight: 600}, res => {
            if(res.didCancel){
                console.log('User cancelled!')
            }
            else if(res.error){
                console.log('Error',res.error)
            }
            else{
                this.setState({ 
                    pickedImage : {uri: res.uri}
                })
                this.props.onImagePick({uri:res.uri, base64: res.data})
            }
        })

    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.placeholder}>
                    <Image 
                    source={this.state.pickedImage}
                    style={styles.previewImage}
                    />
                </View>
                <View style={styles.button}>
                <Button 
                title='Pick Image' 
                color='black'
                onPress=  {this.pickImageHandler}
                />
                </View>
        </View>
        )
    }
}

const styles = StyleSheet.create({  
    container: {
        width: '90%',
        alignItems: 'center'
    },  
    placeholder:{
        borderWidth: 1,
        borderColor: "black",
        backgroundColor: '#eee',
        width: '100%',
        height: 150,
        borderRadius: 15
    },
    button: {
        margin: 8
    },
    previewImage:{
       width: '100%',
       height: 150,
       borderRadius: 15
    }
})

export default PickImage; 