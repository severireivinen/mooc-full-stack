import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { Container, Icon, List } from "semantic-ui-react";
import { apiBaseUrl } from "../constants";
import { setDiagnoseList, setPatient, useStateValue } from "../state";
import { Diagnosis, Patient } from "../types";

const PatientInfoPage = () => {
    const [{ patients, diagnoses }, dispatch] = useStateValue();
    const { id } = useParams<{ id: string }>();

    React.useEffect(() => {
        const fetchPatientInfo = async () => {
            try {
                const { data: patientListFromApi } = await axios.get<Patient>(
                    `${apiBaseUrl}/patients/${id}`
                );
                //dispatch({ type: 'SET_PATIENT', payload: patientListFromApi });
                dispatch(setPatient(patientListFromApi));
            } catch (e) {
                console.log(e);
            }
        };
        if (!Object.keys(patients).includes(id)) {
            void fetchPatientInfo();
        }
    }, [dispatch]);

    // Diagnoses
    React.useEffect(() => {
        const fetchDiagnoses = async () => {
            try {
                const { data: diagnosesFromApi } = await axios.get<Diagnosis[]>(
                    `${apiBaseUrl}/diagnoses`
                );
                dispatch(setDiagnoseList(diagnosesFromApi));
            } catch (e) {
                console.log(e);
            }
        };
        void fetchDiagnoses();
    }, [dispatch]);

    const codeToName = (allDiagnoses: Diagnosis[], code: string) => {
        const diagnose = allDiagnoses.find(d => (
            d.code === code
        ));
        if (diagnose) {
            return diagnose.name;
        } else {
            return '-';
        }
    };

    return (
        <div className='App'>
            {Object.values(patients).map((patient: Patient) => {
                if (patient.id === id) {
                    return (
                        <Container key={patient.id}>
                            <h3>{patient.name} <Icon name={patient.gender === 'male' ? 'mars' : 'venus'} /></h3>
                            <List>
                                <List.Item>ssn: {patient.ssn}</List.Item>
                                <List.Item>occupation: {patient.occupation}</List.Item>
                            </List>
                            <h4>entries</h4>
                            <List>
                                {patient.entries?.map(entry => (
                                    <div key={entry.id}>
                                        <p>{entry.date} <i>{entry.description}</i></p>
                                        <ul>
                                            {entry.diagnosisCodes?.map(code => (
                                                <li key={code}>{code} {codeToName(diagnoses, code)}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </List>
                        </Container>
                    );
                }
            })}
        </div>
    );
};

export default PatientInfoPage;