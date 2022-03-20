import React, {useEffect, useState} from 'react'
import { StatusBar } from 'react-native';
import{
Container,
Header,
TotalCars,
HeaderContent,
CarList,
MyCarsButton
} from './styles'
import { Load } from '../../components/Load';
import {Ionicons} from '@expo/vector-icons'
import Logo from '../../assets/logo.svg'
import { RFValue } from 'react-native-responsive-fontsize';
import { Car } from '../../components/Car';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import { useTheme } from 'styled-components';
import { BackHandler } from 'react-native';

export function Home(){
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)
  const navigation = useNavigation()
  const theme = useTheme()

  function handleCarDetails(car){
    navigation.navigate('CarDetails', {car})
  }

  function handleOpenMyCars(){
    navigation.navigate('MyCars')
  }

  useEffect(()=>{
    async function getCars(){
     try{
      const carData = await api.get('/cars')
      setCars(carData.data)
     }catch(error){
      console.log(error);
     }finally{
       setLoading(false)
     }
    }
    getCars()
  }, [])

  useEffect(()=>{
    BackHandler.addEventListener('hardwareBackPress', ()=>{return true})
  })

  const carData = {
    thumbnail: 'https://www.pngplay.com/wp-content/uploads/13/Audi-A5-Background-PNG-Image.png',
    brand: 'AUDI',
    name: 'RS 5 Coupé',
    rent:{
      period: 'Ao dia',
      price: 120
    },
  }
 return(
    <Container>
      <StatusBar barStyle={'light-content'}/>
      <Header>
        <HeaderContent>
          <Logo 
            width={RFValue(108)}
            height={RFValue(12)}
          />
          <TotalCars>
            {`Total de ${cars.length} carros`}
          </TotalCars>
        </HeaderContent>
      </Header>
      {loading ? <Load/> :
      <CarList
        data = {cars}
        renderItem = {({item}) => <Car data={item} onPress={() => handleCarDetails(item)}/>  }
        keyExtractor = {item => item.id}
      />
      }

      <MyCarsButton onPress={handleOpenMyCars}>
        <Ionicons 
        name='ios-car-sport'
        size={32}
        color={theme.colors.shape}
        />
      </MyCarsButton>

    </Container>
  );
}