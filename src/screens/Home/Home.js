import React, {Component}  from 'react'
import {View, Text, StyleSheet} from 'react-native'
import { Container, Header, Left, Body, Right, Title, Subtitle , Button, ListItem , Separator} from 'native-base';
import ImageSlider from '../../components/ImageSlider/ImageSlider'
import Icon from 'react-native-vector-icons/FontAwesome5';

import {connect} from 'react-redux'
import {getUserProducts, getUserBills, getUserLists, getShops, getUsers} from '../../store/actions/index'

import HomeListView from '../../components/HomeListView/HomeListView'
import UtilityBillsView from '../../components/HomeUtilityBillView/UtilityBillsView'

class Home extends Component {

  componentDidMount() {
    let email = this.props.email
    this.props.onLoadUsers(),
    this.props.onLoadLists(email),
    this.props.onLoadBills(email),
    this.props.onLoadProducts(email),
    this.props.onLoadShops()
  }

    render(){
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