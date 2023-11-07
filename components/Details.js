import { Button, StyleSheet, Text, View,FlatList,RefreshControl, Pressable} from 'react-native'
import React, { useEffect,useState } from 'react'

const renderItem = ({item,index}) => {
    const backgroundColor =  'black';
    const color  = 'black' ;


    return (
            <View>
                {Object.keys(item).map((key, index) => (
                    <View style={styles.item} key={index} >
                    <Text style={styles.title}>{key}:</Text>
                    <Text style={[styles.title,{alignSelf:"flex-end"}]}>{item[key]}</Text>
                    </View>
                ))}
            </View>

    );
  };


export default function Details({setSelectedItem,selectedItem,data}) {

    const [allDatapicked, setAllDatapicked] = useState(data);

    useEffect(()=>{
        console.log(selectedItem);
        console.log(data.filter(item => item.symbol.includes(selectedItem)));
        setAllDatapicked(data.filter(item => item.symbol.includes(selectedItem)));
    }, []);
  return (
    <View style={styles.container}>
      <Pressable style={styles.btn}  onPress={()=>setSelectedItem(null)}>
        <Text style={{textAlign:"center",fontSize:17,color:"white",padding:5}}>Back</Text>
      </Pressable>
      <FlatList
            data={allDatapicked}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}

        />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal:10,
        flexDirection:"column",
        justifyContent:"space-between",
        marginTop:30,     
        backgroundColor:"black"   
      },
      item:{
        flex:1,
        flexDirection:"row",
        justifyContent:"space-between",
        borderColor:"white",
        borderWidth:2,
        padding:8,
        backgroundColor:"black"
      },
      title: {
        fontSize: 16,
        color:"white"
      },
      btn:{
        backgroundColor:"black",
        borderRadius:10,
        borderColor:"white",
        borderWidth:2,
        height:45,
        textAlign:'center',
        
        
      }
})