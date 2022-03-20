import React from 'react'
import {Calendar as CustomCalendar, LocaleConfig}  from 'react-native-calendars'
import {Feather} from '@expo/vector-icons'
import { useTheme } from 'styled-components';
import { generateInterval } from './GenerateInterval';
import { DateCallbackHandler } from 'react-native-calendars';

LocaleConfig.locales['pt-br'] ={
  monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
  monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', "Ago", 'Set', "Out", "Nov", "Dez"],
  dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', "Sexta", 'Sábado'],
  dayNamesShort: ['Dom', 'Seg', "Ter", "Qua", 'Qui', 'Sex', "Sab"],
}

LocaleConfig.defaultLocale = 'pt-br'

interface MarkedDateProps{
  [date:string]:{
    color: string,
    text: string,
    disabled?: boolean,
    disableTouchEvent?: boolean
  }
}
interface DayProps{
  dateString: string,
  day: number,
  month: number,
  timestamp: number,
  year: number
}
interface CalendarProps{
  markedDates: MarkedDateProps,
  onDayPress: DateCallbackHandler
}

function Calendar({markedDates, onDayPress}: CalendarProps){
  const theme = useTheme()
 return(
      <CustomCalendar
        renderArrow={(direction) => 
          <Feather 
          size={24} 
          color={theme.colors.text}
          name={direction === 'left' ? "chevron-left" : 'chevron-right'}
          />
        }
        headerStyle={{
          backgroundColor: theme.colors.background_secondary,
          borderBottomWidth: 0.5,
          borderBottomColor: theme.colors.text_detail,
          paddingBottom: 10,
          marginBottom: 10 ,
        }}

        theme={{
          textDayFontFamily: theme.fonts.primary_400,
          textDayHeaderFontFamily: theme.fonts.primary_500,
          textDayHeaderFontSize: 10,
          arrowStyle:{
            marginHorizontal: -15
          }
        }}
        markingType="period"
        markedDates={markedDates}
        onDayPress={onDayPress}
      />

  );
}

export {
  Calendar,
  MarkedDateProps,
  DayProps,
  generateInterval
}