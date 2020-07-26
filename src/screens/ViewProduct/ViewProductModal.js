import React, {Component}  from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions, ScrollView } from 'react-native'
import {connect} from 'react-redux'
import {searchProduct, stopSearchProduct, getUserProducts} from '../../store/actions/index'
//import ProductList from '../../components/ProductList/ProductList'
import ProductList from '../../components/ProductListModal/ProductListModal'

import DefaultInput from '../../components/UI/DefaultInput/DefaultInput'

class ViewProductModal extends Component  {

    state ={
        productsLoaded: false ,
        search: ''
     }
 
     componentDidMount(){
         console.log('loading')
         //this.props.onLoadProducts()
         this.props.onLoadUserProducts(this.props.email)
         this.props.onStopSearchProduct()
         
     }

     handleChange = (val) => {
        this.props.onSearchProduct(val);
      } 
 
     render() {
          
        let products = this.props.products
        //console.log('testing', this.state.search)
        let selectedProducts = this.props.selectedProducts

        console.log('selected products', selectedProducts)

        let only = []

        let len = selectedProducts.length

        products = products.filter((item) =>  {
            let count = 0
            return selectedProducts.filter((data)=> {
                console.log(data.key, item.key)
                let flag = (data.key != item.key)
                console.log(flag)
                if(flag){
                    if(data.owner !== null){     
                        count ++
                    }
                    
                }
                else{
                    count = 0
                }
                if(count == len){
                    let temp = only.concat(item)
                    only = temp
                }
                return data.key  == item.key
            })
          })

        console.log('only', only)

        if(selectedProducts.length != 0){
            console.log('only')
            products = only
        }

        let product = this.props.searchProduct.trim().toLowerCase();
        //console.log('search shop',shop)
        if (product.length > 0) {
        products = products.filter(item => item.name.toLowerCase().match(product));
        }
 
        //products = products.filter(item => item.userId.match(this.props.userId));

       // products = products.filter(item => item.userId.filter(id => id.includes(this.props.userId)));
         
         return ( 
             <ScrollView>
                 <View style={{alignItems: 'center'}}>
                    <DefaultInput
                        placeholder = 'search'
                        style = {{
                            borderColor: 'black',
                            width: '90%'
                        }}
                        value={this.props.searchProduct}
                        onChangeText={this.handleChange}
                    />
                    </View>
                 <ProductList
                 products={products}
                 onItemSelected={this.itemSelectedHandler}
                 />
             </ScrollView>
         )
     }
 }
 
 const styles = StyleSheet.create({
     buttonContaier:{
         flex: 1,
         justifyContent: 'center',
         alignItems: 'center'
     },
     listContainer: {
 
     },
     searchButton : {
         borderColor: 'purple',
         borderWidth: 3,
         borderRadius: 50,
         padding:20
     },
     searchButtonText:{
         color: 'purple',
         fontWeight: 'bold',
         fontSize: 26
     }
 })
 
 const mapStateToProps = state => {
     return{
         products: state.products.products,
         searchProduct: state.products.searchProduct,
         email: state.users.loggedUserEmail,
         userName: state.users.loggedUserName,
         contactNumber: state.users.loggedUserContactNumber,
     }
 }
 
 const mapDispatchToProps = dispatch => {
     return {
         //onLoadProducts: () => dispatch(getProducts()),
         onSearchProduct: (val) => dispatch(searchProduct(val)),
         onStopSearchProduct: () => dispatch(stopSearchProduct()),
         onLoadUserProducts: (userId) => dispatch(getUserProducts(userId))
     }
 }
 
 export default connect(mapStateToProps, mapDispatchToProps)(ViewProductModal);

//export default ViewProduct;