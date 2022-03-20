import React from 'react'
import LogoSvg from '../../assets/logo_background_gray.svg'
import DoneSvg from '../../assets/done.svg'
import { StatusBar, useWindowDimensions } from 'react-native'
import { ConfirmButton } from '../../components/ConfirmButton'
import { useNavigation } from '@react-navigation/native'
import{
Container,
Content,
Title,
Menssage,
Footer
} from './styles'

export function SchedulingComplete(){
  const {width} = useWindowDimensions()
  const navigation = useNavigation()

  function handleSchedulingHome(){
    console.log('a');
    navigation.navigate('Home')
   
    
  }
 return(
    <Container>
      <StatusBar
        barStyle={'light-content'}
        translucent
        backgroundColor={'transparent'}
      />
      <LogoSvg width={width}/>
      <Content>
        <DoneSvg width={80} height={80}/>
        <Title>Carro Alugado!</Title>

        <Menssage>
          Agora você só precisa ir{'\n'}
          até a concessionária da RENTX{'\n'}
          pegar seu automóvel.{'\n'}
        </Menssage>
      </Content>
      <Footer>
        <ConfirmButton title='OK' onPress={handleSchedulingHome}/>
      </Footer>
    </Container>
  );
}