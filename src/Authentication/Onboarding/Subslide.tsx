import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'

import {Button} from '../../components/index';

import { useSelector,RootStateOrAny } from 'react-redux';

const {width} = Dimensions.get('window');
interface SubslideProps {
    
    last?: boolean;
    onPress: () => void;  
    
}

export default function Subslide({last, onPress}:SubslideProps) {
  const theme : ITheme = useSelector((state: RootStateOrAny)=>state.themeReducer.theme );
  const styles = getStyles(theme);
  return (
    <View style={styles.container}>
      
      <Button 
        label={last ? "Let`s get started": "Next"} 
        variant={last? "primary": "default"}
        {...{onPress}}
        />
    </View>
  )
}

const getStyles = (theme : ITheme) => StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 44,
        
    },
    subtitle:{
        fontSize: theme.title,
        lineHeight: theme.title,
        fontFamily: theme.Semibold,
        marginBottom: 12,
        color: theme.textColor,
        textAlign: 'center',

    },
    description:{
        fontSize: theme.article,
        lineHeight: theme.article,
        fontFamily: theme.Regular,
        color: theme.textColor,
        textAlign: 'center',
        marginBottom: 12,
        
    },
})