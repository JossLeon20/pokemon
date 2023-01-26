import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie"
import Button from 'react-bootstrap/Button'
import styles from "./Styles.module.css";

const cookies = new Cookies()

const Header = () => {
    
  const navigate = useNavigate();

    useEffect(() => {
        if (!cookies.get('username')) {
            window.location.href="./"
        }
    }, []);

    const home = () => {
        navigate("/pokemon_list");
    }

    const logOut = () => {
        cookies.remove('id', {path: "/"});
        cookies.remove('apellido_paterno', {path: "/"});
        cookies.remove('apellido_materno', {path: "/"});
        cookies.remove('nombre', {path: "/"});
        cookies.remove('username', {path: "/"});
        navigate("/");
    }

    return (
        <>
            <h1 className={styles.title}>
                Welcome {cookies.get('nombre')}
            </h1>
            <h3 className={styles.title}>
                Take a look to our available Pokemons
            </h3>
            <div className={styles.buttons}>
                <Button style={{marginRight:'10px'}} onClick={home} type="button" className="btn btn-primary">Home</Button>
                <Button onClick={logOut} type="button" className="btn btn-primary">Log out</Button>
            </div>
            <br/> 
        </>
    )
};

export default Header;
