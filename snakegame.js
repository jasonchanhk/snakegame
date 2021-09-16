const board_border = "black";
const board_background = "black";
const snake_col = "deeppink";
const snake_border = "black";
const snake_head = "darkred";
const snake2_col = "lawngreen";
const snake2_border = "black";
const snake2_head = "green";

let snake = [
    {x: 200, y: 100}, 
    {x: 190, y: 100}, 
    {x: 180, y: 100},
    {x: 170, y: 100},
    {x: 160, y: 100},
]

let snake2 = [
    {x: 200, y: 300}, 
    {x: 190, y: 300}, 
    {x: 180, y: 300},
    {x: 170, y: 300},
    {x: 160, y: 300},
]

//initial movement is going left
let dx = 10;
let dy = 0;
let dx2 = 10;
let dy2 =0;
let foodx;
let foody;
let foodx2;
let foody2;
let score = 0;
let score2 = 0;
let starter

const snakeboard = document.getElementById("snakeboard");
const snakeboard_ctx = snakeboard.getContext("2d");

main();
generatefood();
generatefood2();
document.addEventListener("keydown", changedirection);
document.addEventListener("keydown", changedirection2);
document.addEventListener("keydown", playagain);
document.addEventListener("keydown", startgame);

function main(){
    if(gameover()){
        return;
    }
    if(starter === undefined){
        setTimeout(function repeatstartfunction(){
        clearCanvas();
        drawSnake();
        drawfood();
        drawfood2();
        snakeboard_ctx.font = "25px Impact";
        snakeboard_ctx.fillStyle = "white";
        snakeboard_ctx.textAlign = "center";
        snakeboard_ctx.fillText("press SPACE BAR to start.", snakeboard.width/2, snakeboard.height/2);
        main();
        },100)
    }
    else{
        setTimeout(function repeatfunction(){
        clearCanvas();
        drawfood();
        drawfood2();
        movesnake();
        movesnake2();
        drawSnake();
        main();
        },100)
    }
}

function startgame(event){
    const space_key = 32;
    const keypressed = event.keyCode;

    if(keypressed === space_key && starter === undefined) {
        starter = true;
    }
}

function playagain(event){
    const space_key = 32;
    const keypressed = event.keyCode;

    if(gameover()){
        if(keypressed === space_key){
            snake = [
                {x: 200, y: 100}, 
                {x: 190, y: 100}, 
                {x: 180, y: 100},
                {x: 170, y: 100},
                {x: 160, y: 100},
            ]
            
            snake2 = [
                {x: 200, y: 300}, 
                {x: 190, y: 300}, 
                {x: 180, y: 300},
                {x: 170, y: 300},
                {x: 160, y: 300},
            ]
            
            dx = 10;
            dy = 0;
            dx2 = 10;
            dy2 = 0;
            score = 0;
            document.getElementById("score").innerHTML = score;
            score2 = 0;
            document.getElementById("score2").innerHTML = score2;
        
            main();
            generatefood();
            generatefood2();
            document.addEventListener("keydown", changedirection);
            document.addEventListener("keydown", changedirection2);
        }
    }
}

function clearCanvas() {
    snakeboard_ctx.fillStyle = board_background;
    snakeboard_ctx.fillRect(0, 0, snakeboard.width, snakeboard.height);
    snakeboard_ctx.strokeStyle = board_border;
    snakeboard_ctx.strokeRect(0, 0, snakeboard.width, snakeboard.height);
}

//draw snake
function drawSnake() {
    snake.forEach(drawSnakePart)
    snake2.forEach(drawSnakePart2)
}
function drawSnakePart(snakePart) {
    snakeboard_ctx.fillStyle = snake_col;
    snakeboard_ctx.strokeStyle = snake_border;
    snakeboard_ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
    snakeboard_ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
    if(snakePart == snake[0]){
        snakeboard_ctx.fillStyle = snake_head;
        snakeboard_ctx.strokeStyle = snake_border;
        snakeboard_ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
        snakeboard_ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
    }
}
function drawSnakePart2(snakePart) {
    snakeboard_ctx.fillStyle = snake2_col;
    snakeboard_ctx.strokeStyle = snake2_border;
    snakeboard_ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
    snakeboard_ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
    if(snakePart == snake2[0]){
        snakeboard_ctx.fillStyle = snake2_head;
        snakeboard_ctx.strokeStyle = snake2_border;
        snakeboard_ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
        snakeboard_ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
    }
}

