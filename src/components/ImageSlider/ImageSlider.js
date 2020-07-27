import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
 
import { SliderBox } from "react-native-image-slider-box";
import FastImage from "react-native-fast-image"

import product from '../../assets/product.jpg'
import location from '../../assets/location.jpg'
import list from '../../assets/list.jpg'
import bill from '../../assets/bill.jpg'
import share from '../../assets/share.png'
import shopping from '../../assets/shopping.png'
 
export default class ImageSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [
        product,
        location,
        list,
        bill,
        share,
        require('../../assets/shopping.png'),
      ]
    };
  }

  imageClickedHandler = (index) => {
        if(index == 0){
            this.props.nav.navigate('Products')
        }
        else if(index == 1){
            this.props.nav.navigate('Shops')
        }
        else if(index == 2){
            this.props.nav.navigate('ShoppingList')
        }
        else if(index == 3){
            this.props.nav.navigate('UtilityBills')
        }
        else if(index == 4){
            this.props.nav.navigate('ShoppingList')
        }
        else{
            this.props.nav.navigate('Home')
        }
  }
 
  render() {
      //console.log('props',this.props)
    return (
      <View style={styles.container}>
        <SliderBox
            ImageComponent={FastImage}
            images={this.state.images}
            sliderBoxHeight={200}
            onCurrentImagePressed={index => this.imageClickedHandler(index)}
            dotColor="#FFEE58"
            inactiveDotColor="#90A4AE"
            paginationBoxVerticalPadding={20}
            autoplay
            circleLoop
            resizeMethod={'resize'}
            resizeMode={'cover'}
            paginationBoxStyle={{
              position: "absolute",
              bottom: 0,
              padding: 0,
              alignItems: "center",
              alignSelf: "center",
              justifyContent: "center",
              paddingVertical: 10
            }}
            dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 5,
              marginHorizontal: 0,
              padding: 0,
              margin: 0,
              backgroundColor: "rgba(128, 128, 128, 0.92)"
            }}
            ImageComponentStyle={{borderRadius: 15, width: '97%', marginTop: 5}}
            imageLoadingColor="#2196F3"
          images={this.state.images}
          onCurrentImagePressed={index => this.imageClickedHandler(index)
          }
        />
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    //justifyContent: 'flex-end'
  }
});