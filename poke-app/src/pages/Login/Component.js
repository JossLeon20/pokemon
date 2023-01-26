import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import Cookies from 'universal-cookie';

import styles from './Styles.module.css'

const baseUrl = "http://localhost:3001/usuarios";
const cookies = new Cookies();

class Login extends Component {
    state = {
        form: {
            username: '',
            password: ''
        }
    }

    handleChange = async e => {
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
        console.log(this.state.form)
    }

    sessionStart = async () => {
        await axios.get(
            baseUrl, 
            {
                params: {
                    username: this.state.form.username, 
                    password: this.state.form.password
                }
            }
        ).then(response => {
            return response.data;
        })
        .then(response => {
            if (response.length > 0) {
                var answer = response[0]
                cookies.set('id', answer.id, {path: "/"})
                cookies.set('apellido_paterno', answer.apellido_paterno, {path: "/"})
                cookies.set('apellido_materno', answer.apellido_materno, {path: "/"})
                cookies.set('nombre', answer.nombre, {path: "/"})
                cookies.set('username', answer.username, {path: "/"})
                alert(`Welcome ${answer.nombre} or ${answer.username}`)
                window.location.href="./pokemon_list";
            } else {
                alert("Wrong user or password")
            }
        })
        .catch(error => {
            console.log(error)
        })
    }

    componentDidMount() {
        if (cookies.get('username')) {
            window.location.href="./pokemon_list";
        }
    }

    render() {
        return (
            <div className="containerPrincipal">
                <div className="containerSecundario">
                    <div className="form-group">
                        <label>User: </label>
                        <br />
                        <input 
                            type='text' 
                            className="form-control" 
                            name="username" 
                            onChange={this.handleChange} 
                        />
                        <br />
                        <label>Password: </label>
                        <br />
                        <input 
                            type="password" 
                            className="form-control" 
                            name="password" 
                            onChange={this.handleChange} 
                        />
                        <br />
                        <br/>
                        <button 
                            className="btn btn-primary"
                            onClick={() => this.sessionStart()}
                        >
                            Log in
                        </button>
                        <br />
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;