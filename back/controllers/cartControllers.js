// web/src/controllers/cartControllers.js
const Cart = require('../db/models/cart');

const getAll = async (req, res, next) => {
    try {
        const cart = await Cart.findAll();
        res.status(200).json({
            data: cart,
        });
    } catch (error) {
        next(error);
    }
};

const getById = async (req, res, next) => {
    const { id } = req.params;

    try {
        const cart = await Cart.findByPk(id);
        res.status(200).json(cart);
    } catch (error) {
        next(error);
    }
};

const create = async (req, res, next) => {
    const { reminderId, quantity, priority } = req.body;

    try {
        let cartItem = await Cart.findOne({ where: { reminderId, priority } });

        if (cartItem) {
            cartItem.quantity += quantity;
            await cartItem.save();
        } else {
            cartItem = await Cart.create({ reminderId, quantity, priority });
        }

        res.status(201).json(cartItem);
    } catch (error) {
        next(error);
    }
};

const update = async (req, res, next) => {
    const { id } = req.params;
    const { quantity, priority } = req.body;

    try {
        const cart = await Cart.update({ quantity, priority }, { where: { id } });
        res.status(200).json(cart);
    } catch (error) {
        next(error);
    }
};

const remove = async (req, res, next) => {
    const { id } = req.params;

    try {
        const cart = await Cart.destroy({ where: { id } });
        res.status(200).json(cart);
    } catch (error) {
        next(error);
    }
};

module.exports = { getAll, getById, create, update, remove };