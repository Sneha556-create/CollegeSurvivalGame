# CollegeSurvivalGame
An AI game
📌 Project Overview

College Survival Game is an AI-based 2D survival game where a student character must avoid real-life challenges such as assignments, exams, and environmental stress while maintaining attendance above a critical threshold.

The game integrates Artificial Intelligence concepts, specifically the A* (A-Star) search algorithm, to enable intelligent enemy behavior.

🎯 Problem Statement

Students face multiple academic and environmental challenges that impact their attendance and performance.

This project models these challenges as a game environment, where:

The player must survive against dynamic obstacles
Maintain attendance ≥ 40%
Strategically collect power-ups (day-offs)
🧠 Algorithm Used
⭐ A* (A-Star) Algorithm

The A* algorithm is used for enemy pathfinding, allowing enemies to intelligently chase the player.

Evaluation Function:

f(n) = g(n) + h(n)

Where:

g(n) → Cost from start node
h(n) → Heuristic (Manhattan distance)
f(n) → Total estimated cost
✅ Why A*?
Finds optimal shortest path
Efficient for grid-based environments
Suitable for real-time applications
🎮 Game Features
🧍 Player controlled using arrow keys
👾 Multiple enemies with AI-based chasing
🧠 Intelligent pathfinding using A*
🟦 Day-off power-ups to increase attendance
📉 Attendance decreases on collision
❌ Game over if attendance < 40%
🔁 Restart functionality
🌐 Web-based version (HTML, CSS, JavaScript)
🏗️ Project Structure
Web Version:
web-ai-game/
│
├── index.html     # UI layout
├── style.css      # Styling and UI design
├── game.js        # Game logic
├── astar.js       # A* algorithm implementation
🧠 How AI Works in This Game
The game is modeled as a grid-based search problem
Each enemy acts as an intelligent agent
The player is treated as the goal state
Enemies compute shortest path using A*
Movement is updated dynamically in real-time
🔄 Algorithm Workflow
Initialize player and enemies
Convert positions into grid coordinates
Apply A* algorithm to compute shortest path
Move enemy step-by-step toward player
Check collisions and update attendance
Repeat until game over
🚀 Future Enhancements
🎨 Advanced UI/UX and animations
🧠 Smarter AI agents with behavior variation
📱 Mobile compatibility
🎵 Sound effects and music
📊 Score tracking and leaderboard
🤖 Reinforcement Learning-based enemies
