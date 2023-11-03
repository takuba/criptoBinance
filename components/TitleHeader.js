import { StyleSheet, Text, View, TextInput} from 'react-native'
import React from 'react'

export default function TitleHeader({setDataSearchFuntion}) {
  return (
    <View style={styles.container2}>
      <Text style={[styles.fontstyle,{fontSize:20},]}>CryptoMarket</Text>
      <TextInput
        style={{height: 40,backgroundColor:"white",padding:10}}
        placeholder="Search a Coin"
        onChangeText={newText => setDataSearchFuntion(newText)}
        defaultValue={""}
      />

    </View>
  )
}

const styles = StyleSheet.create({
    container2:{
        flex:0,
        justifyContent:"space-between",
        flexDirection:"row",
        margin:10

    },
    fontstyle:{
        color:"white"
    }
})