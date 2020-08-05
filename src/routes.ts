import express from 'express';
const routes = express.Router();

import ClassesController from './controllers/ClassesController';
const classesController = new ClassesController();

routes.get('/', (req, res) => {
    return res.json({message: 'Hello World'});
});

routes.get('/classes', classesController.index);
routes.post('/classes', classesController.create);

export default routes;