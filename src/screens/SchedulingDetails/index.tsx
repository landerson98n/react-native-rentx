import React, { useEffect, useState } from 'react'
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Acessory } from '../../components/Acessory';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { Button } from '../../components/Button';
import {Feather} from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native';
import{
Container,
Header,
CarImages,
Content,
Details,
Description,
Brand,
Name,
Rent,
Period,
Price,
CalendarIcon,
Acessories,
Footer,
DateInfo,
DateTitle,
DateValue,
RentalPeriod,
RentalPrice,
RentalPriceLabel,
RentalPriceQuota,
RentalPriceDetail,
RentalPriceTotal,
} from './styles'
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { format } from 'date-fns/esm';
import { GetPlatformDate } from '../../utils/getPlatformDate';
import api from '../../services/api';
import { Alert } from 'react-native';

interface RentalPeriod{
  start: string,
  end: string
}

export function SchedulingDetails(){
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod)
  const [loading, setLoading] = useState(false)
  const [enabled, setEnabled] = useState(true)
  const routes = useRoute()
  const {car, dates} = routes.params
  const theme = useTheme()
  const navigation = useNavigation()
  const rentalTotal  = Number(dates.length * car.rent.price)

  async function handleSchedulingComplete(){
    setLoading(true)
    setEnabled(false)
    try{
      
      const schedulesCar = await api.get(`/schedules_bycars/${car.id}`)

      const unavailable_dates = [
        ...schedulesCar.data.unavailable_dates,
        ...dates
      ]

      await api.post(`/schedules_byuser`,{
        user_id: 1,
        car,
      })

      await api.put(`/schedules_bycars/${car.id}`,{
        id: car.id,
        unavailable_dates,
      })
      .then(response => navigation.navigate('SchedulingComplete')) 
    }catch(error){
      Alert.alert('Não foi possível confirmar o agendamento')
      setLoading(false)
    }
  }

  function handleBack(){
    navigation.goBack()
  }

  useEffect(() => {
    setRentalPeriod({
      start : format(GetPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      end : format(GetPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy'),
    })
  }, [])

 return(
    <Container>
      <Header>
        <BackButton onPress={handleBack}/>
      </Header>
      <CarImages>
         <ImageSlider imagesUrl={car.photos}/>
      </CarImages>
      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>
          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>{`R$ ${car.rent.price}`}</Price>
          </Rent>
        </Details>
        <Acessories>
            {
             car.accessories.map(accessory =>(
                <Acessory 
                  key={accessory.type}
                  name={accessory.name} 
                  icon={getAccessoryIcon(accessory.type)}
                />
             ))
            }
        </Acessories>

        <RentalPeriod>
          <CalendarIcon>
            <Feather
              name='calendar'
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </CalendarIcon>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{rentalPeriod.start}</DateValue>
          </DateInfo>
          <Feather
              name='chevron-right'
              size={RFValue(10)}
              color={theme.colors.text}
            />
          <DateInfo>
              <DateTitle>DE</DateTitle>
              <DateValue>{rentalPeriod.end }</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetail>
            <RentalPriceQuota>R$ {car.rent.price} x {dates.length} diárias</RentalPriceQuota>
            <RentalPriceTotal>R$ {rentalTotal}</RentalPriceTotal>
          </RentalPriceDetail>
        </RentalPrice>
      </Content>
      <Footer>
        <Button 
        title="Alugar agora" 
        color={theme.colors.success} 
        enabled={enabled}
        loading={loading}
        onPress={handleSchedulingComplete}/>
      </Footer>
    </Container>
  );
}