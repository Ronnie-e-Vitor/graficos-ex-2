import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const ListaAtrasosAlunoScreen = ({ route }) => {
  // const { userId } = route.params; // ID do usuário cujos atrasos estamos exibindo
  const [atrasos, setAtrasos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAtrasos();
  }, []);

  const fetchAtrasos = async () => {
    try {
      // Chamar a API para buscar os atrasos do aluno pelo ID
      const response = await fetch(`http://127.0.0.1:8000/api/usuarios/${2}/chegadas`);
      const data = await response.json();
      setAtrasos(data); // Atualizar o estado com os dados dos atrasos
      setLoading(false); // Indicar que os dados foram carregados
    } catch (error) {
      console.error('Erro ao buscar atrasos:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView>
    <View style={styles.container}>
      <FlatList
        data={atrasos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>Nome: {item.nome}</Text>
            <Text>Módulo: {item.modulo}</Text>
            <Text>Curso: {item.curso}</Text>
            <Text>Data/Hora de Chegada: {item.data_hora_chegada}</Text>
          </View>
        )}
      />
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
});

export default ListaAtrasosAlunoScreen;
