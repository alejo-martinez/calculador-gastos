import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
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
            setearGastos(form);
            navigation.navigate('Members');
        } catch (error) {
            console.log(error);
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
                <TextInput placeholder={'Comida / bebida / etc...'} value={form.title} onChangeText={(text) => updateForm(index, 'title', text)} style={styles.input} />
            </View>
        </View>
    )

    return (
        <ScrollView style={styles.container} keyboardShouldPersistTaps='always'>

                <Text style={styles.title}>Ingresa el nombre de cada gasto a calcular</Text>
                <View style={styles.containerBtn}>
                    <TouchableOpacity onPress={() => addForm()} style={styles.btnAdd}>
                        <Text>Agregar grupo de gasto</Text>
                    </TouchableOpacity>
                </View>

                {form.map((element, index) => renderForm(element, index))}

                <View style={styles.containerBtnSiguiente}>
                    <TouchableOpacity onPress={() => continuar()} style={styles.btnSiguiente}>
                        <Text style={styles.btnSiguienteText}>Siguiente</Text>
                    </TouchableOpacity>
                </View>

        </ScrollView>
    )
}

export default Bills

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: getStatusBarHeight(),

    },
    title: {
        textAlign: 'center',
        marginTop: 12,
        fontSize: 16,
        color: 'blue',
        fontWeight: 'bold'
    },
    containerBtn: {
        alignItems: 'center',
        marginTop: 18
    },
    btnAdd: {
        backgroundColor: "#039be5",
        padding: 4,
        borderRadius: 8,
        // alignItems:'center',
        // alignContent:'center'
    },
    containerBtnSiguiente: {
        alignItems: 'center',
    },
    btnSiguiente: {
        backgroundColor: "#4CAF50",
        padding: 10,
        borderRadius: 8,
    },
    btnSiguienteText: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
        // justifyContent:'flex-end'
    },
    formContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 16,
        marginBottom: 16,
        elevation: 3,
        marginTop: 25
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
    formTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
})