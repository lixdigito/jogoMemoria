
import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SimpleSelect(props) {
  const {optionsList, setOption, defaulValue} = props;
  const classes = useStyles();
  const [state, setState] = useState(defaulValue > 0 ? optionsList[0] : {value: defaulValue});

  useEffect(() => {
    setOption(state.value);
  }, [state]);

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };
  
  return (
    <>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-age-native-simple">Selecione um Tema</InputLabel>
        <Select
        native
          defaultValue={state.value}
          value={state.value}
          onChange={handleChange}
          label="Selecione um Tema"
          inputProps={{
            name: 'value',
            id: 'age-native-simple',
          }}
        >
          {optionsList.map(item => <option key={item.id} value={item.value}>{item.name}</option>)}
        </Select>
      </FormControl>
    </>
  )
}