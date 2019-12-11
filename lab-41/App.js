import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, FlatList } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as Contacts from 'expo-contacts'

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [permissions, setPermissions] = useState(false);

  const getPermissions = async () => {
    const { status } = await Permissions.askAsync(Permissions.CONTACTS);
    setPermissions(true);
  }

  const showContacts = async () => {
    const contactsList = await Contacts.getContactsAsync();
    setContacts(contactsList.data);
  }

  useEffect(() => {
    getPermissions();
  }, [])


  return (
    <View style={styles.container}>
      <Text>David is learning React Native!</Text>
      <Image
        style={{width: 270, height: 270}}
        source={require('./assets/jb-sleep.jpg')}
      />
      <Button 
       title="Get Contacts"
       onPress={showContacts}
      />
      <FlatList 
        // data={[{ id: 1, title: 'one'}, { id: 2, title: 'two'}]}
        data = { contacts }
        keyExtractor={(item) => item.id}
        renderItem={({item}) => <Button title={item.name} />}
      />
    </View>
  ); 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
});
