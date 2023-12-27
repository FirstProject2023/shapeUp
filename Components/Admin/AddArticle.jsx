import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase';
import articlesData from '../Jsons/articles.json'
import { AntDesign } from '@expo/vector-icons';

const AddArticle = ({navigation}) => {
  const [article, setArticle] = useState({
    title: '',
    content: '',
    topic: '',
    img: '',
    counter: 0,
  });

  const handleAddArticle = async () => {
  };

  return (
    <ScrollView style={styles.container}>
          <AntDesign name="leftcircleo" size={24} color="black" style={{marginBottom:100}} onPress={()=>{
          navigation.navigate('Admin');
      }} />
      <TextInput

        style={styles.input}
        placeholder="Title"
        value={article.title}
        onChangeText={(text) => setArticle({ ...article, title: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Content"
        multiline
        numberOfLines={5}
        value={article.content}
        onChangeText={(text) => setArticle({ ...article, content: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Topic"
        value={article.topic}
        onChangeText={(text) => setArticle({ ...article, topic: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Image URL"
        value={article.img}
        onChangeText={(text) => setArticle({ ...article, img: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Counter"
        keyboardType="numeric"
        value={article.counter.toString()}
        onChangeText={(text) => setArticle({ ...article, counter: parseInt(text) || 0 })}
      />
      <Button title="Add Article" onPress={handleAddArticle} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default AddArticle;