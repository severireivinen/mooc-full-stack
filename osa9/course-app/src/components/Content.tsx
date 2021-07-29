import React from 'react';

interface Part {
    name: string;
    exerciseCount: number;
}

const Content = ({ content }: { content: Array<Part> }) => (
    <div>
        {content.map(course => (
            <p key={course.name}>
                {course.name} {course.exerciseCount}
            </p>
        ))}
    </div>
);

export default Content;