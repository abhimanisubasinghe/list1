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
        updateModal: false,
        date: new Date(),
        mode: 'date',
        show: false,
        billName: '',
        amount: '',
        paid: this.props.paid
    }

    billDeletedHandler = () => {   
        //const popAction = StackActions.pop(1);
        console.log(this.props.billKey)
        this.props.onDeleteBill(this.props.billKey);
        //this.props.navigation.dispatch(popAction);
    }

    updateModalView = () => {
        this.setState(prevState => {
            return{
                updateModal: prevState.updateModal ? false : true
            }
        })
    }

    updateHandler = () => {
        this.setState(prevState => {
            return{
                updateModal: prevState.updateModal ? false : true
            }
        })
        this.billUpdateHandler()
    }


    billUpdateHandler = () => {   
        const billName = (this.state.billName?this.state.billName: this.props.billName )
        const amount = (this.state.amount?this.state.amount: this.props.amount )
        const dueDate = (this.state.dueDate?this.state.dueDate: this.props.dueDate )
        this.props.onUpdateBill(this.props.billKey, billName, amount, dueDate, this.props.owner, this.props.sharedUsers, );
        this.reset()
    }

    billPaidUpdateHandler = () => {  
        const paid = true 
        const billName = (this.state.billName?this.state.billName: this.props.billName )
        const amount = (this.state.amount?this.state.amount: this.props.amount )
        const dueDate = (this.state.dueDate?this.state.dueDate: this.props.dueDate )
        this.props.onUpdateBill(this.props.billKey, billName, amount, dueDate, this.props.owner, this.props.sharedUsers, paid);
        this.reset()
    }

    reset = () => {
        this.setState({
            updateModal: false,
            date: new Date(),
            mode: 'date',
            show: false,
            billName: '',
            amount: '',
            paid: this.props.paid
        })
    }

    componentDidMount(){
        //this.reset()
        //console.log('bill ', this.props)
    }

    onChange = (event, selectedDate) => {
        this.setState(prevState => {
            return{
                ...prevState,
                show: false,
                date: selectedDate
            }
        })
      };
    
    onChangeBillName =  (val) => {
        this.setState(prevState => {
            return{
                billName: val
            }
        })
    } 

    onChangeAmount =  (val) => {
        this.setState(prevState => {
            return{
                amount: val
            }
        })
    } 
    
    showMode = currentMode => {
        this.setState(prevState => {
            return{
                ...prevState,
                show: true,
                mode: currentMode
            }
        })
    }

    showDatepicker = () => {
        this.setState(prevState => {
            return{
                ...prevState,
                mode: 'date',
                show: true
            }
        })
    }

    render(){
        let updateItem = null

        let updateButton = (
            <DefaultButton color='green' onPress= {() => this.updateHandler()}>
                  Update
            </DefaultButton>
        )

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

        console.log(this.props.dueDate)
        if(this.props.paid){
            buttonView = (
            <View style={styles.buttonView}> 
                <TouchableOpacity onPress={this.billDeletedHandler}>
                    <View style={styles.button}>
                    <Icon 
                        size= {30}
                        name="trash"
                        color="#b33434"
                        textAlign= "center"
                    />
                    </View>
                </TouchableOpacity>  
            </View>)
        }
        else{
            buttonView = (
            <View style={styles.buttonView}> 
                <TouchableOpacity onPress={this.billDeletedHandler}>
                    <View style={styles.button}>
                    <Icon 
                        size= {30}
                        name="trash"
                        color="#b33434"
                        textAlign= "center"
                    />
                    </View>
                </TouchableOpacity>  
                <TouchableOpacity onPress={() => this.updateModalView()}>
                    <View style={styles.button}>
                    <Icon 
                        size= {30}
                        name="edit"
                        color="#409456"
                        textAlign= "center"
                    />
                    </View>
                </TouchableOpacity> 
            </View>)
        }


        if(this.props.isLoading){
            content = <ActivityIndicator color='black'/>
        }

        let today = new Date()
        let tomorrow = new Date()
        tomorrow.setDate(new Date().getDate()+1)

        let bill = null

        content = <View style={styles.textContainer}>
                            <Text style={styles.billName}>{this.props.billName}</Text>
                            <Text style={styles.billDescription}>{this.props.amount}
                            </Text>
                            <Text style={styles.billDescription}>{this.props.dueDate.toString()}
                            </Text>
                        </View>            


        if(this.props.paid){
            //paid bill
            console.log('paid')
            bill = (
                <TouchableHighlight>
                    <View styles={styles.paidContainer}>
                        <View style={styles.listItem}>
                            {content}
                            {paidChecker}
                        </View>
                            {buttonView}
                    </View>

                </TouchableHighlight>
            )
        }
        else{
            if(this.props.dueDate < today){
                //overdue bill
                console.log('overdue')
                bill = (
                    <TouchableHighlight>
                        <View styles={styles.overDueContainer}>
                            <View style={styles.listItem}>
                                {content}
                                {paidChecker}
                            </View>
                                {buttonView}
                        </View>
    
                    </TouchableHighlight>
                )
            }
            else{
                if(this.state.dueDate <= tomorrow){
                    //warning bill
                    console.log('warnign')
                    bill = (
                        <TouchableHighlight>
                            <View styles={styles.warningContainer}>
                                <View style={styles.listItem}>
                                    {content}
                                    {paidChecker}
                                </View>
                                    {buttonView}
                            </View>
        
                        </TouchableHighlight>
                    )
                }
                else{
                    //normal bill
                    console.log('normal')
                    bill = (
                        <TouchableHighlight>
                            <View styles={styles.container}>
                                <View style={styles.listItem}>
                                    {content}
                                    {paidChecker}
                                </View>
                                    {buttonView}
                            </View>
        
                        </TouchableHighlight>
                    )
                }
            }
        }

        return(
            <KeyboardAvoidingView>
                <Modal isVisible={this.state.updateModal}>
                    <TouchableHighlight>
                        <Card collapsable transparent={true} style={{backgroundColor: 'rgba(255,255,255,0.1)'}}>
                            <CardItem bordered style={{backgroundColor: '#6a3982'}}>
                                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18,}} >Updating: </Text>
                                <Text style={{color: 'white',fontStyle: 'italic', fontSize: 16,}}>{this.props.billName}</Text>
                            </CardItem>
                            <CardItem bordered>
                            <Body>
                            <DefaultInput
                                placeholder= {this.props.billName}
                                onChangeText= {this.onChangeBillName} 
                                value={this.state.billName}
                                style={styles.inputField}
                                /> 
                            <DefaultInput
                                placeholder= {this.props.amount}
                                onChangeText= {this.onChangeAmount} 
                                value={this.state.amount}
                                style={styles.inputField}
                                />
                            </Body>
                            </CardItem>
                            <CardItem footer bordered>
                            {updateButton}
                            <DefaultButton color='black' onPress= {this.updateModalView}>
                                Close
                            </DefaultButton>
                            </CardItem>
                        </Card>
                    </TouchableHighlight>
                </Modal>
        
                
            {/* <TouchableHighlight onPress={() => this.modalView()}>
                 */}
            {/* <TouchableHighlight>
                <View style={
                    this.props.paid? 
                    styles.paidContainer:
                    (this.props.date <= today)?
                    styles.overDueContainer:
                    (this.props.date <= tomorrow)?
                    styles.warningContainer:
                    styles.container
                    
                    }>
                    <View style={styles.listItem}>
                        {content}     
                        {paidChecker}
                    </View>  
                        {buttonView}
                </View> 
            </TouchableHighlight> */}
            {bill}
            {updateItem}
            </KeyboardAvoidingView>
        )
    }

    
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ccc",  
        width: '95%',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        padding: 10,
        borderRadius: 25,
    },
    warningContainer: {
        backgroundColor: "#ccc",  
        width: '95%',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        padding: 10,
        borderRadius: 25,
        borderColor: 'orange',
        borderWidth: 2,
    },
    overDueContainer: {
        backgroundColor: "#ccc",  
        width: '95%',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        padding: 10,
        borderRadius: 25,
        borderColor: 'red',
        borderWidth: 2,
    },
    paidContainer:{
        backgroundColor: "#ccc",  
        width: '95%',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        padding: 10,
        borderRadius: 25,
        borderColor: 'green',
        borderWidth: 2,
    },
    listItem: {
        width: "100%",
        marginBottom: 5,
        padding: 10,
        backgroundColor: "#ccc",
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

