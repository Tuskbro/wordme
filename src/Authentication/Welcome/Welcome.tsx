import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import React from 'react'
import { RootStateOrAny, useSelector } from 'react-redux';

import {Button} from '../../components/index';
import { Routes, StackNavigationProps } from '../../components/Navigation';


const { width, height } = Dimensions.get('window')

export default function Welcome({navigation}: {navigation:StackNavigationProps<Routes,"Welcome">}) {
  const theme : ITheme = useSelector((state: RootStateOrAny)=>state.themeReducer.theme );
  const styles = getStyles(theme);
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image resizeMode='contain'  style={styles.image} source={{uri: "https://fatalerror.xyz/vpomoch/img/onboarding/3b3c8cbe.png", method: 'GET',}}></Image>
      </View>
      <View style={{backgroundColor: theme.backgroundColor, flex:1, }}>
      <View style={styles.content}>
        <Text style={styles.title}>Давайте начнем</Text>
        <Text style={styles.body}>Войдите в ваш аккаунт или зарегистрируйтесь чтобы присоединится</Text>
        <Button 
          label='Уже есть аккаунт? Войдите' 
          variant='primary' 
          onPress={
            ()=>{  
              navigation.navigate("Login");
            }
          }
        />

        <Button 
          label='Присоединяйтесь к нам'
          onPress={
            ()=>{  
              navigation.navigate("SignUp");
            }
          }
        />
        <Button 
          label='Забыли пароль?' 
          variant='link'
          onPress={
            ()=>{  
              navigation.navigate("PasswordRecover");
            }
          }
        />
      </View>
      </View>
    </View>
  )
}

const getStyles = (theme : ITheme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5e5bf',
  },
  imageContainer:{
    backgroundColor: theme.backgroundColor,
    flex: 1,
    alignItems: 'center',
    borderBottomRightRadius: theme.BORDER_RADIUS,

  },
  image:{
    width: width,
    height: width/0.8,
  },
  content:{
    borderTopLeftRadius: theme.BORDER_RADIUS,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#f5e5bf',
    paddingTop: 50,
    paddingHorizontal: 44,
    paddingBottom: 20,
  },
  title:{
    //marginTop: 75,
    fontFamily: theme.Bold,
    fontSize: theme.title,
  },
  body:{
    fontFamily: theme.Regular,
    fontSize: theme.article,
    textAlign: 'center'
  }
})