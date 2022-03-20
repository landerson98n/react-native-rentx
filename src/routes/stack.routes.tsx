import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {CarDetails} from '../screens/CarDetails'
import {Home} from '../screens/Home'
import {Scheduling} from '../screens/Scheduling'
import {SchedulingComplete} from '../screens/SchedulingComplete'
import {SchedulingDetails} from '../screens/SchedulingDetails'
import { MyCars } from "../screens/MyCars";
import { Splash } from "../screens/Splash";
const {Navigator, Screen} = createStackNavigator()

export function StackRoutes(){
  return (
    <Navigator screenOptions={{
      headerMode: 'none',
    }}>
       <Screen
        name='Splash'
        component={Splash}
      />
      
      <Screen
        name='Home'
        component={Home}
        options={{
          gestureEnabled: false
        }}
      />
      <Screen
        name='CarDetails'
        component={CarDetails}
      />
      <Screen
        name='Scheduling'
        component={Scheduling}
      />
      <Screen
        name='SchedulingDetails'
        component={SchedulingDetails}
      />
      <Screen
        name='SchedulingComplete'
        component={SchedulingComplete}
      />

      <Screen
        name='MyCars'
        component={MyCars}
      />
    </Navigator>
  )
}

