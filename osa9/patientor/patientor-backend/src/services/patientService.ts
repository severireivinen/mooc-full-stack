import patients from '../../data/patients';
import { NonSensitivePatient, Patient, NewPatientEntry } from '../types';
import { v1 as uuid } from 'uuid';

const getNonSensitivePatients = (): NonSensitivePatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
    }));
};

const addPatient = (entry: NewPatientEntry): Patient => {
    const newPatientEntry = {
        id: uuid(),
        ...entry
    };
    patients.push(newPatientEntry);
    return newPatientEntry;
};

const findPatientById = (id: string): Patient | undefined => {
    return patients.find(patient => patient.id === id);
};

export default { getNonSensitivePatients, addPatient, findPatientById };