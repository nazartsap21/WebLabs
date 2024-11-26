import $api from "../http";
import { AxiosResponse } from "axios";
import { ICart } from "../interfaces/commonInterfaces";

export default class CartServices {
    static async getCart(userId: number): Promise<AxiosResponse<{ data: ICart[] }>> {
        return $api.get<{ data: ICart[] }>(`/cart/${userId}`);
    }

    static async getCartById(id: number, userId: number): Promise<AxiosResponse<ICart>> {
        return $api.get<ICart>(`/cart/${id}`, { data: { userId } });
    }

    static async addToCart(cart: { userId: number, reminderId: number, quantity: number, priority: number }): Promise<AxiosResponse<ICart>> {
        return $api.post<ICart>('/cart', cart);
    }

    static async updateCart(id: number, cart: { userId: number, quantity: number, priority: number }): Promise<AxiosResponse<ICart>> {
        return $api.put<ICart>(`/cart/${id}`, cart);
    }

    static async removeFromCart(id: number, userId: number): Promise<AxiosResponse<ICart>> {
        return $api.delete<ICart>(`/cart/${id}`, { data: { userId } });
    }

    static async clearCart(userId: number): Promise<AxiosResponse<ICart[]>> {
        return $api.delete<ICart[]>('/cart', { data: { userId } });
    }
}