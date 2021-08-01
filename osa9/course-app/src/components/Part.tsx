import React from 'react';
import { CoursePart } from '../types';

const Part = ({ course }: { course: CoursePart }) => {
    const assertNever = (value: never): never => {
        throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
    };

    switch (course.type) {
        case 'normal':
            return (
                <p>
                    <div><strong>{course.name} {course.exerciseCount}</strong></div>
                    <div><i>{course.description}</i></div>
                </p>
            );
        case 'groupProject':
            return (
                <p>
                    <div><strong>{course.name} {course.exerciseCount}</strong></div>
                    <div>project exercises {course.groupProjectCount}</div>
                </p>
            );
        case 'submission':
            return (
                <p>
                    <div><strong>{course.name} {course.exerciseCount}</strong></div>
                    <div><i>{course.description}</i></div>
                    <div>submit to {course.exerciseSubmissionLink}</div>
                </p>
            );
        case 'special':
            return (
                <p>
                    <div><strong>{course.name} {course.exerciseCount}</strong></div>
                    <div><i>{course.description}</i></div>
                    <div>required skills: {course.requirements.join(', ')}</div>
                </p>
            );
        default:
            return assertNever(course);
    }
};

export default Part;