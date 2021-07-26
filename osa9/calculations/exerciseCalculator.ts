interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

/*interface ArgParametersExercise {
    target: number,
    hours: Array<number>
}

const parseArgumentsExercise = (args: Array<string>): ArgParametersExercise => {
    if (args[2] === undefined || args[3] === undefined) throw new Error('Invalid arguments');

    const hours: number[] = [];
    for (let i = 3; i < args.length; i++) {
        if (!isNaN(Number(args[i]))) {
            hours.push(Number(args[i]));
        } else {
            throw new Error('Arguments must be numbers');
        }
    }
    return {
        target: Number(args[2]),
        hours: hours
    };
};*/

const calculateExercises = (hourArray: Array<number>, dailyTarget: number): Result => {

    const average = (arr: Array<number>): number => {
        return arr.reduce((a, b) => a + b, 0) / arr.length;
    };

    const rating = (averageHours: number, target: number): number => {
        if (averageHours < target) {
            return 1;
        } else if (averageHours === target) {
            return 2;
        } else {
            return 3;
        }
    };

    const ratingDesc = (averageHours: number, target: number): string => {
        if (averageHours < target) {
            return 'Missed target!';
        } else if (averageHours === target) {
            return 'On target!';
        } else {
            return 'Over target!';
        }
    };

    return {
        periodLength: hourArray.length,
        trainingDays: hourArray.filter(hours => hours > 0).length,
        success: average(hourArray) >= dailyTarget ? true : false,
        rating: rating(average(hourArray), dailyTarget),
        ratingDescription: ratingDesc(average(hourArray), dailyTarget),
        target: dailyTarget,
        average: average(hourArray)
    };
};

/*try {
    const { target, hours } = parseArgumentsExercise(process.argv);
    console.log(calculateExercises(hours, target));
} catch (e) {
    console.log('Something went wrong, error message ', e.message);
}*/

export default calculateExercises;