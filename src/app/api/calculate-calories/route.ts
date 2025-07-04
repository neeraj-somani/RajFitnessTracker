import { NextRequest, NextResponse } from 'next/server';

// Exercise database with MET values and calorie calculations
const exerciseDatabase = {
  // Cardio exercises
  'running': { baseMET: 8.0, name: 'Running' },
  'jogging': { baseMET: 7.0, name: 'Jogging' },
  'walking': { baseMET: 3.5, name: 'Walking' },
  'cycling': { baseMET: 6.0, name: 'Cycling' },
  'swimming': { baseMET: 6.0, name: 'Swimming' },
  'elliptical': { baseMET: 5.5, name: 'Elliptical' },
  'rowing': { baseMET: 6.0, name: 'Rowing' },
  'jumping rope': { baseMET: 12.0, name: 'Jumping Rope' },
  'dancing': { baseMET: 4.5, name: 'Dancing' },
  'hiking': { baseMET: 6.0, name: 'Hiking' },
  
  // Strength training
  'weight lifting': { baseMET: 3.5, name: 'Weight Lifting' },
  'strength training': { baseMET: 3.5, name: 'Strength Training' },
  'push ups': { baseMET: 3.8, name: 'Push-ups' },
  'pull ups': { baseMET: 4.0, name: 'Pull-ups' },
  'squats': { baseMET: 5.0, name: 'Squats' },
  'lunges': { baseMET: 4.5, name: 'Lunges' },
  'deadlifts': { baseMET: 4.0, name: 'Deadlifts' },
  'bench press': { baseMET: 3.5, name: 'Bench Press' },
  
  // Yoga and flexibility
  'yoga': { baseMET: 2.5, name: 'Yoga' },
  'pilates': { baseMET: 3.0, name: 'Pilates' },
  'stretching': { baseMET: 2.0, name: 'Stretching' },
  'meditation': { baseMET: 1.0, name: 'Meditation' },
  
  // Sports
  'basketball': { baseMET: 8.0, name: 'Basketball' },
  'tennis': { baseMET: 7.0, name: 'Tennis' },
  'soccer': { baseMET: 7.0, name: 'Soccer' },
  'volleyball': { baseMET: 4.0, name: 'Volleyball' },
  'badminton': { baseMET: 5.5, name: 'Badminton' },
  'golf': { baseMET: 3.5, name: 'Golf' },
  
  // Other activities
  'boxing': { baseMET: 8.0, name: 'Boxing' },
  'kickboxing': { baseMET: 8.5, name: 'Kickboxing' },
  'martial arts': { baseMET: 7.5, name: 'Martial Arts' },
  'rock climbing': { baseMET: 8.0, name: 'Rock Climbing' },
  'skating': { baseMET: 5.5, name: 'Skating' },
  'skiing': { baseMET: 7.0, name: 'Skiing' },
  'snowboarding': { baseMET: 6.0, name: 'Snowboarding' },
  'surfing': { baseMET: 3.0, name: 'Surfing' },
  'kayaking': { baseMET: 5.0, name: 'Kayaking' },
  'paddleboarding': { baseMET: 3.5, name: 'Paddleboarding' },
  
  // Gym machines
  'treadmill': { baseMET: 7.0, name: 'Treadmill' },
  'stationary bike': { baseMET: 6.0, name: 'Stationary Bike' },
  'stair climber': { baseMET: 8.0, name: 'Stair Climber' },
  'cross trainer': { baseMET: 5.5, name: 'Cross Trainer' },
  
  // High intensity
  'hiit': { baseMET: 10.0, name: 'HIIT' },
  'crossfit': { baseMET: 9.0, name: 'CrossFit' },
  'circuit training': { baseMET: 8.0, name: 'Circuit Training' },
  'burpees': { baseMET: 8.0, name: 'Burpees' },
  'mountain climbers': { baseMET: 8.0, name: 'Mountain Climbers' },
  'plank': { baseMET: 4.0, name: 'Plank' },
  'wall sit': { baseMET: 3.5, name: 'Wall Sit' },
};

