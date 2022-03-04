let colors = ['red', 'green', 'blue'];
let rPreviousBallPosition = innerHeight;
let gPreviousBallPosition = innerHeight;
let bPreviousBallPosition = innerHeight;
let gameOver = false;
let scaleVal = 1.4;
let rBallCount = 0;
let gBallCount = 0;
let bBallCount = 0;

let key = setInterval(() => {
    if (!gameOver) {
        movement();
    } else clearInterval(key);
}, 500)

function movement() {

    if (!gameOver) {

        let randomBall = colors[Math.floor(Math.random() * 3)];

        ballIndex = randomBall;

        let ball = document.createElement('div');
        ball.classList.add('createBall');
        container.appendChild(ball);

        switch (randomBall) {

            case 'red':
                ball.style.background = 'red';
                move(rPreviousBallPosition);
                break;

            case 'green':
                ball.style.background = 'green';
                move(gPreviousBallPosition)
                break;

            case 'blue':
                ball.style.background = 'blue';
                move(bPreviousBallPosition);
                break;

            default:
                break;

        }

        //generic function for ball movement 

        function move(previousBallPosition) {

            let movingDownward = 0;
            let translateaxis = 0;
            let keepMove = true;


            let keyMoveBall = setInterval(() => {

                if (keepMove) movingDown();
                else clearInterval(keyMoveBall);

            },
                10);

            function movingDown() {


                movingDownward += ball.offsetHeight;
                translateaxis += ball.offsetWidth;


                if (movingDownward + ball.offsetHeight < (previousBallPosition)) {

                    ball.style.top = movingDownward + 'px';
                    translateXaxis(randomBall, translateaxis);

                } else {


                    keepMove = false;
                    movingDownward -= ball.offsetHeight;
                    translateaxis -= ball.offsetWidth;


                    if (randomBall == 'red') {
                        rPreviousBallPosition = rPreviousBallPosition - ball.offsetHeight;
                        rBallCount++;
                        redBallBox.innerText = rBallCount;
                        previousBallPosition = rPreviousBallPosition

                    } else if (randomBall == 'blue') {
                        bPreviousBallPosition = bPreviousBallPosition - ball.offsetHeight;
                        bBallCount++;
                        blueBallBox.innerText = bBallCount;
                        previousBallPosition = bPreviousBallPosition;

                    } else {
                        gPreviousBallPosition = gPreviousBallPosition - ball.offsetHeight;
                        gBallCount++;
                        greenBallBox.innerText = gBallCount;
                        previousBallPosition = gPreviousBallPosition;
                    }

                }


                if (ball.getBoundingClientRect().top <= 0) {
                    ball.style.transform = `scale(${scaleVal})`;
                    gameOver = true
                    return alert(`GameOver won by ${randomBall} ball`)
                } else {
                    gameOver = false
                }
            }

        }

        //ball direction straight left right

        function translateXaxis(random, xAxis) {

            if (random == 'red') {
                ball.style.transform = `translateX(${xAxis}px) scale(${scaleVal})`;
            } else if (random == 'blue')
                ball.style.transform = `translateX(${-xAxis}px) scale(${scaleVal})`;
            else if (random == 'green') {
                ball.style.transform = `scale(${scaleVal},${scaleVal})`;
            }
        }

    } else
        return alert('gameOver');
}