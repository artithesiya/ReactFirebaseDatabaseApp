import React, { useState, useEffect } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import database from '@react-native-firebase/database';
import { useNavigation } from '@react-navigation/native';

const Update = ({ route, navigation }: { route: any, navigation: any }): React.JSX.Element => {
    const [id, updateId] = useState("");
    const [title, updateTitle] = useState("");
    const [desc, updateDesc] = useState("");
    // Dropdown picker
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState(null);
    const [items, setItems] = useState([
        { label: 'Todo', value: 'Todo' },
        { label: 'Progress', value: 'Progress' },
        { label: 'Done', value: 'Done' },
    ]);


    // const { itemData } = route.params;
    const { mode, itemData } = route.params;
    console.log(itemData.title)
    let keyTitle = ""

    useEffect(() => {
        if (route.params.mode === 'edit') {
            updateTitle(route.params.itemData.title);
            updateDesc(route.params.itemData.desc)
            setStatus(route.params.itemData.status)
            updateId(route.params.itemData.id);
        }
    }, [route.params]);
    function updateData() {
        const usersRef = database().ref('task').child(id);
        // Insert a new user
        usersRef.update({
            title,
            desc,
            status
        }).then(() => {
            Alert.alert('Success', 'Record updated successfully', [
                {
                  text: 'OK',
                  onPress: () => {
                    navigation.navigate('Home'); // Navigate to the new screen
                  }
                }]);
        })
            .catch((error) => {
                console.error('Error updating record:', error);
                Alert.alert('Error', 'Failed to update record');
            });
    }
    // updateTitle(itemData.title)
    // Use itemData to populate the form fields
    return (
        <View style={{ backgroundColor: "white", padding: 20, height: '100%', justifyContent: 'center' }}>
            <Text style={style.Text}>Task List</Text>
            {/* Title */}
            <Text style={style.TextTitle}>Enter Title</Text>
            <TextInput style={style.TextInput} onChangeText={updateTitle} placeholder={title}
                placeholderTextColor={"black"}>{title}</TextInput>
            {/* Description */}
            <Text style={style.TextTitle}>Enter Description</Text>
            <TextInput style={style.TextInput} onChangeText={updateDesc} placeholder={desc}
                placeholderTextColor={"black"}>{desc}</TextInput>
            {/* Dropdown picker */}
            <Text style={style.TextTitle}>Choose Status</Text>
            <DropDownPicker style={style.DropDownPicker}
                open={open}
                value={status}
                items={items}
                setOpen={setOpen}
                setValue={setStatus}
                setItems={setItems}
                placeholder={'Choose a status'}
            />
            <View style={{ margin: 10, borderRadius: 10, borderWidth: 2, backgroundColor: "skyblue" }}>
                <Text style={{ color: 'black', margin: 10, textAlign: 'center', fontSize: 20 }}
                    onPress={() => updateData()}
                >UPDATE</Text>
            </View>


        </View>

    );
};
const style = StyleSheet.create({
    Text: {
        margin: 10,
        fontSize: 30,
        height: 50,
        alignItems: "center",
        color: "black",
    },
    TextTitle: {
        fontSize: 15,
        marginLeft: 14,
        alignItems: "center",
        color: "black",
    },
    TextInput: {
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        marginTop: 3,
        backgroundColor: "lightgrey",
        padding: 10,
        fontSize: 20,
        height: 50,
        borderRadius: 10,
        borderColor: "black",
        color: "black",
        borderWidth: 2,

    },
    DropDownPicker: {
        borderWidth: 2,
        backgroundColor: "lightgrey",
        color: "black",
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        marginTop: 3,
        padding: 10,
        fontSize: 20,
    }

});
export default Update;
