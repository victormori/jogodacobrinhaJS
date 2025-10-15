let tamanho = 20;
let cobraX = [];
let cobraY = [];

let direcao = "RIGHT";
let comidaX, comidaY;
let frameRateJogo = 5;

function setup() {
createCanvas(400, 400);

// Inicializa a cobra com 3 segmentos
for (let i = 0; i < 3; i++) {
cobraX.push(200 - i * tamanho);
cobraY.push(200);
}

criarComida();
}

function draw() {
frameRate(frameRateJogo);
background(220);

moverCobra();
desenharCobra();
desenharComida();
verificarColisoes();
}

// -------------------- Funções --------------------

function desenharCobra() {
fill(0, 255, 0);
for (let i = 0; i < cobraX.length; i++) {
rect(cobraX[i], cobraY[i], tamanho, tamanho);
}
}

function moverCobra() {
if (keyIsDown(LEFT_ARROW) && direcao != "RIGHT") direcao = "LEFT";
if (keyIsDown(RIGHT_ARROW) && direcao != "LEFT") direcao = "RIGHT";
if (keyIsDown(UP_ARROW) && direcao != "DOWN") direcao = "UP";
if (keyIsDown(DOWN_ARROW) && direcao != "UP") direcao = "DOWN";

let headX = cobraX[0];
let headY = cobraY[0];

if (direcao === "LEFT") headX -= tamanho;
if (direcao === "RIGHT") headX += tamanho;
if (direcao === "UP") headY -= tamanho;
if (direcao === "DOWN") headY += tamanho;

cobraX.unshift(headX);
cobraY.unshift(headY);

if (headX === comidaX && headY === comidaY) {
criarComida();
frameRateJogo = frameRateJogo + 1;
} else {
cobraX.pop();
cobraY.pop();
}
}

function desenharComida() {
fill(255, 0, 0);
rect(comidaX, comidaY, tamanho, tamanho);
}

function criarComida() {
let cols = floor(width / tamanho);
let rows = floor(height / tamanho);
comidaX = floor(random(cols)) * tamanho;
comidaY = floor(random(rows)) * tamanho;
}

function verificarColisoes() {
let headX = cobraX[0];
let headY = cobraY[0];

if (headX < 0 || headX >= width || headY < 0 || headY >= height) {
gameOver();
}

for (let i = 1; i < cobraX.length; i++) {
if (headX === cobraX[i] && headY === cobraY[i]) {
gameOver();
}
}
}

function gameOver() {
noLoop();
text("Game Over!", 160, 200);
}