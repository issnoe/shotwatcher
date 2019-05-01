import axios from 'axios';
import Auth from './Auth';

class Http {

    constructor() {
        this.listeners = {};
        this.currentHttpCalls = 0;

        this.axios = axios.create();

        this.registerResponseInterceptor();
        this.registerRequestInterceptor();
    }

    request(config) {
        return this.axios.request(config);
    }

    get(url, config = {}) {
        return this.axios.get(url, this.getConfig(config));
    }

    delete(url, config = {}) {
        return this.axios.delete(url, this.getConfig(config));
    }

    head(url, config = {}) {
        return this.axios.head(url, this.getConfig(config));
    }

    options(url, config = {}) {
        return this.axios.options(url, this.getConfig(config));
    }

    post(url, data = {}, config = {}) {
        return this.axios.post(url, data, this.getConfig(config))
    }

    put(url, data = {}, config = {}) {
        return this.axios.put(url, data, this.getConfig(config))
    }

    patch(url, data = {}, config = {}) {
        return this.axios.patch(url, data, this.getConfig(config))
    }

    getConfig(config) {
        config = config ? { ...config } : {};

        config.baseURL = process.env.REACT_APP_API_URL;

        return config;
    }

    registerRequestInterceptor() {
        this.axios.interceptors.request.use((config) => {
            const token = Auth.getToken();

            if (token !== null && config.url.indexOf('http') === -1) {
                config.headers.Authorization = 'Bearer ' + token;
            }

            this.notifyAboutCurrentHttpCalls(1);

            return config;
        }, (error) => {
            return Promise.reject(error);
        });
    }

    registerResponseInterceptor() {
        this.axios.interceptors.response.use((response) => {
            this.notifyAboutCurrentHttpCalls(-1);

            return Promise.resolve(response.data);
        }, (error) => {
            let response = error.response || {};

            if (!response.data) {
                let message = error.status ? (error.status + ' ' + error.statusText) : null;
                message = message || error.message;

                response.data = {
                    message: message || 'No se tiene información del error'
                }
            }

            this.notifyAboutCurrentHttpCalls(-1);

            return Promise.reject(response.data);
        });
    }

    listen(listener, key = 'global') {
        this.listeners[key] = listener;
    }

    remove(listener) {
        if (this.listeners[listener]) {
            delete this.listeners[listener];
        }
    }

    notifyAboutCurrentHttpCalls(number) {
        this.currentHttpCalls += number;

        const listeners = Object.keys(this.listeners);

        listeners.forEach((listener) => {
            // Notify all listeners about action performed
            this.listeners[listener]('CURRENT_HTTP_REQUESTS', this.currentHttpCalls);
        });
    }
}

const http = new Http();

export default http;