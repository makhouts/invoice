import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { Button } from '../Button';
import { styles } from './styles';

export const CarItem = (props) => {

  const {name, tagLine, image} = props.car;


    return (
    <View style={styles.carContainer}>
          <ImageBackground 
            source={image} style={styles.image} 
          />

          <View style={styles.titles}>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.subtitle}>{tagLine}</Text>
          </View>

        <View style={styles.buttonsContainer}>
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

    </View>
    )
};