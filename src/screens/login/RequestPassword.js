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

          <Button onClick={this.handleClickOpen} variant="outlined" color="secondary" >
            {'Olvide la contraseña ?'}
          </Button>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">{'Olvide la contraseña ?'}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                {'Se enviaran las instrucciones para restablecer la contraseña.'}
              </DialogContentText>
              <Grid >
                <TextField
                  required
                  type="email"
                  name="email"
                  id="email"
                  margin="normal"
                  placeholder="Correo"
                  autoComplete="off"
                  autoFocus={true}
                  fullWidth
                  value={this.props.email || ''}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                    ),
                  }}
                  onChange={this.props.handleFormChanges}
                />
                <ErrorMessage
                  field="email"
                  data={this.props.email}
                  errors={this.props.validation ? this.props.validation.errors : null}
                />

              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                {'Cancelar'}
              </Button>
              <Button onClick={() => this.onSend()} color="primary">
                {'Enviar'}
              </Button>
            </DialogActions>
          </Dialog>
          <Snack message={this.state.message} />
        </React.Fragment>
      </div>
    );
  }
}