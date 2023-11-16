const quote = document.querySelector(".new-quote");
var quoteText = document.querySelector("#js-quote-text");
var answerBTN = document.querySelector(".twitter");
var result;
var response;
var clicked = 0;
var answerText = document.querySelector("#js-answer-text");
quote.addEventListener("click", getQuote);
answerBTN.addEventListener("click", getAnswer);
async function getQuote(){
    console.log("made it here in event listener");
    response = await fetch("https://trivia.cyberwisp.com/getrandomchristmasquestion");
    result = await response.json();
    var oldClicked = clicked;
    clicked += 1;
    if(oldClicked < clicked) {
        answerText.innerHTML = "";
    }
    if(response.ok) {
        displayQuote(result);
        console.log(result);
    } else {
        quoteText.textContent = "There was an issue fetching your response. Working on it...";
        console.log("error fetching data");
    }
}

function displayQuote(result) {
    console.log("in display quote");
    quoteText.innerHTML = result.question;
}

async function getAnswer(){
    if(clicked > 0){
        console.log("in getAnswer()");
        displayAnswer(result);
        console.log(result);
    } else {
        console.log("you have no question to answer silly!");
    }
}

function displayAnswer(result) {
    console.log("in display answer");
    answerText.innerHTML = result.answer;
}