import React, { useEffect, useState } from "react";

import "./App.css";
import PokemonTable from "./components/Table";
import Chart from "./components/Chart";
import { IntlProvider } from "react-intl";
import localeSpanish from "./localLanguages/es.json";
import localeEnglish from "./localLanguages/en.json";
import{Spinner} from "react-bootstrap";

const spanishUrl =
  "https://gist.githubusercontent.com/jhonatan89/e379fadf8ed0f5381a2d8f8f3dea90c3/raw/e2bc20df02828d297f99558551e37959ac97a6f8/pokemon-es.json";
const englishUrl =
  "https://gist.githubusercontent.com/jhonatan89/2089276d3ce0faceff8e55fc3459b818/raw/30ee1a77b3e328108faaaa9aaac6f2ddaa3d3711/pokemons-en.json";

function App(props) {
  const [pokemons, setPokemons] = useState([]);
  const [language, setLanguage] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    if (!navigator.onLine) {
      //Cache
      if (localStorage.getItem("pokemons") === null) {
        setPokemons([]);
        setLoading(false);
      } else {
        setPokemons(localStorage.getItem("pokemons"));
        setLoading(false);
      }
    } else {
      if (props.locale.split("-")[0] !== "en") {
        //spanish
        setLanguage(localeSpanish);
        fetch(spanishUrl)
          .then((res) => res.json())
          .then((res) => {
            setPokemons(res);
            localStorage.setItem("pokemons", res);
            setLoading(false);
          });
      } else {
        //english
        setLanguage(localeEnglish);
        fetch(englishUrl)
          .then((res) => res.json())
          .then((res) => {
            setPokemons(res);
            localStorage.setItem("pokemons", res.value);
            setLoading(false);
          });
      }
    }

  }, []);

  return loading? (<Spinner animation="border" role="status">
  <span className="sr-only">Loading...</span>
</Spinner>):(
    <IntlProvider locale={props.locale} messages={language}>
      <PokemonTable pokemons={pokemons} />
      <Chart pokemons={pokemons}/>
    </IntlProvider>
  );
}

export default App;
