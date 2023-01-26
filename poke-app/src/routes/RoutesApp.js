import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Layout } from "../components";
import { Login, PokemonList, PokemonDetails } from "../pages";

const RoutesApp = () => {
  return (
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/pokemon_list" element={<Layout ><PokemonList /></Layout>}/>
        <Route path="/pokemon_details/:pokemon" element={<Layout ><PokemonDetails /></Layout>}/>
        <Route path="*" element={<Login />}/>
      </Routes>
   </BrowserRouter>
  );
}

export default RoutesApp;