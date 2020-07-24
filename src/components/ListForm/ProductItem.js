import React, {Component}  from 'react'
import {View, Text, StyleSheet, Platform, TouchableHighlight, ScrollView, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';

class shopItem extends Component{
    render(){
        console.log(this.props)
        //console.log(this.props.shop)
        //let shop = this.props.shop
        return(
            <TouchableOpacity style={styles.shopContainer}>
                    <View style={{flexDirection: 'row', alignItems: 'center', width:'50%', justifyContent:'space-around', height: '100%'}}>
                        <Text style={styles.shopContainerText}>{this.props.productName}</Text>
                        <Text style={styles.quantityText}>{this.props.quantity}</Text>
                    </View>   
                    <View style={{flexDirection: 'row'}}> 
                    <TouchableOpacity onPress={() => alert('added one more')}>
                        <View style={styles.incrementButton}>
                        <Icon 
                            size= {28}
                            name="plus-circle"
                            color="#346da3"
                            textAlign= "center"
                        />
                        
                        </View>
                        
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => alert('reduced one')}>
                        <View style={styles.incrementButton}>
                        <Icon 
                            size= {28}
                            name="minus-circle"
                            color="#c98c47"
                            textAlign= "center"
                        />
                        
                        </View>
                        
                    </TouchableOpacity>
                    
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
                    </View>
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
        //height: 50,
        padding: 10,
        paddingLeft: 30,
        margin: 10,
        borderRadius: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center',
        width: '90%'
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