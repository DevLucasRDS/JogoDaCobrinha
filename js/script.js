let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
let direction = "right";
let jogo;
let food;

// Inicializa o jogo
function iniciarJogo() {
	snake = [{ x: 8 * box, y: 8 * box }];
	direction = "right";
	food = gerarComida();

	if (jogo) clearInterval(jogo);
	jogo = setInterval(loop, 100);
}

// Gera comida sem colidir com a cobra
function gerarComida() {
	let novaComida, colidiu;
	do {
		colidiu = false;
		novaComida = {
			x: Math.floor(Math.random() * 15 + 1) * box,
			y: Math.floor(Math.random() * 15 + 1) * box,
		};
		for (let i = 0; i < snake.length; i++) {
			if (snake[i].x === novaComida.x && snake[i].y === novaComida.y) {
				colidiu = true;
				break;
			}
		}
	} while (colidiu);
	return novaComida;
}

// Desenha o fundo
function criarBG() {
	context.fillStyle = "Lightgreen";
	context.fillRect(0, 0, 16 * box, 16 * box);
}

// Desenha a cobrinha
function criarCobrinha() {
	for (let i = 0; i < snake.length; i++) {
		context.fillStyle = i === 0 ? "DarkBlue" : "Blue"; // Cabeça diferente
		context.fillRect(snake[i].x, snake[i].y, box, box);
	}
}

// Desenha a comida
function drawFood() {
	context.fillStyle = "Red";
	context.fillRect(food.x, food.y, box, box);
}

// Controla direção
document.addEventListener("keydown", update);
function update(event) {
	if (event.keyCode == 37 && direction != "right") direction = "left";
	if (event.keyCode == 38 && direction != "down") direction = "up";
	if (event.keyCode == 39 && direction != "left") direction = "right";
	if (event.keyCode == 40 && direction != "up") direction = "down";
}

// Loop principal
function loop() {
	// Faz a cobrinha atravessar a parede
	if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
	if (snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
	if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
	if (snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

	// Verifica colisão com o corpo
	for (let i = 1; i < snake.length; i++) {
		if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
			clearInterval(jogo);
			alert("Game Over!");
			return;
		}
	}

	criarBG();
	criarCobrinha();
	drawFood();

	let snakeX = snake[0].x;
	let snakeY = snake[0].y;

	if (direction == "right") snakeX += box;
	if (direction == "left") snakeX -= box;
	if (direction == "up") snakeY -= box;
	if (direction == "down") snakeY += box;

	// Verifica se comeu a comida
	if (snakeX === food.x && snakeY === food.y) {
		food = gerarComida();
	} else {
		snake.pop();
	}

	let newHead = { x: snakeX, y: snakeY };
	snake.unshift(newHead);
}

// Botão para reiniciar
document.getElementById("restart-Btn").addEventListener("click", iniciarJogo);

// Começa o jogo na primeira vez
iniciarJogo();
