import * as React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

import Auth from './src/screens/Auth/Auth'
import MyDrawer from './src/screens/SideDrawer/SideDrawer'

const RootStack = createStackNavigator();

function App() {
  return(
    <NavigationContainer>
      <RootStack.Navigator headerMode='none'>
       
        <RootStack.Screen
        name='Drawer'
        component={MyDrawer}
        />
        <RootStack.Screen
        name='Login'
        component={Auth}
        />
      </RootStack.Navigator>  
    </NavigationContainer>  
  )
}

export default App;