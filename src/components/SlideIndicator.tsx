import { Dimensions, StyleSheet, Text, View, Animated } from 'react-native'
import React from 'react'

interface SlideIndicator{
  scrollX: any;
  DATA: any[];
}
const {width}= Dimensions.get('screen')
export default function SlideIndicator({DATA,scrollX}: SlideIndicator) {
  return (
    <View style={{height: 20, justifyContent: 'center', flexDirection: 'row' }}>
      {DATA.map((_,i)=>{
        const scale = scrollX.interpolate({
          inputRange: [(i-1)*width,i*width,(i+1)*width],
          outputRange: [0.8,1.4,0.8],
          extrapolate: 'clamp',
        })
        const opacity = scrollX.interpolate({
          inputRange: [(i-1)*width,i*width,(i+1)*width],
          outputRange: [0.5,1,0.5],
          extrapolate: 'clamp',
        })
        return(
          <Animated.View
          key={`indicator-${i}`}
          style={[styles.dot,{
            opacity,
            transform:[
              {
                scale,
              },
            ],
          }]}
          >

          </Animated.View>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  dot:{
    height:10,
    width: 10,
    borderRadius:5,
    backgroundColor: '#333',
    margin: 10,
  }
})