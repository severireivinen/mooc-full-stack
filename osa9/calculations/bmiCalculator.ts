/*interface ArgParameters {
    height: number,
    weight: number
}*/

interface Result {
    height: number,
    weight: number,
    bmi: string
}

/*const parseArguments = (args: Array<string>): ArgParameters => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        }
    }
}*/

const calculateBmi = (height: number, weight: number): Result => {
    const bmi = (weight / Math.pow((height / 100), 2));

    if (bmi < 16.0) {
        return {
            height: height,
            weight: weight,
            bmi: 'Underweight (Severe thinness)'
        };
    } else if (bmi >= 16.0 && 16.9 >= bmi) {
        return {
            height: height,
            weight: weight,
            bmi: 'Underweight (Moderate thinness)'
        };
    } else if (bmi >= 17.0 && 18.4 >= bmi) {
        return {
            height: height,
            weight: weight,
            bmi: 'Underweight (Mild thinness)'
        };
    } else if (bmi >= 18.5 && 24.9 >= bmi) {
        return {
            height: height,
            weight: weight,
            bmi: 'Normal range'
        };
    } else if (bmi >= 25.0 && 29.9 >= bmi) {
        return {
            height: height,
            weight: weight,
            bmi: 'Overweight (Pre-obese)'
        };
    } else if (bmi >= 30.0 && 34.9 >= bmi) {
        return {
            height: height,
            weight: weight,
            bmi: 'Obese (Class I)'
        };
    } else if (bmi >= 35.0 && 39.9 >= bmi) {
        return {
            height: height,
            weight: weight,
            bmi: 'Obese (Class II)'
        };
    } else {
        return {
            height: height,
            weight: weight,
            bmi: 'Obese (Class III)'
        };
    }
};

/*try {
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
} catch (e) {
    console.log('Something went wrong, error message ', e.message);
}*/

export default calculateBmi;