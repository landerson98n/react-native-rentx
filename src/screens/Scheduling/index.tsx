import React, { useState } from 'react'
import { BackButton } from '../../components/BackButton';
import { useTheme } from 'styled-components';
import  ArrowSvg from '../../assets/arrow.svg'
import { StatusBar, Alert } from 'react-native';
import { Calendar, DayProps, generateInterval, MarkedDateProps} from '../../components/Calendar';
import { useNavigation, useRoute } from '@react-navigation/native';
import{
Container,
Header,
Title,
RentalPeriod,
DateInfo,
DateTitle,
DateValue,
Content,
Footer
} from './styles'
import { Button } from '../../components/Button';
import { format } from 'date-fns/esm';
import { GetPlatformDate } from '../../utils/getPlatformDate';

interface RentalPeriod{
  start: number,
  startFormatted: string,
  end: number,
  endFormatted: string
}

export function Scheduling(){
  const route = useRoute()
  const {car}  = route.params as Params
  const theme = useTheme()
  const [lastSelectedData, setLastSelectedData] = useState<DayProps>({} as DayProps)
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod)
  const [markedDates, setmarkedDates] = useState<MarkedDateProps>({} as MarkedDateProps)
  const navigation = useNavigation()

  function handleSchedulingDetails(){
    if(!rentalPeriod.start || !rentalPeriod.end){
      Alert.alert('Selecione o intervalo para alugar')
    }else{
      navigation.navigate('SchedulingDetails',{
        car,
        dates: Object.keys(markedDates)
      })
    }
  }

  function handleBack(){
    navigation.goBack()
  }

  function handleChangeDate(day: DayProps){
    let start = !lastSelectedData.timestamp ? day : lastSelectedData
    let end = day

    if(start.timestamp > end.timestamp){
      start = end
      end = start
    }
    setLastSelectedData(end)
    const interval = generateInterval(start, end)
    setmarkedDates(interval)

    const fisrtDate=Object.keys(interval)[0]
    const endDate=Object.keys(interval)[Object.keys(interval).length - 1]

    setRentalPeriod({
      start: start.timestamp,
      end: end.timestamp,
      startFormatted : format(GetPlatformDate(new Date(fisrtDate)), 'dd/MM/yyyy'),
      endFormatted : format(GetPlatformDate(new Date(endDate)), 'dd/MM/yyyy'),
    })
  }
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
          Escolha uma {'\n'}
          data de inicio e{'\n'}
          fim do aluguel{'\n'}
        </Title>
        <RentalPeriod>
          <DateInfo>
            <DateTitle>De</DateTitle>
            <DateValue selected={!!rentalPeriod.startFormatted}>
              {rentalPeriod.startFormatted}
            </DateValue>
          </DateInfo>
          <ArrowSvg/>
          <DateInfo>
            <DateTitle>Até</DateTitle>
            <DateValue selected={!!rentalPeriod.endFormatted}>
            {rentalPeriod.endFormatted}
            </DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>
      <Content>
        <Calendar
          markedDates={markedDates}
          onDayPress={handleChangeDate}
        />
      </Content>
      <Footer>
        <Button 
        title='Confirmar' 
        onPress={handleSchedulingDetails}
        enabled={!!rentalPeriod.startFormatted}/>
      </Footer>
    </Container>
  );
}