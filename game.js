let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");

let player, enemies, attendance, running, dayoff;

const size = 20;
const gridSize = 30;

// ---------------- START GAME ----------------
function startGame() {
    document.getElementById("startScreen").style.display = "none";
    canvas.style.display = "block";

    player = {x: 15, y: 15};

    enemies = [
        {x: 2, y: 2, delay: 600, lastMove: 0},   // slow
        {x: 25, y: 2, delay: 400, lastMove: 0},  // medium
        {x: 10, y: 25, delay: 250, lastMove: 0}  // fast
    ];

    // 🟦 Day-off spawn
    dayoff = {
        x: Math.floor(Math.random() * gridSize),
        y: Math.floor(Math.random() * gridSize)
    };

    attendance = 100;
    running = true;

    requestAnimationFrame(gameLoop);
}

// ---------------- RESTART ----------------
function restartGame() {
    document.getElementById("gameOverScreen").classList.add("hidden");
    startGame();
}

// ---------------- PLAYER CONTROLS ----------------
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") player.x--;
    if (e.key === "ArrowRight") player.x++;
    if (e.key === "ArrowUp") player.y--;
    if (e.key === "ArrowDown") player.y++;

    // Keep inside grid
    player.x = Math.max(0, Math.min(gridSize - 1, player.x));
    player.y = Math.max(0, Math.min(gridSize - 1, player.y));
});

// ---------------- GAME LOOP ----------------
function gameLoop(timestamp) {
    if (!running) return;

    ctx.clearRect(0, 0, 600, 600);

    // 🟢 Draw player
    ctx.fillStyle = "green";
    ctx.fillRect(player.x * size, player.y * size, size, size);

    // 🔴 Enemies (with delay + A*)
    for (let enemy of enemies) {

        if (!enemy.lastMove) enemy.lastMove = timestamp;

        if (timestamp - enemy.lastMove > enemy.delay) {
            let path = astar(enemy, player, gridSize);

            if (path.length > 0) {
                enemy.x = path[0].x;
                enemy.y = path[0].y;
            }

            enemy.lastMove = timestamp;
        }

        ctx.fillStyle = "red";
        ctx.fillRect(enemy.x * size, enemy.y * size, size, size);

        // Collision with player
        if (enemy.x === player.x && enemy.y === player.y) {
            attendance -= 0.5;
        }
    }

    // 🟦 DRAW DAY-OFF
    ctx.fillStyle = "blue";
    ctx.fillRect(dayoff.x * size, dayoff.y * size, size, size);

    // 🟦 PLAYER COLLECTS DAY-OFF
    if (player.x === dayoff.x && player.y === dayoff.y) {
        attendance += 10;

        // Respawn day-off
        dayoff.x = Math.floor(Math.random() * gridSize);
        dayoff.y = Math.floor(Math.random() * gridSize);
    }

    // Limit attendance
    if (attendance > 100) attendance = 100;

    // 📊 Display attendance
    ctx.fillStyle = "white";
    ctx.fillText("Attendance: " + Math.floor(attendance), 10, 20);

    // ❌ Game over
    if (attendance <= 40) {
        running = false;
        canvas.style.display = "none";
        document.getElementById("gameOverScreen").classList.remove("hidden");
        return;
    }

    requestAnimationFrame(gameLoop);
}
