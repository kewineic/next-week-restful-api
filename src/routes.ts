import express from 'express';
import db from './database/connection';
import convertHourToMinutes from './utils/convertHourToMinutes';

const routes = express.Router();

interface ScheduleItem{
    week_day: number;
    from: string; 
    to: string;
}

routes.get('/', (req, res) => {
    return res.json({message: 'Hello World'});
});

routes.post('/classes', async (req, res) => {
    const {
        name,
        avatar,
        whatsapp,
        bio,
        subject,
        cost,
        schedule
    } = req.body;

    const  insertedUsersIds = await db('users').insert({
        name,
        avatar,
        whatsapp,
        bio,
    });

    const user_id = insertedUsersIds[0];

    const insertedClassesIds = await db('classes').insert({
        subject,
        cost,
        user_id
    });

    const class_id = insertedClassesIds[0];

    const classSchedule = schedule.map((schedul: ScheduleItem) => {
        return {
            class_id,
            week_day: schedul.week_day,
            from: convertHourToMinutes(schedul.from),
            to: convertHourToMinutes(schedul.to)
        };
    });

    await db('class_schedule').insert(classSchedule);

    return res.send();
});


export default routes;