const URI = 'https://localhost:44344/api/Quiz'
var QuizArr = [];
var quizCount = 0;


async function fetchDataJSON() {
    const response = await fetch(URI);
    const data = await response.json();
    console.log(data);
    getQuizs(data);
    
    for(var i=0;i<quizCount;i++)
    {
        document.getElementById(i).onclick = function()
        {
            localStorage.setItem("chosenQuiz", this.id);  
        }
    }
  }

  fetchDataJSON();
  
  function getQuizs (data){
      quizCount = data.length;
    for(var i=0;i<data.length;i++){
        document.getElementById("main").innerHTML+=
        '<div class="col-12 col-md-6">'
        +'<div class="card" style="width: 30rem height = 15rem">'
        +'<img src="images/' + data[i].name + '.jpg"' +  'class="card-img-top" alt="გეოგრაფიის ქვიზი" height="280px" >'
        +'<div class="card-body">'
        +'<h5 class="card-title">' + data[i].name + '</h5>'
        +'<p class="card-text">' + data[i].description +'</p>'
        +'<a href="quiz.html" class="btn btn-primary" id="' + i + '">დაწყება</a>'
        +'</div>'
        +'</div>'
        +'</div>'
    }
    };
