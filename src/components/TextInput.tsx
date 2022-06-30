import { StyleSheet, Text, View, TextInputProps as RNTextInputProps, TextInput as RNTextInput } from 'react-native'
import React, { useState } from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { useSelector } from 'react-redux';


interface TextInputProps extends RNTextInputProps{
    placeholder: string;
    icon: string ;
    error?: string,
    touched?: boolean,
}



export default function TextInput({ icon,error,touched,  ...props }: TextInputProps) {
    const theme : ITheme = useSelector((state: RootState)=>state.themeReducer.theme );
    const styles = getStyles(theme);
    const [input,setInput] = useState("");
    
    
    const color = !touched ? "#8A8D90" : (!error ?  theme.PrimaryButtonColor : '#FF0058')

  return (
    <View style={[styles.container,{borderColor: color}]}>
      <View style={{flexDirection: 'row',alignItems: 'center' ,justifyContent:'space-between' }}>
      <FontAwesome style={styles.icon} name={icon} color={color} size={20}/>
      <RNTextInput 
        underlineColorAndroid='transparent'
        {...props}
        
      />

      </View>
      
      {!touched===false && (
          <View style={{height:20,width:20, borderRadius: 25, alignItems:'center', justifyContent:'center',}}>
              <FontAwesome 
                style={{color:color}} 
                name={(!error ? 'check' : 'close')} 
                color={"#FFFFFF"} 
                size={20}
                />
                <View/>
          </View>
          
      )} 
      
      
    </View>
  )
}

const getStyles = (theme : ITheme) => StyleSheet.create({
    container:{
        flexDirection: 'row',
        height: 50, 
        alignItems: 'center' ,
        borderWidth:1,
        borderRadius: theme.buttonBorderRadius,
        marginVertical: 10,
        justifyContent:'space-between',
        paddingHorizontal: 10,
        
    },
    icon:{
        marginHorizontal: 7,
    },

})