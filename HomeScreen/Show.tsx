import { firebase } from '@react-native-firebase/database';
import React, { useState } from 'react';
import { Alert, Button, Text, View } from 'react-native';

const Show = ({ navigation }: { navigation: any }): React.JSX.Element => {
    const getData = () => {
        // firebase.database().ref(`task/`).on('value', snapshot => {
        //     let responselist = Object.values(snapshot.val())
        //     console.log(snapshot.val())
        //     Alert.alert(""+snapshot.val)
        // });
        firebase.database()
            .ref('task/')
            .once('value')
            .then(snapshot => {
                console.log('User data: ', snapshot.val());
            });
    }
    return (
        <View>
            <Text style={{color:'black'}}>
                getData()
            </Text>
            <Button title='tedt' onPress={()=>getData()}></Button>

        </View>
    );
}
export default Show;