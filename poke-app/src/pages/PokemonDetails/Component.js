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
      <div className={styles.cardsGrid} key={pokemon.id}>
        <h2>{`Number: ${pokemonDetails.order}`}</h2>
        <h2>{`Name: ${pokemonDetails.name}`}</h2>
        <h2>{`Height: ${pokemonDetails.height}`}</h2>
        <h2>{`Weight: ${pokemonDetails.weight}`}</h2>
        <Card.Img variant="top" src={pokemonDetails?.sprites?.front_default} />
      </div>
    </>
  );
};

export default PokemonList;
