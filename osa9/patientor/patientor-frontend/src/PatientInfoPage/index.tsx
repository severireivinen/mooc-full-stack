import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { Container, Icon, List } from "semantic-ui-react";
import { apiBaseUrl } from "../constants";
import { setPatient, useStateValue } from "../state";
import { Patient } from "../types";

const PatientInfoPage = () => {
    const [{ patients }, dispatch] = useStateValue();
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

    return (
        <div className='App'>
            {Object.values(patients).map((patient: Patient) => {
                if (patient.id === id) {
                    return (
                        <Container>
                            <h3>{patient.name} <Icon name={patient.gender === 'male' ? 'mars' : 'venus'} /></h3>
                            <List>
                                <List.Item>ssn: {patient.ssn}</List.Item>
                                <List.Item>occupation: {patient.occupation}</List.Item>
                            </List>
                        </Container>
                    );
                }
            })}
        </div>
    );
};

export default PatientInfoPage;