import { StyleSheet, Text, View, Button, StatusBar, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useSpent } from './context/spentContext';
import { LinearGradient } from 'expo-linear-gradient';
import ModalAuthor from './ModalAuthor';

const Home = ({ navigation }) => {

  const { setTransacciones, setEachSpent, setEqualMoney } = useSpent();

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTransacciones([]);
    setEachSpent([]);
    setEqualMoney('');
  }, [])

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#F0EAD6', '#EFCB82']}
        style={{ flex: 1 }}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <Text style={styles.title}>Divisor de gastos</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Bills')}>
            <Text style={styles.textButton}>Comenzar a calcular</Text>
          </TouchableOpacity>
        </View>
        {visible &&(
          <View style={styles.overlay}>
            <ModalAuthor visible={visible} onClose={()=> setVisible(false)}/>
          </View>
        )}
        <View style={styles.divBtnInfo}>
          <TouchableOpacity style={styles.btnInfo} onPress={()=> setVisible(true)}>
            <Text style={styles.textInfoAuthor}>Info</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: '100%',
    marginTop: getStatusBarHeight(),
    // backgroundColor: '#fff'
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
},
  title: {
    fontSize: 25,
    textAlign: 'center',
    marginTop: '20%',
    color: '#001659',
    fontWeight: 'bold'
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#001659',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5

  },
  textButton: {
    color: "white",
    fontWeight: 'bold'
  },
  navButtonsContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  divBtnInfo:{
    justifyContent:'center',
    alignItems:'flex-end',
    marginRight: 20,
    marginBottom: 20
  },
  btnInfo:{
    backgroundColor:'#001659',
    padding:8,
    borderRadius:50
  },
    textInfoAuthor:{
    color:'#fff',
    fontWeight:'bold'
  }
})