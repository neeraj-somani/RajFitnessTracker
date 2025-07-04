'use client';

import { useState, useEffect } from 'react';
import { Activity, Clock, Flame, Zap } from 'lucide-react';

interface WorkoutData {
  exercise: string;
  duration: number;
  intensity: string;
  date: string;
  calories?: number;
}

interface CalorieResult {
  calories: number;
  explanation: string;
}

export default function Home() {
  // Helper to get today's date in yyyy-mm-dd
  function getToday() {
    return new Date().toISOString().split('T')[0];
  }

  const [workoutData, setWorkoutData] = useState<WorkoutData>({
    exercise: '',
    duration: 30,
    intensity: 'moderate',
    date: getToday(),
  });
  const [calorieResult, setCalorieResult] = useState<CalorieResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [workoutHistory, setWorkoutHistory] = useState<WorkoutData[]>([]);

  // Load history from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('workoutHistory');
    if (saved) {
      setWorkoutHistory(JSON.parse(saved));
    }
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('workoutHistory', JSON.stringify(workoutHistory));
  }, [workoutHistory]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/calculate-calories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(workoutData),
      });
      
      if (response.ok) {
        const result = await response.json();
        setCalorieResult(result);
        // Save to history with calories
        setWorkoutHistory(prev => [
          { ...workoutData, calories: result.calories },
          ...prev
        ]);
      } else {
        console.error('Failed to calculate calories');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Activity className="w-8 h-8 text-blue-600 mr-3" />
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                Raj Fitness Tracker
              </h1>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Track your workouts and get intelligent calorie estimates
            </p>
          </div>

          {/* Workout Form */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Log Your Workout
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="exercise" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  What exercise did you do?
                </label>
                <input
                  type="text"
                  id="exercise"
                  value={workoutData.exercise}
                  onChange={(e) => setWorkoutData({...workoutData, exercise: e.target.value})}
                  placeholder="e.g., Running, Weight lifting, Yoga, Swimming..."
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Duration (minutes)
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    id="duration"
                    value={workoutData.duration}
                    onChange={(e) => setWorkoutData({...workoutData, duration: parseInt(e.target.value)})}
                    min="1"
                    max="300"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="intensity" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Intensity Level
                </label>
                <select
                  id="intensity"
                  value={workoutData.intensity}
                  onChange={(e) => setWorkoutData({...workoutData, intensity: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="light">Light (Easy pace, minimal effort)</option>
                  <option value="moderate">Moderate (Steady pace, moderate effort)</option>
                  <option value="vigorous">Vigorous (Fast pace, high effort)</option>
                  <option value="very-vigorous">Very Vigorous (Maximum effort)</option>
                </select>
              </div>

              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  value={workoutData.date}
                  onChange={(e) => setWorkoutData({ ...workoutData, date: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  required
                  max={getToday()}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Calculating...
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5 mr-2" />
                    Calculate Calories Burned
                  </>
                )}
              </button>
            </form>
            
            {/* Exercise Suggestions */}
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">
                💡 Popular Exercises You Can Try:
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                <span className="text-blue-700 dark:text-blue-400">• Running</span>
                <span className="text-blue-700 dark:text-blue-400">• Weight lifting</span>
                <span className="text-blue-700 dark:text-blue-400">• Yoga</span>
                <span className="text-blue-700 dark:text-blue-400">• Swimming</span>
                <span className="text-blue-700 dark:text-blue-400">• Cycling</span>
                <span className="text-blue-700 dark:text-blue-400">• HIIT</span>
                <span className="text-blue-700 dark:text-blue-400">• Basketball</span>
                <span className="text-blue-700 dark:text-blue-400">• Tennis</span>
                <span className="text-blue-700 dark:text-blue-400">• Boxing</span>
                <span className="text-blue-700 dark:text-blue-400">• CrossFit</span>
                <span className="text-blue-700 dark:text-blue-400">• Dancing</span>
                <span className="text-blue-700 dark:text-blue-400">• Hiking</span>
              </div>
            </div>
          </div>

          {/* Results */}
          {calorieResult && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Flame className="w-6 h-6 text-orange-500 mr-2" />
                Calorie Results
              </h2>
              
              <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg p-4 mb-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                    {calorieResult.calories} calories
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    burned during your workout
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">AI Analysis:</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                  {calorieResult.explanation}
                </p>
              </div>
            </div>
          )}

          {/* Workout History */}
          {workoutHistory.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mt-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Workout History</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-blue-50 dark:bg-blue-900/20">
                      <th className="px-3 py-2 text-left">Date</th>
                      <th className="px-3 py-2 text-left">Exercise</th>
                      <th className="px-3 py-2 text-left">Duration (min)</th>
                      <th className="px-3 py-2 text-left">Intensity</th>
                      <th className="px-3 py-2 text-left">Calories</th>
                    </tr>
                  </thead>
                  <tbody>
                    {workoutHistory.map((w, i) => (
                      <tr key={i} className="border-b border-gray-100 dark:border-gray-700">
                        <td className="px-3 py-2">{w.date}</td>
                        <td className="px-3 py-2">{w.exercise}</td>
                        <td className="px-3 py-2">{w.duration}</td>
                        <td className="px-3 py-2 capitalize">{w.intensity.replace('-', ' ')}</td>
                        <td className="px-3 py-2 font-semibold text-orange-600 dark:text-orange-400">{w.calories ?? '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
