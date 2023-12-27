import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';



const Admin = ({ navigation }) => {
  const handleAddArticle = () => {
    console.log('Add Article clicked');
    navigation.navigate('AddArticle');
  };

  const handleViewUserStatus = () => {
    
    console.log('View User Status clicked');
    navigation.navigate('UserStatus');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin</Text>

      <TouchableOpacity style={styles.button} onPress={handleViewUserStatus}>
        <Text style={styles.buttonText}>View User Status</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleAddArticle}>
        <Text style={styles.buttonText}>Add Article + Photo</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    width: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Admin;