import React, {Component}  from 'react'
import {View, Text, StyleSheet, Platform, TouchableHighlight, ScrollView, TouchableOpacity, FlatList, Dimensions} from 'react-native'
import {  Container, Header, Content, Card, CardItem, Body, Left, Title, Subtitle, Button, Accordion, Separator, List, ListItem, Right} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DefaultInput from '../UI/DefaultInput/DefaultInput';
import DefaultButton from '../UI/DefaultButton/DefaultButton';

import DateTimePicker from '@react-native-community/datetimepicker';
import Modal from 'react-native-modal';

import {connect} from 'react-redux';
import uuid  from 'react-native-uuid';

import ViewShops from '../../screens/ViewShops/ViewShopsModal'
import ViewProduct from '../../screens/ViewProduct/ViewProductModal'

import ShopItem from './ShopItem'
import ProductItem from './ProductItem'

import {addList, startAddList, getUserLists, getShops, getUserProducts, clearSelectedShops, clearSelectedProducts, updateList} from '../../store/actions/index'
import Alerts from '../Alerts/Alerts'

class ListUpdateForm extends Component {

    state = {
        date: new Date(this.props.list.dueDate),
        mode: 'date',
        show: false,
        listName: this.props.list.name,
        products: this.props.list.products,
        shops: this.props.list.shops===undefined? []: this.props.list.shops,
        shopModalState: false,
        productModalState: false,
        tempShop : '',
        tempProduct: '',
        productView: false,
        shopView: false,
        errorAlert: false,
        errorMsg: '',
        successAlert: false,
        successMsg: '',
        infoAlert:false,
        infoMsg: ''
    }

    showErrorAlert = (msg) => {
        this.setState(prevState => {
          return{
              errorMsg: msg,
              errorAlert: true
          }
        })
      }
    
      hideErrorAlert = () => {
        this.setState(prevState => {
          return{
            errorMsg: '',
              errorAlert: false
          }
        })
      }
    
    showSuccessAlert = (msg) => {
    this.setState(prevState => {
        return{
            successMsg: msg,
            successAlert: true
        }
    })
    }

    hideSuccessAlert = ()  => {
    this.setState(prevState => {
        return{
            successMsg: '',
            successAlert: false
        }
    })
    }  

    showInfoAlert = (msg) => {
        this.setState(prevState => {
            return{
                infoMsg: msg,
                infoAlert: true
            }
        })
        }
    
    hideInfoAlert = ()  => {
    this.setState(prevState => {
        return{
            infoMsg: '',
            infoAlert: false
        }
    })
    }


    shopViewHandler = () =>{
        this.setState(prevState => {
            return {shopView: prevState.shopView ? false: true} 
        })
    }

    productViewHandler = () =>{
        this.setState(prevState => {
            return {productView: prevState.productView ? false: true} 
        })
        console.log(this.state.productView)
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

    productModalView = async() => {
        //let product = this.state.selectedProducts
        
        let temp = await this.state.products.concat(this.props.selectedProducts)
        await this.setState(prevState => {
            
            return{
                productModalState: prevState.productModalState ? false : true,
                products: temp
            }
        })
        //this.props.onClearSelectedShops()
        await console.log('selected',this.state.products)
        await this.props.onClearSelectedProducts()
        await console.log('selected', this.state.products, 'state', this.props.selectedProducts)
    }

    deleteProduct = (product) => {
        console.log('in delete',product)
        var array = [...this.state.products]; // make a separate copy of the array
        var index = array.indexOf(product)
        if (index !== -1) {
            array.splice(index, 1);
            this.setState({products: array});
        }
    }

    incrementProduct = (product) => {
        console.log('in increment',product)
        var array = [...this.state.products]; 
        var index = array.indexOf(product)
        if (index !== -1) {
            console.log(array[index].quantity);
            array[index].quantity += 1 
            this.setState({products: array});
        }
    }

    reduceProduct = (product) => {
        console.log('in reduce',product)
        var array = [...this.state.products]; 
        var index = array.indexOf(product)
        if (index !== -1) {
            console.log(array[index].quantity);
            if(array[index].quantity == 1){
                //alert('product is removed')
                this.showInfoAlert('Product is removed')
                this.deleteProduct(product)
            }
            else{
                array[index].quantity -= 1 
                this.setState({products: array});
            }
            
        }
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

    onChangeShopName = (val) => {
        this.setState(prevState => {
            return{
                tempShop: val
            }
        })
    }

    shopManualAddedHandler = async() => {
        if(this.state.tempShop){
            let shop = {
                name: this.state.tempShop,
                key: uuid.v4(),
                description: 'manually added'
            }
            let temp = await this.state.shops.concat(shop)
            await this.setState(prevState => {
                
                return{
                    tempShop: '',
                    shops: temp
                }
            })
            //this.props.onClearSelectedShops()
            await console.log('selected',this.state.shops)
            //await this.props.onClearSelectedShops()
            //await console.log('selected', this.state.shops, 'state', this.props.selectedShops)
        }
        else{
            this.showErrorAlert('Enter a valid name')
        }
    }

    onChangeProductName = (val) => {
        this.setState(prevState => {
            return{
                tempProduct: val
            }
        })
    }

    productManualAddedHandler = async() => {
        if(this.state.tempProduct){
            let product = {
                name: this.state.tempProduct,
                key: uuid.v4(),
                description: 'manually added',
                quantity: 1
            }
            let temp = await this.state.products.concat(product)
            await this.setState(prevState => {
                
                return{
                    tempProduct: '',
                    products: temp
                }
            })
            await console.log('selected',this.state.products)
        }
        else{
            this.showErrorAlert('Enter a valid product name')
        }
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
            products: [],
            shops: [],
            shopModalState: false,
            productModalState: false,
            tempShop : '',
            tempProduct: '',
            productView: false,
            shopView: false,
            errorAlert: false,
            errorMsg: '',
            successAlert: false,
            successMsg: '',
            infoAlert:false,
            infoMsg: ''
        })
    }

