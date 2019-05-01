import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import EmailIcon from '@material-ui/icons/Mail';
import LockIcon from '@material-ui/icons/Lock';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import ErrorSingle from '../../components/error-message/ErrorSingle';
import RequestPassword from './RequestPassword';

import styles from './styles';
import Validator, { isEmptyObject } from '../../support/validator';


// import Auth from '../../support/Auth';
// import * as actions from './redux/actions';
// import NotificationSnackBar from './components/NotificationSnackBar';
// import ErrorMessage from 'components/error-message/ErrorMessage';
// import ErrorResponse from 'components/error-response/ErrorResponse';
// import BusyLoader from 'components/busy-loader/BusyLoader';
// import lang from 'provider/language/language';

class LoginPage extends Component {

    get rules() {
        return {
            email: 'required|email',
            password: 'required|min:8'
        }
    }

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
        // const { from } = this.props.location.state || { from: { pathname: '/schools' } }
        const data = { ...this.state };

        // if (Auth.isAuthenticated()) {
        //     return (
        //         <Redirect to={from} />
        //     )
        // }
        const { access, errors, error } = this.state;
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
                                    label="Password"
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
                            <Grid item >
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    // disabled={!this.isValid()}
                                    onClick={this.attempt}
                                >
                                    Entrar
                                    {/* {lang.get('login.button.login')} */}
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>

                    {/* {error
                        && <NotificationSnackBar
                            open={error !== null}
                            message={error.message}
                            handleClose={this.resetState}
                        />
                    } */}
                </div>
            </div>
        )
    }
}

const component = withStyles(styles)(LoginPage);

export default component