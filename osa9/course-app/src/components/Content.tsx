import React from 'react';
import Part from './Part';
import { CoursePart } from '../types';

const Content = ({ content }: { content: CoursePart[] }) => (
    <div>
        {content.map(course => (
            <Part key={course.name} course={course} />
        ))}
    </div>
);

export default Content;