    componentDidMount(){
        this.props.onLoadShops()
        this.props.onClearSelectedShops()
        this.props.onClearSelectedProducts()
       // this.reset()
    }

    submitHandler = () => {
        //listName, products,shops, dueDate, userEmail
        if(this.state.listName && this.state.products && (this.state.date >= new Date()) && this.state.products.length > 0){
            //this.props.list
            //key,listName, products, shops, owner, sharedUsers, done
            console.log('passing for updating ')
            const key = this.props.list.key
            const listName = this.state.listName ? this.state.listName : this.props.list.listName
            const products = this.state.products.length > 0 ? this.state.products : this.props.list.products
            const shops = this.state.shops
            const owner = this.props.list.owner
            const sharedUsers = this.props.list.sharedUsers
            const done = this.props.list.done
            const dueDate = this.state.date
            this.props.onUpdateList(key,listName, products, shops, owner, sharedUsers, done, dueDate, this.props.email)
            this.reset()
            console.log(this.props.lists)
            console.log('pass')
            this.props.onClose()
        }
        else{
            this.showErrorAlert('Validation error')
        }
        
    }
    

    render(){
        console.log(this.state.date)
        let temp = this.state.date
        const year = temp.getFullYear()
        const month =temp.getMonth()
        const date = temp.getDate()

        let shopModal = null

        let shops = this.props.shops

        shopModal = <Modal isVisible={this.state.shopModalState} style={styles.modal} keyboardShouldPersistTaps='always'>
                        <Header style={styles.header} androidStatusBarColor='black' backgroundColor='#6a3982'>
                        <Left>
                            <Button transparent>
                            <Icon name="map" size={30} color="white" />
                            </Button>
                        </Left>
                        <Body>
                            <Title>SHOPS </Title>
                        </Body>
                        <Right>
                        <TouchableOpacity>    
                        <Button transparent vertical onPress={this.shopModalView}>
                            <Icon name="check-circle" size={30} color="white" />
                            <Text style={{color: 'white', fontWeight: 'bold', fontSize:15}}>Done</Text>
                            </Button>
                        </TouchableOpacity>    
                        </Right>    
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
                                <Right>
                                <TouchableOpacity>    
                                <Button transparent vertical onPress={this.productModalView}>
                                    <Icon name="check-circle" size={30} color="white" />
                                    <Text style={{color: 'white', fontWeight: 'bold', fontSize:15}}>Done</Text>
                                    </Button>
                                </TouchableOpacity>    
                                </Right>    
                                </Header>
                                <ViewProduct selectedProducts={this.state.products}/>
                                
                                <DefaultButton  
                                color='green' 
                                onPress={this.productModalView}
                                >
                                    Add Product
                                </DefaultButton>
                            </Modal>

        let selectedShopsView = <Text style={styles.empty}>Add shops you are going to visit </Text>
        
        if(this.state.shops.length>0){
            selectedShopsView = this.state.shops.map((info) => {
                return <ShopItem 
                    shop = {info}
                    shopName={info.name} 
                    shopLocation= {info.location}
                    shopDescription = {info.description}
                    shopKey = {info.key}
                    key = {info.key}
                    onItemPressed = {() => props.onItemSelected(info.key)}
                    onDelete = {() => this.deleteShop(info)}
                />
            })
        }

        let selectedProductView = <Text style={styles.empty}>Add products to your list </Text>

        if(this.state.products.length>0){
            selectedProductView = this.state.products.map((info) => {
                return <ProductItem 
                    product = {info}
                    productName={info.name} 
                    //shopLocation= {info.item.location}
                    productDescription = {info.description}
                    productKey = {info.key}
                    key = {info.key}
                    //onItemPressed = {() => props.onItemSelected(info.item.key)}
                    onDelete = {() => this.deleteProduct(info)}
                    onAdd = {() => this.incrementProduct(info)}
                    onReduce = {() => this.reduceProduct(info)}
                    quantity = {info.quantity}
                />
            })
        }


        return(
            <ScrollView keyboardShouldPersistTaps='always'>
                {shopModal}
                {productModal}
                <Alerts alert={this.state.successAlert} onHideAlert={() => this.hideSuccessAlert()} type='success' message={this.state.successMsg} title='Success!'/>
                <Alerts alert={this.state.errorAlert} onHideAlert={() => this.hideErrorAlert()} type='error' message={this.state.errorMsg} title='Error!'/>
                <Alerts alert={this.state.infoAlert} onHideAlert={() => this.hideInfoAlert()} type='error' message={this.state.infoMsg} title='Info!'/>
                <Text style={styles.header}> Update your List </Text>
                <DefaultInput
                    placeholder = 'Enter your list name'
                    style = {styles.inputStyle}
                    value = {this.state.listName}
                    onChangeText = {this.onChangeListName}
                />
                <DefaultButton 
                color='black'
                onPress={() => this.showDatepicker()}
                style={{width: '90%'}}
                >
                    <Text>select due date: {year}/{month}/{date} </Text>
                </DefaultButton> 
                <View style={{flexDirection: 'row', justifyContent:'space-between', alignItems:'center'}}>
                <DefaultInput
                    placeholder = 'Add a shop manually'
                    style = {styles.manualInputStyle}
                    value = {this.state.tempShop}
                    onChangeText = {this.onChangeShopName}
                />
                <TouchableOpacity onPress={() => this.shopManualAddedHandler()}>
                    <View style={styles.incrementButton}>
                    <Icon 
                        size= {28}
                        name="plus-circle" 
                        color="#346da3"
                        textAlign= "center"
                    />
                    
                    </View>
                    
                </TouchableOpacity>
                </View>
                <DefaultButton 
                color='black'
                onPress={this.shopModalView}
                style={{width: '90%'}}
                >
                    select a shop
                </DefaultButton>
                <View style={{flexDirection: 'row', justifyContent:'space-between', alignItems:'center'}}>
                <DefaultInput
                    placeholder = 'Add a product manually'
                    style = {styles.manualInputStyle}
                    value = {this.state.tempProduct}
                    onChangeText = {this.onChangeProductName}
                />
                <TouchableOpacity onPress={() => this.productManualAddedHandler()}>
                    <View style={styles.incrementButton}>
                    <Icon 
                        size= {28}
                        name="plus-circle" 
                        color="#346da3"
                        textAlign= "center"
                    />
                    
                    </View>
                    
                </TouchableOpacity>
                </View>
                <DefaultButton 
                color='black'
                onPress={this.productModalView}
                style={{width: '90%'}}
                >
                    select a product
                </DefaultButton>
                <DefaultButton 
                color='green'
                onPress={this.submitHandler}
                style={{width: '90%'}}
                >
                    Update
                </DefaultButton>  
                <Separator bordered style={styles.separator}>
                    <TouchableOpacity onPress={this.shopViewHandler} style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={styles.separatorHeader}>SHOPS</Text>
                    <Text style={styles.separatorHeaderSub}>No of shops you are visiting: {this.state.shops.length}</Text>
                    </TouchableOpacity>
                </Separator>
                <View style={{width: '90%'}}>
                    {this.state.shopView ? selectedShopsView: null}
                </View>
                <Separator bordered style={styles.separator}>
                    <TouchableOpacity onPress={this.productViewHandler} style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={styles.separatorHeader}>PRODUCTS</Text>
                    <Text style={styles.separatorHeaderSub}>No of products you added: {this.state.products.length}</Text>
                    </TouchableOpacity>
                </Separator>
                <View style={{width: '100%'}}>
                    {this.state.productView ? selectedProductView: null}
                </View>

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
        width: '90%'
    },
    manualInputStyle: {
        borderColor: 'black',
        width: '80%'
    },
    modal: {
        backgroundColor: 'rgba(255,255,255,0.8)',
        //flex: 1,
        height: 500,
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
        paddingLeft: 10,
        paddingRight: 20,
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
    },
    empty:{
        fontStyle: 'italic',
        paddingLeft: 25,
        color: '#aaa'
    },
    separatorHeader:{
        fontWeight: 'bold',
    },
    separatorHeaderSub:{
        fontWeight: 'bold',
        fontStyle: 'italic',
        paddingRight: 20
    },
    separator: {
        padding: 5,
        margin: 5,
        backgroundColor: '#b997e8',
        borderRadius: 15,
        width: '90%'
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
        selectedProducts: state.products.selectedProducts
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onUpdateList: (key,listName, products, shops, owner, sharedUsers, done, dueDate, email) => dispatch(updateList(key,listName, products, shops, owner, sharedUsers, done, dueDate, email)),
        onStartAddList: () => dispatch(startAddList()),
        onLoadUserLists: (email) => dispatch(getUserLists(email)),
        onLoadUserProducts: (email) => dispatch(getUserProducts(email)),
        onLoadShops: () => dispatch(getShops()),
        onClearSelectedShops: () => dispatch(clearSelectedShops()),
        onClearSelectedProducts: () => dispatch(clearSelectedProducts())
    }
}

//export default ListUpdateForm;
export default connect(mapStateToProps, mapDispatchToProps) (ListUpdateForm);