'use strict'

const WIN_SOUND = new Audio('sound/win.wav')
var nums = []
var gBoard = []
var gBoardLength
var gTimerInterval
var gNextNum = 1

var elNextNum = document.querySelector('.next-num span')


function onInit(){
    gBoardLength = 4
    gBoard = createBoard()
}


function getBoardLength(BoardLength) {
    gBoardLength = BoardLength
    createBoard()
    clearInterval(gTimerInterval)
    gNextNum = 1
    elNextNum.innerHTML = gNextNum
}


function createBoard(){
    createNums()
    var strHTML = ''

    for (var i = 0; i < gBoardLength; i++){
        strHTML += '<tr>'

        for (var j = 0; j < gBoardLength; j++){
            var num = drawNum(nums)

            strHTML += `\t<td onclick="cellClicked(this)">${num}</td>\n`
        }

        strHTML += '</tr>\n'
    }

    var elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHTML

    elNextNum.innerHTML = gNextNum
}


function createNums(){
    for (var i = 0; i < gBoardLength * gBoardLength; i++) {
        nums.push(i + 1)
    }
    
    return nums
}


function drawNum(nums){
    var idx = getRandomInt(0, nums.length)
    var num = nums[idx]
    nums.splice(idx, 1)

    return num
}


function cellClicked(elCell){

    if (+elCell.innerHTML === gNextNum) {

        if (+elCell.innerHTML === 1) timer()

        elCell.classList.add('selected')
        gNextNum++ 
        elNextNum.innerHTML = gNextNum

    } else return

    if (+elCell.innerHTML === gBoardLength*gBoardLength) {
        clearInterval(gTimerInterval)
        WIN_SOUND.play()
        gNextNum = 1
        elNextNum.innerHTML = gNextNum
    }
}


function timer(){
    var timer = document.querySelector('.timer span')
    var start = Date.now()

    gTimerInterval = setInterval(function () {
      var currTs = Date.now()
      var secs = parseInt((currTs - start) / 1000)
      var ms = (currTs - start) - secs * 1000
      ms = '000' + ms
      ms = ms.substring(ms.length - 2, ms.length)
  
      timer.innerText = `\n ${secs}:${ms}`
    }, 100)
}


function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
}