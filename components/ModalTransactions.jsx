import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal';

const ModalTransactions = ({ visible, onClose, gasto }) => {
    return (
        <Modal 
        animationIn="zoomIn"
        animationOut="zoomOut"
        animationInTiming={2000}
        animationOutTiming={3000}
        transparent={true}
        visible={visible}
        onRequestClose={onClose}>

            <View style={styles.containerTransacciones}>
                <Text style={styles.titleTransacciones}>Pagos:</Text>
                {gasto.transacciones.map((transaccion, i) => {
                    return (
                        <View key={transaccion.id} style={styles.eachTransaccion}>
                            <Text style={styles.textTransaccion}>{transaccion.deudor} debe pagarle ${transaccion.pago.toFixed(2)} a {transaccion.acreedor}</Text>
                        </View>
                    )
                })}
                <TouchableOpacity onPress={onClose} style={styles.btnClose}>
                    <Text style={styles.textBtnClose}>Cerrar</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    )
}

export default ModalTransactions

const styles = StyleSheet.create({
    containerTransacciones: {
        backgroundColor: '#001b6f',
        // flex: 1,
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
    btnClose:{
        backgroundColor:'#980303',
        padding: 4,
        borderRadius: 4 
    },
    textBtnClose:{
        color:'#fff',
        fontWeight:'bold'
    }
})