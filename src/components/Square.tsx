import { StyleSheet, Text, View, Animated, Dimensions } from 'react-native'

import React from 'react'

const {width,height} = Dimensions.get('screen')
interface SquareProps{
    scrollX:any,
}
const newHeight = height*0.85
 export default function Square({scrollX}: SquareProps) {
    const YOLO = Animated.modulo(Animated.divide(Animated.modulo(scrollX,width),new Animated.Value(width)),1);
    const rotate = YOLO.interpolate({
        inputRange: [0,0.5,1],
        outputRange: ['35deg','0deg','35deg'],
    })
    const translateX = YOLO.interpolate({
        inputRange: [0,0.5,1],
        outputRange: [0,-newHeight,0],
    })
  return (
    <Animated.View
    style={{
        width: height, 
        height: newHeight, 
        backgroundColor: '#fff',
        borderRadius: 75,
        position: 'absolute',
        top: -newHeight*0.6,
        left: -height*0.35,
        transform: [{
            rotate,
        },
        {
            translateX
        }]
    }}
    />
      
   
  )
}

const styles = StyleSheet.create({})