import { StyleSheet, Text, View,  AppRegistry, processColor, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { VictoryCandlestick, VictoryChart, VictoryLabel,VictoryTheme } from 'victory-native';
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;

export default function Grafico({setSelectedItem,selectedItem,dataRecived}) {
  const [dataGraphit,setDataGraphit] = useState();
  const [allDatapicked, setAllDatapicked] = useState(dataRecived);

  useEffect(() => {
    setAllDatapicked(dataRecived.filter(item => item.symbol.includes(selectedItem)));
  
    const getGraphitsData = async () => {
      const data = await fetch(`https://api.binance.com/api/v3/klines?symbol=${selectedItem}&interval=1d`);
      const json = await data.json();
      
      // Invertir el array de arrays
      const reversedData = json.reverse();
  
      // Convertir todos los timestamps a objetos Date
      const formattedData = reversedData.slice(0, 6).map(item => {
        const timestamp = item[0]; // Acceder al timestamp en cada array
        const date = new Date(timestamp); // Convertir a objeto de fecha
  
        // Formatear el timestamp al formato deseado
        const formattedDate = date.toISOString();
  
        item[0] = formattedDate; // Actualizar el timestamp en el array

        return item;
      });
      const datatranformed = formattedData.map(item => {
        return {
          x: new Date(item[0]), // Kline open time
          open: parseFloat(item[1]), // Open price
          high: parseFloat(item[2]), // High price
          low: parseFloat(item[3]), // Low price
          close: parseFloat(item[4]), // Close price
        };
      });
      //console.log("start here");
      //console.log(formattedData);
      console.log(datatranformed);

      setDataGraphit(datatranformed);
    }
  
    getGraphitsData();
    
  }, []);

  return (
    <View style={styles.container}>
      <Pressable onPress={()=>setSelectedItem(null)}><Text style={{textAlign:"center",fontSize:15,color:"black",padding:6,margin:5,borderColor:"black",borderWidth:2,textAlign:"center"}}>Volver</Text></Pressable>
      <Text style={{fontSize:20}}>Datos de los ultimos 5 dias de {selectedItem}</Text>
      <VictoryChart   theme={VictoryTheme.material}
        domainPadding={{ x: 25 }}
       >
        <VictoryCandlestick
          candleColors={{ positive: "#008000", negative: "#c43a31" }}
          data={dataGraphit}
          highLabels
          highLabelComponent={
            <VictoryLabel
              dx={-10}
              textAnchor="middle"
            />
          }
        />
      </VictoryChart>
    </View>
      );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});