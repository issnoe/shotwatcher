import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import MenuIcon from '@material-ui/icons/Menu';
import Grid from '@material-ui/core/Grid'
import CameraIcon from '@material-ui/icons/Camera';
import HandleGunDiana from '../screens/realtime/HandleGunDiana'
import CustomizedBadge from './CustomizedBadge'
import { WebCamera } from './WebCam'
import { withGetScreen } from 'react-getscreen'
import { shots } from '../database/dummy'

const WebCameraRender = withGetScreen(WebCamera)

const styles = theme => ({
  text: {
    paddingTop: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
  },
  paper: {
    paddingBottom: 50,
  },
  list: {
    marginBottom: theme.spacing.unit * 2,
  },
  subHeader: {
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  toolbar: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
  },
});

function BottomAppBar(props) {
  const { classes } = props;
  return (
    <React.Fragment>
      <CssBaseline />

      <Typography className={classes.text} variant="h5" gutterBottom>
        <HandleGunDiana></HandleGunDiana>

      </Typography>
      <Grid container spacing={16}>
        <Grid item md={6}>
          <WebCameraRender></WebCameraRender>
        </Grid>
        <Grid item md={6} style={{ maxHeight: 500, overflow: 'auto' }}>

          <List className={classes.list}>
            {shots.map((shot) => (
              <Fragment key={shot.id}>
                {shot.id === 1 && <ListSubheader className={classes.subHeader}>Today</ListSubheader>}
                {shot.id === 3 && <ListSubheader className={classes.subHeader}>Yesterday</ListSubheader>}
                <ListItem button>
                  <CustomizedBadge score={shot.score}></CustomizedBadge>
                  <Avatar alt="Diana type" src={shot.diana.src} />
                  <Avatar alt="Gun" src={shot.gun.src} />
                  <ListItemText primary={shot.diana.name} secondary={shot.gun.name} />
                </ListItem>
              </Fragment>
            ))}
          </List>

        </Grid>

      </Grid>

      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <IconButton color="inherit" aria-label="Open drawer">
            <MenuIcon />
          </IconButton>
          <Fab color="secondary" aria-label="Add" className={classes.fabButton}  >
            <CameraIcon />
          </Fab>
          <div>
            <ListItem button>
              <ListItemText secondary={
                <React.Fragment>
                  <Typography component="span" style={{
                    color: 'white'
                  }}>
                    Luis Noé Jasso
                  </Typography>
                  <Typography style={{
                    color: 'white'
                  }}>
                    {" — Nivel Dios"}
                  </Typography>
                </React.Fragment>
              } />
              <Avatar alt="Profile Picture" style={{
                width: 55,
                height: 55,
              }} src={'./img/guns/s.jpg'} />
            </ListItem>
          </div>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

BottomAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BottomAppBar);