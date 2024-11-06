import React, { useState, useEffect } from 'react';
import { View, Text, Button, Modal, Alert, StyleSheet,Image, TouchableOpacity,   } from 'react-native';
import logo from '../assets/atreisonV2.jpg'
import { BarCodeScanner } from 'expo-barcode-scanner'; // Importa o scanner de QR Code


function HomeScreen({ route, navigation }) {
  const { nome, userId} = route.params; // Assume que você está passando userId como "id" no parâmetro
  const [modalVisible, setModalVisible] = useState(false);
  const [alunoId, setAlunoId] = useState(userId);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannerVisible, setScannerVisible] = useState(false); // Estado para controlar o scanner

  useEffect(() => {
    if (!alunoId) {
      Alert.alert('Erro', 'ID do aluno não encontrado.');
    }
  }, [alunoId]);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    const scannedUserId = data; // Presume que o QR Code contém o userId
    setAlunoId(scannedUserId); // Atualiza alunoId com o ID escaneado
    setModalVisible(true); // Abre o modal de confirmação
  };

  const registrarAtraso = async () => {
    console.log("Registrando atraso para o usuário:", userId); // Log do ID do usuário
  
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/usuarios/${userId}/registrar-chegada`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      console.log("Resposta da API:", response); // Log da resposta da API
      if (response.ok) {
        Alert.alert('Sucesso', 'Atraso registrado com sucesso!');
      } else {
        const errorResponse = await response.json(); // Tente obter a resposta de erro da API
        console.log("Erro da API:", errorResponse); // Log do erro da API
        Alert.alert('Erro', 'Erro ao registrar o atraso: ' + JSON.stringify(errorResponse));
      }
    } catch (error) {
      console.log("Erro:", error); // Log de qualquer erro
      Alert.alert('Erro', `Erro: ${error.message}`);
    }
  };


  const handleRegistrarAtraso = () => {
    setScannerVisible(true); // Exibir o scanner quando o botão for clicado
  };

  const confirmarRegistro = async () => {
    setModalVisible(false);
    if (alunoId) {
      await registrarAtraso(alunoId);
    } else {
      Alert.alert('Erro', 'ID do aluno não disponível.');
    }
  };

  return (
    <View style={styles.container}>

      <View style={styles.info}>
        <View style={{ width: '100%' }}>
          <Image source={logo} style={{ width: '100%', height: 400 }} />
        </View>
        <View style={styles.elementos}>
          <Text style={styles.welcome}>Bem-Vindo <Text style={styles.nick}>{nome}</Text></Text>
          
        </View>
      </View>

      <TouchableOpacity style={styles.checkButton}         onPress={() => {
             setModalVisible(true)
        }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: "white" }}>Cadastrar Atraso</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.checkButton}
        onPress={() => {
          if (alunoId) {
            navigation.navigate('Consulta', { userId: alunoId });
          } else {
            Alert.alert('Erro', 'ID do aluno não disponível.');
          }
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: "white" }}>Ver atrasos</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.checkButton}
        onPress={() => {
          if (alunoId) {
            navigation.navigate('Graficos');
          } else {
            Alert.alert('Erro', 'ID do aluno não disponível.');
          }
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: "white" }}>Ver gráficos</Text>
      </TouchableOpacity>

      {/* Modal de confirmação */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Tem certeza que deseja registrar o atraso?</Text>
            <View style={styles.modalButtons}>
              <Button title="Confirmar"  onPress={async () => {
                await setModalVisible(false)
          await registrarAtraso(); // Chama a função para registrar o atraso
          navigation.navigate('ConfirmAtr', { nome: nome, userId: userId }); // Navega para a próxima tela
        }} />
              <Button title="Cancelar" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>

      {/* Componente do scanner */}
      {scannerVisible && (
        <View style={{ flex: 1 }}>
          {hasPermission === null ? (
            <Text>Solicitando permissão para a câmera...</Text>
          ) : hasPermission === false ? (
            <Text>Sem acesso à câmera</Text>
          ) : (
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={StyleSheet.absoluteFillObject}
            />
          )}
          {scanned && <Button title={'Escanear novamente'} onPress={() => setScanned(false)} />}
          <Button title={'Fechar Scanner'} onPress={() => setScannerVisible(false)} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  welcome: {
    fontSize: 20,
    marginBottom: 20,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },

  info:{
    alignItems:"center",
    justifyContent:'center',
    marginBottom: 20,
    flexDirection: 'column',
    textAlign:'center',
    width: '100%',
    },

    checkButton:{
      padding:13,
      backgroundColor:'#1F618D', 
      width:"80%",
      marginBottom:10,
      borderRadius:6,
      alignItems:"center"
       },

       nick:{
        fontSize: 22,
        color: '#3aad59',
        fontWeight:'bold',
        fontFamily:'Arial',
      },
      elementos:{
        width: '100%',
        display:'flex',
        flexDirection:'column',
        alignItems: 'center',
        justifyContent: 'center',
      textAlign: 'center',
        }
});

export default HomeScreen;
