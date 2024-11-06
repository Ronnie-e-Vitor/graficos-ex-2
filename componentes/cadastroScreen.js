import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableOpacity, ScrollView, StyleSheet,Image} from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Picker } from '@react-native-picker/picker';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { NavigationContainer } from '@react-navigation/native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import logo from '../assets/echeck.jpeg';
import Loading from './loading';

const CadastroScreen = ({navigation}) => {
  const [nomeUser, setNomeUser] = useState(''); 
  const [moduloUser, setModuloUser] = useState('');
  const [cursoUser, setCursoUser] = useState(''); 
  const [carregando, setCarregando] = useState(false);


  const verificar = async () => {
    setCarregando(true)
    try {
      const response = await fetch('http://127.0.0.1:8000/api/register', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: nomeUser,
          modulo: moduloUser,
          curso: cursoUser,
        }),
      });

      const jsonResponse = await response.json();
      if (response.ok) {
        console.log('Sucesso', 'Dados salvos com sucesso!');
        navigation.navigate('Confirm'); 
      } else {
        console.log('Erro', `Erro: ${jsonResponse.message || 'Não foi possível salvar os dados'}`);
      }
    } catch (error) {
      console.log('Erro', `Erro de conexão: ${error.message}`);
    }

    finally{
        setCarregando(false)

    }
  }

  return (
    <View style={styles.container}>
         {carregando ? (
            <Loading />
        ) : (
            <>
       <View style={styles.info}> 
          <Image
          source={logo}
          style={{width:'100%', height:300, }}  
            />
            <Text> Cadastra-se </Text>
        </View>

      <View style={styles.inputs}>
      <View style={styles.inputView}>
        <FontAwesome5 name="user" size={20} color="rgb(208 153 245)" style={{backgroundColor:'#fcf7fe', width:'15%', height:'200%', display: 'flex',
         justifyContent:'center', alignItems:'center', borderRadius:50,}} />
          <TextInput 
              style={styles.input}
              placeholder= "Nome..."
              onChangeText={(value) => setNomeUser(value)}
              value={nomeUser}
          />
        </View>

        <View style={styles.inputView}>
        <FontAwesome name="graduation-cap" size={20} color="#83cbfe" style={{backgroundColor:'#eff8ff', width:'15%', height:'200%', display: 'flex',
         justifyContent:'center', alignItems:'center', borderRadius:50}} />      
         <Picker
            style={{width:'100%',  borderWidth: 0}}
        selectedValue={cursoUser} 
        onValueChange={(itemValue, itemIndex) => setCursoUser(itemValue)}
        >
        <Picker.Item label="Curso" value="" />
        <Picker.Item label="Desenvolvimento de sistemas" value="Desenvolvimento de sistemas" />
        <Picker.Item label="Nutrição" value="Nutrição" />
        <Picker.Item label="Robotica" value="Robotica" />
        <Picker.Item label="Administração" value="Administração" />
      </Picker>
        </View>

        <View style={styles.inputView}>
          <FontAwesome name="pencil" size={20} color="rgb(254 176 61)" style={{backgroundColor:'rgb(255 247 236)', width:'15%',
           height:'200%', display: 'flex',
         justifyContent:'center', alignItems:'center', borderRadius:50,}} />
             <Picker
            style={{width:'100%',  borderWidth: 0}}
        selectedValue={moduloUser} 
        onValueChange={(itemValue, itemIndex) => setModuloUser(itemValue)}
        >
        <Picker.Item label="Modulo" value="" />
        <Picker.Item label="1° Modulo" value="1 modulo" />
        <Picker.Item label="2° Modulo" value="2 modulo" />
        <Picker.Item label="3° Modulo" value="3 modulo" />
        
      </Picker>
        </View>


      </View>

      <TouchableOpacity onPress={verificar}style={{padding:20, backgroundColor:'#8b2fdc', width:"100%", marginTop:15, borderRadius:6, alignItems:"center"}}>
        <Text style={{fontSize:20, fontWeight:'bold', color:"white"}}>Enviar</Text>
      </TouchableOpacity>
      <TouchableOpacity  onPress={() => {
          navigation.navigate('Login'); // Navega para a próxima tela
        }}>
        <Text style={{marginTop:5,fontSize:10, fontWeight:'200', color:"purple"}}> Logue-se</Text>
      </TouchableOpacity>
      </>
        )}
    </View>
   
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fff',
    alignItems:'center',
    justifyContent:'center',
    paddingHorizontal:12,
    height: '100%',
  },

  inputView:{
    flexDirection:'row',
    width:'100%',
    borderColor:'gray',
    borderWidth:1,
    height: 60 ,
    alignItems:'center',
    paddingVertical:18,
    borderRadius:6,
    paddingHorizontal: 10,
    
  },
  input:{
    width:'100%',
    height: '200%',
    marginLeft: 5,
  },

  inputs:{
    gap:20,
    width:'100%'



  },

  info:{
  alignItems:"center",
  justifyContent:'center',
  marginBottom: 20,
    textAlign:'center',
  width: '100%',
  }


  
 
});

export default CadastroScreen;



