import axios from "axios";
import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

import styles from "./Styles.module.css";

const cookies = new Cookies();
const pokeUrl = "https://pokeapi.co/api/v2/pokemon";

const PokemonList = () => {
  const [pokemon, setPokemon] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!cookies.get("username")) {
    navigate("/");

    }
    axios
      .get(pokeUrl)
      .then((res) => {
        return res.data.results;
      })
      .then((results) => {
        return Promise.all(results.map((res) => axios.get(res.url)));
      })
      .then((results) => {
        setPokemon(results.map((res) => res.data));
      });
  }, []);

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const onClickPokemon = (pokemon) => {
    navigate(`/pokemon_details/${pokemon}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.cardsGrid} key={pokemon.id}>
        {pokemon.map((pokemon, _) => (
          <div
            className={styles.cardContainer}
            key={pokemon.id}
            onClick={() => onClickPokemon(pokemon.name)}
          >
            <Card style={{ width: "12rem", height: "20rem" }}>
              <Card.Img variant="top" src={pokemon.sprites.front_default} />
              <Card.Body style={{ textAlign: "center" }}>
                <Card.Title>
                  <h4>{capitalizeFirstLetter(pokemon.name)}</h4>
                </Card.Title>
                <Card.Text>
                  Type: {pokemon.types[0].type.name} <br />
                  Ability: {pokemon.abilities[0].ability.name}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
      <br />
    </div>
  );
};

export default PokemonList;
