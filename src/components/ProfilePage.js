import { StatusBar } from 'expo-status-bar';
import React, { useState, Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Button,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native';

const ProfilePage = ({ navigation }) => {
    getToken = async () => {
        try {
            const value = await AsyncStorage.getItem('private_token');
            if (value !== null) {
                // We have data!!
                console.log("async:",value);
            }
        } catch (error) {
            console.log(error);
            // Error retrieving data
        }
    };
    getToken();
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>Profile Page</Text>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '',
        display: 'flex',
        backgroundColor: '#fff',
    },

    profile_image: {
        width: 200,
        height: 200,
        borderRadius: 100,
        overflow: 'hidden',
        marginTop: 50,
        marginLeft: 100,
    },
    text: {
        top: '18.8%',
        left: '3%',
        fontSize: 15,
        fontWeight: 'bold',
        color: '#5D54A4',
        textAlign: 'left',
        left: '5%',
    },
});

export default ProfilePage;
