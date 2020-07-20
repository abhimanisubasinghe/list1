import React, {Component}  from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native'
import {connect} from 'react-redux'

import {getShops} from '../../store/actions/index'
import ShopList from '../../components/ShopList/ShopList'

class ViewShops extends Component  {

    state ={
        shopsLoaded: false ,
        removeAnimation: new Animated.Value(1),
        shopsAnim: new Animated.Value(0)
     }
 
     componentDidMount(){
         console.log('loading')
         this.props.onLoadShops()
         
     }
 
    //  componentWillUpdate(){
    //      this.props.onLoadShops()
    //  }
 
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
 
         if(this.state.shopsLoaded){
             content = (
                 <Animated.View style={{
                     opacity: this.state.shopsAnim
                 }}>
                     <ShopList
                     shops={this.props.shops}
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
         shops: state.shops.shops
     }
 }
 
 const mapDispatchToProps = dispatch => {
     return {
         onLoadShops: () => dispatch(getShops())
     }
 }
 
 export default connect(mapStateToProps, mapDispatchToProps)(ViewShops);

//export default ViewShops;