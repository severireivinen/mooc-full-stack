import React from "react";

interface Part {
    name: string;
    exerciseCount: number;
}

const Total = ({ content }: { content: Array<Part> }) => (
    <div>
        <p>
            Number of exercises {content.reduce((sum, part) => sum + part.exerciseCount, 0)}
        </p>
    </div>
)

export default Total;