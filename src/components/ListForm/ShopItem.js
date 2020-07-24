import React, {Component}  from 'react'
import {View, Text, StyleSheet, Platform, TouchableHighlight, ScrollView, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';

class shopItem extends Component{
    render(){
        console.log(this.props)
        console.log(this.props.shop)
        let shop = this.props.shop
        return(
            <TouchableOpacity style={styles.shopContainer}>
                    <View style={{width:'70%'}}>
                        <Text style={styles.shopContainerText}>{this.props.shopName}</Text>
                    </View>    
                    <TouchableOpacity onPress={this.props.onDelete}>
                        <View style={styles.button}>
                        <Icon 
                            size= {28}
                            name="times-circle"
                            color="red"
                            textAlign= "center"
                        />
                        </View>
                    </TouchableOpacity>
                </TouchableOpacity> 
        )
    }
}

const styles = StyleSheet.create({
    form: {
        width: '95%',
        //height: 250,
        justifyContent: 'center',
        //alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)',
        padding: 10,
        paddingLeft: 20,
        flex: 1
    },
    header:{
        fontWeight: 'bold',
        fontSize: 20,
        paddingLeft: 10,
        paddingTop: 10
    },
    inputStyle: {
        borderColor: 'black',
        width: '95%'
    },
    modal: {
        backgroundColor: 'rgba(255,255,255,0.8)',
        flex: 1,
        height: '100%',
        padding: 10,
        justifyContent: 'space-between'
      },
    shopContainer: {
        backgroundColor: '#eee',
        height: 50,
        padding: 10,
        paddingLeft: 30,
        margin: 10,
        borderRadius: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center'
    },
    button: {
        padding: 2,
        paddingLeft: 10,
        paddingRight: 20
    },
    incrementButton: {
        padding: 2,
        paddingLeft: 20,
        paddingRight: 10,
        flexDirection: 'row'
    },
    shopContainerText: {
        fontWeight: 'bold'
    },
    quantityText:{
        fontStyle: 'italic',
        //color: 'green',
        //fontWeight: 'bold',
        padding: 5,
        paddingLeft: 10,
        paddingRight: 5,
        alignItems: 'center'
    }
})

export default shopItem;