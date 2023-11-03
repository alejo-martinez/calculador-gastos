import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useSpent } from './context/spentContext';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const Bills = ({ navigation }) => {

    const { setearGastos } = useSpent();

    const [gasto, setGasto] = useState([]);
    const [form, setForm] = useState([]);
    const [error, setError] = useState('');
    const [title, setTitle] = useState('');

    const updateForm = (index, field, value) => {
        const updatedForms = [...form];
        updatedForms[index][field] = value;
        setForm(updatedForms);
    };

    const addForm = () => {
        setForm([...form, { title, integrantes:[] }]);
    }

    const removeForm = (index) => {
        const updatedForms = [...form];
        updatedForms.splice(index, 1);
        setForm(updatedForms);
    };

    const continuar = () => {
        try {
            if(form.length === 0) throw new Error('Debes agregar un gasto.');
            const incompleteData = form.some(gasto => {
                const valores = Object.values(gasto);
                return valores.some(valor => valor === '' || valor === null || valor === undefined);
            })
            if(incompleteData) throw new Error('Debes agregar un nombre al/los gasto/s.');
            setearGastos(form);
            navigation.navigate('Members');
        } catch (error) {
            setError(error.message)
        }
    }


    const renderForm = (form, index) => (
        <View key={index} style={styles.formContainer}>
            <View>
                <View style={styles.deleteFormContainer}>
                    <Text style={styles.formTitle}>Gasto {index + 1}</Text>
                    <TouchableOpacity style={styles} onPress={() => removeForm(index)}>
                        <Icon name="times" size={26} color="red" />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.inputContainer}>
                <TextInput placeholder={'Título del gasto'} value={form.title} onChangeText={(text) => updateForm(index, 'title', text)} style={styles.input} />
            </View>
        </View>
    )

    return (
        <ScrollView style={styles.container} keyboardShouldPersistTaps='always'>
            <View style={styles.containerView}>

                <Text style={styles.title}>Tipos de gastos</Text>


                {form.map((element, index) => renderForm(element, index))}

                <View style={styles.containerBtnSiguiente}>
                    <TouchableOpacity onPress={() => continuar()} disabled={form.length === 0 ? true : false} style={form.length === 0 ? styles.btnSiguienteDisabled : styles.btnSiguiente}>
                        <Text style={styles.btnSiguienteText}>Siguiente</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.containerError}>
                    <Text style={styles.textError}>{error}</Text>
                </View>

                <View style={styles.containerBtn}>
                    <TouchableOpacity onPress={() => addForm()} style={styles.btnAdd}>
                        {/* <Text style={styles.textBtnAdd}>+Agregar</Text> */}
                        <FeatherIcon name="plus" size={50} color="#3398db" />
                    </TouchableOpacity>
                </View>

            </View>
        </ScrollView>
    )
}

export default Bills

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: getStatusBarHeight(),
        backgroundColor:'#071422',
    },
    containerView:{
        marginTop:'10%',
        alignItems:'center',
        flex:1
    },
    title: {
        textAlign: 'center',
        marginTop: 12,
        fontSize: 20,
        color: '#E6B82E',
        fontWeight: 'bold'
    },
    containerBtn: {
        marginRight:12,
        alignSelf:'flex-end',
    },
    btnAdd: {
        padding: 4,
        borderRadius: 8,
    },
    containerBtnSiguiente: {
        alignItems: 'center',
        marginTop:20
    },
    btnSiguiente: {
        backgroundColor: "#4CAF50",
        padding: 5,
        borderRadius: 8,
    },
    btnSiguienteDisabled:{
        backgroundColor:"#dcdbdb",
        padding: 5,
        borderRadius: 8,
    },
    btnSiguienteText: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },
    formContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 16,
        marginBottom: 16,
        elevation: 3,
        marginTop: 25,
        width:'50%',
    },
    formTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    inputContainer: {
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        marginBottom: 8,
        flex: 1,
        flexDirection: 'row',
    },
    deleteFormContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    input: {
        paddingHorizontal: 12,
        fontSize: 16,
    },
    containerError:{
        marginTop:20
    },
    textError:{
        textAlign:'center',
        color:'red'
    },
    textBtnAdd:{
        color:'white',
        fontWeight:'bold'
    }
})