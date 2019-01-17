import express from 'express';

import receiptsHandler from '../controllers/receiptsHandler';

const routes = express();

routes.get('/working', (req, res) => {
    res.send('Server is up and running');
})

//Receipt Routes
routes.get('/receipt/id/:receipt_id', receiptsHandler.read);
routes.get('/receipt/all', receiptsHandler.readAll);
routes.post('/receipt/create', receiptsHandler.set);
routes.get('/user/:user_id', receiptsHandler.user);

export default routes;