import React from 'react';
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
import Http from '../../support/Http';
import Snack from '../../components/snack';
import ErrorMessage from '../../components/error-message/ErrorSingle';


export default class Perfil extends React.Component {

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
          <Button onClick={this.handleClickOpen} color='inherit' >
            {'Perfil'}
          </Button>
          <Dialog
            fullScreen
            open={this.state.open}
            onClose={this.handleClose}
          >
            <DialogContent>
              <img style={{
                margin: 'auto',
                display: 'block',
                maxWidth: '100%',
                maxHeight: '100%',
              }} alt="complex" src={'./img/fullperfil.jpg'} />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                {'Cancelar'}
              </Button>
              <Button onClick={this.handleClose} color="primary">
                {'Ok'}
              </Button>
            </DialogActions>
          </Dialog>
          <Snack message={this.state.message} />
        </React.Fragment>
      </div >
    );
  }
}