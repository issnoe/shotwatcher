import React, { Component } from 'react';
import './App.css';
import ReactMarkdown from 'react-markdown'
import List from './components/List.js'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import NavigationIcon from '@material-ui/icons/Navigation';

const initText = `# BUREA es la primera aplicación móvil en Puerto Rico
Para ahorrar en tus compras sin buscar ni recortar cupones, comparar precios o ir de tienda en tienda. En tan solo 3 pasos ya estarás ahorrando:

BUsca- Antes de ir a comprar, busca todas las ofertas que tenemos disponibles. Tú decides cuál te interesa comprar y en que tienda.

## REdime
- Luego de comprar el producto, entra al app y tómale una foto a tu recibo de compra. El sistema verificará que hayas comprado el producto que tiene la oferta.

- Ahorra- Se te acreditará a tu cuenta del BUREA la cantidad de la oferta que redimiste. Mientras más ofertas redimas, más dinero podrás acumular. Una vez llegues a $20 puedes retirar lo que has acumulado y transferirlo a tu cuenta de banco, cooperativa o PayPal.

- Es fácil, seguro y ¡gratis! Olvídate de pasar trabajo y comienza a ahorrar con BUREA.
`

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: initText
    }
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };
  render() {
    return (
      <div>
        <Grid container>

          <Grid item xs={12} md={4}>
            <List></List>

          </Grid>

          <Grid item xs={12} md={8} >
            <Paper>
              <TextField
                id="standard-multiline-flexible"
                multiline
                fullWidth
                margin='normal'
                value={this.state.text}
                onChange={this.handleChange('text')}
                margin="normal"
              />
            </Paper>

            <Grid item xs={12} md={12} spacing={16}>
              <div className="result-pane">
                <ReactMarkdown source={this.state.text} />
              </div>
            </Grid>
          </Grid>
        </Grid>

      </div >

    );
  }
}
export default App;