// Intensity multipliers
const intensityMultipliers = {
  'light': 0.8,
  'moderate': 1.0,
  'vigorous': 1.2,
  'very-vigorous': 1.4
};

// Helper function to find the best matching exercise
function findExercise(exerciseInput: string) {
  const input = exerciseInput.toLowerCase().trim();
  
  // Direct match
  if (exerciseDatabase[input as keyof typeof exerciseDatabase]) {
    return exerciseDatabase[input as keyof typeof exerciseDatabase];
  }
  
  // Partial match
  for (const [key, exercise] of Object.entries(exerciseDatabase)) {
    if (input.includes(key) || key.includes(input)) {
      return exercise;
    }
  }
  
  // Default to moderate walking if no match found
  return { baseMET: 3.5, name: 'General Exercise' };
}

// Calculate calories burned
function calculateCalories(exercise: string, duration: number, intensity: string) {
  const exerciseData = findExercise(exercise);
  const intensityMultiplier = intensityMultipliers[intensity as keyof typeof intensityMultipliers] || 1.0;
  
  // MET calculation: Calories = MET × Weight (kg) × Duration (hours) × Intensity Multiplier
  // Assuming average person weight of 70kg (154 lbs)
  const weightKg = 70;
  const durationHours = duration / 60;
  const adjustedMET = exerciseData.baseMET * intensityMultiplier;
  
  const calories = Math.round(adjustedMET * weightKg * durationHours);
  
  return {
    calories,
    exerciseName: exerciseData.name,
    met: exerciseData.baseMET,
    intensityMultiplier,
    adjustedMET: Math.round(adjustedMET * 10) / 10
  };
}

// Generate explanation
function generateExplanation(calculation: any, exercise: string, duration: number, intensity: string) {
  const { calories, exerciseName, met, intensityMultiplier, adjustedMET } = calculation;
  
  let explanation = `Based on ${duration} minutes of ${exerciseName} at ${intensity} intensity, `;
  explanation += `I estimate approximately ${calories} calories burned. `;
  explanation += `This calculation uses a MET (Metabolic Equivalent of Task) value of ${met} for ${exerciseName}, `;
  explanation += `adjusted by a ${intensityMultiplier}x intensity multiplier to ${adjustedMET} METs. `;
  explanation += `The calculation assumes an average person (70kg/154lbs) and uses the formula: `;
  explanation += `Calories = MET × Weight × Duration × Intensity. `;
  
  if (intensity === 'light') {
    explanation += `Since this was light intensity, the calorie burn is conservative.`;
  } else if (intensity === 'vigorous' || intensity === 'very-vigorous') {
    explanation += `The high intensity level significantly increases calorie burn.`;
  }
  
  explanation += ` Remember, actual calorie burn varies based on individual factors like age, weight, fitness level, and exercise form.`;
  
  return explanation;
}

export async function POST(request: NextRequest) {
  try {
    const { exercise, duration, intensity } = await request.json();

    // Validate input
    if (!exercise || !duration || !intensity) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Calculate calories
    const calculation = calculateCalories(exercise, duration, intensity);
    const explanation = generateExplanation(calculation, exercise, duration, intensity);

    return NextResponse.json({
      calories: calculation.calories,
      explanation: explanation
    });

  } catch (error) {
    console.error('Error calculating calories:', error);
    
    // Fallback response
    const { exercise, duration, intensity } = await request.json();
    const fallbackCalories = Math.round(duration * 5);
    
    return NextResponse.json({
      calories: fallbackCalories,
      explanation: `Due to a technical issue, I'm providing a basic estimate: approximately ${fallbackCalories} calories burned during ${duration} minutes of ${exercise} at ${intensity} intensity. This is a conservative estimate based on general fitness guidelines.`
    });
  }
} 