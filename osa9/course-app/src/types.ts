// new types
export interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
}

export interface CourseBaseExtended extends CoursePartBase {
    description: string;
}

export interface CourseNormalPart extends CourseBaseExtended {
    type: "normal";
}
export interface CourseProjectPart extends CoursePartBase {
    type: "groupProject";
    groupProjectCount: number;
}

export interface CourseSubmissionPart extends CourseBaseExtended {
    type: "submission";
    exerciseSubmissionLink: string;
}

export interface CourseSpecialPart extends CourseBaseExtended {
    type: "special";
    requirements: Array<string>
}

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;