import request from "@/utils/request.js";

export async function logoutHandle() {

    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');

    try {
        if (localStorage.getItem("ThirdPartyCallback")) {
            return await request.post('/oauth2/logout');
        }
        return await request.post('/users/logout');

    } catch (err) {
        console.log(err);
    }
}