import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { guns, dians } from '../database/dummy'

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

class RadioButtonsGroup extends React.Component {
  state = {
    value: '1',
    diana: '1'
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  handleChangeDiana = event => {
    this.setState({ diana: event.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={16}>
          <Grid item md={12}>
            <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel component="legend">Arma</FormLabel>
              <RadioGroup
                aria-label="Arma"
                name="gender1"
                className={classes.group}
                value={this.state.value}
                onChange={this.handleChange}
              >
                {
                  guns.map(gun => (<FormControlLabel key={gun.id} value={gun.id.toString()} control={<Radio />} label={<ListItem button>
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
                  dians.map(dian => (<FormControlLabel key={dian.id} value={dian.id.toString()} control={<Radio />} label={<ListItem button>
                    <Avatar alt="Diana type" src={dian.src} />
                    <ListItemText primary={dian.name} secondary={dian.distance} />
                  </ListItem>} />))
                }

              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      </div>
    );
  }
}

RadioButtonsGroup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RadioButtonsGroup);
