import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'; 


export default function ArticleCard({route, navigation}) {
    const {article, title, topic, img} = route.params;
  return (
      <View style={styles.articleContainer}>
    <ImageBackground source={{uri: img}} resizeMode= 'cover' >
    <View style={styles.blackContainer}>
    <View style={styles.titleContainer}>
    <TouchableOpacity onPress={() => navigation.goBack()}>
    <AntDesign style={{marginTop: 5, marginRight: 5}} name="back" size={40} color="#fff" />
    </TouchableOpacity>
    <Text style={styles.title}>{title}</Text>
    </View>

    <ScrollView>

    <Text style={styles.article}>{article}</Text>
    </ScrollView>
    </View>
    </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
    articleContainer:{
        height: '100%',
        width: '100%',
        // backgroundColor: '#d89b5c',
        alignItems: 'center',
        // justifyContent: 'center',
    },

    titleContainer:{
    backgroundColor: 'rgba(250, 146, 40, 0.17)',

        
    },

    title:{
        fontSize: 30,
        fontWeight: '700',
        color: '#d89b5c',
        borderBottomWidth: 7,
        borderColor: '#a37d08',
        fontWeight: '900',
        padding: 8,
        // backgroundColor: 'rgba(250, 146, 40, 0.17)',

        
        

    },

    blackContainer:{
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        // opacity: 0.5,
        
    },

    article:{
        fontSize: 20,
        padding: 15,
        // backgroundColor: '#d0a06e',
        color: '#fff',
        fontWeight: '500',

        


    }
})