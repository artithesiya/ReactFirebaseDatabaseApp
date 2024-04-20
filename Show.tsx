import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import database from '@react-native-firebase/database';

const Show = ({ navigation }: { navigation: any }): React.JSX.Element => {
    interface UserData {
        id: string;
    }
    const [userData, setUserData] = useState<UserData[]>([]);

    useEffect(() => {
        const usersRef = database().ref('task');
        // Retrieve data
        usersRef.once('value').then(snapshot => {
            const data = snapshot.val();
            const userIds = Object.keys(data); // Get an array of all the unique IDs (keys)
            console.log('User IDs:', userIds);
            // If you want to access the data of each user
            const usersData = userIds.map(userId => {
                return {
                    id: userId,
                    ...data[userId] // Spread the rest of the user data
                };
            });
            console.log('Users Data:', usersData);
            setUserData(usersData);
        });
    }, []);

    const renderItem = ({ item }: { item: any }) => {
        const editItem = (itemData: any) => {
            if (userData != null) {
                // const itemData = userData[itemId]; // Retrieve the item data
                console.log(itemData)
                navigation.navigate('Update', { mode: 'edit', itemData });
            }
        };


        const deleteItem = (item: any) => {
            const usersRef = database().ref('task').child(item.id);
            console.log(item.id)
            usersRef.remove()
                .then(() => {
                    console.log('Record deleted successfully');
                    Alert.alert('Success', 'Record deleted successfully', [
                        {
                            text: 'OK',
                            onPress: () => {
                                navigation.navigate('Home'); // Navigate to the new screen
                            }
                        }]);
                })
                .catch((error) => {
                    console.error('Error deleting record:', error);
                    Alert.alert('Error', 'Failed to delete record');
                });
        }

        return (
            <View style={styles.itemContainer}>
                <View style={styles.itemTextContainer}>
                    <Text style={style.Text}>Title: {item.title}</Text>
                    <Text style={style.Text}>Description: {item.desc}</Text>
                    <Text style={style.Text}>Status: {item.status}</Text>
                </View>
                <View style={styles.iconContainer}>
                    <TouchableOpacity onPress={() => editItem(item)}>
                        <Image
                            source={require('./assets/images/edit.png')} // Use require for local images
                            style={styles.image}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => deleteItem(item)}>
                        <Image
                            source={require('./assets/images/delete.png')} // Use require for local images
                            style={styles.image}
                        />
                    </TouchableOpacity>
                </View>
            </View>

        );
    };

    return (
        <View style={{ flex: 1, padding: 20 }}>
            {userData ? (
                <FlatList
                    data={Object.values(userData)}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            ) : (
                <Text style={style.Text}>Loading...</Text>
            )}

        </View>
    );
}
const style = StyleSheet.create({
    Text: {
        margin: 5,
        fontSize: 15,
        alignItems: "center",
        color: "black",
    }
});
const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 10,
    },
    itemTextContainer: {
        flex: 1,
        color: "black",
    },
    iconContainer: {
        flexDirection: 'row',
    },
    image: {
        width: 20,
        height: 20,
        marginLeft:10,
        resizeMode: 'cover', // Adjust the image's content mode as needed
    },
});
export default Show;