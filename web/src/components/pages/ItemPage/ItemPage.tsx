import React, {FC, useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import reminderPhoto from '../../../assets/reminder.svg';
import './ItemPage.scss';
import {IReminder} from "../../../interfaces/reminderInterfaces";
import ReminderServices from "../../../services/ReminderServices";
import Select from "../../common/Select/Select";
import CartServices from "../../../services/CartServices";

const ItemPage: FC = () => {
    const { id } = useParams<{ id: string }>();
    const [reminder, setReminder] = useState<IReminder>();
    const [quantity, setQuantity] = useState<number>(0);
    const [priority, setPriority] = useState<number>();
    const navigate = useNavigate();

    useEffect(() => {
        ReminderServices.getReminder(Number(id)).then(response => { console.log(response.data); setReminder(response.data.data)});
    }, [id]);


    const handleAddToCart = async () => {
        try {
            if (reminder) {
                if (!quantity) {
                    alert('Please enter the quantity');
                    return;
                } else if (quantity < 1) {
                    alert('Quantity must be at least 1');
                    return;
                } else if (!priority) {
                    alert('Please enter the priority');
                    return;
                }

                await CartServices.addToCart({id: 0, reminderId: reminder.id, quantity: quantity, priority: priority});
                alert('Reminder added to cart');

            }
        } catch (e) {
        }
    }


    if (!reminder) {
        return <h1>Reminder not found</h1>
    }

    return (
        <div className={'item-page'}>
            <div className={'main-content'}>
                <div className={'text-content'}>
                    <img src={reminderPhoto} alt={reminder.title}/>
                </div>
                <div className={'info-content'}>
                    <h1>{reminder.title}</h1>
                    <h3>{reminder.description}</h3>
                    <p>Subject: {reminder.subject}</p>
                    <p>Due date: {reminder.dueDate.slice(0, 16).replace('T', ' ')}</p>
                    <hr/>
                    <h3>Price: {reminder.price}$</h3>

                    <div className={"reminder-customization"}>
                        <div className={"cart-input"}>
                            <label>Amount</label>
                            <input type={"number"} min={1} name={"amount"} onChange={(e) => setQuantity(parseInt(e.target.value))}></input>
                        </div>
                        <div className={"cart-input"}>
                            <label>Priority</label>
                            <Select
                                name={"Priority"}
                                values={["1", "2", "3", "4", "5"]}
                                options={["1", "2", "3", "4", "5"]}
                                value={priority?.toString() || ""}
                                onChange={e => {
                                    setPriority(parseInt(e.target.value));
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className={'side-content'}>
                <Link
                    to={'..'}
                    className={'back-button'}
                    onClick={(e) => {
                        e.preventDefault();
                        navigate(-1);
                    }}
                >Go back</Link>
                <button className={'add-to-cart'} onClick={handleAddToCart}>Add to cart</button>
            </div>
        </div>
    );
};

export default ItemPage;