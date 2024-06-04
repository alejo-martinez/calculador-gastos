// ExpenseModal.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';

const FormMembers = ({ visible, onClose, onSave }) => {
  const [memberName, setMemberName] = useState(''); // Estado para el nombre del integrante
  const [partialExpenses, setPartialExpenses] = useState([]); // Estado para los gastos parciales
  const [error, setError] = useState(null);


  const handleAddExpenseField = () => {
    setPartialExpenses([...partialExpenses, '']);
  };

  const handlePartialExpenseChange = (text, index) => {
    const newPartialExpenses = [...partialExpenses];
    newPartialExpenses[index] = text;
    setPartialExpenses(newPartialExpenses);
  };

  const handleSave = () => {
    try {
      if(memberName === '') throw new Error('Escribe un nombre para el integrante')
      for (let index = 0; index < partialExpenses.length; index++) {
          const element = partialExpenses[index];
        if (element === "" || Number(element) <= 0) {
          partialExpenses.splice(index, 1);
          index -= 1;
        }
      }
      const nombre = memberName.trim();
      onSave({ name: nombre, expenses: partialExpenses });
      setMemberName('');
      setPartialExpenses([]);
      onClose();
    } catch (error) {
      setError(error.message);
    }
  };

  const deletePartialExpense = (i) => {
    const editPartialExpenses = [...partialExpenses];
    editPartialExpenses.splice(i, 1);
    setPartialExpenses(editPartialExpenses);
  }

  const closeModal = () => {
    if(error) setError('')
    setPartialExpenses([]);
    onClose();
  }

  return (
    <Modal
      animationIn="zoomIn"
      animationOut="zoomOut"
      animationInTiming={2000}
      animationOutTiming={3000}
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalView}>
        <Text style={styles.modalText}>{memberName === ''? 'Nuevo integrante':`Gasto de: ${memberName}`}</Text>
        <TextInput
          style={styles.inputName}
          placeholder="Nombre"
          value={memberName}
          onChangeText={setMemberName}
        />
        <ScrollView style={styles.expensesContainer} keyboardShouldPersistTaps="always">
          {partialExpenses.map((expense, index) => (
            <View key={`exp${index}`} style={styles.divExpense}>
            <Text>$</Text>
              <TextInput
                key={index}
                style={styles.input}
                placeholder={`Gasto n°${index + 1}`}
                keyboardType="numeric"
                value={expense}
                onChangeText={(text) => handlePartialExpenseChange(text, index)}
              />
              <TouchableOpacity onPress={() => deletePartialExpense(index)}>
                <Icon name="trash" size={26} color='#980303'/>
              </TouchableOpacity>
            </View>
          ))}
          <TouchableOpacity onPress={handleAddExpenseField} style={styles.btnAddExpense}>
            <Text style={styles.textBtnAdd}>Agregar gasto parcial $$</Text>
          </TouchableOpacity>
        </ScrollView>
        <View style={styles.divBtns}>
          <TouchableOpacity onPress={closeModal} style={styles.btnCancel}>
            <Text style={styles.textBtn}>CANCELAR</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSave} style={styles.btnConfirm}>
            <Text style={styles.textBtn}>CONFIRMAR</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.textError}>{error && error}</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    // display:'flex',
    // justifyContent: 'center',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    marginBottom: 20,
    paddingLeft: 10,
  },
  inputName:{
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '50%',
    marginBottom: 20,
    paddingLeft: 10,
    alignSelf: 'center'
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
  },
  expensesContainer: {
    // width: '100%',
    marginBottom: 20,
  },
  divExpense: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  btnAddExpense: {
    backgroundColor: '#00a680',
    padding: 10,
    borderRadius: 8,
  },
  textBtnAdd: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold'
  },
  btnConfirm: {
    backgroundColor: '#031798',
    padding: 6,
    borderRadius: 4
  },
  btnCancel: {
    backgroundColor:'#980303',
    padding: 6,
    borderRadius: 4
  },
  textBtn:{
    color: '#fff',
    fontWeight: 'bold'
  },
  divBtns:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textError:{
    color: '#A20000',
    fontWeight:'bold',
    marginTop:15
  }

});

export default FormMembers;
