import React from 'react';
import { withStyles } from '@material-ui/core/styles';

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
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import ErrorMessage from '../../components/error-message/ErrorSingle';
import Snack from '../../components/snack';
import Http from '../../support/Http';
import { guns, dians } from '../../database/dummy'

const styles = theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
});

class RequestPassword extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      open: false,
      message: '',
      gun: '1',
      diana: '1'
    };

    this.update = this.update.bind(this);
  }



  handleChange = event => {
    this.setState({ gun: event.target.value, message: '' });
  };

  handleChangeDiana = event => {
    this.setState({ diana: event.target.value, message: '' });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false, message: '' });
  };

  update() {
    this.setState({ open: false, message: 'Configuracion de arma actualizado ' });
    const gun = guns.find(gun => gun.id === this.state.gun)
    const dian = dians.find(dian => dian.id === this.state.diana)
    console.log(gun, dian);

    this.props.update({ gunName: gun.name, dianName: dian.name })
  }
  //auth/remember-password
  //email

  render() {
    const { classes } = this.props;
    const gun = guns.find(gun => gun.id === this.state.gun)
    const dian = dians.find(dian => dian.id === this.state.diana)

    return (
      <div>
        <React.Fragment>
          <h5>{'Parametros de tiro'}</h5>
          <ListItem button onClick={this.handleClickOpen}>
            <Avatar alt="Gun " src={gun.src} />
            <Avatar alt="Dian" src={dian.src} />
            <ListItemText primary={gun.name} secondary={`${dian.name} ${dian.distance}`} />
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
                <Grid container spacing={16}>
                  <Grid item md={12}>
                    <FormControl component="fieldset" className={classes.formControl}>
                      <FormLabel component="legend">Arma</FormLabel>
                      <RadioGroup
                        aria-label="Arma"
                        name="gender1"
                        className={classes.group}
                        value={this.state.gun}
                        onChange={this.handleChange}
                      >
                        {
                          guns.map(gun => (<FormControlLabel key={gun.id} value={gun.id.toString()} control={<Radio />} label={<ListItem >
                            <Avatar alt="Diana type" src={gun.src} />
                            <ListItemText primary={gun.name} secondary={gun.details} />
                          </ListItem>} />))
                        }

                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid item md={12}>
                    <FormControl component="fieldset" className={classes.formControl}>
                      <FormLabel component="legend">Diana</FormLabel>
                      <RadioGroup
                        aria-label="Diana"
                        name="gender1"
                        className={classes.group}
                        value={this.state.diana}
                        onChange={this.handleChangeDiana}
                      >
                        {
                          dians.map(dian => (<FormControlLabel key={dian.id} value={dian.id.toString()} control={<Radio />} label={<ListItem >
                            <Avatar alt="Diana type" src={dian.src} />
                            <ListItemText primary={dian.name} secondary={dian.distance} />
                          </ListItem>} />))
                        }

                      </RadioGroup>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                {'Cancelar'}
              </Button>
              <Button onClick={() => this.update()} color="primary">
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

export default withStyles(styles)(RequestPassword);
