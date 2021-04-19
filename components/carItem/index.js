import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { Button } from '../Button';
import { styles } from './styles';

export const CarItem = () => {
    return (
    <View style={styles.carContainer}>
        <ImageBackground 
          source={require('../../assets/images/ModelS.jpeg')} style={styles.image} 
        />

        <View style={styles.titles}>
          <Text style={styles.title}>Model S</Text>
          <Text style={styles.subtitle}>Starting at €50.000</Text>
        </View>

        <Button 
            type='primary'
            content={'Custom Order'}
            onPress={() => console.warn('pressed co')}            
         />
        <Button 
            type='secondary'
            content={'Existing Inventory'}
            onPress={() => console.warn('pressed ei')}            
         />
    </View>
    )
};