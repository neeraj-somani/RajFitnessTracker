# Raj Fitness Tracker

A modern fitness tracking application built with Next.js and intelligent calorie calculations using MET values for 40+ exercises.

## Features

- 🏃‍♂️ **Workout Tracking**: Log your exercises, duration, and intensity
- 🤖 **Intelligent Calorie Calculation**: Get accurate calorie estimates using MET values for 40+ exercises
- 🎨 **Modern UI**: Beautiful, responsive design with dark mode support
- ⚡ **Real-time Updates**: Instant feedback and loading states
- 📱 **Mobile Friendly**: Works perfectly on all devices

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **AI**: OpenAI GPT-3.5 Turbo
- **API**: Next.js API Routes

## Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

4. **Start tracking**: Enter your workout details and get instant calorie estimates!

## How to Use

1. Enter the exercise you performed (e.g., "Running", "Weight lifting", "Yoga")
2. Set the duration in minutes
3. Select the intensity level
4. Click "Calculate Calories Burned"
5. Get AI-powered calorie estimates with detailed explanations

## Enhanced Features with OpenAI (Optional)

For enhanced AI-powered features:

1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create an account or sign in
3. Generate a new API key
4. Create a `.env.local` file and add: `OPENAI_API_KEY=your_api_key_here`

## Project Structure

```
RajFitnessTracker/
├── src/
│   └── app/
│       ├── page.tsx              # Main fitness tracking interface
│       ├── layout.tsx            # App layout
│       ├── globals.css           # Global styles
│       └── api/
│           └── calculate-calories/
│               └── route.ts      # OpenAI API integration
├── public/                       # Static assets
├── package.json                  # Dependencies and scripts
└── SETUP.md                      # Detailed setup guide
```

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is open source and available under the [MIT License](LICENSE).
