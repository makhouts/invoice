import { StyleSheet } from 'react-native';

export const Styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 50,
        zIndex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 20
    },
    logo: {
        width: 100,
        height: 20,
        resizeMode: 'contain'
    },
    menu: {
        width: 25,
        height: 25,
        resizeMode: 'contain'
    }
});