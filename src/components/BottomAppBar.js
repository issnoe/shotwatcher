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
import Webcam from "react-webcam";
import { withGetScreen } from 'react-getscreen'
import { shots, guns, dians } from '../database/dummy'
import ButtonBase from '@material-ui/core/ButtonBase';
import CircularProgress from '@material-ui/core/CircularProgress';
import Perfil from '../screens/login/Perfil'

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


class BottomAppBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      diana: '1',
      gun: '1',
      screenshots: [],
      tab: 0,
      gunName: '',
      dianName: ''
    }

    this.setShootSettings = this.setShootSettings.bind(this)
    this.updateSettings = this.updateSettings.bind(this)
  }
  updateSettings({ gunName, dianName }) {
    this.setState({ gunName, dianName }, () => console.log(this.state))

  }

  setShootSettings(newState) {
    console.log(newState);
  }
  handleClick = () => {
    const screenshots = this.state.screenshots
    const screenshot = {
      gun: this.state.gunName,
      dian: this.state.dianName,
      img: this.webcam.getScreenshot()
    }
    screenshots.unshift(screenshot)
    this.setState({ screenshots });
    console.log(screenshots);

  }
  render() {
    const { classes } = this.props;
    const useFrontalCamera = {
      facingMode: "user"
    }

    // const _renderScreenShots = this.state.screenshots.map((item) => {
    //   return (<Grid container spacing={16}>
    //     <Grid item>
    //       <ButtonBase style={{
    //         width: 200,
    //         height: 200,
    //       }}>
    //         {item ? <img style={{
    //           margin: 'auto',
    //           display: 'block',
    //           maxWidth: '100%',
    //           maxHeight: '100%',
    //         }} alt="complex" src={item} /> : null}
    //       </ButtonBase>
    //     </Grid>
    //     <Grid item xs={12} sm container>
    //       <Grid item xs container direction="column" spacing={16}>
    //         <Grid item xs>
    //           <Typography gutterBottom variant="subtitle1">
    //             Captura
    //           </Typography>
    //           <Typography gutterBottom>Tiempo de ejecución</Typography>
    //           <Typography color="textSecondary">ID: 1030114</Typography>
    //         </Grid>
    //         <Grid item>
    //           <Typography style={{ cursor: 'pointer' }}>Eliminar</Typography>
    //         </Grid>
    //       </Grid>
    //       <Grid item>
    //         <Typography variant="subtitle1">2 tiros</Typography>
    //       </Grid>
    //     </Grid>
    //   </Grid>)
    // })
    const _renderScreenShots = this.state.screenshots.map((item, index) => {
      const arrayLength = this.state.screenshots.length
      const puntage = index === 0 ? undefined : 5
      return (<Fragment key={`frag_${index}`}>

        <ListItem button>
          <ButtonBase style={{
            width: 200,
            height: 200,
          }}>
            {item ? <img style={{
              margin: 'auto',
              display: 'block',
              maxWidth: '100%',
              maxHeight: '100%',
            }} alt="complex" src={item.img} /> : null}
          </ButtonBase>
          <ListItemText primary={item.gun} secondary={item.dian} />

          {puntage === undefined && <div>  <CustomizedBadge ></CustomizedBadge><h5>Procesando</h5><CircularProgress color="secondary" /></div>}
          {puntage && <div>  <CustomizedBadge score={puntage}></CustomizedBadge></div>}


        </ListItem>
      </Fragment>)
    })
    return (
      <React.Fragment>
        <CssBaseline />
        <Typography className={classes.text} variant="h5" gutterBottom>
          <HandleGunDiana update={this.updateSettings} setShootSettings={this.setShootSettings}></HandleGunDiana>
        </Typography>
        <Grid container spacing={16}>

          <Grid item md={6} xs={12}>
            <Webcam
              videoConstraints={useFrontalCamera}
              audio={false}
              width='100%'
              height='80%'
              ref={node => this.webcam = node}
            />
          </Grid>
          <Grid item md={6} xs={12} style={{ maxHeight: 500, overflow: 'auto' }}>
            <List className={classes.list}>
              <ListSubheader className={classes.subHeader}>Prueba en curso</ListSubheader>
              {_renderScreenShots}
            </List>
          </Grid>

        </Grid>

        <AppBar position="fixed" color="primary" className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
            <Perfil />
            <Fab color="secondary" aria-label="Add" className={classes.fabButton}  >
              <CameraIcon onClick={() => {
                this.handleClick()
              }} />
            </Fab>
            <div>
              <ListItem button>
                <ListItemText secondary={
                  <React.Fragment>
                    <Typography component="span" style={{
                      color: 'white'
                    }}>
                      Alvarado Jasso
                      </Typography>
                    <Typography style={{
                      color: 'white'
                    }}>
                      {" — Cap.1/o. I.C.E."}
                    </Typography>
                  </React.Fragment>
                } />
                <Avatar alt="Profile Picture" style={{
                  width: 55,
                  height: 55,
                }} src={'./img/user.png'} />
              </ListItem>
            </div>
          </Toolbar>
        </AppBar>
      </React.Fragment>
    )

  }
}

BottomAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BottomAppBar);