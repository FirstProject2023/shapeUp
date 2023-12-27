import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, Button } from 'react-native';
import { Ionicons,Entypo,FontAwesome5,AntDesign  } from '@expo/vector-icons'; 
import { deleteDoc, doc, getDocs, setDoc,collection,addDoc,updateDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase'

const UserStatus = ({navigation}) => {
    const [usersData,setUsersData]=useState([]);
    const userCollectionRef = collection(db,"users");

    useEffect(()=>{

        const getUsers = async () => {
          const data = await getDocs(userCollectionRef);
          setUsersData(data.docs.map((doc)=> ({...doc.data() , id: doc.id })));
          
        }
        getUsers();
      },[]);

  const renderItem = ({ item }) => (
    <View style={styles.userItem}>
      <View style={styles.userInfo}>
        <Text>{`${item.firstName} ${item.lastName}`}</Text>
        <Text>Email: {item.email}</Text>
        <Text>Password: {item.password}</Text>
       {
        item?.phone &&
        <Text>Phone: {item.phone}</Text>
       }
      </View>
      <View style={{marginLeft:10}}>
        {
            item.isTryToContact ?
            <AntDesign name="message1" size={24} color="red" />
            :
            <AntDesign name="message1" size={24} color="black" />
        }
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
        <View style={{display:'flex',flexDirection:'row',width:'100%',justifyContent:'space-between'}}>
        <AntDesign name="rightcircleo" size={24} color="black" onPress={()=>{
          navigation.navigate('Admin');
      }} />
    
      <Text style={styles.title}>User Status</Text>
        </View>
      <FlatList
        data={usersData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  userItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 10,
  },
  userInfo: {
    flex: 1,
  },
  messageIcon: {
    width: 24,
    height: 24,
  },
});

export default UserStatus;