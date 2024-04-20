import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import database from '@react-native-firebase/database';

const Home = ({ navigation }: { navigation: any }): React.JSX.Element => {
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
   
    // const [age, updateAge] = useState(20);

    function addData() {
        if (title.length == 0 || desc.length == 0) {
            Alert.alert('Enter Values')
        }
        else {
            // Reference to the users node in the database
            const usersRef = database().ref('task').child(title);
            const data = ({ title, desc, status })
            // Insert a new user
            usersRef.set({
                title,
                desc,
                status
            });
            updateTitle("")
            updateDesc("")
            setStatus(null)
            Alert.alert('Success', 'Record Added successfully', [
                {
                  text: 'OK',
                }]);
        }
    }
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
                    onPress={() => addData()}>ADD</Text>
            </View>
            <View style={{ margin: 10, borderRadius: 10, borderWidth: 2, backgroundColor: "skyblue" }}>
                <Text style={{ color: 'black', margin: 10, textAlign: 'center', fontSize: 20 }} onPress={() =>
                    navigation.navigate('Show')}>SHOW LIST</Text>
            </View>

        </View>
    );
}
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
export default Home;