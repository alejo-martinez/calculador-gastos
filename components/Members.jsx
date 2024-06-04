import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSpent } from './context/spentContext';

import { LinearGradient } from 'expo-linear-gradient';

import FormMembers from './FormMembers';


const Members = ({ navigation }) => {
  
  const { calcularGastos, gastos } = useSpent();
  useEffect(() => {
    setForms([...gastos])

  }, [])


  const [forms, setForms] = useState([]);
  const [name, setName] = useState('');
  const [gasto, setGasto] = useState([]);
  const [additionalGasto, setAdditionalGasto] = useState([]);
  const [error, setError] = useState('');
  const [indiceGasto, setIndiceGasto] = useState(0);
  // const [images, setImages] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);


  const [usedImagesPerGasto, setUsedImagesPerGasto] = useState(Array(gastos.length).fill([]));

  const imagePaths = [
    require('../img/random/img1.jpeg'),
    require('../img/random/img2.jpeg'),
    require('../img/random/img3.jpeg'),
    require('../img/random/img4.jpeg'),
    require('../img/random/img5.jpeg'),
    require('../img/random/img6.jpeg'),
    require('../img/random/img7.jpeg'),
    require('../img/random/img8.jpeg'),
    require('../img/random/img9.jpeg'),
    require('../img/random/img10.jpeg'),
    require('../img/random/img11.jpeg'),
    require('../img/random/img12.jpeg'),
    require('../img/random/img13.jpeg'),
    require('../img/random/img14.jpeg'),
    require('../img/random/img15.jpeg'),
    require('../img/random/img16.jpeg'),
    require('../img/random/img17.jpeg'),
    require('../img/random/img18.jpeg'),
    require('../img/random/img19.jpeg'),
    require('../img/random/img20.jpeg'),
    require('../img/random/img21.jpeg'),
    require('../img/random/img22.jpeg'),
    require('../img/random/img23.jpeg'),
    require('../img/random/img24.jpeg'),
    require('../img/random/img25.jpeg'),
  ];

  const getRandomImage = () => {
    const availableImages = imagePaths.filter(path => !usedImagesPerGasto[indiceGasto].includes(path));
    const randomIndex = Math.floor(Math.random() * availableImages.length);
    const randomImage = availableImages[randomIndex];
    const newUsedImages = [...usedImagesPerGasto];
    newUsedImages[indiceGasto] = [...newUsedImages[indiceGasto], randomImage];
    setUsedImagesPerGasto(newUsedImages);
    return randomImage;
  };

  // console.log(forms)
  // console.log(gastos[0].integrantes)

  const siguienteGasto = () => {
    if (indiceGasto < gastos.length - 1) setIndiceGasto(indiceGasto + 1);
    else return;
  }

  const gastoAnterior = () => {
    if (indiceGasto > 0) setIndiceGasto(indiceGasto - 1);
    else return;
  }


  const enviarData = () => {
    try {
      forms.forEach(gasto => {
        let montoTotal = 0;
        gasto.integrantes.forEach(integrante => {
          montoTotal += Number(integrante.totalExpense);
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



  const handleSaveExpense = (expense) => {
    const randomImage = getRandomImage();
    // console.log(expense)
    const concatExpenses = expense.expenses.reduce((ac, val) => Number(ac) + Number(val), 0);
    expense.totalExpense = concatExpenses;
    expense.img = randomImage;
    const newForm = [...forms];
    newForm[indiceGasto].integrantes.push(expense);
    setForms(newForm);
    // setExpenses([...expenses, expense]);
  };

  const deleteMember = (i) => {
    const newForm = [...forms];
    newForm[indiceGasto].integrantes.splice(i, 1);
    setForms(newForm)
  }

  return (

    <LinearGradient
      colors={['#F0EAD6', '#EFCB82']}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <ScrollView style={styles.container} keyboardShouldPersistTaps='always'>

        <View style={styles.containerTitleGasto}>

          <TouchableOpacity onPress={gastoAnterior} disabled={indiceGasto === 0 ? true : false}>
            <Icon name="caret-left" size={30} style={indiceGasto === 0 ? styles.iconBackDisabled : styles.iconBack} />
          </TouchableOpacity>

          <Text style={styles.titleGasto}>Gasto: {gastos[indiceGasto].title}</Text>

          <TouchableOpacity onPress={siguienteGasto} disabled={indiceGasto === gastos.length - 1 ? true : false}>
            <Icon name="caret-right" color="#ffffff" size={30} style={indiceGasto === gastos.length - 1 ? styles.iconNextDisabled : styles.iconNext} />
          </TouchableOpacity>
        </View>
        <FormMembers
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSave={handleSaveExpense}
        />
        <View>

          <View style={styles.divAllMembers}>
            {forms[indiceGasto]?.integrantes.map((form, index) => {
              return (
                <View key={`member${index}`} style={styles.divMember}>
                  <View style={styles.divHeaderMember}>
                    <Image source={form.img} style={styles.imgRandom} />
                    <TouchableOpacity onPress={() => deleteMember(index)} style={styles.btnDeleteMember}>
                      <Icon name='trash' color='red' size={19} />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.memberInfo}>Integrante: {form.name}</Text>
                  {form.expenses.map((exp, ind) => {
                    return (
                      <View key={`expense${ind}`} style={styles.divExpensesMember}>
                        <Text style={styles.memberInfoExpenses}>Gasto {ind + 1}: ${exp}</Text>
                      </View>
                    )
                  })}
                  <Text style={styles.memberInfoTotal}>Total gastado: ${form.totalExpense}</Text>
                </View>
              )
            })}
          </View>

          <View>
            <Text style={styles.errorText}>{error && error}</Text>
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
          <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.button}>
            <Icon name="user-plus" size={26} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  )
}

export default Members

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: getStatusBarHeight(),
    // backgroundColor: '#fff',
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
    marginRight: 12,
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
    width: '70%',
    alignSelf: 'center'
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#032858'
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
    width: '90%'
  },
  buttonSend: {
    backgroundColor: '#001659',
    padding: 7,
    borderRadius: 5
  },
  buttonSendText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18
  },
  buttonSendContainer: {
    alignItems: 'center',
    marginTop: '20%',
    marginBottom: 15
  },
  deleteButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between'
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
    backgroundColor: '#001b6f',
    padding: 5,
    borderRadius: 8
  },
  btnNextDisabled: {
    backgroundColor: '#001b6f',
    padding: 5,
    borderRadius: 8
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
  },
  containerTitleGasto: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-around',
    alignContent: 'center',
    backgroundColor: '#F0EAD6',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',

  },
  titleGasto: {
    fontSize: 19,
    fontWeight: 'bold',
    borderRadius: 8,
    color: '#001659'
  },
  iconNext: {
    color: '#001659',
  },
  iconNextDisabled: {
    color: '#F0EAD6'
  },
  iconBack: {
    color: '#001659'
  },
  iconBackDisabled: {
    color: '#F0EAD6'
  },
  buttonSendDisabled: {
    backgroundColor: "#C0C0C1",
    padding: 7,
    borderRadius: 5
  },
  memberInfo: {
    color: '#343A40',
    fontWeight: 'bold'
  },
  memberInfoExpenses: {
    color: '#6C757D',
  },
  memberInfoTotal: {
    color: '#DC3545',
    fontWeight: 'bold'
  },
  divMember: {
    // flex: 1,
    alignItems: 'center',
    borderColor: '#fff',
    borderWidth: 1,
    width: '50%',
    backgroundColor: '#F8F9FA',
    padding: 4
  },
  divAllMembers: {
    // flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  btnDeleteMember: {
    position: 'relative',
    top: 2,
    right: -25
    // alignSelf: 'flex-end',
    // padding: 4
  },
  imgRandom: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
  divHeaderMember: {
    display: 'flex',
    flexDirection: 'row'
  }
})