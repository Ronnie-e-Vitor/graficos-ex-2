import CadastroScreen from "./cadastroScreen";
import HomeScreen from "./homeScreen";
import ConfirmationScreen from "./confirmationScreen";
import ConfirmAtr from "./confirmAtr";
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "./loginScreen";
import Consulta from "./consulta";
import Teste from "./teste";
import Graficos from "./graficos";

const Stack = createNativeStackNavigator();

const Rotas = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, 
      }}

      initialRouteName="Login"
    >
      <Stack.Screen name="Cadastro" component={CadastroScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Confirm" component={ConfirmationScreen} />
      <Stack.Screen name="ConfirmAtr" component={ConfirmAtr} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Consulta" component={Consulta} />
      <Stack.Screen name="Teste" component={Teste} />
      <Stack.Screen name="Graficos" component={Graficos} />
      
    </Stack.Navigator>
  );
};

export default Rotas;