
const clientId = import.meta.env.VITE_APP_GITHUB_CLIENT_ID;
const authState = import.meta.env.VITE_APP_STATE;
const authorizeUri = "https://github.com/login/oauth/authorize";
const redirectUri = import.meta.env.VITE_APP_REDIRECT_URI;


export async function githubLogin(name) {
    // 将github标识存入浏览器本地
    localStorage.setItem(authState,name)
    window.location.href = `${authorizeUri}?client_id=${clientId}&redirect_uri=${redirectUri}`;
}