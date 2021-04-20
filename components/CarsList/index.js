import React from 'react';
import { View, FlatList, Dimensions } from 'react-native';
import { Cars } from './cars';
import { CarItem } from '../carItem/';
import { Styles } from './styles';

export const CarsList = () => {
    return(
        <View style={Styles.container}>
            <FlatList 
                data={Cars}
                renderItem={({item}) => <CarItem car={item}/>} 
                snapToAlignment={'start'}
                decelerationRate={'fast'}
                snapToInterval={Dimensions.get('window').height} 
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};