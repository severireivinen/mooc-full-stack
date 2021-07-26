import express from 'express';
import bmiCalculator from './bmiCalculator';
import exerciseCalculator from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi/:height?/:weight?', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    try {
        if (!isNaN(height) && !isNaN(weight)) {
            res.json(bmiCalculator(height, weight));
        } else {
            throw new Error('malformatted parameters');
        }
    } catch (e) {
        res.status(400).json(e);
    }
});

app.post('/exercises', (req, res) => {
    const hourArray: Array<number> = req.body.hourArray;    // eslint-disable-line
    const dailyTarget = Number(req.body.dailyTarget);       // eslint-disable-line

    try {
        if (!dailyTarget || hourArray.length < 1) {
            throw new Error('missing parameters');
        } else if (isNaN(dailyTarget) || !Array.isArray(hourArray)) {
            throw new Error('malformatted parameters');
        } else {
            res.json(exerciseCalculator(hourArray, dailyTarget));
        }

    } catch (e) {
        res.status(400).json(e);
    }
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});