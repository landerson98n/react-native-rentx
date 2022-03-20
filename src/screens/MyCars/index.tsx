import React, {useEffect, useState} from 'react'
import { useTheme } from 'styled-components'
import api from '../../services/api'
import { useNavigation } from '@react-navigation/native'
import { StatusBar, FlatList } from 'react-native'
import { BackButton } from '../../components/BackButton'
import { Car } from '../../components/Car'
import { Load } from '../../components/Load'
import{
Container,
Header,
Title,
SubTitle,
Content,
Appointments,
AppointmentsTitle,
AppointmentsQuantity
} from './styles'

interface CarProps{
  user_id: string,
  id: string,
  car: any,
  
}

export function MyCars(){
  const [cars, setCars] = useState<CarProps[]>([])
  const [loading, setLoading] = useState(true)
  const theme = useTheme()
  const navigation = useNavigation() 

  function handleBack(){
    navigation.goBack()
  }

  useEffect(() => {
    async function FetchCars() {
      try{
        const response = await api.get('schedules_byuser?user_id=1')
        setCars(response.data)
      }catch(error){

      }finally{
        setLoading(false)
      }
    }
    FetchCars()
  }, [])

 return(
    <Container>
      <Header>
         <StatusBar
          barStyle={"light-content"}
          translucent
          backgroundColor={'transparent'}
         />
        <BackButton onPress={handleBack} color={theme.colors.shape}/>
        <Title>
          Seus agendamentos, {'\n'}
          estão aqui.{'\n'}
        </Title>

        <SubTitle>
          Conforto, segurança e praticidade
        </SubTitle>
      </Header>
      {loading ? <Load/> :
      <Content>
        <Appointments>
          <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
          <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
        </Appointments>

      <FlatList
        data={cars}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => <Car data={item.car}/>}
      />
      </Content>
      }
    </Container>
  );
}