const questionsTable = []

const saveQuestion = () => {
    const questionTable = []
    const question = document.getElementById('question').value
    questionTable.push(question)
    let answer, points, query1, query2
    for(let x=1; x<=5; x++){
        query1 = 'answer-' + x 
        query2 = 'answer-points-' + x 
        answer =  document.getElementById(query1).value
        points =  document.getElementById(query2).value
        if(answer || points){
            questionTable.push([answer, points])
        }
    }
    questionsTable.push(questionTable)
    document.getElementById('question').value = ''
    for(let x=1; x<=5; x++){
        query1 = 'answer-' + x 
        query2 = 'answer-points-' + x 
        document.getElementById(query1).value = ''
        document.getElementById(query2).value = ''
    }
}

const teamNamesSetup = () => {
    document.getElementById('team-names-setup').style.display = 'flex'
}


let teamAName
let teamBName
const confirmationPopup = () => {
    teamAName = document.getElementById('team-1').value
    teamBName = document.getElementById('team-2').value
    document.getElementById('team-names-setup').style.display = 'none'
    document.getElementById('confirmation-popup').style.display = 'block'
}

const startGame = (bool) => {
    if(bool){
        setupGame()
    }
    else{
        document.getElementById('confirmation-popup').style.display = 'none'
    }
}

const setupGame = () => {
    const intro = document.getElementById('intro')
    const zart = document.getElementById('zart')
    intro.addEventListener('ended', e => {
        intro.style.display = "none"
        zart.style.display = 'flex'
        zart.play()
    })
    zart.addEventListener('ended', e => {
        zart.style.display = 'none'
        document.getElementById('game-teams-stats').style.display = 'flex'
        Game()
    })
    document.getElementById('main').style.display = 'none'
    document.getElementById('game').style.display = 'flex'
    zart.style.display = 'none'
    intro.play()
}

let PointsA = 0
let PointsB = 0

const setTeamPoints = (team) => {
    if(team == 1){
        PointsA += roundPoints
    }
    else{
        PointsB += roundPoints
    }
    Game()
}

let roundPoints=0
const goodAnswer = (answerNumber, questionNumber, noPoints) => {
    document.getElementById(answerNumber).style.color = '#FFB01F'
    document.getElementById('audio-good').play()
    if(noPoints != 0){
        const points = questionsTable[questionNumber][answerNumber][1]
        roundPoints += Number(points)
        document.getElementById('points-banner').innerHTML = roundPoints
    }
}
const badAnswer = (team) => {
    document.getElementById('audio-bad').play()
    let wrap = 'x-wrapperA'
    if(team==2){
        wrap = 'x-wrapperB'
    }
    document.getElementById(wrap).innerHTML += 'X' 
}

const showQuestion = () => {
    document.getElementById('question-banner').style.color = '#FFB01F' 
}

const questionDisplay = (questionNumber) => {
    roundPoints = 0
    const main = document.getElementById('game-question-wrapper')
    main.innerHTML = ''
    main.innerHTML += "<div class='points-banner-wrapper'><button class='team-button' onclick='setTeamPoints(1)'>A</button><p class='points-banner' id='points-banner'>0</p><button class='team-button' onclick='setTeamPoints(2)'>B</button></div>" 
    main.innerHTML += "<p class='question-banner' id='question-banner' onclick='showQuestion()'>" + questionsTable[questionNumber][0] + "</p>" 
    const amountOfAnswers = questionsTable[questionNumber].length
    for(let x=1; x<amountOfAnswers; x++){
        main.innerHTML += "<div class='game-answer-wrapper' style='color:black' id='" + x + "'><p class='answer' onclick='goodAnswer(" + x  + ', ' + questionNumber + ", 0)'>" + questionsTable[questionNumber][x][0] + "</p><p class='answer-points'>" +  questionsTable[questionNumber][x][1] + "</p><button class='answer-button' id='answer-button' onclick='goodAnswer(" + x  + ', ' + questionNumber + ")'><ion-icon name='checkmark-outline'></ion-icon></button>"
    }
}



let questionNumber = 0
const Game = () => {
    let amountOfQuestions = questionsTable.length
    const teamsStats = document.getElementById('game-teams-stats')
    teamsStats.innerHTML = "<div class='team-stats-wrapper'><button class='x-button' onclick='badAnswer(1)'>X</button><div class='team-stats' id='team-statsA'><a>" + teamAName + "</a><a>" + PointsA + "</a></div><div class='x-wrapper' id='x-wrapperA'></div></div>"
    teamsStats.innerHTML += "<div class='team-stats-wrapper'><div class='x-wrapper' id='x-wrapperB'></div><div class='team-stats' id='team-statsB'><a>" + PointsB + "</a><a>" + teamBName + "</a></div><button class='x-button' onclick='badAnswer(2)'>X</button></div>"
    console.error(amountOfQuestions)
    if(questionNumber<amountOfQuestions){
        document.getElementById('audio-dzingiel').volume = 0.1
        document.getElementById('audio-dzingiel').play()
        questionDisplay(questionNumber)
        questionNumber++
    }
    else{
        const main = document.getElementById('game-question-wrapper')
        let winningTeam = teamAName
        if(PointsB > PointsA) {
            winningTeam = teamBName
        }
        document.getElementById('audio-end').play()
        main.innerHTML = "<div class='winning-banner'><p>" + winningTeam + "</p><p>zwycieza</p></div>"
    }
}
