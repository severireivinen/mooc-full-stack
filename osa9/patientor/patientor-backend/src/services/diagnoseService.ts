import diagnoseData from '../../data/diagnoses.json';
import { Diagnose } from '../types';

const diagnoses: Array<Diagnose> = diagnoseData;

const getAllDiagnoses = () => {
    return diagnoses;
};

export default { getAllDiagnoses };