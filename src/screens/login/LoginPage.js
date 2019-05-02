import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import EmailIcon from '@material-ui/icons/Mail';
import LockIcon from '@material-ui/icons/Lock';
import InputAdornment from '@material-ui/core/InputAdornment';
import ErrorSingle from '../../components/error-message/ErrorSingle';
import RequestPassword from './RequestPassword';
import styles from './styles';
import Validator, { isEmptyObject } from '../../support/validator';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            access: {
                email: '',
                password: '',
            },
            validToken: true,
            message: "",
            error: false,
            errors: {},
            email: '',
            password: '',
            language: ''
        }

        this.access = {
            'email': {
                'required': true,
                'type': 'email',
            },
            'password': {
                'required': true,
                'type': 'password',
            },
        }

        this.lang = '';

        this.handleText = this.handleText.bind(this);
        this.attempt = this.attempt.bind(this);

    }

    attempt() {
        this.props.history.push('/')
        console.log();
    }

    handleText(int, val) {
        try {
            let errors = this.state.errors;
            const _access = this.state.access;
            const access = {
                ..._access,
                [int]: val
            }
            errors[int] = Validator.validation(access[int], this.access[int]);
            if (int === 'repassword' && access[int] !== access['password'] && access[int] !== '') {
                errors[int] = 'Passwords not match';
            }
            if (int === 'password' && access[int] !== access['repassword'] && access[int] !== '' && access['repassword']) {
                errors[int] = 'Passwords not match';
            }

            this.setState({ access, errors, error: '' });
        } catch (error) {
            console.log(error);
        }
    }



    render() {
        const { classes } = this.props;
        const { access, errors } = this.state;
        return (
            <div className={classes.root}>
                <div className={classes.wrapper}>
                    {/* <BusyLoader /> */}
                    <Grid container>
                        <Grid item className={classes.imgResponsive}>
                            <img className={classes.nameLogo} src="./img/name.png" alt="Name logo" />
                        </Grid>

                    </Grid>
                    <Paper className={classes.paper} elevation={4}>
                        <Grid container>

                            <Grid item className={classes.imgResponsive}>
                                <img className={classes.logo} src="./img/logo.png" alt="Kidzzer logo" />
                            </Grid>
                        </Grid>
                        <Grid container spacing={24}>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    required
                                    value={access.email}
                                    id="email"
                                    name="email"
                                    label="Correo"
                                    fullWidth
                                    type="email"
                                    onChange={(event) => this.handleText('email', event.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <EmailIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <ErrorSingle error={errors.email} />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    required
                                    value={access.password}
                                    id="password"
                                    name="password"
                                    label="Contraseña"
                                    fullWidth
                                    type="password"
                                    onChange={(event) => this.handleText('password', event.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LockIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <ErrorSingle error={errors.password} />
                            </Grid>
                        </Grid>

                        <Grid container spacing={24}>
                            <Grid item>
                                {/* <ErrorResponse error={error} /> */}
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            spacing={16} direction="row"
                            justify="center"
                            alignItems="center"
                        >
                            <Grid item >
                                <RequestPassword email={access.email} handleFormChanges={this.handleFormChanges}></RequestPassword>
                            </Grid>

                        </Grid>
                        <Grid
                            container
                            spacing={16} direction="row"
                            justify="center"
                            alignItems="center"
                        >
                            <Grid item >
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    // disabled={!this.isValid()}
                                    onClick={this.attempt}
                                >
                                    Registrarse
                                </Button>
                            </Grid>
                            <Grid item >
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    // disabled={!this.isValid()}
                                    onClick={this.attempt}
                                >
                                    Entrar
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </div>
            </div>
        )
    }
}

const component = withStyles(styles)(LoginPage);

export default component