import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function ArticleCard({route, navigation}) {
    const {article, title, topic, img} = route.params;
  return (
    <View style={styles.articleContainer}>
    <Text style={styles.title}>{title}</Text>
    <ScrollView>

    <Text style={styles.article}>{article}</Text>
    </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    articleContainer:{
        height: '100%',
        width: '100%',
        backgroundColor: '#d89b5c',
        alignItems: 'center',
        // justifyContent: 'center',
    },

    title:{
        fontSize: 27,
        fontWeight: '700',
        color: '#00ffff',
        borderBottomWidth: 7,
        borderColor: '#009999'

    },

    article:{
        fontSize: 20,
        padding: 15,
        backgroundColor: '#d0a06e',
        color: '#fff',
        fontWeight: '500',

        


    }
})