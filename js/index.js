window.onload = () => {
    const canvas = document.querySelector('#canvas')
    canvas.style.display = "none"

    const backgroundImg1 = new Image()
    backgroundImg1.src = 'images/bground.png'
    const backgroundImg2 = new Image()
    backgroundImg2.src = 'images/bground.png'
    const sharkImg = new Image()
    sharkImg.src = 'images/shark.png'
    const sharkImgSkewUp = new Image()
    sharkImgSkewUp.src = 'images/shark-skewed-up.png'
    const sharkImgSkewDown = new Image()
    sharkImgSkewDown.src = 'images/shark-skewed-down.png'
    const scubaDiver = new Image()
    scubaDiver.src = 'images/scubadiver2new.png'
    const schoolOfFish = new Image()
    schoolOfFish.src = 'images/schooloffish.png'
    const octopus = new Image()
    octopus.src = 'images/orangeoctopus.png'
    const turtle = new Image()
    turtle.src = 'images/turtle.png'
    

    const ctx = canvas.getContext('2d')

    let backgroundImg1X = 0
    let backgroundImg2X = canvas.width
    let isMovingUp = false
    let isMovingDown = false
    let isMovingRight = false
    let isMovingLeft = false
    let sharkSpeed = 0
    let objectsSpeed = 3
    let gameOver = false
    let animateId
    let sharkX = 0
    let sharkY = canvas.height/2
    let sharkWidth = 150
    let sharkHeight = 75
    let score = 0
    // random spawning y position for objects
    function randomY() {
        let maxY = canvas.height - 50
        let minY = 50
        let randomYPosition = Math.floor(Math.random()*(maxY-minY+1)+50)
        return randomYPosition
    }
    // random spawning x position for objects
    function randomX() {
        let maxX = canvas.width*3
        let minX = canvas.width
        let randomXPosition = Math.floor(Math.random()*(maxX-minX)+minX)
        return randomXPosition
    }
    const startScreen = document.querySelector('.game-intro')
    const restartScreen = document.querySelector('.game-outro')
    let scoreElement = document.querySelector('.score')
    let scoreElementOutro = document.querySelector('.score-span')
    restartScreen.style.display = 'none'
    document.getElementById("startButton").onclick = () => {
        startScreen.style.display = "none"
        restartScreen.style.display = "none"
        canvas.style.display = "block"
        startGame()
    }
    document.getElementById("restartButton").onclick = () => {
        startScreen.style.display = "none"
        restartScreen.style.display = "none"
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        sharkX = 0
        sharkY = canvas.height/2
        objectsArray = [
            {img: scubaDiver, x: randomX(), y: randomY(), width: 100, height: 50},
            {img: schoolOfFish, x: randomX(), y: randomY()-20, width: 50, height: 50},
            {img: octopus, x: randomX(), y: randomY()+20, width: 50, height: 50},
            {img: turtle, x: randomX(), y: randomY()+10, width: 50, height: 50},
            {img: scubaDiver, x: randomX(), y: randomY(), width: 100, height: 50},
            {img: schoolOfFish, x: randomX(), y: randomY()-20, width: 50, height: 50},
            {img: octopus, x: randomX(), y: randomY()+20, width: 50, height: 50},
            {img: turtle, x: randomX(), y: randomY()+10, width: 50, height: 50},
            {img: scubaDiver, x: randomX(), y: randomY(), width: 100, height: 50},
            {img: schoolOfFish, x: randomX(), y: randomY()-20, width: 50, height: 50},
            {img: octopus, x: randomX(), y: randomY()+20, width: 50, height: 50},
            {img: turtle, x: randomX(), y: randomY()+10, width: 50, height: 50},
            {img: schoolOfFish, x: randomX(), y: randomY()-20, width: 50, height: 50},
            {img: octopus, x: randomX(), y: randomY()+20, width: 50, height: 50},
            {img: turtle, x: randomX(), y: randomY()+10, width: 50, height: 50},
            {img: scubaDiver, x: randomX(), y: randomY(), width: 100, height: 50},
            {img: scubaDiver, x: randomX(), y: randomY(), width: 100, height: 50},
            {img: scubaDiver, x: randomX(), y: randomY(), width: 100, height: 50}
        ]
        startGame()
    }

    let objectsArray = [
        {img: scubaDiver, x: randomX(), y: randomY(), width: 100, height: 50},
        {img: schoolOfFish, x: randomX(), y: randomY()-20, width: 50, height: 50},
        {img: octopus, x: randomX(), y: randomY()+20, width: 50, height: 50},
        {img: turtle, x: randomX(), y: randomY()+10, width: 50, height: 50},
        {img: scubaDiver, x: randomX(), y: randomY(), width: 100, height: 50},
        {img: schoolOfFish, x: randomX(), y: randomY()-20, width: 50, height: 50},
        {img: octopus, x: randomX(), y: randomY()+20, width: 50, height: 50},
        {img: turtle, x: randomX(), y: randomY()+10, width: 50, height: 50},
        {img: scubaDiver, x: randomX(), y: randomY(), width: 100, height: 50},
        {img: schoolOfFish, x: randomX(), y: randomY()-20, width: 50, height: 50},
        {img: octopus, x: randomX(), y: randomY()+20, width: 50, height: 50},
        {img: turtle, x: randomX(), y: randomY()+10, width: 50, height: 50},
        {img: schoolOfFish, x: randomX(), y: randomY()-20, width: 50, height: 50},
        {img: octopus, x: randomX(), y: randomY()+20, width: 50, height: 50},
        {img: turtle, x: randomX(), y: randomY()+10, width: 50, height: 50},
        {img: scubaDiver, x: randomX(), y: randomY(), width: 100, height: 50},
        {img: scubaDiver, x: randomX(), y: randomY(), width: 100, height: 50},
        {img: scubaDiver, x: randomX(), y: randomY(), width: 100, height: 50}
    ]

    function startGame () {
        // console.log("start game")
        gameOver = false
        ctx.drawImage(backgroundImg1, backgroundImg1X, 0, canvas.width, canvas.height)
        ctx.drawImage(backgroundImg2, backgroundImg2X, 0, canvas.width, canvas.height)
        ctx.drawImage(sharkImg, sharkX, sharkY, sharkWidth,sharkHeight)
        animate()
    }
    function animate () {
        scoreElement.innerHTML = score
        backgroundImg1X -= 2
        backgroundImg2X -= 2
        if (backgroundImg1X < -canvas.width){
            backgroundImg1X = canvas.width
        }
        else if (backgroundImg2X < -canvas.width){
            backgroundImg2X = canvas.width
        }

        for (i=0; i<objectsArray.length; i++){
            console.log(score)
            ctx.drawImage(
                objectsArray[i].img, 
                objectsArray[i].x, 
                objectsArray[i].y, 
                objectsArray[i].width,
                objectsArray[i].height
            )
            objectsArray[i].x -= objectsSpeed

            // if (objectsArray[i].x < 0 - objectsArray[i].width){
            //     objectsArray[i].x = canvas.width+objectsArray[i].width
            // }
            // check for collisions with scubadivers
            if (objectsArray[i].img === scubaDiver &&
                objectsArray[i].x + 15 < sharkX + sharkWidth - 15 &&
                objectsArray[i].x > sharkX &&
                objectsArray[i].y + objectsArray[i].height - 5 > sharkY + 15 &&
                objectsArray[i].y < sharkY + sharkHeight - 25) {
                    gameOver = true;
                }
            // check for collisions with octopus
            if (objectsArray[i].img === octopus &&
                objectsArray[i].x + 15 < sharkX + sharkWidth - 15 &&
                objectsArray[i].x > sharkX &&
                objectsArray[i].y + objectsArray[i].height - 5 > sharkY + 15 &&
                objectsArray[i].y < sharkY + sharkHeight - 20) {
                    objectsArray[i].x = randomX()
                    objectsArray[i].y = randomY()
                    score++
                }
                // check for collisions with fish
            if (objectsArray[i].img === schoolOfFish &&
                objectsArray[i].x + 15 < sharkX + sharkWidth - 15 &&
                objectsArray[i].x > sharkX &&
                objectsArray[i].y + objectsArray[i].height - 5 > sharkY + 15 &&
                objectsArray[i].y < sharkY + sharkHeight - 20) {
                    objectsArray[i].x = randomX()
                    objectsArray[i].y = randomY()
                    score++
                }
                // check for collisions with turtles
            if (objectsArray[i].img === turtle &&
                objectsArray[i].x + 15 < sharkX + sharkWidth - 15 &&
                objectsArray[i].x > sharkX &&
                objectsArray[i].y + objectsArray[i].height - 5 > sharkY + 15 &&
                objectsArray[i].y < sharkY + sharkHeight - 20) {
                    objectsArray[i].x = randomX()
                    objectsArray[i].y = randomY()
                    score++
                }    
                // checks to see if scubadiver got out of canvas
            if (objectsArray[i].img === scubaDiver &&
                objectsArray[i].x < -objectsArray[i].width + 1){
                objectsArray[i].x = randomX()
                objectsArray[i].y = randomY()  
            }    
            // checks to see if octupus got out of canvas
            if (objectsArray[i].img === octopus &&
                objectsArray[i].x < -objectsArray[i].width + 1){
                objectsArray[i].x = randomX()
                objectsArray[i].y = randomY()  
            }    
            // checks to see if fish got out of canvas
            if (objectsArray[i].img === schoolOfFish &&
                objectsArray[i].x < -objectsArray[i].width + 1){
                objectsArray[i].x = randomX()
                objectsArray[i].y = randomY()  
            }    
            // checks to see if turtle got out of canvas
            if (objectsArray[i].img === turtle &&
                objectsArray[i].x < -objectsArray[i].width + 1){
                objectsArray[i].x = randomX()
                objectsArray[i].y = randomY()  
            }

        }

        if (gameOver) {
            gameoverFunc(score)
        }
        else {
            animateId = requestAnimationFrame(startGame)
        }
        
        sharkSpeed = 2.5
        movement()
        
    }
    
    

    function gameoverFunc (score) {
        cancelAnimationFrame(animateId)
        restartScreen.style.display = "block"
        scoreElementOutro.innerHTML = score
    }


    function movement() {
        document.addEventListener('keydown', (event) => {
            // console.log(event)
            if (event.code === 'ArrowUp'){
                isMovingUp = true
            } 
            else if (event.code === 'ArrowDown'){
                isMovingDown = true
            }
            else if (event.code === 'ArrowRight'){
                isMovingRight = true
            }
            else if (event.code === 'ArrowLeft'){
                isMovingLeft = true
            }
        })
        document.addEventListener('keyup', (event) => {
            // console.log(event)
            if (event.code === 'ArrowUp'){
                isMovingUp = false
            } 
            else if (event.code === 'ArrowDown'){
                isMovingDown = false
            }
            else if (event.code === 'ArrowRight'){
                isMovingRight = false
            }
            else if (event.code === 'ArrowLeft'){
                isMovingLeft = false
            }
        })

        // two keys pressed at same time
        if (isMovingUp === true && isMovingRight === true 
            && sharkY > 0 && sharkX < canvas.width - 150) {
            // need to add shark img skewed up
                // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
                // ctx.drawImage(sharkImgSkewUp, sharkX, sharkY, sharkWidth,sharkHeight)
                sharkY -= sharkSpeed-0.5
                sharkX += sharkSpeed-1
        }
        else if (isMovingUp === true && isMovingLeft === true
            && sharkY > 0 && sharkX > 0) {
                sharkY -= sharkSpeed-0.5
                sharkX -= sharkSpeed-1
        }
        else if (isMovingDown === true && isMovingRight === true
            && sharkX < canvas.width - 150 && sharkY < canvas.height - 50) {
                // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
                // ctx.drawImage(sharkImgSkewDown, sharkX, sharkY, sharkWidth,sharkHeight)
                sharkY += sharkSpeed-0.5
                sharkX += sharkSpeed-1
        }
        else if (isMovingDown === true && isMovingLeft === true
            && sharkX > 0 && sharkY < canvas.height - 50) {
                sharkY += sharkSpeed-0.5
                sharkX -= sharkSpeed-1
        }
        // one key only
        else if (isMovingUp === true && sharkY > 0) {
            // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
            // ctx.drawImage(sharkImgSkewUp, sharkX, sharkY, sharkWidth,sharkHeight)
            sharkY -= sharkSpeed
        }
        else if (isMovingDown === true && sharkY < canvas.height - 50) {
            // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
            // ctx.drawImage(sharkImgSkewDown, sharkX, sharkY, sharkWidth,sharkHeight)
            sharkY += sharkSpeed
        }
        else if (isMovingRight === true && sharkX < canvas.width - 150) {
            sharkX += sharkSpeed
        }
        else if (isMovingLeft === true && sharkX > 0) {
            sharkX -= sharkSpeed
        }
    }
}

