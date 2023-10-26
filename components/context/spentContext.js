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
    const [spent, setSpent] = useState([]);
    const [equalMoney, setEqualMoney] = useState(0);
    const [members, setMembers] = useState([]);
    const [eachSpent, setEachSpent] = useState([]);
    const [transacciones, setTransacciones] = useState([]);
    const [gastos, setGastos] = useState([]);

    const calcularGastos = (arrayGastos) => {
        arrayGastos.forEach(gasto => {
            const incompleteData = gasto.integrantes.some(miembro => {
                const valores = Object.values(miembro);
                return valores.some(valor => valor === '' || valor === null || valor === undefined);
            })
            if (incompleteData) throw new Error('Debes completar todos los datos (nombre de los integrantes)');
            if (gasto.integrantes.length <= 1) throw new Error('Debes agregar al menos 2 personas');
            if (!gasto.montoTotal || gasto.montoTotal === 0) throw new Error('El total de los gastos debe ser mayor a 0');
            const cantMiembros = gasto.integrantes.length;
            const gastoPorIgual = gasto.montoTotal / cantMiembros;
            // setSpent([...spent, {gasto: gasto.title, monto: gasto.montoTotal, montoPorPersona: gastoPorIgual}]);
            gasto.porPersona = gastoPorIgual.toFixed(2);
            gasto.integrantes.forEach(integrante => {
                let gastoMiembro = parseFloat(integrante.gastoTotal) - gastoPorIgual;
                integrante.id = uuidv4();
                integrante.gastando = gastoMiembro
                integrante.debe = gastoMiembro < 0 ? true : false;
            })
            // dividirGastos(miembros, gasto);

            // gasto.integrantes.map(miembro => {
            //     let id = uuidv4();
            //     const gastoDeMiembro = parseFloat(miembro.gastoTotal) - gastoPorIgual;
            //     return { name: miembro.name, gasto: gastoDeMiembro, gastoTotal: miembro.gastoTotal, gastosParciales: miembro.gasto, index: id, debe: gastoDeMiembro < 0 ? true : false };
            // });

            // SEGUIR SETEANDO TODO

            // setEqualMoney(parseFloat(gasto));
            // setMembers(miembros);
            // setEachSpent([...eachSpent, ]);
        })
        setEachSpent(arrayGastos);
    }

    const dividirGastos = (array, gastoIgual) => {
        const newEachSpent = array.map(miembro => {
            let id = uuidv4();
            const gasto = parseFloat(miembro.gastoTotal) - gastoIgual;
            return { name: miembro.name, gasto: gasto, gastoTotal: miembro.gastoTotal, gastosParciales: miembro.gasto, index: id, debe: gasto < 0 ? true : false };
        });
        setEachSpent(newEachSpent);
    }

    const transferencias = (array) => {
        const miembrosOrd = array.slice().sort((a, b) => b.gasto - a.gasto);
        const pagadores = [];
        const receptores = [];
        miembrosOrd.forEach(miembro => {
            if (miembro.debe === true) pagadores.push({ ...miembro });
            if (miembro.debe === false) {
                if (miembro.gasto === 0) return;
                else receptores.push({ ...miembro });
            }
        });
        for (let i = 0; i < receptores.length; i++) {
            let receptor = receptores[i];
            // let recibe = receptor.gasto.toFixed(2);

            for (let j = 0; j < pagadores.length; j++) {
                let pagador = pagadores[j];
                let pago = Math.min(receptor.gasto.toFixed(2), Math.abs(pagador.gasto.toFixed(2)));
                // console.log(`Lo que debe recibir receptor: ${receptor.gasto}`);
                // console.log(`Lo que debe pagar pagador: ${pagador.gasto}`);

                let transaccion = { deudor: pagador.name, acreedor: receptor.name, pago: pago, id: uuidv4() };
                setTransacciones([...transacciones, transaccion]);
                receptor.gasto -= pago;
                pagador.gasto += pago;

                // console.log(`Receptor queda en: ${receptor.gasto}`);
                // // console.log(`Pagador queda en: ${pagador.gasto}`);
                if (receptor.gasto === 0 && pagador.gasto === 0) {
                    // console.log('Ambas deudas saldadas.');
                    receptores.splice(i, 1);
                    pagadores.splice(j, 1);
                    i--;
                    break;
                } else if (receptor.gasto === 0 && pagador.gasto < 0) {
                    // console.log(`${pagador.name} pagó ${pago} a ${receptor.name} y saldo deuda de receptor`);
                    receptores.splice(i, 1);
                    i--;
                    break;
                } else if (receptor.gasto > 0 && pagador.gasto === 0) {
                    // console.log(`${pagador.name} pagó ${pago} a ${receptor.name} y saldo deuda de pagador`);
                    pagadores.splice(j, 1);
                    j--;
                }
            }
        }
    }

    const setearGastos = (arrayGastos) => {
        setGastos(arrayGastos);
    }

    return (
        <spentContext.Provider value={{ eachSpent, equalMoney, spent, members, transacciones, setTransacciones, setEachSpent, setEqualMoney, calcularGastos, dividirGastos, transferencias, setearGastos, gastos }}>
            {children}
        </spentContext.Provider>
    )
}

export { SpentProvider, spentContext, useSpent };