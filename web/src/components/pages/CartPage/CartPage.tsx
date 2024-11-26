import React, { FC, useEffect, useState } from 'react';
import './CartPage.scss';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store.config";
import { getCart } from "../../../store/cartSlice";
import CartServices from "../../../services/CartServices";
import { defaultSearchOptions, ICart } from "../../../interfaces/commonInterfaces";
import { Link } from "react-router-dom";
import reminderPhoto from "../../../assets/reminder.svg";
import { getReminders } from "../../../store/reminderSlice";
import AuthServices from "../../../services/AuthServices";

const CartPage: FC = () => {
    const { cart } = useSelector((state: RootState) => state.cartReducer);
    const { reminders } = useSelector((state: RootState) => state.remindersReducer);
    const dispatch = useDispatch<AppDispatch>();
    const [userId, setUserId] = useState<number>(0);
    // const [quantity, setQuantity] = useState<number>();
    const token = localStorage.getItem('token');

    const getId = async () => {
        const response = await AuthServices.getUserId(token || '');
        const userId = response.data.userId;
        setUserId(userId);
    }

    useEffect(() => {
        dispatch(getCart()).then(() => {
            dispatch(getReminders(defaultSearchOptions));
        });
    }, [dispatch]);

    useEffect(() => {
        getId();
    }, []);

    const handleItemDelete = async (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
        e.preventDefault();
        CartServices.removeFromCart(id, userId).then(() => {
            dispatch(getCart());
        });
    }

    const handleItemEdit = async (e: React.MouseEvent<HTMLButtonElement>, id: number, reminderId: number,  gap: number) => {
        e.preventDefault();

        const item = cart?.find(item => item.reminderId === reminderId && item.id === id);
        if (item) {
            if (item.quantity + gap <= 0) {
                CartServices.removeFromCart(userId, item.id).then(() => dispatch(getCart()));
            } else {
                CartServices.updateCart(id, { userId, quantity: item.quantity + gap, priority: item.priority }).then(() => dispatch(getCart()));
            }
        }
    }

    const calculateTotalPrice = () => {
        return cart?.reduce((total, item) => {
            const reminder = reminders?.find(reminder => reminder.id === item.reminderId);
            const price = reminder ? reminder.price : 0;
            return total + (price * item.quantity);
        }, 0);
    }

    return (
        <section className={"cart"}>
            <h1>Your cart</h1>
            <div className={"cart-items"}>
                {cart && (
                    cart
                        .slice()
                        .sort((a, b) => a.id - b.id)
                        .map((item: ICart, key = item.id) => (
                            <div key={key} className={"cart-item"}>
                                <Link to={`/reminders/${item.reminderId}`}><img src={reminderPhoto} alt={`${item.reminderId}`} /></Link>
                                <div className={"cart-item-info"}>
                                    <h3>{reminders && reminders.find(reminder => reminder.id === item.reminderId)?.title}</h3>
                                    <p>Priority: {item.priority}</p>
                                </div>
                                <div className={"cart-item-actions"}>
                                    <button className={"quantity-button"} onClick={(e) => handleItemEdit(e, item.id, item.reminderId, 1)}>+</button>
                                    <h3>{item.quantity}</h3>
                                    <button className={"quantity-button"} onClick={(e) => handleItemEdit(e, item.id, item.reminderId, -1)}>-</button>
                                </div>
                                <div className={"cart-item-info"}>
                                    <h3>{reminders && (reminders.find(reminder => reminder.id === item.reminderId)?.price ?? 0) * item.quantity} $</h3>
                                </div>
                                <button className={"delete-button"} onClick={(e) => handleItemDelete(e, item.id)}>x</button>
                            </div>
                        ))
                )}
            </div>
            <h2 className={"total-price"}>Total price: {calculateTotalPrice()} $</h2>
            <div className={"cart-navigation"}>
                <Link to={"/catalog"}>Back to catalog</Link>
                <Link to={"/checkout"}>Continue</Link>
            </div>
        </section>
    );
};

export default CartPage;