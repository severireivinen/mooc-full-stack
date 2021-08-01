import { NewPatientEntry, Gender, Entry } from "./types";

type Fields = {
    name: unknown,
    dateOfBirth: unknown,
    ssn: unknown,
    gender: unknown,
    occupation: unknown,
    entries: unknown
};

const toNewPatientEntry = ({ name, dateOfBirth, ssn, gender, occupation, entries }: Fields): NewPatientEntry => {
    const newEntry: NewPatientEntry = {
        name: parseString(name),
        dateOfBirth: parseDate(dateOfBirth),
        ssn: parseString(ssn),
        gender: parseGender(gender),
        occupation: parseString(occupation),
        entries: parseEntryArray(entries)
    };
    return newEntry;
};

const parseString = (s: unknown): string => {
    if (!s || !isString(s)) {
        throw new Error('Incorrect or missing value: ' + s);
    }
    return s;
};

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};

const parseEntryArray = (entries: unknown): Entry[] => {
    if (!entries || !isEntryArray(entries)) {
        throw new Error('Incorrect or missing value: ' + entries);
    }
    return entries;
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

const isEntryArray = (a: unknown): a is Entry[] => {
    return Array.isArray(a) || a instanceof Array;
};

export default toNewPatientEntry;