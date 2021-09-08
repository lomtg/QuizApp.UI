var quizId = localStorage.getItem("chosenQuiz");
quizId++;

var score = 0;
var anwsers = [];
var myAns = [];
var j = 0;

var URI = "https://localhost:44344/api/Quiz"+quizId;

async function fetchQuestionsJSON() {
    const response = await fetch(URI);
    var data = await response.json();
    getQuestions(data);
    var x = document.querySelectorAll('button');
    return data;
}
var data = fetchQuestionsJSON();

function getQuestions(questions)
{
    questionsCount = questions.length;
    for(var i=0;i<questions.length;i++)
    {
        anwsers.push(questions[i].correctAnwser);
        document.getElementById("questionMain").innerHTML +=
        '<div class="col-12 col-lg-4">'
            +'<div class="question">'
            +'<div class="questionText">'
            +'<h2>'+ questions[i].text +'</h2>'
            +'</div>'
            +'<div class="anwsers">'
            +'<div class="row">'
            +'<div class="col-12">'
            +'<button type="button" class="btn btn-primary" id="'+j++ +'" +">'+questions[i].correctAnwser + '</button>'
            +'</div>'
            +'<div class="col-12">'
            +'<button type="button" class="btn btn-primary" id="'+j++ +'" +">'+questions[i].wrongAnwser + '</button>'
            +'</div>'
            +'</div>'
            +'</div>'
            +'</div>'
            +'</div>'
    }
}


function addListeners()
{
    for(var i=0;i<anwsers.length*2;i++)
    {
        var x = document.querySelectorAll('button');
        x[i].onclick = function()
        {
           if(this.id%2 == 0)
           {
               makeRedFront(this.id);
               x[this.id].style.backgroundColor = "green";
           }

           if(this.id%2 == 1)
           {
               makeRedBehind(this.id);
               x[this.id].style.backgroundColor = "green";
           }
        }
    }
}

setTimeout(addListeners,500);


function makeRedFront(pos)
{
    pos++;
    document.getElementById(pos++).style.backgroundColor = "dodgerblue";
}

function makeRedBehind(pos)
{
    pos--;
    document.getElementById(pos--).style.backgroundColor = "dodgerblue";
}

var submitBtn = document.getElementById('submitBtn');

submitBtn.onclick = function()
{
    var x = document.querySelectorAll('button');
    for(var i=0;i<anwsers.length*2;i++)
    {
        if(x[i].style.backgroundColor =="green")
        {
        myAns.push(x[i].textContent);
        }
    }


    for(var i=0;i<anwsers.length;i++)
    {
        if(anwsers[i]==myAns[i]) score++;
    }

    document.body.innerHTML =
    '<ul class="nav nav-pills nav-fill" style="margin-bottom: 5px;">'
    +'<li class="nav-item col-12 col-md-6">'
    +'<a class="nav-link " aria-current="page" href="Index.html" style="color: yellow;">Home</a>'
    +'</li>'
    +'<li class="nav-item col-12 col-md-6">'
    +'<a class="nav-link" href="leaderBoard.html"style="color: yellow" >LeaderBoard</a>'
    +'</li>'
    +'</ul>'
    +'<h1 style="text-align:center;"> თქვენი საბოლოო ქულაა ' + score + '/' + anwsers.length + '</h1>';
}