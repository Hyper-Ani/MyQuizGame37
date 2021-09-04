class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }
  



  play(){
    //write code here to hide question elements
    question.hide();
    //write code to change the background color here
    background("yellow");
    //write code to show a heading for showing the result of Quiz
    fill(0);
    textSize(30)
    text("Result of the Quiz",425,30);
    

    //call getContestantInfo( ) here
    Contestant.getPlayerInfo();
    if( allContestants !== undefined){
      var display_Answers=240;
      fill("blue");
      textSize(20);
      text("note: Contestants that gave the right answer will be displayed in green")
    }

    //write condition to check if contestantInfor is not undefined
    for(var plr in allContestants){
      var correctAnswer="2"
      if (correctAnswer === allContestants [plr].answer)
        fill("green")
      else
        fill("red");
    //write code to add a note here
    display_Answers+=30; 
    textSize(20);
    text(allContestants[plr].name + ": " + allContestants[plr].answer, 250,display_Answers)
    //write code to highlight contest who answered correctly
    
  }

  }}
