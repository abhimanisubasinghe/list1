import React, {Component}  from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions, ScrollView } from 'react-native'
import {connect} from 'react-redux'

import {getShops, searchShop, stopSearchShop} from '../../store/actions/index'
import ShopList from '../../components/ShopListModal/ShopListModal'
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput'

class ViewShopsModal extends Component  {

    state ={
        shopsLoaded: false ,
        search: ''
     }
 
     componentDidMount(){
         console.log('loading')
         this.props.onLoadShops()
         this.props.onStopSearchShops()
        //console.log('in shop', this.props)   
     }

     handleChange = (val) => {
        this.props.onSearchShops(val);
      } 
 
 
     render() {
          
 
        let shops = this.props.shops
        //console.log('testing', this.state.search)
        let selectedShops = this.props.selectedShops

        console.log('selected shops', selectedShops)

        let only = []

        let len = selectedShops.length

        shops = shops.filter((item) =>  {
            let count = 0
            return selectedShops.filter((data)=> {
                console.log(data.key, item.key)
                let flag = (data.key != item.key)
                console.log(flag)
                if(flag){
                    if(data.location !== null){
                        
                        count ++
                    }
                    
                }
                if(count == len){
                    let temp = only.concat(item)
                    only = temp
                }
                return data.key  == item.key
            })
          })

        console.log('only', only)

        if(selectedShops.length != 0){
            shops = only
        }

        

        let shop = this.props.searchShop.trim();
        //console.log('search shop',shop)
        if (shop.length > 0) {
        shops = shops.filter(item => item.name.toLowerCase().match(shop));
        }

        console.log('loading shops', shops)
         
         return ( 
            <ScrollView>
                <View style={{alignItems: 'center'}}>
                    <DefaultInput
                        placeholder = 'search'
                        style = {{
                            borderColor: 'black',
                            width: '90%'
                        }}
                        value={this.props.searchShop}
                        onChangeText={this.handleChange}
                    />
                </View>
                <ShopList
                     shops={shops}
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
         shops: state.shops.shops,
         searchShop: state.shops.searchShop,
         email: state.users.loggedUserEmail,
        userName: state.users.loggedUserName,
        contactNumber: state.users.loggedUserContactNumber,
     }
 }
 
 const mapDispatchToProps = dispatch => {
     return {
         onLoadShops: () => dispatch(getShops()),
         onSearchShops: (val) => dispatch(searchShop(val)),
         onStopSearchShops: () => dispatch(stopSearchShop())
     }
 }
 
 export default connect(mapStateToProps, mapDispatchToProps)(ViewShopsModal);

//export default ViewShops;