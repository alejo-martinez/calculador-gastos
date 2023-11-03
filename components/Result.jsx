import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useSpent } from './context/spentContext';
import Icon from 'react-native-vector-icons/FontAwesome';

const Result = ({ navigation }) => {

    const [indiceGasto, setIndiceGasto] = useState(0);

    const { eachSpent } = useSpent();

    const gasto = eachSpent[indiceGasto];

    const siguienteGasto = () => {
        if (indiceGasto < eachSpent.length - 1) setIndiceGasto(indiceGasto + 1);
        else return;
    }

    const gastoAnterior = () => {
        if (indiceGasto > 0) setIndiceGasto(indiceGasto - 1);
        else return;
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.containerBtnInicio}>
                <TouchableOpacity style={styles.btnInicio} onPress={() => navigation.navigate('Home')}>
                    <Icon name="home" size={20} color="#c1d2e6" />
                </TouchableOpacity>
                <View style={styles.containerTitle}>
                    <Text style={styles.title}>División total de los gastos</Text>
                </View>
            </View>
            <View style={styles.containerGastos}>
                <View key={indiceGasto} style={styles.eachGasto}>
                    <View style={styles.infoGasto}>
                        <TouchableOpacity onPress={gastoAnterior} >
                            <Icon name="caret-left" size={30} style={indiceGasto === 0 ? styles.iconBackDisabled : styles.iconBack} />
                        </TouchableOpacity>
                        <View>
                            <Text style={styles.titleGastos}>{gasto.title}</Text>
                            <View>
                                <Text style={styles.infoGastoText}>Monto total: ${gasto.montoTotal.toFixed(2)}</Text>
                                <Text style={styles.infoGastoText}>Por persona: ${gasto.porPersona.toFixed(2)}</Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={siguienteGasto}>
                            <Icon name="caret-right" color="#ffffff" size={30} style={indiceGasto === eachSpent.length - 1 ? styles.iconNextDisabled : styles.iconNext} />
                        </TouchableOpacity>
                    </View>
                    {gasto.integrantes.map((miembro, i) => {
                        return (
                            <View key={`gas${i}`}>
                                {miembro.debe === true ? (
                                    <View style={styles.containerResponseNegative}>
                                        <Text style={styles.spentResponseNegative}>{miembro.name}</Text>
                                        {miembro.gastoTotal == 0 ? <Text style={styles.infoDeudas}>No tuvo gastos</Text> : <Text style={styles.infoDeudas}>Gasto total: ${miembro.gastoTotal.toFixed(2)}</Text>}
                                        <Text style={styles.infoDeudas}>Debe pagar: ${(miembro.gastando * -1).toFixed(2)}</Text>
                                    </View>)
                                    :
                                    miembro.debe === false ? (
                                        <View style={styles.containerResponsePositive}>
                                            <Text style={styles.spentResponsePositive}>{miembro.name}</Text>
                                            <Text style={styles.infoDeudas}>Gasto total: ${miembro.gastoTotal.toFixed(2)}</Text>
                                            {miembro.gastando === 0 ? <Text style={styles.infoDeudas}>No debe pagar ni recibir dinero</Text>
                                             :
                                                <Text style={styles.infoDeudas}>Debe recibir: ${miembro.gastando.toFixed(2)}</Text>}
                                        </View>)
                                        :
                                        <Text style={styles.spentResponseNeutral}>{miembro.name} no debe ni recibe dinero</Text>}
                            </View>
                        )
                    })}

                </View>
                <View style={styles.containerTransacciones}>
                    <Text style={styles.titleTransacciones}>Pagos:</Text>
                    {gasto.transacciones.map((transaccion, i) => {
                        return (
                            <View key={transaccion.id} style={styles.eachTransaccion}>
                                <Text style={styles.textTransaccion}>{transaccion.deudor} debe pagarle ${transaccion.pago.toFixed(2)} a {transaccion.acreedor}</Text>
                            </View>
                        )
                    })}
                </View>
            </View>
        </ScrollView>
    )
}

export default Result

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: getStatusBarHeight(),
        backgroundColor: '#071422'
    },
    title: {
        textAlign: 'center',
        fontSize: 20,
        color: '#E6B82E',

    },
    containerGastos: {
        flex: 1,
        marginTop: '5%',
    },
    eachGasto: {
        borderRadius: 12,
        marginBottom: 32,
        margin: 10,
        flex: 1,
        padding: 5,
    },
    spentResponsePositive: {
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 7,
        backgroundColor: '#056605',
        color: '#d6ead6',
        padding: 5,
        borderRadius: 8
    },
    spentResponseNegative: {
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 7,
        backgroundColor: '#d64b29',
        color: '#f5e0db',
        padding: 5,
        borderRadius: 8
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
        marginTop: '10%',
        flexDirection: 'row',
    },
    btnInicio: {
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
        backgroundColor: '#f7dad4',
        borderRadius: 8,
        marginBottom: 4,
        marginTop: 4,
        borderWidth: 0.5,
        borderColor: 'grey',
    },
    containerResponsePositive: {
        backgroundColor: '#bbd3bb',
        borderRadius: 8,
        marginBottom: 4,
        marginTop: 4,
        borderWidth: 0.5,
        borderColor: 'grey',
    },
    infoDeudas: {
        fontWeight: 'bold',
        color: '#071422',
        padding: 4
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
    },
    titleGastos: {
        fontSize: 20,
        color: '#c1d2e6',
        fontWeight: 'bold',
    },
    infoGasto: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
        backgroundColor: '#001b6f',
        padding: 5,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#0C41B9',
        alignItems: 'center',
    },
    infoGastoText: {
        color: '#c1d2e6',
        fontWeight: 'bold'
    },
    containerTitle: {
        flex: 1
    },
    btnIndexContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    btnBack: {
        backgroundColor: '#D32F2F',
        padding: 5,
        borderRadius: 8
    },
    btnNext: {
        backgroundColor: '#2E7D32',
        padding: 5,
        borderRadius: 8
    },
    btnBackDisabled: {
        backgroundColor: '#FFCDD2',
        padding: 5,
        borderRadius: 8
    },
    btnNextDisabled: {
        backgroundColor: '#C8E6C9',
        padding: 5,
        borderRadius: 8
    },
    btnText: {
        color: 'white',
        fontWeight: 'bold',
    },
    containerTransacciones: {
        backgroundColor: '#001b6f',
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        flexDirection: 'column',
        padding: 5,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#0C41B9',
        width: '80%'

    },
    eachTransaccion: {
        marginTop: 2,
        marginBottom: 2,
        padding: 6,
        borderRadius: 8
    },
    textTransaccion: {
        fontSize: 14,
        color: '#c1d2e6',
        fontWeight: 'bold',
    },
    titleTransacciones: {
        fontSize: 16,
        color: '#c1d2e6'
    },
    iconNext: {
        color: '#ffffff',
    },
    iconNextDisabled: {
        color: '#001b6f'
    },
    iconBack: {
        color: '#ffffff'
    },
    iconBackDisabled: {
        color: '#001b6f'
    },
})