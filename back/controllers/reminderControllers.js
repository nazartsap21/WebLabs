const reminder = require('../db/models/reminder');
const { Op } = require('sequelize');

const get = async (req, res, next) => {
    const { search, sort, price, priority, subject } = req.query;
    console.log(req.query);
    let queryOptions = {
        where: {}
    };

    if (search) {
        queryOptions.where.title = {
            [Op.iLike]: `%${search.trim()}%`
        };
    }

    if (price) {
        const priceRange = price.split('-');
        if (priceRange.length === 2) {
            queryOptions.where.price = {
                [Op.between]: [parseInt(priceRange[0]), parseInt(priceRange[1])]
            };
        } else if (price === "500+") {
            queryOptions.where.price = {
                [Op.gte]: 500
            };
        }
    }

    if (priority) {
        queryOptions.where.priority = priority;
    }

    if (subject) {
        queryOptions.where.subject = subject;
    }

    if (sort) {
        switch (sort) {
            case 'sooner':
                queryOptions.order = [['dueDate', 'ASC']];
                break;
            case 'later':
                queryOptions.order = [['dueDate', 'DESC']];
                break;
            case 'a-z':
                queryOptions.order = [['title', 'ASC']];
                break;
            case 'z-a':
                queryOptions.order = [['title', 'DESC']];
                break;
            default:
                break;
        }
    }

    try {
        const reminders = await reminder.findAll(queryOptions);
        res.status(200).json({
            data: reminders,
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving reminders."
        });
    }
};

const getById = async (req, res, next) => {
    const id = req.params.id;

    const reminderById = await reminder.findByPk(id)
        .then(data => {
            res.status(200).json({
                status: 200,
                data: data,
            });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Reminder with id=" + id
            });
        });
};

const create = async (req, res, next) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const {id, title, description, dueDate, lastUpdated, price, priority, subject} = req.body;

    try {
        const existingReminder = await reminder.findOne({
            where: {
                title: title,
                description: description
            }
        });

        if (existingReminder) {
            return res.status(409).json({
                status: 409,
                message: "A reminder with the same title and description already exists."
            });
        }

        const newReminder = await reminder.create({
            title: title,
            description: description,
            dueDate: dueDate,
            lastUpdated: new Date(),
            price: price,
            priority: priority,
            subject: subject
        });

        res.status(201).json({
            status: 201,
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Reminder."
        });
    }
};

const deleteById = async (req, res, next) => {
    const id = req.params.id;

    try {
        const reminderById = await reminder.findByPk(id);

        if (!reminderById) {
            return res.status(404).send({
                message: `Cannot delete Reminder with id=${id}. Reminder not found`
            });
        }

        await reminderById.destroy();


        res.status(200).json({
            status: 200,
        });
    } catch (err) {
        res.status(500).send({
            message: "Error deleting Reminder with id=" + id
        });
    }
};

const update = async (req, res, next) => {
    const id = req.params.id;
    const body = req.body;

    try {
        const reminderById = await reminder.findByPk(id);

        if (!reminderById) {
            return res.status(404).send({
                message: `Cannot update Reminder with id=${id}. Reminder not found`
            });
        }

        reminderById.title = body.title;
        reminderById.description = body.description;
        reminderById.dueDate = body.dueDate;
        reminderById.lastUpdated = body.lastUpdated;
        reminderById.price = body.price;
        reminderById.priority = body.priority;
        reminderById.subject = body.subject;

        await reminderById.save();

        const allReminders = await reminder.findAll();

        res.status(200).json({
            status: 200,
            data: allReminders,
        });
    } catch (err) {
        res.status(500).send({
            message: "Error updating Reminder with id=" + id
        });
    }
};

const countPrice = async (req, res, next) => {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
        return res.status(400).send({
            message: "Invalid input: 'ids' should be a non-empty array."
        });
    }

    try {
        const reminders = await reminder.findAll({
            where: {
                id: {
                    [Op.in]: ids
                }
            }
        });

        const totalPrice = reminders.reduce((sum, reminder) => sum + (reminder.price || 0), 0);

        res.status(200).json({
            status: 'success',
            totalPrice: totalPrice
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while counting the prices."
        });
    }
};

module.exports = { create, get, update, deleteById, countPrice, getById };