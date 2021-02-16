import React, {useEffect, useState} from 'react';
import CardGame from '../../Components/CardGame';
import SimpleModal from '../../Components/SimpleModal';
import { GetDataCards } from '../../Service/Card.js';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const useStyles = makeStyles({
  listCards: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '20px'
    
  },
  buttons: {
    paddingTop: '20px',    
  },
  button: {
    marginRight: '20px'
  }
});

export default function Game(props) {
  const {closeGame, amountPairs, themeId } = props;
  const [listCards, setListCards] = useState([]);
  const [blockClick, setBlockClick] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    GetCardsCame();
  }, []);

   const GetCardsCame = () => {
    const data = GetDataCards(amountPairs, themeId);
    setListCards([...data]);
   }


  const updateCardInList = card => {
    return listCards.map(item => {
      if (item.id == card.id) return card;
      return item;
    });
  }

  const getClickeds = list => {
    return list.filter(item => !item.match && item.clicked);
  }

  const handleMatch = (list, clickeds) => {
    return list.map(item => {
      if(item.id === clickeds[0].id || item.id === clickeds[1].id) {
        item.match = true;
        return item;
      }
      return item;
    }) 
  }

  const handleNoMatch = (list, clickeds) => {
    return list.map(item => {
      if(item.id === clickeds[0].id || item.id === clickeds[1].id) {
        item.clicked = false;
        return item;
      }
      return item;
    }) 
  }

  const verifyMatch = list => {
    const clickeds = getClickeds(list);
    if(clickeds.length < 2) return list;
    if(clickeds[0].valueCompare === clickeds[1].valueCompare) return handleMatch(list, clickeds);
    return handleNoMatch(list, clickeds);
  }

  const VerifyEndGame = list => {
    const isAllMatch = list.reduce((accumulator, currentValue) => accumulator && currentValue.match, true);
    if (isAllMatch) setShowModal(true);
  }

  const handleVerify = list => {
    const listVerify = verifyMatch(list);
    setListCards([...listVerify]);
    VerifyEndGame(listVerify);
    setBlockClick(false);
  }

  const handleChangeList = card => {
    const newList = updateCardInList(card);
    setListCards([...newList]);
    if (getClickeds(newList).length == 2) {
      setBlockClick(true);
      setTimeout(() => handleVerify(newList), 1000);
    }
  }
  const body = (
    <div>
      <h2 id="simple-modal-title">Parabéns!</h2>
      <p id="simple-modal-description">
        Você ganhou! 
      </p>
    </div>
  );

  return (
    <div>
      <div className={classes.buttons}>
        <Button className={classes.button} variant="contained" onClick={() => closeGame(false)}>Voltar</Button>
        <Button variant="contained" onClick={() => GetCardsCame()}>Embaralhar</Button>
      </div>
      <div className={classes.listCards}>
        {listCards.map(card => <CardGame key={card.id} card={card} update={handleChangeList} blockClick={blockClick} />)}
      </div>
      <SimpleModal
        open={showModal}
        setOpen={setShowModal}
      />
    </div>
  )
}