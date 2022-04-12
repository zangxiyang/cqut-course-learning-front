/**
 * @作者: Seale
 * @时间: 2022/4/12
 * @版本: V1.0
 * @说明:
 */
const TOKEN_KEY = 'token';

const isLogin = () => {
    return !!localStorage.getItem(TOKEN_KEY);
};

const getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
};

const setToken = (token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
};

const clearToken = () => {
    localStorage.removeItem(TOKEN_KEY);
};

export { isLogin, getToken, setToken, clearToken };

