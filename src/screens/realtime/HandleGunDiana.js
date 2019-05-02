import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import EmailIcon from '@material-ui/icons/Mail';
import InputAdornment from '@material-ui/core/InputAdornment';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Typography } from '@material-ui/core';
import ErrorMessage from '../../components/error-message/ErrorSingle';
import Snack from '../../components/snack';
import Http from '../../support/Http';
import RadioGroup from '../../components/RadioGroup'
export default class RequestPassword extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      open: false,
      message: ''
    };

    this.onSend = this.onSend.bind(this);
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false, message: '' });
  };

  async onSend() {
    if (this.props.email !== '') {
      const body = {
        email: this.props.email
      }
      let response;
      let erroTransaction;
      try {
        response = await Http.post(`${process.env.REACT_APP_API_URL}/auth/remember-password`, body);
      } catch (error) {
        response = error;
        erroTransaction = true

      }
      if (erroTransaction !== true) {
        this.handleClose();
      }
      this.setState(state => ({
        message: response.message,
      }));

    } else {
      this.setState({
        ...this.state,
        message: "Email is required"
      })
    }
  }
  //auth/remember-password
  //email

  render() {
    return (
      <div>
        <React.Fragment>
          <Typography>{'Cambia el arma o la diana'}</Typography>
          <ListItem button onClick={this.handleClickOpen}>
            <Avatar alt="Profile Picture" src={'./img/dians/s.jpg'} />
            <Avatar alt="Profile Picture" src={'./img/guns/s.jpg'} />
            <ListItemText primary={'Arma: 12 mm'} secondary={'Diana:Basica'} />
          </ListItem>

          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">{'Actualizar arma o diana'}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                {'Selecciona la diana a ocupar y el arma a utilizar.'}
              </DialogContentText>
              <Grid >
                <RadioGroup></RadioGroup>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                {'Cancelar'}
              </Button>
              <Button onClick={() => this.onSend()} color="primary">
                {'Actualizar'}
              </Button>
            </DialogActions>
          </Dialog>
          <Snack message={this.state.message} />
        </React.Fragment>
      </div>
    );
  }
}