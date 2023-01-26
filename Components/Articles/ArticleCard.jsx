import { ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function ArticleCard({route, navigation}) {
    const {article, title, topic, img} = route.params;
  return (
      <View style={styles.articleContainer}>
    <ImageBackground source={{uri: img}} resizeMode= 'cover' >
    <View style={styles.blackContainer}>


    <Text style={styles.title}>{title}</Text>
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

    title:{
        fontSize: 27,
        fontWeight: '700',
        color: '#d89b5c',
        borderBottomWidth: 7,
        borderColor: '#a37d08',
        
        

    },

    blackContainer:{
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
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