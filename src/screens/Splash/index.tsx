import React, {useEffect} from 'react'
import BradSvg from '../../assets/brand.svg'
import LogoSvg from '../../assets/logo.svg'
import Animated, {useSharedValue, useAnimatedStyle, withTiming, interpolate, runOnJS} from 'react-native-reanimated'
import{
Container,
} from './styles'
import { useNavigation } from '@react-navigation/native'

export function Splash(){
  const logoAnimation = useSharedValue(0)
  const navigation = useNavigation()
  const brandStyle = useAnimatedStyle(()=>{
    return {
      opacity: interpolate(logoAnimation.value, 
        [0,25,50],
        [1,.3,0],
        ),  
    }
  })
  const logoStyle = useAnimatedStyle(()=>{
    return {
      opacity: interpolate(logoAnimation.value, 
        [0,25,50],
        [0,.3,1],
        ), 
    }
  })

  function startApp(){
    navigation.navigate('Home')
  }

  useEffect(()=>{
    logoAnimation.value = withTiming(
      500,
      {duration: 5000},
      () =>{
        'worklet'
        runOnJS(startApp)()
      }
    )
  })

 return(
    <Container>
      <Animated.View style={brandStyle}>
        <BradSvg width={80} height={50}/>
      </Animated.View>
      <Animated.View style={logoStyle}>
        <LogoSvg width={180} height={20}/>
      </Animated.View>
    </Container>
  );
}