import React, {Component}  from 'react'
import {View, Text, StyleSheet, Platform, TouchableHighlight, ScrollView, TouchableOpacity, FlatList} from 'react-native'
import {  Container, Header, Content, Card, CardItem, Body, Left, Title, Subtitle, Button} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DefaultInput from '../UI/DefaultInput/DefaultInput';
import DefaultButton from '../UI/DefaultButton/DefaultButton';

import DateTimePicker from '@react-native-community/datetimepicker';
import Modal from 'react-native-modal';

import {connect} from 'react-redux';

import ViewShops from '../../screens/ViewShops/ViewShopsModal'
import ViewProduct from '../../screens/ViewProduct/ViewProductModal'

import ShopItem from './ShopItem'

import {addList, startAddList, getUserLists, getShops, getUserProducts, clearSelectedShops} from '../../store/actions/index'

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

    shopModalView = async() => {
        let temp = await this.state.shops.concat(this.props.selectedShops)
        await this.setState(prevState => {
            
            return{
                shopModalState: prevState.shopModalState ? false : true,
                shops: temp
            }
        })
        //this.props.onClearSelectedShops()
        await console.log('selected',this.state.shops)
        await this.props.onClearSelectedShops()
        await console.log('selected', this.state.shops, 'state', this.props.selectedShops)
    }

    deleteShop = (shop) => {
        console.log('in delete',shop)
        var array = [...this.state.shops]; // make a separate copy of the array
        var index = array.indexOf(shop)
        if (index !== -1) {
            array.splice(index, 1);
            this.setState({shops: array});
        }
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
        this.props.onClearSelectedShops()
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
                        <ViewShops selectedShops={this.state.shops}/>
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

        let selectedShopsView = null
        
        if(this.state.shops.length>0){
            selectedShopsView = <FlatList 
            style={styles.listContainer}
            data= {this.state.shops}
            renderItem={(info) => (
                <ShopItem 
                    shop = {info.item}
                    shopName={info.item.name} 
                    shopLocation= {info.item.location}
                    shopDescription = {info.item.description}
                    shopKey = {info.item.key}
                    onItemPressed = {() => props.onItemSelected(info.item.key)}
                    onDelete = {() => this.deleteShop(info.item)}
                />
            )}
            /> 
        }

        return(
            <View>
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
                <View>
                {selectedShopsView}
                </View>
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
                <TouchableOpacity style={styles.shopContainer}>
                    <View >
                        <Text style={styles.shopContainerText}>Shop1</Text>
                    </View>    
                    <TouchableOpacity onPress={() => alert('delete')}>
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
                
                <TouchableOpacity style={styles.shopContainer}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={styles.shopContainerText}>Product</Text>
                        <Text style={styles.quantityText}>12</Text>
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
                    
                    <TouchableOpacity onPress={() => alert('delete')}>
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
            </ScrollView>    
            </View>
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

const mapStateToProps = state => {
    return {
        isLoading: state.ui.isLoading,
        listAdded: state.lists.listAdded,
        lists: state.lists.lists,
        email: state.users.loggedUserEmail,
        userName: state.users.loggedUserName,
        contactNumber: state.users.loggedUserContactNumber,
        shops: state.shops.shops,
        products: state.products.products,
        selectedShops: state.shops.selectedShops,
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onAddList: (listName, products,shops, dueDate, userEmail) => dispatch(addList(listName, products,shops, dueDate, userEmail)),
        onStartAddList: () => dispatch(startAddList()),
        onLoadUserLists: (email) => dispatch(getUserLists(email)),
        onLoadUserProducts: (email) => dispatch(getUserProducts(email)),
        onLoadShops: () => dispatch(getShops()),
        onClearSelectedShops: () => dispatch(clearSelectedShops())
    }
}

//export default ListForm;
export default connect(mapStateToProps, mapDispatchToProps) (ListForm);