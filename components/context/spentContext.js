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
    const [spent, setSpent] = useState(0);
    const [equalMoney, setEqualMoney] = useState(0);
    const [members, setMembers] = useState([]);
    const [eachSpent, setEachSpent] = useState([]);
    const [transacciones, setTransacciones] = useState([]);


    const calcularGastos = (total, miembros) => {
        const incompleteData = miembros.some(miembro => {
            const valores = Object.values(miembro);
            return valores.some(valor => valor === '' || valor === null || valor === undefined);
        })
        if (incompleteData) throw new Error('Debes completar todos los datos (nombre de los integrantes)');
        if (miembros.length <= 1) throw new Error('Debes agregar al menos 2 personas');
        if (!total || total === 0) throw new Error('El total de los gastos debe ser mayor a 0');
        const cantMiembros = miembros.length;
        const gasto = total / cantMiembros;
        setSpent(total)
        setEqualMoney(parseFloat(gasto));
        setMembers(miembros);
    }

    const dividirGastos = () => {
        const newEachSpent = members.map(miembro => {
            let id = uuidv4();
            const gasto = parseFloat(miembro.gastoTotal) - equalMoney;
            return { name: miembro.name, gasto: gasto, gastoTotal: miembro.gastoTotal, gastosParciales: miembro.gasto, index: id, debe: gasto<0?true:false};
        });
        setEachSpent(newEachSpent);
    }

    return (
            <spentContext.Provider value={{  eachSpent, equalMoney, spent, members, transacciones, setTransacciones, setEachSpent, setEqualMoney, calcularGastos, dividirGastos }}>
                {children}
            </spentContext.Provider>
        )
    }

    export { SpentProvider, spentContext, useSpent };