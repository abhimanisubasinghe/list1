import React from 'react'
import { TouchableHighlight, View,  StyleSheet, Image,Dimensions, TouchableOpacity, Text, TextInput, ActivityIndicator,ScrollView, KeyboardAvoidingView } from 'react-native'
import {  Container, Header, Content, Card, CardItem, Body} from 'native-base';
import Modal from 'react-native-modal';
import defaultImage from '../../assets/default.jpg'
import {connect} from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome5'
import MapView from 'react-native-maps'

import {deleteBill, updateBill } from '../../store/actions/index'

//import BillUpdate from '../BillUpdate/BillUpdate'
import DefaultInput from '../UI/DefaultInput/DefaultInput'
import DefaultButton from '../UI/DefaultButton/DefaultButton'
import validate from '../../utils/validation'
import PickLocation from '../PickLocation/PickLocation'

class billListItem  extends React.Component {

    state = {
        paid: this.props.paid
    }

    render(){
        

        let paidChecker = null

        if(!this.props.paid){
            paidChecker = <TouchableOpacity onPress={this.billPaidUpdateHandler}>
                            <View style={styles.button}>
                            <Text>PAY</Text>    
                            <Icon 
                                size= {30}
                                name="check"
                                color="black"
                                textAlign= "center"
                            />
                            </View>
                        </TouchableOpacity>
        }

        let content = null
        
        let buttonView = null

        //console.log(this.props.dueDate)
        

        if(this.props.isLoading){
            content = <ActivityIndicator color='black'/>
        }

        let today = new Date()
        let tomorrow = new Date()
        tomorrow.setDate(new Date().getDate()+1)
        //console.log(today , tomorrow, this.props.dueDate)
        let temp = this.props.dueDate
        //console.log(new Date(temp))
        let bill = null

        const year = new Date(temp).getFullYear()
        const month = new Date(temp).getMonth()
        const date = new Date(temp).getDate()

        content = <View style={styles.textContainer}>
                            <Text style={styles.billName}>{this.props.billName}</Text>
                            <Text style={styles.billDescription}>{this.props.amount}
                            </Text>
                            <Text style={styles.billDescription}>{year} / {month} / {date}
                            </Text>
                        </View>            


        if(this.props.paid){
            //paid bill
            console.log('paid')
            bill = (
                <TouchableHighlight>
                    <View style={styles.paidContainer}>
                        <View style={styles.listItem}>
                            {content}
                        </View>
                    </View>

                </TouchableHighlight>
            )
        }
        else{
            if(new Date(temp) < today){
                //overdue bill
                console.log('overdue')
                bill = (
                    <TouchableHighlight>
                        <View style={styles.overDueContainer}>
                            <View style={styles.listItem}>
                                {content}
                            </View>
                        </View>
    
                    </TouchableHighlight>
                )
            }
            else{
                if(new Date(temp) <= tomorrow){
                    //warning bill
                    console.log('warnign')
                    bill = (
                        <TouchableHighlight>
                            <View style={styles.warningContainer}>
                                <View style={styles.listItem}>
                                    {content}
                                </View>
                            </View>
        
                        </TouchableHighlight>
                    )
                }
                else{
                    //normal bill
                    console.log('normal')
                    bill = (
                        <TouchableHighlight>
                            <View style={styles.container}>
                                <View style={styles.listItem}>
                                    {content}
                                </View>
                            </View>
        
                        </TouchableHighlight>
                    )
                }
            }
        }

        return(
            <KeyboardAvoidingView>
                
            {bill}
            </KeyboardAvoidingView>
        )
    }

    
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ccc",  
        width: 150,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        padding: 10,
        borderRadius: 25,
        height: 150,
        marginTop:2
    },
    warningContainer: {
        backgroundColor: "rgba(237, 206, 133,0.5)",  
        width: 150,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        padding: 10,
        borderRadius: 25,
        borderColor: 'orange',
        borderWidth: 2,
        height: 150,
        marginTop:2
    },
    overDueContainer: {
        backgroundColor: "rgba(237, 138, 133,0.5)",  
        width: 150,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        padding: 10,
        borderRadius: 25,
        borderColor: 'red',
        borderWidth: 2,
        height: 150,
        marginTop:2
    },
    paidContainer:{
        backgroundColor: "rgba(133, 237, 156,0.5)",  
        width: 150,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        padding: 10,
        borderRadius: 25,
        borderColor: 'green',
        borderWidth: 2,
        height: 150,
        marginTop:2
    },
    listItem: {
        width: 150,
        marginBottom: 5,
        padding: 10,
        backgroundColor: "rgba(0,0,0,0)",
        flexDirection: 'row',
        alignItems: 'center'
    },
    itemContainer: {
        //alignItems: 'center'
    },
    billImage: {
        marginRight: 10,
        height: 100,
        width: '30%'
    },
    textContainer: {
        width: '70%'
    },
    buttonView:{
        flexDirection: 'row',
       // justifyContent: 'space-evenly'
    },
    billName: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold'

    },
    billDescription: {
        color: '#303030',
        fontSize: 15,
        fontStyle: 'italic',

    },
    button: {
        padding: 5,
        paddingLeft: 20,
        paddingRight: 20
    },
});

const mapStateToProps = state => {
    return {
        isLoading: state.ui.isLoading,
        searchBill: state.bills.searchBill
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onDeleteBill: (key) => dispatch(deleteBill(key)),
        onUpdateBill: (key,billName, amount, dueDate, owner, sharedUsers, paid) => dispatch(updateBill(key, billName, amount, dueDate, owner, sharedUsers, paid))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(billListItem);

