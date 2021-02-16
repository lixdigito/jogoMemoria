import React, {useState, useEffect} from 'react';
import Game from '../Game';
import { Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import SimpleSelect from "../../Components/SimpleSelect";
import { themesList } from '../../Service/Card';

const useStyles = makeStyles({
  containerHome: {
    margin: '20px',
  },
  title: {
    padding: '50px'
  },
  description: {
    padding: '20px'
  },
  textField:{
    padding: '20px'
  },
  button:{
    padding: '20px'
  }
});

export default function Home() {
  const [playGame, setPlayGame] = useState(false);
  const [amountPairs, setAumontPairs] = useState(5);
  const [themeIdx, setThemeIdx] = useState(0);
  const [maxPairs, setMaxPairs] = useState(11);
  const [invalidAmountPairs, setInvalidAmountPairs] = useState(false);
  const classes = useStyles();
  const MIN_PAIRS = 2;

  useEffect(() => {
    const max = themesList[themeIdx].maxValue;
    setMaxPairs(max);
  }, [themeIdx]);

  useEffect(() => {
    const isInvalidValue = isInvalidAmountParis(amountPairs);
    setInvalidAmountPairs(isInvalidValue);
  },[amountPairs, maxPairs]);

  const isInvalidAmountParis = value => {
    return (value < MIN_PAIRS || value > maxPairs);
  }

  const handleAmountPairs = event => {
    const newValue = event.target.value;
    setAumontPairs(newValue);
  }

  const render = () => {
    return (
      <div className={classes.containerHome}>
        <div className={classes.title}>
          <h1>Jogo da Memória</h1>
        </div>
        <div>
          <SimpleSelect optionsList={themesList} setOption={setThemeIdx} defaulValue={themeIdx} />
        </div>
        <div className={classes.description}>
          <span>{`Escolha a quantidade de pares: (mínimo: ${MIN_PAIRS}, máximo: ${maxPairs})`}</span>
        </div>
        <div className={classes.textField}>          
          <TextField
            type="number"
            label="Quantidade de pares" 
            value={amountPairs} 
            onChange={handleAmountPairs}
            variant="outlined"
            error={invalidAmountPairs}
          />
        </div>
        <div className={classes.button}>
          <Button variant="contained" onClick={() => setPlayGame(true)} disabled={invalidAmountPairs}>Iniciar Jogo</Button>
        </div>
      </div>
    )
  }

  return (
    <div>
      {playGame ? <Game closeGame={setPlayGame} amountPairs={amountPairs} themeId={themeIdx} /> : render()}
    </div>
  )
}