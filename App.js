import * as React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

import Auth from './src/screens/Auth/Auth'
import MyDrawer from './src/screens/SideDrawer/SideDrawer'
import AddProduct from './src/screens/AddProduct/AddProduct'

const RootStack = createStackNavigator();

class App extends React.Component {

  render(){
    return(
      <NavigationContainer>
        <RootStack.Navigator headerMode='none'>
        
        <RootStack.Screen
          name='Login'
          component={Auth}
          />
        <RootStack.Screen
          name='Drawer'
          component={MyDrawer}
          />
        <RootStack.Screen
          name='ShareProduct'
          component={AddProduct}
          />
          
          
        </RootStack.Navigator>  
      </NavigationContainer>  
    )
  }
  
}

export default App;