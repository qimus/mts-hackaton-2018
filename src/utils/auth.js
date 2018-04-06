export const COOKIE_NAME = 'auth_key';
export const TOKEN_KEY = 'access-token';

let storage = {};

const auth = {
    getToken() {
        if (storage[TOKEN_KEY] == undefined) {
            storage[TOKEN_KEY] = localStorage.getItem(COOKIE_NAME);
        }

        return storage[TOKEN_KEY];
    },

    setToken(token) {
        localStorage.setItem(TOKEN_KEY, token);
    },

    isLoggedIn() {
        let token = this.getToken();
        return token != undefined;
    }
};

export default auth;