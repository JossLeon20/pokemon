import axios from "axios";
import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import Card from "react-bootstrap/Card";
import { useNavigate, useLocation } from "react-router-dom";

import styles from "./Styles.module.css";

const cookies = new Cookies();
const pokeUrl = "https://pokeapi.co/api/v2/pokemon";

const PokemonList = () => {
  const [pokemonDetails, setPokemonDetails] = useState({});

  const location = useLocation();
  const navigate = useNavigate();
  
  const pokemon = location.pathname.split("/").reverse()[0];

  useEffect(() => {
    if (!cookies.get("username")) {
      navigate("/");
    }
    axios
      .get(`${pokeUrl}/${pokemon}`)
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        setPokemonDetails(data);
      });
  }, []);

  return (
    <>
    <div className={styles.generalContainer}>
      <Card>
        <div key={pokemon.id}>
          <h1 className={styles.title}>Details</h1>
          <div className={styles.detailsButtonContainer}>
            <div className={styles.detailsContainer}>
              <h4>{`Number: ${pokemonDetails.order}`}</h4>
              <h4>{`Name: ${pokemonDetails.name}`}</h4>
              <h4>{`Height: ${pokemonDetails.height}`}</h4>
              <h4>{`Weight: ${pokemonDetails.weight}`}</h4>
            </div>
          <div className={styles.imageContainer}>
            <Card.Img variant="top" src={pokemonDetails?.sprites?.front_default} />
          </div>
          </div>
        </div>
      </Card>
    </div>
      
    </>
  );
};

export default PokemonList;
