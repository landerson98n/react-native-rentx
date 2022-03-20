import React from 'react'
import { ActivityIndicator } from 'react-native';
import theme from '../../styles/theme';
import{
Container,
Title
} from './styles'

interface Props{
  title: string,
  color?: string,
  onPress: ()=> void,
  enabled?: boolean,
  loading?: boolean 
}

export function Button({
  title,
  color,
  enabled = true,
  loading=false,
  ...rest
}: Props){
 return(
    <Container 
    {...rest} 
    color={color} 
    enabled={(enabled === false || loading === true)  ? false : true}
    style={{opacity: (enabled === false || loading === true)  ? 0.5 : 1}}
    >
      {
        loading ? <ActivityIndicator color={theme.colors.shape}/> : <Title>{title}</Title>
      }
    </Container>
  );
}