import {eachDayOfInterval, format} from 'date-fns'
import { MarkedDateProps, DayProps } from '.'
import theme from '../../styles/theme'
import { GetPlatformDate } from '../../utils/getPlatformDate'
export function generateInterval(start: DayProps, end: DayProps){
  let interval: MarkedDateProps = {}

  eachDayOfInterval({start: new Date(start.timestamp), end: new Date(end.timestamp)})
  .forEach((item) =>{
    const date = format(GetPlatformDate(item), 'yyyy-MM-dd')
    interval = {
      ...interval,
      [date]:{
        color: start.dateString === date || end.dateString === date ? theme.colors.main : theme.colors.main_light,
        textColor: start.dateString === date || end.dateString === date ? theme.colors.main_light : theme.colors.main,
      }
    }
  })

  return interval
  
}