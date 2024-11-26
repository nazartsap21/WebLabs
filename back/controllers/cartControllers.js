// web/src/controllers/cartControllers.js
const Cart = require('../db/models/cart');

const getAll = async (req, res, next) => {
    const { userId } = req.params;
    if (!userId) {
        console.log(userId);
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {
        const cart = await Cart.findAll({ where: { userId } });
        res.status(200).json({
            data: cart,
        });
    } catch (error) {
        next(error);
    }
};

const getById = async (req, res, next) => {
    const { id } = req.params;
    const { userId } = req.body;

    try {
        const cart = await Cart.findOne({ where: { userId, id } });
        res.status(200).json(cart);
    } catch (error) {
        next(error);
    }
};

const create = async (req, res, next) => {
    const { userId, reminderId, quantity, priority } = req.body;

    try {
        let cartItem = await Cart.findOne({ where: { userId, reminderId, priority } });

        if (cartItem) {
            cartItem.quantity += quantity;
            await cartItem.save();
        } else {
            cartItem = await Cart.create({ userId, reminderId, quantity, priority });
        }

        res.status(201).json(cartItem);
    } catch (error) {
        next(error);
    }
};

const update = async (req, res, next) => {
    const { id } = req.params;
    const { userId, quantity, priority } = req.body;
    console.log(id);

    try {
        const cart = await Cart.update({ quantity, priority }, { where: { userId, id } });
        res.status(200).json(cart);
    } catch (error) {
        next(error);
    }
};

const remove = async (req, res, next) => {
    const { id } = req.params;
    const { userId } = req.body;

    try {
        const cart = await Cart.destroy({ where: { userId, id } });
        res.status(200).json(cart);
    } catch (error) {
        next(error);
    }
};


const removeAll = async (req, res, next) => {
    const { userId } = req.body;

    try {
        const cart = await Cart.destroy({ where: { userId } });
        res.status(200).json({ message: 'Cart is cleared!' });
    } catch (error) {
        next(error);
    }
};

module.exports = { getAll, getById, create, update, remove, removeAll };