//not yet done //extra game over rule: COLLIDE 
function gameover(){
    //snake eating  oneself
    for (let i = 4; i < snake.length; i++){
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            snakeboard_ctx.font = "40px Impact";
            snakeboard_ctx.fillStyle = "lawngreen"
            snakeboard_ctx.textAlign = "center";
            snakeboard_ctx.fillText("player 2 win!", snakeboard.width/2, snakeboard.height/2);
            snakeboard_ctx.font = "15px Impact";
            snakeboard_ctx.fillStyle = "lawngreen"
            snakeboard_ctx.fillText("press SPACE BAR to play again.", snakeboard.width/2, 20+snakeboard.height/2);
            return true;
        } 
    }

    //snake2 eating  oneself
    for (let i = 4; i < snake2.length; i++){
        if (snake2[i].x === snake2[0].x && snake2[i].y === snake2[0].y){
            snakeboard_ctx.font = "40px Impact";
            snakeboard_ctx.fillStyle = "deeppink"
            snakeboard_ctx.textAlign = "center";
            snakeboard_ctx.fillText("player 1 win!", snakeboard.width/2, snakeboard.height/2);
            snakeboard_ctx.font = "15px Impact";
            snakeboard_ctx.fillStyle = "deeppink"
            snakeboard_ctx.fillText("press SPACE BAR to play again.", snakeboard.width/2, 20+snakeboard.height/2);
            return true;
        } 
    }

    //snake hit wall scenario
    const hitleftwall = snake[0].x < 0;
    const hittopwall = snake[0].y < 0;
    const hitrightwall = snake[0].x > snakeboard.width-10;
    const hitdownwall = snake[0].y > snakeboard.height-10;

    if (hitleftwall || hittopwall || hitrightwall || hitdownwall){
    snakeboard_ctx.font = "40px Impact";
    snakeboard_ctx.fillStyle = "lawngreen"
    snakeboard_ctx.textAlign = "center";
    snakeboard_ctx.fillText("PLAYER 2 WIN!", snakeboard.width/2, snakeboard.height/2);
    snakeboard_ctx.font = "15px Impact";
    snakeboard_ctx.fillStyle = "lawngreen"
    snakeboard_ctx.fillText("press SPACE BAR to play again.", snakeboard.width/2, 20+snakeboard.height/2);
    return true;
    }

    //snake2 hit wall scenario
    const hitleftwall2 = snake2[0].x < 0;
    const hittopwall2 = snake2[0].y < 0;
    const hitrightwall2 = snake2[0].x > snakeboard.width-10;
    const hitdownwall2 = snake2[0].y > snakeboard.height-10;

    if (hitleftwall2 || hittopwall2 || hitrightwall2 || hitdownwall2){
    snakeboard_ctx.font = "40px Impact";
    snakeboard_ctx.fillStyle = "deeppink"
    snakeboard_ctx.textAlign = "center";
    snakeboard_ctx.fillText("PLAYER 1 WIN!", snakeboard.width/2, snakeboard.height/2);
    snakeboard_ctx.font = "15px Impact";
    snakeboard_ctx.fillStyle = "deeppink"
    snakeboard_ctx.fillText("press SPACE BAR to play again.", snakeboard.width/2, 20+snakeboard.height/2);
    return true;
    }

    //snake hit snake2
    for (let i = 1; i < snake2.length; i++){
    if (snake2[i].x === snake[0].x && snake2[i].y === snake[0].y){
        snakeboard_ctx.font = "40px Impact";
        snakeboard_ctx.fillStyle = "lawngreen"
        snakeboard_ctx.textAlign = "center";
        snakeboard_ctx.fillText("PLAYER 2 WIN!", snakeboard.width/2, snakeboard.height/2);
        snakeboard_ctx.font = "15px Impact";
        snakeboard_ctx.fillStyle = "lawngreen"
        snakeboard_ctx.fillText("press SPACE BAR to play again.", snakeboard.width/2, 20+snakeboard.height/2);
        return true;
    } 
    }

    //snake2 hit snake
    for (let i = 1; i < snake.length; i++){
    if (snake[i].x === snake2[0].x && snake[i].y === snake2[0].y){
        snakeboard_ctx.font = "40px Impact";
        snakeboard_ctx.fillStyle = "deeppink"
        snakeboard_ctx.textAlign = "center";
        snakeboard_ctx.fillText("PLAYER 1 WIN!", snakeboard.width/2, snakeboard.height/2);
        snakeboard_ctx.font = "15px Impact";
        snakeboard_ctx.fillStyle = "deeppink"
        snakeboard_ctx.fillText("press SPACE BAR to play again.", snakeboard.width/2, 20+snakeboard.height/2);
        return true;
    } 
    }

    //snake head and snake2 head collide => draw
    if (snake[0].x === snake2[0].x && snake[0].y === snake2[0].y){
    snakeboard_ctx.font = "40px Impact";
    snakeboard_ctx.fillStyle = "white"
    snakeboard_ctx.textAlign = "center";
    snakeboard_ctx.fillText("DRAW!", snakeboard.width/2, snakeboard.height/2);
    snakeboard_ctx.font = "15px Impact";
    snakeboard_ctx.fillStyle = "white"
    snakeboard_ctx.fillText("press SPACE BAR to play again.", snakeboard.width/2, 20+snakeboard.height/2);
    return true;
    }
}

