import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';

const ModalAuthor = ({ visible, onClose }) => {

    return (
        <Modal
            animationIn="zoomIn"
            animationOut="zoomOut"
            animationInTiming={2000}
            animationOutTiming={3000}
            transparent={true}
            visible={visible}
            onRequestClose={onClose}>
            <View style={styles.containerModal}>
                <View style={styles.divIconoClose}>
                    <TouchableOpacity style={styles.btnClose} onPress={onClose}>
                        <Icon name='times' style={styles.iconClose} size={20} color='#7A0000' />
                    </TouchableOpacity>
                </View>
                <View style={styles.divInfoAuthor}>
                    <Text style={styles.textTitle}>App creada por Alejo Martinez</Text>
                    <Text style={styles.textAuthor}>Para donaciones:</Text>
                    <View>
                        <View style={styles.divCuenta}>
                            <Text style={styles.textAuthor}>CVU:</Text>
                            <Text style={styles.textAuthor} selectable={true}>0000003100017765508007</Text>
                        </View>
                        <View style={styles.divCuenta}>
                            <Text style={styles.textAuthor}>ALIAS:</Text>
                            <Text style={styles.textAuthor} selectable={true}>alejo.mercado</Text>
                        </View>
                    </View>
                    <View style={styles.divCuenta}>
                        <Text style={styles.textAuthor}>Contacto o sugerencias:</Text>
                        <Text selectable={true} style={styles.textAuthor}>alejoomartinex11@gmail.com</Text>
                    </View>
                    <Text style={styles.textFooter}>Gracias por utilizarla ❤</Text>
                </View>
            </View>
        </Modal>
    )
}

export default ModalAuthor

const styles = StyleSheet.create({
    containerModal: {
        backgroundColor: '#001659',
        justifyContent: 'center',
        // alignItems: 'center',
        padding: 10,
        borderRadius: 6
    },
    divIconoClose: {
        alignSelf: 'flex-end'
    },
    btnClose: {

    },
    divInfoAuthor: {
        display: 'flex',
        gap: 8
    },
    textAuthor: {
        color: '#fff',
        fontWeight: 'bold'
    },
    textTitle:{
        color:'#fff',
        fontWeight:'bold',
        fontSize:18,
        textAlign:'center'
    },
    textFooter:{
        textAlign:'center',
        color:'#fff',
        
    },
    divCuenta: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap:'wrap',
        gap: 8
    }

})