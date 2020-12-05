import React from "react";
import { Table, Badge } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
const PokemonTable = (props) => {
  return (
    <Table>
      <thead className="thead-dark">
        <tr>
          <th>#</th>
          <th>
            <FormattedMessage id="image" />
          </th>
          <th>
            <FormattedMessage id="name" />
          </th>
          <th>
            <FormattedMessage id="description" />
          </th>
          <th>
            <FormattedMessage id="height" />
          </th>
          <th>
            <FormattedMessage id="weight" />
          </th>
          <th>
            <FormattedMessage id="type" />
          </th>
        </tr>
      </thead>
      <tbody>
        {props.pokemons.map((pokemon, index) => (
          <tr key={index}>
            <td>{index}</td>
            <td>
              <img
                alt={pokemon.ThumbnailAltText}
                src={pokemon.ThumbnailImage}
              />
            </td>
            <td>{pokemon.name}</td>
            <td>{pokemon.description}</td>
            <td>{pokemon.height}</td>
            <td>{pokemon.weight}</td>
            <td>
              {pokemon.type.map((type, index) => {
                return (
                  <div key={index}>
                  <Badge  variant="secondary">
                    {type}
                  </Badge>
                  <br/>
                  </div>
                  
                );
              })}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default PokemonTable;
