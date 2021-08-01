/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getNonSensitivePatients());
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const patient = patientService.findPatientById(id);
    if (patient) {
        res.send(patient);
    } else {
        res.status(404).send('Patient not found.');
    }
});

router.post('/', (req, res) => {
    try {
        const newPatientEntry = toNewPatientEntry(req.body);
        const addedEntry = patientService.addPatient(newPatientEntry);
        res.json(addedEntry);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

export default router;