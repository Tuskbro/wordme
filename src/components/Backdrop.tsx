import { StyleSheet, Text, View, Animated, Dimensions } from 'react-native'
import React, { Children, ReactNode } from 'react'

interface BackdropProps {
    
    scrollX: any,
    DATA: any[],
}
const {width, height} = Dimensions.get('screen');
export default function Backdrop({ scrollX, DATA, }: BackdropProps) {
    const backgroundColor = scrollX.interpolate({
        inputRange: DATA.map((_,i)=> i* width),
        outputRange: DATA.map(DATA => DATA.color),
    })
  return (
    <Animated.View 
    
        style={[
            StyleSheet.absoluteFillObject,
            {
                backgroundColor,
                
            }
        ]}
    >
      
    </Animated.View>
  )
}

const styles = StyleSheet.create({})