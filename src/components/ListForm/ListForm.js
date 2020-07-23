import React, {Component}  from 'react'
import {View, Text, StyleSheet, Platform, TouchableHighlight, ScrollView} from 'react-native'
import {  Container, Header, Content, Card, CardItem, Body, Left, Title, Subtitle, Button} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DefaultInput from '../UI/DefaultInput/DefaultInput';
import DefaultButton from '../UI/DefaultButton/DefaultButton';

import DateTimePicker from '@react-native-community/datetimepicker';
import Modal from 'react-native-modal';

import {connect} from 'react-redux';

import ViewShops from '../../screens/ViewShops/ViewShops'
import ViewProduct from '../../screens/ViewProduct/ViewProduct'

import {addList, startAddList, getUserLists, getShops, getUserProducts} from '../../store/actions/index'

class ListForm extends Component {

    state = {
        date: new Date(),
        mode: 'date',
        show: false,
        listName: '',
        products: [{product:{productName: '', imageURL: ''}, quantity:0}],
        shops: [],
        shopModalState: false,
        productModalState: false,
    }

    shopModalView = () => {
        this.setState(prevState => {
            return{
                shopModalState: prevState.shopModalState ? false : true
            }
        })
    }

    productModalView = () => {
        this.setState(prevState => {
            return{
                productModalState: prevState.productModalState ? false : true
            }
        })
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
    
    onChangeListName =  (val) => {
        this.setState(prevState => {
            return{
                listName: val
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
            listName: '',
            products: [{product:{productName: '', imageURL: ''}, quantity:0}],
            shops: [],
            shopModalState: false,
            productModalState: false,
        })
    }

    componentDidMount(){
        this.props.onLoadShops()
        this.reset()
    }

    submitHandler = () => {
        if(this.state.listName && this.state.products && (this.state.date >= new Date())){
            this.props.onAddList(this.state.listName, this.state.amount, this.state.date, this.props.email)
            this.reset()
            console.log(this.props.lists)
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

        let shopModal = null

        let shops = this.props.shops

        shopModal = <Modal isVisible={this.state.shopModalState} style={styles.modal}>
                        <Header style={styles.header} androidStatusBarColor='black' backgroundColor='#6a3982'>
                        <Left>
                            <Button transparent>
                            <Icon name="map" size={30} color="white" />
                            </Button>
                        </Left>
                        <Body>
                            <Title>Search your shop </Title>
                        </Body>
                        </Header>
                        <ViewShops/>
                        <DefaultButton  
                        color='green' 
                        onPress={this.shopModalView}
                        >
                            Add Shop
                        </DefaultButton>
                    </Modal>
            
            let productModal = null

            productModal = <Modal isVisible={this.state.productModalState} style={styles.modal}>
                                <Header style={styles.header} androidStatusBarColor='black' backgroundColor='#6a3982'>
                                <Left>
                                    <Button transparent>
                                    <Icon name="map" size={30} color="white" />
                                    </Button>
                                </Left>
                                <Body>
                                    <Title>Search your product </Title>
                                </Body>
                                </Header>
                                <ViewProduct/>
                                <DefaultButton  
                                color='green' 
                                onPress={this.productModalView}
                                >
                                    Add Product
                                </DefaultButton>
                            </Modal>

        return(
            <ScrollView keyboardShouldPersistTaps='always'>
                {shopModal}
                {productModal}
                <Text style={styles.header}> Add a new list </Text>
                <DefaultInput
                    placeholder = 'Enter your list name'
                    style = {styles.inputStyle}
                    value = {this.state.listName}
                    onChangeText = {this.onChangeListName}
                />
                <DefaultButton 
                color='black'
                onPress={() => this.showDatepicker()}
                >
                    <Text>select due date: {year}/{month}/{date} {dayName} </Text>
                </DefaultButton> 
                <DefaultButton 
                color='black'
                onPress={this.shopModalView}
                >
                    select a shop
                </DefaultButton>
                <DefaultButton 
                color='black'
                onPress={this.productModalView}
                >
                    select a product
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
            </ScrollView>    
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
        justifyContent: 'flex-start'
      },
})

const mapStateToProps = state => {
    return {
        isLoading: state.ui.isLoading,
        listAdded: state.lists.listAdded,
        lists: state.lists.lists,
        email: state.users.loggedUserEmail,
        userName: state.users.loggedUserName,
        contactNumber: state.users.loggedUserContactNumber,
        shops: state.shops.shops,
        products: state.products.products
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onAddList: (listName, products,shops, dueDate, userEmail) => dispatch(addList(listName, products,shops, dueDate, userEmail)),
        onStartAddList: () => dispatch(startAddList()),
        onLoadUserLists: (email) => dispatch(getUserLists(email)),
        onLoadUserProducts: (email) => dispatch(getUserProducts(email)),
        onLoadShops: () => dispatch(getShops())
    }
}

//export default ListForm;
export default connect(mapStateToProps, mapDispatchToProps) (ListForm);