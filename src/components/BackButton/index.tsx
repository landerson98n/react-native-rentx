import React from 'react'
import {MaterialIcons} from '@expo/vector-icons'
import {useTheme} from 'styled-components'
import { BorderlessButton } from 'react-native-gesture-handler'
import{
Container,
} from './styles'

interface Props extends BorderlessButton{
  color?: string
  onProps: ()=>void
}

export function BackButton({color, onProps, ...rest}: Props){
  const theme = useTheme()
 return(
    <Container onProps={onProps}{...rest}>
      <MaterialIcons
        name='chevron-left'
        size={24}
        color={color ? color : theme.colors.text}
      />
    </Container>
  );
}