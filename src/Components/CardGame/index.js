import React  from 'react';
import { Paper } from '@material-ui/core';
import { makeStyles, styled } from '@material-ui/core/styles'

const useStyles = makeStyles({
  cardBack: {
    backgroundColor: '#920202',
    height:'100%',
    width: '100%',
    cursor: 'pointer',  
  },
  cardFront: {
    backgroundColor: '#ffa500',
    height:'100%',
    width: '100%' 
  }
});

const ContainerCardGame = styled(Paper)({  
  height: '150px',
  width: '150px',
  margin: '20px'
});

export default function CardGame(props) {
  const {card, update, blockClick} = props;

  const classes = useStyles();

  const renderCardFront = () => (<div className={classes.cardFront} >
    <img src={card.picture} />
  </div>);

  const renderCardBack = () => (<div className={classes.cardBack}><img src="Assets/Images/CardFrench/capacapa.png" /></div>)

  const handleClick = () => {
    if (!blockClick) {
      const changeCard = {...card, clicked: true};
      update(changeCard)
    }
  }

  return (
    <ContainerCardGame onClick={handleClick} elevation={card.clicked? 7 : 3} disable={card.match} >
      {card.clicked || card.match ? renderCardFront() :  renderCardBack()}
    </ContainerCardGame>
  )
}