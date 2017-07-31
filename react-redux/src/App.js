import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
//connect nos permite acceder al STATE y hacer dispatch de //ACTIONS y ACTION CREATOR
import { connect } from 'react-redux';

class App extends Component 
{
    agregarTarea = (evento) => 
    {
        if(evento.which === 13)
        {
            console.log(evento.target.value);
            this.props.agregar(evento.target.value, 1);
        }
    }
    render()
    {
        return 
        (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Welcome to React</h2>
                </div>
                <p className="App-intro">
                    {this.props.informacion}
                    <br/>
                    <button onClick={this.props.aumentar}></button>
                    <br/>
                    <button onClick={this.props.disminuir}></button>
                    <br/>
                    <input onKeyPress={this.agregarTarea.bind(this)}/>
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
            </div>    
        );
    }
}

//Ingresa como props a nuestro Component tanto el STATE como los posibles DISPATCH

//internamente hace una suscripcion y un get state por lo que //constantemente en caso de un cambio en el STATE se actualiza o //se ejecuta nuevamente, el STATE se lo inyecta connect
//funcion
const mapStateToProps = (state) => 
{//return de un objecto JS
    return 
    {
        //informacion : state.cantidad
        informacion : state.numero.cantidad
    }
}


/* para mapDispatchToProps hay dos formas, pasandole un objeto o pasandole una funcion (que tiene disponible el dispatch y por lo tanto podemos ejecutarlo dnetro de nuestras funciones)*/

//dentro de las funciones se pueden ahcer llamadas asincronas
//es un objeto que asume que las funciones internas son ACTION //CREATOR y que al ingresarlas a nuestro componente las engloba //en DISPATCH para que de esta forma puedan ser llamadas como //DISPATCH
/*const mapDispatchToProps = 
{
    aumentar : () => {return {type : "AUM"}},
    disminuir : () => {return {type : "DIS"}}

}*/

const mapDispatchToProps = (dispatch) => 
{
    return 
    {
        aumentar : () => { dispatch({ type : "AUM" }); },
        disminuir : () => { dispatch({ type : "DIS" }); },
        agregar : (tarea, id) => { dispatch({ type : "ADD", tarea, id}); }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);