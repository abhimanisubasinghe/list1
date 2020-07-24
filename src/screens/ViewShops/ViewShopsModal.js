import React, {Component}  from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions, } from 'react-native'
import {connect} from 'react-redux'

import {getShops, searchShop, stopSearchShop} from '../../store/actions/index'
import ShopList from '../../components/ShopListModal/ShopListModal'
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput'

class ViewShopsModal extends Component  {

    state ={
        shopsLoaded: false ,
        removeAnimation: new Animated.Value(1),
        shopsAnim: new Animated.Value(0),
        search: ''
     }
 
     componentDidMount(){
         console.log('loading')
         this.props.onLoadShops()
         this.props.onStopSearchShops()
        console.log('in shop', this.props)   
     }

     handleChange = (val) => {
        this.props.onSearchShops(val);
      } 

 
     shopsLoadedHandler = () => {
         Animated.timing(this.state.shopsAnim, {
             toValue: 1,
             duration: 500,
             useNativeDriver: true
         }).start();
     }
 
     shopsSearchHandler = () => {
         Animated.timing(this.state.removeAnimation, {
             toValue: 0,
             duration: 500,
             useNativeDriver: true
         }).start(() => {
             this.setState({
                 shopsLoaded: true
             })
             this.shopsLoadedHandler();
         });
 
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
             <TouchableOpacity onPress={this.shopsSearchHandler}>
                 <View style={styles.searchButton}>
                     <Text style={styles.searchButtonText}>My Shops</Text>
                 </View>
             </TouchableOpacity>
             </Animated.View>
         )
 
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
                    if(data.location != null){
                        
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

        

        let shop = this.props.searchShop.trim().toLowerCase();
        //console.log('search shop',shop)
        if (shop.length > 0) {
        shops = shops.filter(item => item.name.toLowerCase().match(shop));
        }

        console.log('loading shops', shops)

         if(this.state.shopsLoaded){
             content = (
                 <Animated.View style={{
                     opacity: this.state.shopsAnim
                 }}>
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
                 </Animated.View>
             )
         }
         
         return ( 
             <View 
             style= {this.state.shopsLoaded ? null : styles.buttonContaier}
             >
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