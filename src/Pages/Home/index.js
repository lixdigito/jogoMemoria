import React, {useState} from 'react';
import Game from '../Game';
import { Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

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
  const [amountPairs, setAumontPairs] = useState(10);
  const classes = useStyles();
  const MIN_PAIRS = 2;
  const MAX_PAIRS = 62;

  const validAmountParis = value => {
    if(value < MIN_PAIRS) return MIN_PAIRS;
    if(value > MAX_PAIRS) return MAX_PAIRS;
    return value;
  }

  const handleAmountPairs = event => {
    const newValue = validAmountParis(event.target.value);
    setAumontPairs(newValue);
  }

  const render = () => {
    return (
      <div className={classes.containerHome}>
        <div className={classes.title}>
          <h1>Jogo da Memória</h1>
        </div>
        <div className={classes.description}>
          <span>{`Escolha a quantidade de pares: (mínimo: ${MIN_PAIRS}, máximo: ${MAX_PAIRS})`}</span>
        </div>
        <div className={classes.textField}>          
          <TextField
            type="number"
            label="Quantidade de pares" 
            value={amountPairs} 
            onChange={handleAmountPairs}
            variant="outlined"
          />
        </div>
        <div className={classes.button}>
          <Button variant="contained" onClick={() => setPlayGame(true)}>Iniciar Jogo</Button>
        </div>
      </div>
    )
  }

  return (
    <div>
      {playGame ? <Game closeGame={setPlayGame} amountPairs={amountPairs} /> : render()}
    </div>
  )
}