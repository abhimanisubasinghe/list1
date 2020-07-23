import React, {Component}  from 'react'
import {View, Text, StyleSheet, Platform, Button} from 'react-native'
import { Content, DatePicker, Container, Header, Left, Body, Right, Title, Subtitle ,  } from 'native-base';
import { ColorPicker } from 'react-native-color-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DefaultInput from '../UI/DefaultInput/DefaultInput';
import DefaultButton from '../UI/DefaultButton/DefaultButton';
import DateTimePicker from '@react-native-community/datetimepicker';
import {connect} from 'react-redux';
import {addBill, startAddBill, getUserBills} from '../../store/actions/index'

class UtilityForm extends Component {

    state = {
        date: new Date(),
        mode: 'date',
        show: false,
        billName: '',
        amount: ''
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

    reset = () => {
        this.setState({
            date: new Date(),
            mode: 'date',
            show: false,
            billName: '',
            amount: 0
        })
    }

    componentDidMount(){
        this.reset()
    }

    submitHandler = () => {
        if(this.state.billName && this.state.amount && (this.state.date >= new Date())){
            this.props.onAddBill(this.state.billName, this.state.amount, this.state.date, this.props.email)
            this.reset()
            console.log(this.props.bills)
            console.log('pass')
        }
        else{
            alert('Validation error')
        }
        
    }
    

    render(){
        const year = this.state.date.getFullYear()
        const month = this.state.date.getMonth()
        const date = this.state.date.getDate()
        const day = this.state.date.getDay()
        let dayName
        switch(day){
            case 0:
                dayName = 'SUNDAY'
                break;
            case 1:
                dayName = 'MONDAY'
                break;
            case 2:
                dayName = 'TUESDAY'
                break;
            case 3:
                dayName = 'WEDNESDAY'
                break;
            case 4:
                dayName = 'THURSDAY'
                break;
            case 5:
                dayName = 'FRIDAY'
                break;
            case 6:
                dayName = 'SATURDAY'
                break;        
            default:
                dayName = ''
                break;
        }
        return(
            <View style={styles.form}>
                <Text style={styles.header}> Add a new bill </Text>
                <DefaultInput
                    placeholder = 'Enter your bill name'
                    style = {styles.inputStyle}
                    value = {this.state.billName}
                    onChangeText = {this.onChangeBillName}
                />
                <DefaultInput
                    placeholder = 'Amount to be paid'
                    style = {styles.inputStyle}
                    value = {this.state.amount}
                    onChangeText = {this.onChangeAmount}
                />
                <DefaultButton 
                color='black'
                onPress={() => this.showDatepicker()}
                >
                    <Text>select due date: {year}/{month}/{date} {dayName} </Text>
                </DefaultButton> 
                <DefaultButton 
                color='green'
                onPress={this.submitHandler}
                >
                    Add
                </DefaultButton>       
                {this.state.show && (
                    <DateTimePicker
                    testID="dateTimePicker"
                    value={this.state.date}
                    mode={this.state.mode}
                    is24Hour={true}
                    display="default"
                    onChange={this.onChange}
                    />
                )}
            </View>    
        )
    }
}

const styles = StyleSheet.create({
    form: {
        width: '95%',
        height: 250,
        justifyContent: 'center',
        //alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)',
        padding: 10,
        paddingLeft: 20
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
    }
})

const mapStateToProps = state => {
    return {
        isLoading: state.ui.isLoading,
        billAdded: state.bills.billAdded,
        bills: state.bills.bills,
        email: state.users.loggedUserEmail,
        userName: state.users.loggedUserName,
        contactNumber: state.users.loggedUserContactNumber,
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onAddBill: (billName, amount, dueDate, userEmail) => dispatch(addBill(billName, amount, dueDate, userEmail)),
        onStartAddBill: () => dispatch(startAddBill()),
        onLoadBills: () => dispatch(getBills()),
        onLoadUserBills: (email) => dispatch(getUserBills(email))
    }
}

//export default UtilityForm;
export default connect(mapStateToProps, mapDispatchToProps) (UtilityForm);