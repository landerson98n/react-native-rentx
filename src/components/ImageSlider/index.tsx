import React, { useRef, useState } from 'react'
import { FlatList, ViewToken } from 'react-native';
import{
Container,
ImageIndex,
ImageIndexes,
CarImagerWrapper,
CarImage,
} from './styles'

interface Props{
  imagesUrl: string[]
}

interface ChangeImageProps{
  viewableItems: ViewToken[],
  changed: ViewToken[]
}

export function ImageSlider({imagesUrl}: Props){
  const [imageIndex, setImageIndex] = useState(0)

  const indexChanged= useRef((info: ChangeImageProps)=>{
    setImageIndex(info.viewableItems[0].index!)
  })

 return(
    <Container>
      <ImageIndexes>
        {
          imagesUrl.map((item, index)=>(
            <ImageIndex 
            key={String(index)}
            active={index === imageIndex}/>
          ))
        }
      </ImageIndexes>
        <FlatList
          data={imagesUrl}
          keyExtractor={key => key}
          renderItem={({item})=>
          <CarImagerWrapper>
            <CarImage
              source={{uri:item}}
              resizeMode='contain'
            />
          </CarImagerWrapper>
          }
          horizontal
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={indexChanged.current}
        />
    </Container>
  );
}