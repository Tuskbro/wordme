import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import {  useSelector } from 'react-redux';
import {Button, Container} from '../../components';
import SocialLogin from '../../components/SocialLogin';
import { StackNavigationProps, Routes } from '../../components/Navigation';
import { Formik } from 'formik';
import {CheckBox,TextInput} from '../../components';
import * as Yup from 'yup';
import YupPassword from 'yup-password';
YupPassword(Yup);



const SignUpSchema = Yup.object().shape({
  password: Yup.string()
    .required('No password provided.') 
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .minLowercase(1, 'password must contain at least 1 lower case letter')
    .minUppercase(1, 'password must contain at least 1 upper case letter')
    .minNumbers(1, 'password must contain at least 1 number')
    .minSymbols(1, 'password must contain at least 1 special character')
    .max(32, 'Too Long!'), 
  email: Yup.string().email('Invalid email').required('Required'),
});

export default function Login({navigation}: {navigation:StackNavigationProps<Routes,"Login">}) {
    const theme : ITheme = useSelector((state: RootState)=>state.themeReducer.theme );
  const styles = getStyles(theme);
  
  return (
    <Container  footer={
      <SocialLogin  label='Don`t have an account? '
        button={
          <Button 
            label='Sign Up here'
            variant='link'
            width={100}
            onPress={()=>{  
              navigation.navigate("SignUp");
              }
            }
          />
        }
      />
      }>
      <View style={styles.container}>
        <View style={{  alignItems: 'center', marginVertical: 25 }}>
          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.article}> Use your credentials below and login to your account</Text>
        </View>
        <Formik
          validationSchema={SignUpSchema}
          initialValues={{ email: "", password: "" }}
          onSubmit={values => console.log(values)}
          
        >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View>
        <View>
          <TextInput 
            placeholder='Enter your email' 
            icon='envelope' 
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
            error={errors.email}
            touched={touched.email}
          />

          
          <TextInput 
            placeholder='Enter your password' 
            icon='lock' 
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            error={errors.password}
            touched={touched.password}
            
          />
        </View>
        
        
        <View style={{flexDirection: 'row' , justifyContent: 'space-between', alignItems: 'center', }}>
          <CheckBox label='Remember me' isChecked={false}/>
          <Button 
            label='Forgot password?'
            variant='link'
            width={150}
            onPress={()=>{  
              navigation.navigate("PasswordRecover");
              }
            }
          />
        </View>
        <View style={{flexDirection: 'row' , justifyContent: 'center', alignItems: 'center', }}>
        <Button 
            label='Log in to your account'
            variant='primary'
            width={250}
            onPress={
              handleSubmit 
              
              }
            
          />
        </View>
        </View>
        )}</Formik>
      </View>
    </Container>
    
  )
}

const getStyles = (theme : ITheme) => StyleSheet.create({
    container:{
        //flex: 1,
        //backgroundColor: theme.backgroundColor,
        marginHorizontal: 25
    },
    title:{
      fontFamily: theme.Bold,
      fontSize: theme.hero/2,
      color: theme.textColor,
      marginVertical: 15
    },
    article:{
      fontFamily: theme.Regular,
      fontSize: theme.subtitle,
      color: theme.textColor,
      textAlign:'center'
    },
    
    
})