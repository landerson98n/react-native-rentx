import React from 'react'
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Acessory } from '../../components/Acessory';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Button } from '../../components/Button';
import Animated, {useSharedValue, useAnimatedScrollHandler, useAnimatedStyle, interpolate, Extrapolate} from 'react-native-reanimated';
import{
Container,
Header,
CarImages,
Details,
Description,
Brand,
Name,
Rent,
Period,
Price,
About,
Acessories,
Footer
} from './styles'

export function CarDetails(){
  const navigation = useNavigation()
  const route = useRoute()
  const scrollY = useSharedValue(0)
  const scrollHandler = useAnimatedScrollHandler(event =>{
    scrollY.value = event.contentOffset.y 
  })
  const {car} = route.params
  
  function handleScheduling(){
    navigation.navigate('Scheduling', {car})
  }

  function handleBack(){
    navigation.goBack()
  }

  const headerStyleAnimation = useAnimatedStyle(() => {
    return{
      height: interpolate(
        scrollY.value,
        [0, 200],
        [200, 70],
        Extrapolate.CLAMP
      )
    }
  })

  const sliderCarsStyleAnimation = useAnimatedStyle(()=>{
    return {
      opacity: interpolate(
        scrollY.value,
        [0, 150],
        [1, 0],
        Extrapolate.CLAMP
      )
    }
  })
 return(
    <Container>
      <Animated.View
        style={[headerStyleAnimation]}
      >
        <Header>
          <BackButton onPress={handleBack}/>
        </Header>
        <Animated.View style = {sliderCarsStyleAnimation}>
          <CarImages>
           <ImageSlider imagesUrl={car.photos}/>
          </CarImages>
        </Animated.View >
      </Animated.View>  
      <Animated.ScrollView
        contentContainerStyle={{
          padding: 24,
          alignItems: 'center'
        }}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
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
        <About>
          {car.about}
          {car.about}
          {car.about}
          {car.about}
        </About>
      </Animated.ScrollView>
      <Footer>
        <Button title="Escolha período do aluguel" onPress={handleScheduling}/>
      </Footer>
    </Container>
  );
}