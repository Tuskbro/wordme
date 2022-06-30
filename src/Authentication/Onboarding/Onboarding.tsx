import { StyleSheet, Text, View,  Image, FlatList,Dimensions, Animated  } from 'react-native'

import React, { useRef } from 'react'
import {OnboardingSlides as DATA} from '../../../assets/data/OnboardingSlides'

import { Routes, StackNavigationProps } from '../../components/Navigation';
import { useSelector } from 'react-redux';
import { SlideIndicator ,Backdrop, Square, Button } from '../../components';
import { StatusBar } from 'expo-status-bar';

import { ScrollView } from 'react-native-gesture-handler';
const {width,height} = Dimensions.get('window');

export default function Onboarding ({navigation}: {navigation:StackNavigationProps<Routes,"Onboarding">}) {
    const theme : ITheme = useSelector((state: RootState)=>state.themeReducer.theme );
    const styles = getStyles(theme);
    const scrollRef = useRef<ScrollView>(null); 

    const scrollX =useRef(new Animated.Value(0)).current;
  return (
    <View style={styles.container}>
      
      <Backdrop  scrollX={scrollX} DATA={DATA}/>
      <Square scrollX={scrollX}/>
      <Animated.ScrollView
        
        ref={scrollRef}
        horizontal
        
        snapToInterval={width} 
        decelerationRate={0.6}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={20}
        onScroll={Animated.event(
          [{
            nativeEvent: {
              contentOffset: {
                x: scrollX,
              },
            },
           
          }],
        
          { useNativeDriver: false, },
        )}
        bounces={false}
        
      >
         {DATA.map(({title,img,subtitle},index)=>{
           const last=index===DATA.length-1;
         return(
            
            <View style={{width: width, paddingHorizontal: 20, alignItems: 'center', justifyContent: 'center', }}
            key={index}>
              <View style={{justifyContent: 'center', flex: 0.55,  }}>
                <Image
                  source={{uri: img}}
                  style={styles.image}
                />      
              </View>

              <View style={{flex:0.3, marginTop:15}}>
                <SlideIndicator scrollX={scrollX} DATA={DATA}/>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subtitle}>{subtitle}</Text>
              </View>
              <View style={[styles.buttonContainer,{}]}>
              <Button 
                label={last ? "Давайте начнем ": "Далее "+`→`} 
                variant={last? "primary": "default"}
                onPress={
                  ()=>{  
                    if (last){
                      navigation.navigate("Welcome");
                    }
                    else{
                    scrollRef.current?.scrollTo({x: width*(index+1), animated:true});
                    }
                  }
                }  
                />
                  
                
              </View>
            </View>
         
          )})}
        </Animated.ScrollView>
          
       
    </View>
  )
}

const getStyles = (theme : ITheme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.backgroundColor,
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    image:{
        width: width*0.7,
        height: width*0.7,
        resizeMode: 'contain',
        
        
    },
    title:{
      fontFamily: theme.Semibold,
      fontSize: theme.title,
      color: theme.textColor, 
      textAlign: 'center',
    },
    subtitle:{
      fontFamily: theme.Regular,
      fontSize: theme.subtitle,
      color: theme.textColor,
      textAlign: 'center',
    },
    buttonContainer:{
        justifyContent: 'center',
        flex: 0.15,
        alignItems: 'center',
       
        flexDirection:'row',
       
    }
})