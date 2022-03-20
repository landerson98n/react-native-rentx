import React, { useState } from 'react';
import 'react-native-gesture-handler'
import { Routes } from './src/routes';
import {ThemeProvider} from 'styled-components'
import theme from './src/styles/theme';
import {
  useFonts,
  Archivo_400Regular,
  Archivo_500Medium,
  Archivo_600SemiBold
} from '@expo-google-fonts/archivo'

import {
  Inter_400Regular,
  Inter_500Medium
}from '@expo-google-fonts/inter'
import AppLoading from 'expo-app-loading';
import { CarDetails } from './src/screens/CarDetails';
export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_600SemiBold
  })

  if(!fontsLoaded){
    return <AppLoading/>
  }

  return (
    <ThemeProvider theme={theme}>
      <Routes/>
    </ThemeProvider>
  )

}
