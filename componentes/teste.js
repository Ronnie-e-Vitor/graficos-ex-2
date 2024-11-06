import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, Image} from 'react-native';
import img from '../assets/relogio.png'

const MyComponent = ({ route, navigation }) => { // Desestruture route de props
  // const { nome, userId, curso, modulo } = route.params; 


  const registrarAtraso = async () => {
    console.log("Registrando atraso para o usuário:", userId); // Log do ID do usuário
  
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/usuarios/2/registrar-chegada`, {
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

  return (
    <View style={{display:'flex', justifyContent:'center', height:'100%'}}>

        <View style={{width:'100%'} }>
                <Image 
                    source={img}
                    style={{width:'50%', height:'50%',}}
                    resizeMode='contain'
                />
        </View>

      <Text style={styles.ddUser}>Dados do usuário:</Text>

      <View style={styles.ddContainer}>
      {/* <Text style={styles.title}>Id: {userId}</Text> */}
      <View style={styles.title}>Nome: {}</View>
      <View style={styles.title}>desenvolvimento de sistemas {}</View>
      <View style={styles.title}>Modulo: {}</View>
      </View>
      <TouchableOpacity
        style={{padding:20, backgroundColor:'#8b2fdc', width:"100%", marginTop:15, borderRadius:6, alignItems:"center"}}
        onPress={async () => {
          await registrarAtraso(); // Chama a função para registrar o atraso
          navigation.navigate('ConfirmAtr', { nome: nome, userId: userId }); // Navega para a próxima tela
        }}> <Text style={{ fontSize: 20, fontWeight: 'bold', color: "white" }}> Cadastrar seu Atraso</Text><Text style={{color:'#cab8cf', }}>Horário baseado no seu dispositivo</Text></TouchableOpacity>
    </View>

  );
};
const styles = StyleSheet.create({


  title:{
    borderColor:'#cdbccf',
    borderWidth: '2px',
    color:'#3d0742',
    fontSize:17,
    borderRadius:'10px',
    width:'100%',
    height:40,
    marginBottom:3,
    display:'flex',
    textAlign:'center',
    alignItems:'center',
    justifyContent:'center',
    fontWeight:'bold',

  },
  ddUser:{
    display:'flex',
    backgroundColor:'#b38bd6',
    alignItems:'center',
    justifyContent:'center',
    gap:'3px',
    textAlign:'center',
    marginBottom:10,
    fontSize:20,
    color:'white',
    fontWeight:'bold',
    height:40,
    alignItems:'center',
    borderRadius:'10px',
  },
  ddContainer:{
    alignItems:'center',
  }
  

});
export default MyComponent;
