import { useRoute,useRouter } from "vue-router";
import {onMounted} from "vue";
import request from "@/utils/request.js";

const authState = import.meta.env.VITE_APP_STATE;
const clientId = import.meta.env.VITE_APP_GOOGLE_CLIENT_ID;
const redirectUri = import.meta.env.VITE_APP_REDIRECT_URI;

const route = useRoute();
const router = useRouter();

export function googleLogin(name) {
    // 将google标识存入浏览器本地
    localStorage.setItem(authState,name)
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?response_type=id_token&client_id=${clientId}&redirect_uri=${redirectUri}&scope=profile email&nonce=${generateNonce()}`;

}

function generateNonce() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}
