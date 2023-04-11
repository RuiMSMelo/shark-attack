window.onload = () => {
    const canvas = document.querySelector('#canvas')
    canvas.style.display = "none"

    const backgroundImg1 = new Image()
    backgroundImg1.src = '../images/underwater-background.avif'
    const backgroundImg2 = new Image()
    backgroundImg2.src = '../images/underwater-background.avif'
    const sharkImg = new Image()
    sharkImg.src = '../images/shark-isolated.jpg'
    const sharkImgSkewUp = new Image()
    sharkImgSkewUp.src = '../images/shark-isolated-skew15up.jpg'
    const sharkImgSkewDown = new Image()
    sharkImgSkewDown.src = '../images/shark-isolated-skew15down.jpg'
    

    const ctx = canvas.getContext('2d')

    let backgroundImg1X = 0
    let backgroundImg2X = canvas.width
    let isMovingUp = false
    let isMovingDown = false
    let isMovingRight = false
    let isMovingLeft = false
    let sharkSpeed = 0
    let gameOver = false
    let animateId
    let sharkX = 0
    let sharkY = canvas.height/2
    let sharkWidth = 150
    let sharkHeight = 50
    let score = 0
    let randomY = 250
    const startScreen = document.querySelector('.game-intro')
    const restartScreen = document.querySelector('.game-outro')
    restartScreen.style.display = 'none'
    document.getElementById("startButton").onclick = () => {
        startGame()
    }

    // const objectsArray = [
    //     {img: scubaDiver1, x: 950, y: randomY, width: 50, height: 50},
    //     {img: scubaDiver2, x: 950, y: randomY, width: 50, height: 50},
    //     {img: scubaDiver3, x: 950, y: randomY, width: 50, height: 50},
    //     {img: fish, x: 950, y: randomY, width: 50, height: 50},
    //     {img: octopus, x: 950, y: randomY, width: 50, height: 50},
    //     {img: turtle, x: 950, y: randomY, width: 50, height: 50},
    //     {img: legs, x: 950, y: 50, width: 50, height: 100},
    // ]

    // // draw() {
    // //     ctx.beginPath()
    // //     ctx.fillStyle = 'teal'
    // //     // xPos, yPos, width, height
    // //     ctx.rect(this.xPos, this.yPos, this.width, this.height)
    // //     ctx.fill()
    // //     ctx.closePath()
    // //   }


    function startGame () {
        // console.log("start game")
        startScreen.style.display = "none"
        canvas.style.display = "block"
        ctx.drawImage(backgroundImg1, backgroundImg1X, 0, canvas.width, canvas.height)
        ctx.drawImage(backgroundImg2, backgroundImg2X, 0, canvas.width, canvas.height)
        ctx.drawImage(sharkImg, sharkX, sharkY, sharkWidth,sharkHeight)

        // move background images
        backgroundImg1X -= 2
        backgroundImg2X -= 2
        if (backgroundImg1X < -canvas.width){
            backgroundImg1X = canvas.width
        }
        else if (backgroundImg2X < -canvas.width){
            backgroundImg2X = canvas.width
        }

        if (gameOver) {
            cancelAnimationFrame(animateId)
            restartScreen.style.display = "block"
        }
        else {
            animateId = requestAnimationFrame(startGame)
        }
        

        if (sharkX > canvas.width/2){
            sharkSpeed = 3.5
            movement ()
        } else {
            sharkSpeed = 2
            movement ()
        }
        
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
                ctx.drawImage(sharkImgSkewUp, sharkX, sharkY, sharkWidth,sharkHeight)
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
                ctx.drawImage(sharkImgSkewDown, sharkX, sharkY, sharkWidth,sharkHeight)
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
            ctx.drawImage(sharkImgSkewUp, sharkX, sharkY, sharkWidth,sharkHeight)
            sharkY -= sharkSpeed
        }
        else if (isMovingDown === true && sharkY < canvas.height - 50) {
            ctx.drawImage(sharkImgSkewDown, sharkX, sharkY, sharkWidth,sharkHeight)
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

