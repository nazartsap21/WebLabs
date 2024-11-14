import $api from "../http";
import { AxiosResponse } from "axios";
import { ICart } from "../interfaces/commonInterfaces";

export default class CartServices {
    static async getCart(): Promise<AxiosResponse<{ data: ICart[] }>> {
        return $api.get<{ data: ICart[] }>('/cart');
    }

    static async getCartById(id: number): Promise<AxiosResponse<{ data: ICart }>> {
        return $api.get<{ data: ICart }>(`/cart/${id}`);
    }

    static async addToCart(cart: ICart): Promise<AxiosResponse<void>> {
        return $api.post<void>('/cart', cart);
    }

    static async updateCart(cart: ICart): Promise<AxiosResponse<ICart>> {
        return $api.put<ICart>(`/cart/${cart.id}`, cart);
    }

    static async removeFromCart(id: number): Promise<AxiosResponse<ICart>> {
        return $api.delete<ICart>(`/cart/${id}`);
    }
}