import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useSpent } from './context/spentContext';

const Result = ({ navigation }) => {

    const { eachSpent, equalMoney, spent, dividirGastos } = useSpent();

    useEffect(() => {
        dividirGastos();
    }, []);

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>División total de los gastos:</Text>
            <View style={styles.containerGastos}>
                {eachSpent.map(miembro => {
                    return (
                        <View key={miembro.index} style={styles.eachGasto}>

                            {miembro.debe === true ? (<View style={styles.containerResponseNegative}><Text style={styles.spentResponseNegative}>Gastos de {miembro.name}</Text>
                                {miembro.gastoTotal == 0 ? <Text style={styles.infoDeudas}>No tuvo gastos</Text> : <Text style={styles.infoDeudas}>Gasto total: ${miembro.gastoTotal}</Text>}
                                <Text style={styles.infoDeudas}>Debe pagar: ${(miembro.gasto * -1).toFixed(2)}</Text></View>)
                                :
                                miembro.debe === false ? (<View style={styles.containerResponsePositive}>
                                    <Text style={styles.spentResponsePositive}>Gastos de {miembro.name}</Text>
                                    <Text style={styles.infoDeudas}>Gasto total: ${miembro.gastoTotal}</Text>
                                    <Text style={styles.infoDeudas}>Debe recibir: ${miembro.gasto.toFixed(2)}</Text>
                                </View>)
                                    :
                                    <Text style={styles.spentResponseNeutral}>{miembro.name} no debe ni recibe dinero</Text>}
                        </View>
                    )
                })}
            </View>
            <View style={styles.containerInfo}>
                <View style={styles.containerOrgGastos}>
                    <Text style={styles.tituloGastos}>Organización de gastos:</Text>
                </View>
                <View style={styles.containerTextInfo}>
                    <Text style={styles.textInfo}>Gasto total: ${spent.toFixed(2)}</Text>
                    <Text style={styles.textInfo}>Cada uno debería gastar: ${equalMoney.toFixed(2)}</Text>
                </View>
            </View>
            <View style={styles.containerBtnInicio}>
                <TouchableOpacity style={styles.btnInicio} onPress={() => navigation.navigate('Home')}>
                    <Text style={styles.textInicio}>Volver al inicio</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default Result

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: getStatusBarHeight(),
        backgroundColor: '#F0F0F0'
    },
    title: {
        textAlign: 'center',
        fontSize: 20,
        marginTop: '10%',
        color: '#555555'
    },
    containerGastos: {
        flex: 1,
        marginTop: '5%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
    },
    eachGasto: {
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
    },
    spentResponsePositive: {
        fontSize: 18,
        textAlign: 'center',
        color: '#FFFFFF',
    },
    spentResponseNegative: {
        fontSize: 18,
        textAlign: 'center',
        color: '#FFFFFF',
    },
    spentResponseNeutral: {
        fontSize: 18,
        padding: 3,
        borderRadius: 5,
        backgroundColor: '#9E9E9E',
        color: '#FFFFFF',
    },
    containerBtnInicio: {
        flex: 1,
        alignItems: 'center',
        marginTop: '10%',
        justifyContent: 'center'
    },
    btnInicio: {
        backgroundColor: '#3498DB',
        padding: 5,
        borderRadius: 5
    },
    textInicio: {
        fontWeight: "bold",
        color: 'white'
    },
    containerInfo: {
        marginTop: '12%',
        marginLeft: 11,
        backgroundColor: '#D3D3D3',
        padding: 5,
        borderRadius: 5,
        alignSelf: 'center',
        borderWidth: 2,
        borderColor: '#555555'
    },
    textInfo: {
        color: '#3498DB',
        fontSize: 18,
        fontWeight: 'bold'
    },
    textoDeuda: {
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center'
    },
    containerTextInfo: {
        marginTop: 12
    },
    containerResponseNegative: {
        padding: 3,
        borderRadius: 5,
        backgroundColor: '#F44336',
        borderWidth: 2,
        borderColor: '#D32F2F',
    },
    containerResponsePositive: {
        padding: 3,
        borderRadius: 5,
        backgroundColor: '#4CAF50',
        borderWidth: 2,
        borderColor: '#388E3C',
    },
    infoDeudas: {
        fontWeight: 'bold',
        color: 'black'
    },
    tituloGastos: {
        fontSize: 20,
        marginBottom: 10,
        textAlign: 'center'
    },
    containerOrgGastos: {
        backgroundColor: '#C7C7C7',
        padding: 5,
        borderRadius: 5
    }
})