//control for snake
function changedirection(event){
    const left_key = 37;
    const up_key = 38;
    const right_key = 39;
    const down_key = 40;

    const keypressed = event.keyCode;
    const goingleft = dx === -10;
    const goingup = dy === -10;
    const goingright = dx === 10;
    const goingdown = dy === 10;

    if(keypressed === left_key && !goingright){
    dx = -10;
    dy = 0;
    }

    if(keypressed === up_key && !goingdown){
    dx = 0;
    dy = -10;
    }

    if(keypressed === right_key && !goingleft){
    dx = 10;
    dy = 0;
    }

    if(keypressed === down_key && !goingup){
    dx = 0;
    dy = 10;
    }
}

//control for snake2
function changedirection2(event){
    const left_key = 65;
    const up_key = 87;
    const right_key = 68;
    const down_key = 83;

    const keypressed = event.keyCode;
    const goingleft = dx2 === -10;
    const goingup = dy2 === -10;
    const goingright = dx2 === 10;
    const goingdown = dy2 === 10;

    if(keypressed === left_key && !goingright){
        dx2 = -10;
        dy2 = 0;
    }

    if(keypressed === up_key && !goingdown){
        dx2 = 0;
        dy2 = -10;
    }

    if(keypressed === right_key && !goingleft){
        dx2 = 10;
        dy2 = 0;
    }

    if(keypressed === down_key && !goingup){
        dx2 = 0;
        dy2 = 10;
    }
}

function movesnake(){
    const newhead = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(newhead);

    const satefood1 = snake[0].x === foodx && snake[0].y === foody;
    const satefood2 = snake[0].x === foodx2 && snake[0].y === foody2;
    
    if (satefood1){
        score += 10;
        document.getElementById("score").innerHTML = score;
        generatefood();
    }
    else if(satefood2){
        score += 10;
        document.getElementById("score").innerHTML = score;
        generatefood2()}
    else{
        snake.pop();
    }
}

function movesnake2(){
   
    const newhead2 = {x: snake2[0].x + dx2, y: snake2[0].y + dy2};
    snake2.unshift(newhead2);

    const s2atefood1 = snake2[0].x === foodx && snake2[0].y === foody;
    const s2atefood2 = snake2[0].x === foodx2 && snake2[0].y === foody2;
    
    if(s2atefood1){
        score2 += 10;
        document.getElementById("score2").innerHTML = score2;
        generatefood();
    }
    else if(s2atefood2){
        score2 += 10;
        document.getElementById("score2").innerHTML = score2;
        generatefood2();
    }
    else{
        snake2.pop();
    }
}


function randomplace(min, max){
    return Math.floor(Math.random() *(max - min + 10)/10)*10 + min;
}

function generatefood(){
    foodx = randomplace(0, snakeboard.width - 10);
    foody = randomplace(0, snakeboard.height - 10);
    
    snake.forEach(function respawnaftereaten(part){
        if (part.x == foodx && part.y == foody){
        generatefood();}
    })
    snake2.forEach(function respawnaftereaten(part){
        if (part.x == foodx && part.y == foody){
        generatefood();}
    })
}

function generatefood2(){
    foodx2 = randomplace(0, snakeboard.width - 10);
    foody2 = randomplace(0, snakeboard.height - 10);
    snake.forEach(function respawnaftereaten(part){
        if (part.x == foodx2 && part.y == foody2){
        generatefood2();}
    })
    snake2.forEach(function respawnaftereaten(part){
        if (part.x == foodx2 && part.y == foody2){
        generatefood2();}
    })
}

function drawfood(){
    snakeboard_ctx.fillStyle = "orange";
    snakeboard_ctx.strokeStyle = "black";
    snakeboard_ctx.fillRect(foodx, foody, 10, 10);
    snakeboard_ctx.strokeRect(foodx, foody, 10, 10);
}

function drawfood2(){
    snakeboard_ctx.fillStyle = "orange";
    snakeboard_ctx.strokeStyle = "black";
    snakeboard_ctx.fillRect(foodx2, foody2, 10, 10);
    snakeboard_ctx.strokeRect(foodx2, foody2, 10, 10);
}