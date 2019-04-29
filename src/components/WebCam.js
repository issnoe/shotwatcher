import React, { Component } from 'react';
import Webcam from "react-webcam";
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import CreateIcon from '@material-ui/icons/Send';
import CameraIcon from '@material-ui/icons/Camera';
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';


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
    const _renderScreenShots = this.state.screenshots.map((item) => {
      return (<Grid container spacing={16}>
        <Grid item>
          <ButtonBase style={{
            width: 200,
            height: 200,
          }}>
            {item ? <img style={{
              margin: 'auto',
              display: 'block',
              maxWidth: '100%',
              maxHeight: '100%',
            }} alt="complex" src={item} /> : null}
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={16}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1">
                Captura
              </Typography>
              <Typography gutterBottom>Tiempo de ejecución</Typography>
              <Typography color="textSecondary">ID: 1030114</Typography>
            </Grid>
            <Grid item>
              <Typography style={{ cursor: 'pointer' }}>Eliminar</Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1">2 tiros</Typography>
          </Grid>
        </Grid>
      </Grid>)
    })


    return (
      <div>
        <Paper style={{
          padding: 10,
          margin: 'auto',
          maxWidth: 500,
        }}>
          <Grid container>
            <Grid item xs={12} md={12}>
              <Webcam
                audio={false}
                width='100%'
                height='100%'
                ref={node => this.webcam = node}
              />
            </Grid>
            <Grid item xs={12} md={12}>
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
            </Grid>

          </Grid>

        </Paper>

        {this.state.screenshots && this.state.screenshots.length > 0 ?
          <Paper style={{
            padding: 10,
            margin: 'auto',
            maxWidth: 500,
          }}>
            {_renderScreenShots}

          </Paper> : null}

      </div>

    );
  }
}