import $api from "../http";
import { AxiosResponse } from "axios";


export default class AuthServices {
    static async register(username: string, email: string, password: string): Promise<AxiosResponse<{ data: string }>> {
        return $api.post('/auth/register', {username, email, password});
    }

    static async login(username: string, password: string): Promise<AxiosResponse<{token: string}>> {
        return $api.post('/auth/login', {username, password});
    }

    static async checkToken(token: string): Promise<AxiosResponse<{valid: boolean}>> {
        return $api.post('/auth/checkToken', {token});
    }
}