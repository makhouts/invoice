import React from 'react'
import { View, Text, Pressable } from 'react-native';
import { Styles } from './styles';


export const Button = (props) => {

    const {type, content, onPress} = props;

    const backgroundColor = type === 'primary' ? '#171A20CC' : '#FFFFFFA6';
    const textColor = type === 'primary' ? '#FFFFFF' : '#171A20';

    return (
        <View style={Styles.container}>
            <Pressable
                style={[Styles.button, {backgroundColor: backgroundColor}]}
                onPress={() => onPress()}
            >
                <Text style={[Styles.text, {color: textColor}]}>{content}</Text>
            </Pressable>
        </View>
    );
};
