import React from 'react'

import{
Container,
Details,
Brand,
Name,
About,
Rent,
Periodo,
Price,
Type,
CarImage,
} from './styles'
import GasolineSvg from '../../assets/gasoline.svg'
import { getAccessoryIcon } from '../../utils/getAccessoryIcon'
import { RectButtonProps } from 'react-native-gesture-handler'
interface carData{
  brand: string,
  name: string,
  rent:{
    period: string,
    price: number
  },
  thumbnail: string
}
interface Props extends RectButtonProps{
  data: carData
}


export function Car({data,...rest}: Props){
  const MotorIcon = getAccessoryIcon(data.fuel_type)
 return(
    <Container {...rest}>
      <Details>
        <Brand>{data.brand}</Brand>
        <Name>{data.name}</Name>
        <About>
          <Rent>
            <Periodo>{data.rent.period}</Periodo>
            <Price>{`R$ ${data.rent.price}`}</Price>
            </Rent>  
            <Type>
            <MotorIcon/>
            </Type>
        </About>
      </Details>
      <CarImage resizeMode='contain' source={{uri:data.thumbnail}}/>
    </Container>
  );
}