import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { BarChart, LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';


const screenWidth = Dimensions.get('window').width;


const RegistroAtrasoScreen = ( { navigation, route }) => {
  const [data, setData] = useState({
    labels: [],
    datasets: [{ data: [] }],
  });
  
  const [percentages, setPercentages] = useState([]); // Estado para porcentagens
  const [error, setError] = useState(null); // Estado para armazenar erros

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/atrasos-por-curso')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro na rede');
        }
        return response.json();
      })
      .then((atrasos) => {
        console.log(atrasos); // Exibe os dados no console

        // Mapeando labels e valores para edição
        const labels = Object.keys(atrasos);
        const values = Object.values(atrasos);

        const numbers = Object.values(atrasos);
        const total = numbers.reduce((acc, num) => acc + num, 0); // Soma todos os números
        const calculatedPercentages = numbers.map(num => (num / total * 100).toFixed(2)); // Calcula a porcentagem de cada um
        console.log(calculatedPercentages); // ["14.29", "21.43", "28.57", "35.71"]

        // Modifique os rótulos aqui
        const modifiedLabels = labels.map(curso => {
          switch (curso) {
            case 'Desenvolvimento de sistemas':
              return 'Desenv. de Sistemas';
            case 'Nutrição':
              return 'Nutrição';
            case 'Robotica':
              return 'Robótica';
            case 'Administração':
              return 'Adm'; 
            default:
              return curso; // Retorna o curso original se não houver caso
          }
        });

        setData({
          labels: modifiedLabels, // Use os labels modificados
          datasets: [{ data: values }],
        });
        setPercentages(calculatedPercentages); // Atualiza o estado de percentages

      })
      .catch((error) => {
        console.error('Erro ao buscar atrasos:', error);
        setError(error.message); // Armazena a mensagem de erro
      });
  }, []);

  const { nome, userId} = route.params; 

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{marginBottom: 15}}>
        <View style={[styles.Vheader,{ width:240}]}>
      <Text style={styles.header}>Gráfico de 
      Valores</Text>
      </View>
      <LineChart
          data={data}
          width={screenWidth - 20}
          height={220}
          chartConfig={{
            backgroundGradientFrom: '#9621de',
            backgroundGradientTo: '#7148cf',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          bezier // Deixa a linha curva
          style={styles.chart}
        />
        </View>
        <View style={styles.Vheader}>
      <Text style={styles.header}>Gráfico de Porcentagens</Text>
      </View>
      <BarChart
        data={{
          labels: data.labels,
          datasets: [{ data: percentages.map(Number) }], // Converte as porcentagens de string para número
        }}
        width={screenWidth - 20}
        height={220}
        yAxisLabel=""
        chartConfig={{
          backgroundColor: '#9621de',
          backgroundGradientFrom: '#7148cf',
          backgroundGradientTo: '#4fb7cd',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: { borderRadius: 16 },
          formatYLabel: (value) => `${value}%`, // Adiciona o símbolo de porcentagem
          
        }}
        style={styles.chart}
      />

<TouchableOpacity
onPress={() => navigation.navigate('Home', {nome: nome, userId: userId })}
style={{backgroundColor: '#55cf79', padding: 4, marginTop:10, borderRadius:3, width:50, display:'flex', alignItems:'center', paddingHorizontal:50, color:'white', fontWeight:'600', fontSize:'1.2rem'}}
>
  voltar
</TouchableOpacity>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    display:'flex',
     justifyContent:'center',
      width:'100%'
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color:'white',
    marginBottom: 0,
    padding:2,
  },

  Vheader:{
    backgroundColor: '#d5a4e0',
    padding:5,
     width:310, 
     borderTopRightRadius: 20,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default RegistroAtrasoScreen;
