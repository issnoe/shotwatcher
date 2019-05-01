
import Jwt from './Jwt';
import Http from './Http';
//import * as Actions from '../shared/login/redux/actions';
//import { Guardian, User } from '@xaamin/guardian';

class Auth {
    constructor() {
        this._isAuthenticated = false;

        setTimeout(() => {
            this.store = {} //getStore();

            //this.data = this.store.getState().login.data;
        });
    }

    logInAs(user) {
        this.loggedInAsUser = user;
    }

    getLoggedInAsUser() {
        return this.loggedInAsUser;
    }

    getLoggedInAsUserId() {
        const loggedInAs = this.getLoggedInAsUser();
        const id = loggedInAs ? loggedInAs.id : '';

        return id;
    }

    setData(data) {
        this.data = data;
        const roles = data.user.roles;
        const permissions = data.user.permissions || data.user.permission;
        const user = {
            ...data.user,
            roles: roles ? [...roles] : [],
            permissions: permissions ? [...permissions] : []
        }
        // Guardian.setUser(user);
    }

    setUser(data) {
        // this.store = getStore();
        //this.store.getState().login.data.user = data;
    }

    attempt(credentials) {
        return Http.post('/auth/login', credentials);
    }

    isAuthenticated() {
        const jwt = this.data ? this.data.token : null;

        this._isAuthenticated = jwt !== null && jwt !== undefined && !Jwt.isTokenExpired(jwt);

        return this._isAuthenticated;
    }

    getUser() {
        if (this.isAuthenticated()) {
            return this.data.user;
        }

        return null;
    }

    getToken() {
        if (this.isAuthenticated()) {
            return this.data.token;
        }

        return null;
    }

    getTokenDecoded() {
        if (this.isAuthenticated()) {
            return Jwt.decodeToken(this.data.token);
        }

        return null;
    }

    logout() {
        this.data = null;
        this._isAuthenticated = false;
        localStorage.clear()
        // return this.store.dispatch(Actions.logout());
    }
}

export default new Auth();