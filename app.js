const score = document.querySelector('.scoreCard');
const start = document.querySelector('.startGame');
const gameArea = document.querySelector('.gameArea');

let isPlaying = {speed : 5, score:0};
start.addEventListener('click', gameStart);


let keys = {ArrowUp:false, ArrowDown:false, ArrowLeft:false, ArrowRight:false};
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp); // arrow keys
function keyDown(e){
    e.preventDefault();
    keys[e.key] = true;
}
function keyUp(e){
    e.preventDefault();
    keys[e.key] = false;
}

function willCollide(a, b){
    aCoor = a.getBoundingClientRect(); // main car
    bCoor = b.getBoundingClientRect(); // enemy car
    return !((aCoor.bottom < bCoor.top) || (aCoor.top > bCoor.bottom) || (aCoor.right < bCoor.left) || (aCoor.left > bCoor.right));

}

function moveLines(){
    let lines = document.querySelectorAll('.roadLine');
    lines.forEach(function(value){
        if(value.y >= 700){
            value.y-=750;
        }
        if(isPlaying.score > 500){
            isPlaying.speed = 8;
        }
        value.y+= isPlaying.speed;
        value.style.top = value.y + "px";
    })
}
function moveEnemy(car){
    let enemy = document.querySelectorAll('.enemy');
    enemy.forEach(function (value){
        if(willCollide(car,value)){
            isPlaying.start = false;
            start.classList.remove('hide');
            start.innerHTML = "Game over <br> Your final score is "+isPlaying.score+" <br>Press any key to restart "
        }
        if(value.y >= 700){
            value.y =-350;
            value.style.left = Math.floor(Math.random()*350) + "px";
        }
        if(isPlaying.score > 500){
            isPlaying.speed = 8;
        }
        value.y += isPlaying.speed;
        value.style.top = value.y + "px";
    })
}

function play(){
    let car = document.querySelector('.car');
    let road = gameArea.getBoundingClientRect();
    
    if(isPlaying.start){

        moveLines();
        moveEnemy(car);

        if(keys.ArrowUp  && isPlaying.x>(road.top + 60)) {isPlaying.x -= isPlaying.speed};
        if(keys.ArrowDown  && isPlaying.x<(road.height - 90) ) { isPlaying.x += isPlaying.speed};
        if(keys.ArrowLeft && isPlaying.y> 0) {isPlaying.y -= isPlaying.speed};
        if(keys.ArrowRight  && isPlaying.y< (road.width - 60)) {isPlaying.y += isPlaying.speed};

        car.style.top = isPlaying.x+"px";
        car.style.left = isPlaying.y+"px";

        window.requestAnimationFrame(play);
        score.innerHTML = "Score is :"+isPlaying.score++;
        
    }
}
function gameStart(){
    start.classList.add('hide');
    gameArea.innerHTML = '';
    isPlaying.start = true; // assuring if player wants to play
    isPlaying.score = 0;
    window.requestAnimationFrame(play);

    for(let k=0;k<7;k++){
        let roadLine = document.createElement('div');
        roadLine.setAttribute('class', 'roadLine');
        roadLine.y = (k*120);
        roadLine.style.top += roadLine.y+"px";
        gameArea.appendChild(roadLine);
    }

    let car = document.createElement('div');
    car.setAttribute('class', 'car');
    gameArea.appendChild(car);

    for(let k=0;k<3;k++){
        let enemy = document.createElement('div');
        enemy.setAttribute('class', 'enemy');
        enemy.y = ((k+1)*350)* -1;
        enemy.style.top = enemy.y+"px";
        enemy.style.backgroundColor = 'blue';
        enemy.style.left = Math.floor(Math.random()*300)+"px";
        gameArea.appendChild(enemy);
    }

    //GEtting coordinates of the car
    isPlaying.x = car.offsetTop;
    isPlaying.y = car.offsetLeft;
}