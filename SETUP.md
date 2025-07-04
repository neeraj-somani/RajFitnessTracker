# Raj Fitness Tracker Setup Guide

## Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- (Optional) OpenAI API key for enhanced AI features

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure OpenAI API Key (Optional)
The app works with built-in exercise calculations, but you can enhance it with OpenAI:

1. Get your OpenAI API key from [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Create a `.env.local` file in the root directory
3. Add your API key to the file:
```
OPENAI_API_KEY=your_actual_api_key_here
```

### 3. Run the Development Server
```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000)

## How to Use

1. Enter the exercise you performed (e.g., "Running", "Weight lifting", "Yoga")
2. Set the duration in minutes
3. Select the intensity level
4. Click "Calculate Calories Burned"
5. The AI will provide an estimate of calories burned with an explanation

## Features

- Modern, responsive UI with dark mode support
- Intelligent calorie calculations using MET values
- Support for 40+ different exercises
- Real-time form validation
- Loading states and error handling
- Beautiful gradient backgrounds and animations
- (Optional) OpenAI integration for enhanced AI features

## Technical Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Calculations**: MET-based calorie calculations
- **API**: Next.js API Routes
- **AI**: (Optional) OpenAI GPT-3.5 Turbo 