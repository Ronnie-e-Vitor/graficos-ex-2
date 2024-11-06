import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, StatusBar, Image, Touchable, Dimensions, TextInput} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import confimationImage from '../assets/confirmation.png'


const confirmationScreen = ({route, navigation}) => {
  const { nome, userId } = route.params; // Acesse route.params corretamente

  return (
    <View style={styles.container}>
        <View style={{width:'100%'} }>
                <Image 
                    source={confimationImage}
                    style={{width:'100%', height:windowWidth * 1.05}}
                    resizeMode='contain'
                />
        </View>

        <View style={styles.text}>
          <Text style={{fontSize:32, fontWeight:'bold', textAlign:'center'}}>Tudo certo!</Text>
          <Text style={{color:"#a2a3a5"}}> Atraso do usuário {nome} cadastrado com sucesso!</Text>
        </View>

        <View style={{ flexDirection:'column', justifyContent:'center', width:'100%', gap:7, marginTop:windowWidth * 0.1 }}> 
              <TouchableOpacity style={{backgroundColor: "#1194e4",  padding:18, paddingHorizontal: 40, justifyContent:'center', alignItems:'center', borderRadius:5}} onPress={() => navigation.navigate('Login')}>
                 <Text style={{fontSize:19, color:'#fff', fontWeight:'bold'}} onPress={() => navigation.navigate('Login')}>Voltar para o inicio</Text>
              </TouchableOpacity>
          </View>
      
    </View>
  )
};

const windowWidth = Dimensions.get('window').width;

export default confirmationScreen

const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: '#fff',
        paddingHorizontal: windowWidth * 0.05, 
        justifyContent: 'center',
        alignItems: 'center'

      },

      text:{
        alignItems: 'center',
        justifyContent:'center'
      },


})