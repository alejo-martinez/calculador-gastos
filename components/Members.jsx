import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSpent } from './context/spentContext';


const Members = ({ navigation }) => {

  useEffect(() => {
    setForms([...gastos])

  }, [])


  const [forms, setForms] = useState([]);
  const [name, setName] = useState('');
  const [gasto, setGasto] = useState([]);
  const [additionalGasto, setAdditionalGasto] = useState([]);
  const [error, setError] = useState('');
  const [indiceGasto, setIndiceGasto] = useState(0);

  const { calcularGastos, gastos } = useSpent();


  const siguienteGasto = () => {
    if (indiceGasto < gastos.length - 1) setIndiceGasto(indiceGasto + 1);
    else return;
  }

  const gastoAnterior = () => {
    if (indiceGasto > 0) setIndiceGasto(indiceGasto - 1);
    else return;
  }

  const addForm = () => {
    const objActualizado = { ...forms[indiceGasto], integrantes: [...forms[indiceGasto].integrantes, { name, gasto }] };
    const arrayActualizado = [...forms];
    arrayActualizado[indiceGasto] = objActualizado;
    setForms(arrayActualizado);
    setName('');
    setGasto([]);
    setAdditionalGasto('');
    setError('');
  };

  const addAdditionalGasto = (index) => {
    const integrantes = [...forms];
    integrantes[indiceGasto].integrantes[index].gasto.push(0);
    setForms(integrantes)
  };

  const removeForm = (index) => {
    const updatedForms = [...forms];
    updatedForms[indiceGasto].integrantes.splice(index, 1);
    setForms(updatedForms);
  };


  const enviarData = () => {
    try {
      forms.forEach(gasto => {
        let montoTotal = 0;
        gasto.integrantes.forEach(integrante => {
          let montoParcial = 0;
          integrante.gasto.forEach(dinero => {
            montoTotal += parseFloat(dinero);
            montoParcial += parseFloat(dinero);
          })
          integrante.gastoTotal = montoParcial;
        })
        gasto.montoTotal = montoTotal;
      });
      calcularGastos(forms);
      navigation.navigate('Result');

    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  }


  const removeAdditionalGasto = (index, indice) => {
    const updatedGastos = [...forms];
    updatedGastos[indiceGasto].integrantes[index].gasto.splice(indice, 1);
    setAdditionalGasto(updatedGastos);
  };


  const renderForm = (form, index) => (
    <View key={index} style={styles.formContainer}>
      <View style={styles.deleteButtonContainer}>
      <Text style={styles.formTitle}>Integrante {index + 1}</Text>
        <TouchableOpacity style={styles.deleteButton} onPress={() => removeForm(index)}>
          <Icon name="times" size={26} color="red" />
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nombre de/la integrante"
          value={form.name}
          onChangeText={(text) => updateForm(index, 'name', text)}
        />
      </View>
      {form.gasto.map((el, indice) => (
        <View key={`g${indice}`} style={styles.inputContainer}>
          <TextInput placeholder={`Gasto ${indice + 1}`} value={el.toString()} keyboardType='numeric' onChangeText={(text) => updateGastos(index, indice, 'gasto', text)} style={styles.input} />
          <View style={styles.deleteSpentContainer}>
            <TouchableOpacity style={styles.deleteSpentBtn} onPress={() => removeAdditionalGasto(index, indice)}>
              <View style={styles.iconBtn}>
                <Icon name="times" size={17} color="red" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      <View style={styles.addSpentContainer}>
        <TouchableOpacity style={styles.addSpentButton} onPress={() => addAdditionalGasto(index)}>
          <Icon name='dollar' size={14} color="#ffffff"/>
        </TouchableOpacity>
      </View>

    </View>
  );

  const updateForm = (index, field, value) => {
    const updatedForms = [...forms];
    updatedForms[indiceGasto].integrantes[index][field] = value;
    setForms(updatedForms);
  };
  const updateGastos = (index, indice, field, value) => {
    const updatedForms = [...forms];
    updatedForms[indiceGasto].integrantes[index][field][indice] = value;
    setForms(updatedForms);
  };

  return (

    <ScrollView style={styles.container} keyboardShouldPersistTaps='always'>
      <View style={styles.containerTitleGasto}>

        <TouchableOpacity onPress={gastoAnterior} disabled={indiceGasto === 0 ? true : false}>
          <Icon name="caret-left" size={30} style={indiceGasto === 0 ? styles.iconBackDisabled : styles.iconBack}/>
        </TouchableOpacity>

        <Text style={styles.titleGasto}>Gasto: {gastos[indiceGasto].title}</Text>

          <TouchableOpacity onPress={siguienteGasto} disabled={indiceGasto === gastos.length - 1 ? true : false}>
            <Icon name="caret-right" color="#ffffff" size={30} style={indiceGasto === gastos.length - 1 ? styles.iconNextDisabled : styles.iconNext}/>
          </TouchableOpacity>
      </View>
      <View style={styles.containerForms}>
        {forms[indiceGasto]?.integrantes.map((form, index) => renderForm(form, index))}

        <View>{error && <Text style={styles.errorText}>{error}</Text>}
        </View>
        <View style={styles.buttonSendContainer}>
          {forms[indiceGasto]?.integrantes.length > 0 ?
            <TouchableOpacity style={styles.buttonSend} onPress={() => enviarData()}>
              <Text style={styles.buttonSendText}>Calcular</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity disabled={true} style={styles.buttonSendDisabled}><Text style={{ color: '#fff' }}>Calcular</ Text></TouchableOpacity>
          }
        </View>
      </View>
      <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => addForm(indiceGasto)} style={styles.button}>
            <Icon name="user-plus" size={26}/>
          </TouchableOpacity>
        </View>
    </ScrollView>
  )
}

export default Members

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: getStatusBarHeight(),
    backgroundColor: '#071422'
  },
  title: {
    textAlign: 'center',
    fontSize: 21,
    marginTop: '20%',
    color: '#176092'
  },
  button: {
    backgroundColor: '#66CDAA',
    padding: 5,
    borderRadius: 7
  },
  buttonContainer: {
    marginRight:12,
    alignItems: 'flex-end',
  },
  textButton: {
    color: "white",
  },
  formContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    width:'70%',
    alignSelf:'center'
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color:'#032858'
  },
  inputContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 8,
    flex: 1,
    flexDirection: 'row',
  },
  input: {
    paddingHorizontal: 12,
    fontSize: 16,
    width:'90%'
  },
  buttonSend: {
    backgroundColor: '#3498DB',
    padding: 7,
    borderRadius: 5
  },
  buttonSendText: {
    color: '#032858',
    fontWeight:'bold',
    fontSize: 18
  },
  buttonSendContainer: {
    alignItems: 'center',
    marginTop: '20%',
    marginBottom: 15
  },
  deleteButtonContainer: {
    flex:1,
    flexDirection:'row',
    flexWrap:'nowrap',
    justifyContent:'space-between'
    // alignItems: 'flex-end'
  },
  deleteButton: {
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 10
  },
  errorText: {
    color: '#FF6347',
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center'
  },
  containerForms: {
    marginTop: '10%'
  },
  addSpentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: 2,
    marginLeft: 5
  },
  addSpentText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 12
  },
  addSpentButton: {
    backgroundColor: '#05421f',
    padding: 8,
    borderRadius: 5,
  },
  deleteSpentContainer: {
    flex: 1,
    alignItems: 'flex-end',
    marginRight: 13,
  },
  iconBtn: {
    flex: 1,
    justifyContent: 'center'
  },
  btnIndexContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  btnBack: {

    padding: 5,
    borderRadius: 8,
    
  },
  btnNext: {

    padding: 5,
    borderRadius: 8
  },
  btnBackDisabled: {
    backgroundColor:'#001b6f',
    padding: 5,
    borderRadius: 8
  },
  btnNextDisabled: {
    backgroundColor:'#001b6f',
    padding: 5,
    borderRadius: 8
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
  },
  containerTitleGasto: {
    flex:1,
    flexDirection:'row',
    flexWrap:'nowrap',
    justifyContent:'space-around',
    alignContent:'center',
    backgroundColor: '#001b6f',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',

  },
  titleGasto: {
    fontSize: 19,
    fontWeight: 'bold',
    borderRadius: 8,
    color: '#E6B82E'
  },
  iconNext:{
    color:'#ffffff',
  },
  iconNextDisabled:{
    color:'#001b6f'
  },
  iconBack:{
    color:'#ffffff'
  },
  iconBackDisabled:{
    color:'#001b6f'
  },
  buttonSendDisabled:{
    backgroundColor:"#C0C0C1",
    padding:7,
    borderRadius:5
  }
})