interface ArgParameters {
    height: number,
    weight: number
}

const parseArguments = (args: Array<string>): ArgParameters => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        }
    }
}

const calculateBmi = (height: number, weight: number): string => {
    const bmi = (weight / Math.pow((height / 100), 2));

    if (bmi < 16.0) {
        return 'Underweight (Severe thinness)';
    } else if (bmi >= 16.0 && 16.9 >= bmi) {
        return 'Underweight (Moderate thinness)';
    } else if (bmi >= 17.0 && 18.4 >= bmi) {
        return 'Underweight (Mild thinness)';
    } else if (bmi >= 18.5 && 24.9 >= bmi) {
        return 'Normal range';
    } else if (bmi >= 25.0 && 29.9 >= bmi) {
        return 'Overweight (Pre-obese)';
    } else if (bmi >= 30.0 && 34.9 >= bmi) {
        return 'Obese (Class I)';
    } else if (bmi >= 35.0 && 39.9 >= bmi) {
        return 'Obese (Class II)';
    } else if (bmi >= 40.0) {
        return 'Obese (Class III)';
    }
}

try {
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
} catch (e) {
    console.log('Something went wrong, error message ', e.message);
}