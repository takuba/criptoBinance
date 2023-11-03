import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BodyList from './components/BodyList';
import TitleHeader from './components/TitleHeader';

export default function App() {
  const [allData, setAllData] = useState([]);
  const [originalData, setOriginalData] = useState([]);

  const setDataSearchFunction = (data) => {
    console.log(data);
    const dataSearchFilter = originalData.filter(item => item.symbol.toLowerCase().includes(data.toLowerCase()));
    if (data === '') {
      setAllData(originalData);
    } else {
      setAllData(dataSearchFilter);
    }
  };

  useEffect(()=>{
    const getCriptos = async ()=>{
      const data = await fetch('https://api.binance.com/api/v3/ticker/24hr');
      const json = await data.json();
      const filteredData = json.filter(item => item.symbol.includes('USDT'));
      //console.log(filteredData);
      setAllData(filteredData);
      setOriginalData(filteredData); // Almacena los datos originales
    }
    getCriptos();
  }, []);
  
  const refreshData = async () => {
    try {
      const data = await fetch('https://api.binance.com/api/v3/ticker/24hr');
      const json = await data.json();
      const filteredData = json.filter(item => item.symbol.includes('USDT'));
      setAllData(filteredData);
      setOriginalData(filteredData);
    } catch (error) {
      console.error('Error al actualizar los datos:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TitleHeader setDataSearchFuntion={setDataSearchFunction}></TitleHeader>
      <BodyList data={allData} refreshData={refreshData}></BodyList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});
