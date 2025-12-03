var express = require('express');
var router = express.Router();

const dataService = require('../data/dataService');

//lista de todos los pokemon
router.get('/', function (req, res, next) {
  const pokemons = dataService.findAllPokemons();
  const tipos = Array.from(dataService.findAllPokemonTypes());

  res.render('index', { pokemons, tipos, tipoSeleccionado: 'Todos' });
});

//pokemon por id
router.get('/pokemon/:id', function (req, res, next) {
  const id = req.params.id;
  const pokemon = dataService.findPokemonById(id);
  const tipos = Array.from(dataService.findAllPokemonTypes());

  if (!pokemon) {
    return res.status(404).send('Pokémon no encontrado');
  }

  res.render('detalle', { pokemon, tipos });
});

//filtrar por tipo
router.get('/tipo/:tipo', function (req, res, next) {
  const tipo = req.params.tipo;
  const pokemons = dataService.findAllPokemonsByType(tipo);
  const tipos = Array.from(dataService.findAllPokemonTypes());

  res.render('index', { pokemons, tipos, tipoSeleccionado: tipo });
});

module.exports = router;
