import React, { Component, Fragment } from 'react';
import Webcam from "react-webcam";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Send';
import CameraIcon from '@material-ui/icons/Camera';
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Avatar from '@material-ui/core/Avatar';
import ListScroll from './ListScroll'
export class WebCamera extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screenshots: [],
      tab: 0
    };
  }

  handleClick = () => {
    const screenshot = this.webcam.getScreenshot();
    const screenshots = this.state.screenshots;
    screenshots.unshift(screenshot)
    this.setState({ screenshots });
  }
  render() {
    const useFrontalCamera = (this.props.isMobile() === true || this.props.isTablet() === true) ?
      {
        facingMode: { exact: "environment" }
      } :
      {
        facingMode: "user"
      }
    console.log(useFrontalCamera);


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


    return (
      <div>
        <Grid container>
          <Grid item xs={12} md={12}>
            <Webcam
              videoConstraints={useFrontalCamera}
              audio={false}
              width='100%'
              height='80%'
              ref={node => this.webcam = node}
            />
          </Grid>
          {/* <Grid item xs={12} md={12}>
            <Button onClick={this.handleClick} variant="contained" color="primary" style={{
              marginRight: '20'
            }}>
              Capturar
            <CameraIcon style={{
                marginLeft: '10'
              }} />
            </Button>
            <Button onClick={this.handleClick} variant="contained" color="primary" style={{
              marginRight: '20'
            }}>
              Enviar
            <CreateIcon style={{
                marginLeft: '10'
              }} />
            </Button>
          </Grid> */}

        </Grid>


      </div>

    );
  }
}