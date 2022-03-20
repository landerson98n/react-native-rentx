import React, {  } from 'react'
import SVGProps from 'react-native-svg'

import{
Container,
Name,
} from './styles'

interface Props{
  name: string,
  icon: React.FC<SVGProps>
}

export function Acessory({
  name,
  icon: Icon
}: Props){
 return(
    <Container>
      <Icon width={32} height={32}/>
      <Name>{name}</Name>
    </Container>
  );
}