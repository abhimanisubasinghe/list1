import React, {Component}  from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native'
import {connect} from 'react-redux'
import {getProducts} from '../../store/actions/index'
//import ProductList from '../../components/ProductList/ProductList'
import ProductList from '../../components/ProductList/ProductList'
//import ProductListItem from '../../components/'

import ProductDetails from '../ProductDetails/ProductDetails'

class ViewProduct extends Component  {

    state ={
        productsLoaded: false ,
        removeAnimation: new Animated.Value(1),
        productsAnim: new Animated.Value(0)
     }
 
     componentDidMount(){
         console.log('loading')
         this.props.onLoadProducts()
         
     }
 
    //  componentWillUpdate(){
    //      this.props.onLoadProducts()
    //  }
 
     productsLoadedHandler = () => {
         Animated.timing(this.state.productsAnim, {
             toValue: 1,
             duration: 500,
             useNativeDriver: true
         }).start();
     }
 
     productsSearchHandler = () => {
         Animated.timing(this.state.removeAnimation, {
             toValue: 0,
             duration: 500,
             useNativeDriver: true
         }).start(() => {
             this.setState({
                 productsLoaded: true
             })
             this.productsLoadedHandler();
         });
 
     }
 
     itemSelectedHandler = key => {
 
        //  const selectedProduct = this.props.products.find(product => {
        //      return product.key === key;
        //  })
 
        //  this.props.navigation.navigate('ProductDetails',{
        //      selectedProduct: selectedProduct,
        //      title: selectedProduct
        //  })
     }
 
     render() {
          
         let content = (
             <Animated.View
             style={{
                 opacity: this.state.removeAnimation,
                 transform:[
                     {
                         scale: this.state.removeAnimation.interpolate({
                             inputRange: [0,1],
                             outputRange: [12, 1]
                         })
                     }
                 ]
             }}
             >
             <TouchableOpacity onPress={this.productsSearchHandler}>
                 <View style={styles.searchButton}>
                     <Text style={styles.searchButtonText}>My Products</Text>
                 </View>
             </TouchableOpacity>
             </Animated.View>
         )
 
         if(this.state.productsLoaded){
             content = (
                 <Animated.View style={{
                     opacity: this.state.productsAnim
                 }}>
                     <ProductList
                     products={this.props.products}
                     onItemSelected={this.itemSelectedHandler}
                     />
                 </Animated.View>
             )
         }
         
         return ( 
             <View 
             style= {this.state.productsLoaded ? null : styles.buttonContaier}
             >
                 {/* <ProductList 
                 products={this.props.products}
                 onItemSelected={this.itemSelectedHandler}
                 /> */}
                 {content}
             </View>
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
         products: state.products.products
     }
 }
 
 const mapDispatchToProps = dispatch => {
     return {
         onLoadProducts: () => dispatch(getProducts())
     }
 }
 
 export default connect(mapStateToProps, mapDispatchToProps)(ViewProduct);

//export default ViewProduct;