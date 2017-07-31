import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
//El provider nos permite disponer del store en los demas componentes hijos
const reducerNumero = (state = 2, action) => {
    var nuevoEstado = Object.assign({}, state);

    if(action.type === "AUM")
    {
        console.log("dentro del reducer con el action.type === a AUM");
        nuevoEstado.cantidad = state.cantidad + 1;

        return nuevoEstado;
    }
    else if(action.type === "DIS")
    {
        nuevoEstado.cantidad = state.cantidad - 1;

        return nuevoEstado;
    }   

    return state;
}

const reducerTareas = (state = [], action) => 
{
    var nuevoEstado = Object.assign({}, state);

    if(action.type === "ADD")
    {
        console.log(nuevoEstado);
        //nuevoEstado = state.concat([tarea:])
        nuevoEstado = state.concat([{tarea : action.tarea, id : action.id}]);

        console.log(nuevoEstado);
        
        return nuevoEstado;
    }
    return state;
}

//combineReducers toma un objeto JS con los demás reducers como valores
const reducer = combineReducers({
    numero : reducerNumero,
    tareas : reducerTareas
})

//const state = {cantidad : 2};

const store = createStore(reducer, state);

ReactDOM.render(
    //I. Implementar el PROVIDER
    <Provider store={ store }>
        <App />
    </Provider>, document.getElementById('root'));
registerServiceWorker();