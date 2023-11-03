import { View } from 'react-native'
import React from 'react'
import {
    FlatList,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    RefreshControl ,
  } from 'react-native';
  import { useEffect, useState } from 'react';


export default function BodyList({data,refreshData }) {

    const [selectedId, setSelectedId] = useState();
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
      setRefreshing(true); // Indica que se está actualizando
  
      try {
        // Lógica para obtener los nuevos datos
        await refreshData(); // Llamada a la función que obtiene los datos
        setRefreshing(false); // Finaliza la actualización
      } catch (error) {
        console.error('Error al actualizar los datos:', error);
        setRefreshing(false); // Finaliza la actualización en caso de error
      }
    };

    const renderItem = ({item,index}) => {
        const backgroundColor = index === selectedId ? 'red' : 'black';
        const color = index === selectedId ? 'black' : 'white';
    
        return (
            <TouchableOpacity onPress={()=>{setSelectedId(index);console.log(index)}} style={[ {backgroundColor},styles.container]}>
                <View>
                    <Text style={[styles.title, {color: color},{fontWeight:"bold"}]}>{item.symbol.replace('USDT', '')}</Text>
                    <Text style={[styles.title, {color: color}]}>{item.symbol}</Text>
                </View>
                <View>
                    <Text style={[styles.title, {color: color},{fontWeight:"bold"}]}>{"$"+item.lastPrice}</Text>
                    <Text style={[styles.title, {color: "red"},{alignSelf:"flex-end"},]}>{item.priceChangePercent+"%"}</Text>
                </View>

          </TouchableOpacity>
        );
      };
  return (
    <View style={{flex:0}}>
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            extraData={selectedId}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        />
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal:30,
      marginBottom:10,
      flexDirection:"row",
      justifyContent:"space-between",
    },
    title: {
      fontSize: 14,
    },
  });
  