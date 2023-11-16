const quote = document.querySelector(".new-quote");
var quoteText = document.querySelector("#js-quote-text");
var quoteText2 = document.querySelector(".twitter");
var result;
var response;
var clicked = 0;
const quoteAPI = "https://api.api-ninjas.com/v1/quotes?category={}";
const quoteAPI2 = "https://api.api-ninjas.com/v1/quotes?category={}";
var answerText = document.querySelector("#js-answer-text");
quote.addEventListener("click", getQuote);
quoteText2.addEventListener("click", getQuote2);

async function getQuote(){
    console.log("in get quote");
    var category = 'happiness'
    $.ajax({
        method: 'GET',
        url: 'https://api.api-ninjas.com/v1/quotes?category=' + category,
        headers: { 'X-Api-Key': '2aZ5eWdhUntkhytIQBchiQ==C8euiLyfv6xLKJwm'},
        contentType: 'application/json',
        success: function(result) {
            var quoteContent = result[0].quote;
            var quoteAuthor = result[0].author;
            displayQuote(quoteContent, quoteAuthor);

        },
        error: function ajaxError(jqXHR) {
            console.error('Error: ', jqXHR.responseText);
        }
    });
}

function displayQuote(quoteContent, quoteAuthor) {
    console.log("in display quote");
    quoteText.innerHTML = `<h4>${quoteContent}</h4><br><p>- ${quoteAuthor}</p>`;
}

async function getQuote2(){
    console.log("in get quote 2");
    var category = 'intelligence'
    $.ajax({
        method: 'GET',
        url: 'https://api.api-ninjas.com/v1/quotes?category=' + category,
        headers: { 'X-Api-Key': '2aZ5eWdhUntkhytIQBchiQ==C8euiLyfv6xLKJwm'},
        contentType: 'application/json',
        success: function(result) {
            var quoteContent = result[0].quote;
            var quoteAuthor = result[0].author;
            displayQuote(quoteContent, quoteAuthor);
        },
        error: function ajaxError(jqXHR) {
            console.error('Error: ', jqXHR.responseText);
        }
    });
}