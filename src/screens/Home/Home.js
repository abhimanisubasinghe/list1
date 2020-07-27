import React, {Component}  from 'react'
import {View, Text, StyleSheet, Animated, TouchableOpacity} from 'react-native'
import { Container, Header, Left, Body, Right, Title, Subtitle , Button, ListItem , Separator} from 'native-base';
import ImageSlider from '../../components/ImageSlider/ImageSlider'
import Icon from 'react-native-vector-icons/FontAwesome5';

import {connect} from 'react-redux'
import {getUserProducts, getUserBills, getUserLists, getShops, getUsers} from '../../store/actions/index'

import HomeListView from '../../components/HomeListView/HomeListView'
import UtilityBillsView from '../../components/HomeUtilityBillView/UtilityBillsView'

class Home extends Component {

  state ={
    homeLoaded: false ,
    removeAnimation: new Animated.Value(1),
    homeAnim: new Animated.Value(0),
    //refreshing: false
 }

  componentDidMount() {
    let email = this.props.email
    this.props.onLoadUsers(),
    this.props.onLoadLists(email),
    this.props.onLoadBills(email),
    this.props.onLoadProducts(email),
    this.props.onLoadShops()
  }

  homeLoadedHandler = () => {
    Animated.timing(this.state.homeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
    }).start();
}

homeSearchHandler = () => {
    Animated.timing(this.state.removeAnimation, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true
    }).start(() => {
        this.setState({
            homeLoaded: true
        })
        this.homeLoadedHandler();
    });

}

    render(){
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
        <TouchableOpacity onPress={this.homeSearchHandler}>
            <View style={styles.searchButton}>
                <Text style={styles.searchButtonText}>Welcome</Text>
            </View>
        </TouchableOpacity>
        </Animated.View>
    )
    if(this.state.homeLoaded){
      content = (<Animated.View style={{
        opacity: this.state.homeAnim
    }}>
      <View style={styles.imageSliderContainer}>
        <ImageSlider nav={this.props.navigation}/>
      </View>
      <Separator bordered style={styles.separator}>
        <Text style={styles.separatorHeader}>Your Shopping Lists</Text>
      </Separator>
      <HomeListView/>
      <Separator bordered style={styles.separator}>
        <Text style={styles.separatorHeader}>Your Utility Bills</Text>
      </Separator>
      <UtilityBillsView/>
      </Animated.View>)
    }

        return(
            <Container>
            <Header style={styles.header} androidStatusBarColor='black' backgroundColor='#6a3982'>
          <Left>
            <Button transparent>
              <Icon name="home" size={30} color="white" />
            </Button>
          </Left>
          <Body>
            <Title>Home</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => this.props.navigation.toggleDrawer()}>
              <Icon name="bars" size={30} color="white" />
            </Button>
          </Right>
        </Header>
              {/* <View style={styles.imageSliderContainer}>
                <ImageSlider nav={this.props.navigation}/>
              </View>
              <Separator bordered style={styles.separator}>
                <Text style={styles.separatorHeader}>Your Shopping Lists</Text>
              </Separator>
              <HomeListView/>
              <Separator bordered style={styles.separator}>
                <Text style={styles.separatorHeader}>Your Utility Bills</Text>
              </Separator>
              <UtilityBillsView/> */}
              <View 
             style= {this.state.homeLoaded ? null : styles.buttonContaier}
            //  refreshControl={
            //     <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            //   }
             >
                 {content}
             </View>
            </Container>    
        )
    }
}

const styles = StyleSheet.create({
    header:{
        color: 'purple',
        //flex: 1,

    },
    imageSliderContainer: {
      height: '30%',
      width: '100%',
      backgroundColor: '#6a3982',
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center' 
    },
    separatorHeader:{
      fontWeight: 'bold',
    },
    separatorHeaderSub:{
        fontWeight: 'bold',
        fontStyle: 'italic',
        paddingRight: 5
    },
    separator: {
        padding: 5,
        //margin: 5,
        backgroundColor: '#b997e8',
        //height: '10%'
        //borderRadius: 15
    },
    buttonContaier:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
  },
  listContainer: {
     paddingBottom: 100
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
    email: state.users.loggedUserEmail,
    userName: state.users.loggedUserName,
    contactNumber: state.users.loggedUserContactNumber,
  }
}

const mapDispatchToProps = dispatch => {
  return {
      onLoadLists: (email) => dispatch(getUserLists(email)),
      onLoadBills: (email) => dispatch(getUserBills(email)),
      onLoadUsers: () => dispatch(getUsers()),
      onLoadProducts: (email) => dispatch(getUserProducts(email)),
      onLoadShops: () => dispatch(getShops())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

//export default Home;