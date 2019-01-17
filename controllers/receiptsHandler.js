const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
import { jsonErr, jsonSuccess } from '../utils/json';

const adapter = new FileSync('db.json');
const db = low(adapter);

db.defaults({ receipts: [], users: [], categories: []}).write();

const receiptsHandler = {};

receiptsHandler.read = (req, res) => {
    return jsonSuccess(res, db.get('receipts').find({ receipt_id: Number(req.params.receipt_id) }).value());
};

receiptsHandler.readAll = (req, res) => {
    return jsonSuccess(res, db.get('receipts').value());
};

receiptsHandler.user = (req, res) => {
    return jsonSuccess(res, db.get('users').find({ id: Number(req.params.user_id) }).value());
}

receiptsHandler.set = (req, res) => {
    const { receipt_id, food_items, points_earned, payment_method, user_id } = req.body;

    if (!receipt_id || !food_items || !points_earned || !payment_method || !user_id) {
        return jsonErr(res, 'Invalid request, please try again');
    }

    const user = db.get('users').find({ id: user_id }).value();

    if (user !== undefined) {
        user.points += points_earned;
    } else {
        db.get('users').push({
            id: user_id,
            points: points_earned
        }).write();
    };

    db.get('receipts').push({
        receipt_id: receipt_id,
        food_items: food_items,
        points_earned: points_earned,
        payment_method: payment_method,
        user_id: user_id
    }).write();

    return jsonSuccess(res, 'Receipt created with id: ' + String(receipt_id));
}

export default receiptsHandler;