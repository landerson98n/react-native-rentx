import styled from 'styled-components/native'
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
export const Container = styled.View`
  flex: 1;
  align-items: center ;
  background-color: ${({theme}) => theme.colors.background_primary} ;
 `; 

export const Header = styled.View`
width: 100% ;
height: 300px ;
background-color: ${({theme}) => theme.colors.header} ;
justify-content: center ;
padding: 25px ;
padding-top: ${getStatusBarHeight()+10}px;
`; 

export const Title = styled.Text`
color: ${({theme}) => theme.colors.shape} ;
font-family: ${({theme}) => theme.fonts.secondary_600} ;
font-size: ${RFValue(34)}px ;

margin-top: 24px ;
`; 

export const SubTitle = styled.Text`
color: ${({theme}) => theme.colors.shape} ;
font-family: ${({theme}) => theme.fonts.secondary_400} ;
font-size: ${RFValue(15)}px ;

margin-top: 24px ;
`; 

export const Content = styled.View`
  flex: 1 ;
  width: 100% ;
  padding: 0 16px ;
`; 
export const Appointments = styled.View`
  width: 100% ;
  flex-direction: row ;
  justify-content: space-between ;
  align-items: center ;
  padding: 24px 0 ;
`; 
export const AppointmentsTitle = styled.Text`
  color: ${({theme}) => theme.colors.text} ;
  font-family: ${({theme}) => theme.fonts.primary_400} ;
  font-size: ${RFValue(15)}px ;
`; 
export const AppointmentsQuantity = styled.Text`
  color: ${({theme}) => theme.colors.title} ;
  font-family: ${({theme}) => theme.fonts.primary_500} ;
  font-size: ${RFValue(15)}px ;
`; 
