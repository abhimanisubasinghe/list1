import React, {Component}  from 'react'
import {View, Text, StyleSheet} from 'react-native'
import { Container, Header, Left, Body, Right, Title, Subtitle , Button, } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';

class Home extends Component {
    render(){
        return(
            <View>
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
            {/* <Button transparent>
              <Icon name='search' />
            </Button>
            <Button transparent>
              <Icon name='heart' />
            </Button> */}
            <Button transparent onPress={() => this.props.navigation.toggleDrawer()}>
              <Icon name="bars" size={30} color="white" />
            </Button>
          </Right>
        </Header>
                <Text> Your Lists </Text>
            </View>    
        )
    }
}

const styles = StyleSheet.create({
    header:{
        color: 'purple'
    }
})

export default Home;