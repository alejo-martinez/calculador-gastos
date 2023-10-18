import { StyleSheet, Text, View, Button, StatusBar, TouchableOpacity } from 'react-native'
import React, {useEffect} from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useSpent } from './context/spentContext';

const Home = ({ navigation }) => {

  const {setTransacciones, setEachSpent, setEqualMoney} = useSpent();

  useEffect(() => {
    setTransacciones([]);
    setEachSpent([]);
    setEqualMoney('');
  }, [])
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Divisor de gastos</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Members')}>
            <Text style={styles.textButton}>Comenzar a calcular</Text>
          </TouchableOpacity>
        </View>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: '100%',
    marginTop: getStatusBarHeight(),
    backgroundColor: '#F0F0F0'
  },
  title: {
    fontSize: 25,
    textAlign: 'center',
    marginTop: '20%',
    color: '#3498DB',
    fontWeight: 'bold'
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#3498DB',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5

  },
  textButton: {
    color: "white",
  },
  navButtonsContainer:{
    flex:1,
    justifyContent:'space-evenly',
    flexDirection:'row',
  }
})