import { useState, useContext, createContext, useEffect } from "react";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

const spentContext = createContext();

const useSpent = () => {
    const context = useContext(spentContext);
    if (!context) throw new Error('There is no context');
    return context;
}

const SpentProvider = ({ children }) => {
    const [equalMoney, setEqualMoney] = useState(0);
    const [eachSpent, setEachSpent] = useState([]);
    const [transacciones, setTransacciones] = useState([]);
    const [gastos, setGastos] = useState([]);

    const calcularGastos = (arrayGastos) => {
        arrayGastos.forEach(gasto => {
            const incompleteData = gasto.integrantes.some(miembro => {
                const valores = Object.values(miembro);
                return valores.some(valor => valor === '' || valor === null || valor === undefined);
            })
            if (incompleteData) throw new Error('Debes completar todos los datos del (nombre de los integrantes)');
            if (gasto.integrantes.length <= 1) throw new Error('Debes agregar al menos 2 personas');
            if (!gasto.montoTotal || gasto.montoTotal === 0) throw new Error('El total de los gastos debe ser mayor a 0');
            const cantMiembros = gasto.integrantes.length;
            const gastoPorIgual = (gasto.montoTotal / cantMiembros);
            gasto.porPersona = gastoPorIgual;
            gasto.integrantes.forEach(integrante => {
                let gastoMiembro = parseFloat(integrante.gastoTotal) - gastoPorIgual;
                integrante.id = uuidv4();
                integrante.gastando = gastoMiembro;
                integrante.debe = gastoMiembro < 0 ? true : false;
            });

        })

        arrayGastos.forEach(gasto =>{
            const miembrosOrdenados = gasto.integrantes.slice().sort((a, b) => b.gastando - a.gastando);
            const pagadores = [];
            const receptores = [];
            gasto.transacciones = [];
            miembrosOrdenados.forEach(miembro => {
                if (miembro.debe === true) pagadores.push({ ...miembro });
                if (miembro.debe === false) {
                    if (miembro.gasto === 0) return;
                    else receptores.push({ ...miembro });
                }
            });
            for (let i = 0; i < receptores.length; i++) {
                let receptor = receptores[i];
                if(receptor.gastando == 0) return;
                for (let j = 0; j < pagadores.length; j++) {
                    let pagador = pagadores[j];
                    if(pagador.gastando == 0) return;
                    let pago = Math.min(receptor.gastando, Math.abs(pagador.gastando));
                    
                    let transaccion = { deudor: pagador.name, acreedor: receptor.name, pago: pago, id: uuidv4() };
                    gasto.transacciones.push(transaccion);

                    receptor.gastando -= pago;
                    pagador.gastando += pago;

                    if (receptor.gastando === 0 && pagador.gastando === 0) {
                        receptores.splice(i, 1);
                        pagadores.splice(j, 1);
                        i--;
                        break;
                    } else if (receptor.gastando === 0 && pagador.gastando < 0) {
                        receptores.splice(i, 1);
                        i--;
                        break;
                    } else if (receptor.gastando > 0 && pagador.gastando === 0) {
                        pagadores.splice(j, 1);
                        j--;
                    }
                }
            }

        })
        setEachSpent(arrayGastos);
    }


    const setearGastos = (arrayGastos) => {
        setGastos(arrayGastos);
    }

    return (
        <spentContext.Provider value={{ eachSpent, equalMoney, transacciones, setTransacciones, setEachSpent, setEqualMoney, calcularGastos, setearGastos, gastos }}>
            {children}
        </spentContext.Provider>
    )
}

export { SpentProvider, spentContext, useSpent };