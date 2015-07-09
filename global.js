// Variable objects for each question storing the question, correct answer and multiple chocies.

var question1 = {
  question: "A magical jar of jelly beans doubles the number of jelly beans every minute.  The jar is full at noon.  When is it half full?",
  answer: "11:59",
  possibleAnswers: ["11:59", "11:30", "It is impossible to answer this question.", "12:01"]
};

var question2 = {
  question: "Kerry, Wendy and Sumeet have 12 dinosaurs. Kerry has twice as many as Wendy, and Sumeet has three times as many as Wendy. How many dinosaurs does Sumeet have?",
  answer: 6,
  possibleAnswers: [4, 2, 6, 3]
};

var question3 = {
  question: "|1|2|3|\n|4|5|6|\n|7|8|9|\n\nIn a game of tic-tac-toe, assuming your opponent is a savvy player, what would be a losing first move?",
  answer: 4,
  possibleAnswers: [1, 3, 4, 5]
};

var question4 = {
  question: "You have 27 coins, each of them weighing 10 ounces. Except for one, which either weighs 9 or 11 ounces. You have a balance scale. What is the minimum number of weighings to determine which coin is different?",
  answer: 3,
  possibleAnswers: [3, 4, 5, 14] 
};

// returns all choices for this question as a String
//
//   question - Question object
//
// returns String
function getAllChoicesAsString(question) {
  choices = "";
  for (count = 0; count < question.possibleAnswers.length; count++ ){
    choices += "\n" + (count + 1) + ". " + question.possibleAnswers[count];
  };
  return choices;
};

// gets the answer in the 'answer' ID html element
//
// returns a String of what the input field contains
function given_answer(){
  return document.getElementById("answer").value
};

// returns Boolean indicating if the answer is correct
//
// answer_text - integer indicating the user's choice of answer
// question    - Question object
//
// returns Boolean
function is_correct_answer(answer_text){
  i = choiceToIndex(answer_text);
  question = questions[questionIndex]
  if (question.possibleAnswers[i] === question.answer){
    return true;
  }
  else {
    return false;
  };    
};

// processes an answer from the input field and displays right or wrong in the div
//
// returns undefined
function process_answer_submission(){
  var user_answer = given_answer();
  update_question_result(is_correct_answer(user_answer, questions[questionIndex]));
};

//  changes the value of the question_result div
//
// correct - Boolean indicating whether the question is correct
//
// returns undefined (not intending this function to return anything useful)
function update_question_result(correct){
  var questionHTML = document.getElementById("question_result");
  if (correct){
    questionHTML.innerText = "Success!";
  }
  else{
    questionHTML.innerText = "Wrong! Which is harsh in my opinion."
  }
}

//
function nextQuestion(){
  if (is_correct_answer(given_answer(), questions[questionIndex])) {
    score++;
  }
  if (questionIndex < (questions.length - 1)){
    questionIndex++;
    displayQuestion();
    clearAnswer();
  }
  else {
    s = 1;
    document.getElementById("total_result").innerText = "Your score is " + score + "/" + questions.length + "=" + finalScore() + "%.";
    document.getElementById("answer").style.display = "none";
    document.getElementById("submitter").style.display = "none";
    document.getElementById("next").style.display = "none";
  }
}

// takes the answer_text as a string and returns its Index in the array
//
// answer_text - String that can be parsed into an Integer
//
// returns an Integer
function choiceToIndex(answer_text){
  answerIndex = parseInt(answer_text);
  return (answerIndex - 1);
}

// puts the first question and answer in the appropriate divs upon page load
//
// returns undefined (not intending this function to return anything useful)
function displayQuestion() {
  var questionHTML = document.getElementById("question");

  questionHTML.innerHTML = questions[questionIndex].question;
  
  var possibleAnswersHTML = document.getElementById("choices");
  
  possibleAnswersHTML.innerHTML = getAllChoicesAsString(questions[questionIndex]);  
  
}

// returns the final score as an Integer
//
// returns Integer
function finalScore() {
  return ((score/questions.length) * 100);
}

//
function clearAnswer(){
  document.getElementById("answer").value = "";
  document.getElementById("question_result").innerText = "";
}

/// Plan to do 
// 1. Set global variable of question we are on
// 2. Set global variable of array of all questions
// 3. Use the global variable to find the answer class div of the current question
// 4. Use that to check if their answer is right
var current_question = 1;
var number_of_questions = 4;

// gets the answer in the 'answer' ID html element
//
// returns a String of what the input field contains
function given_answer_new(){
  return document.getElementById("answer-new").value
};

function get_current_question_new() {
  return document.getElementById("question" + current_question);
}

function get_answer_new() {
  var question = get_current_question_new();
  var array = question.children;
  var answer = find_element_from_array(array, "answer");
  return answer.innerHTML;
}

// cycles through a class list array until it finds an element with the class_name_to_find
//
// array - array of Elements
// class_name_to_find - String of the class we are trying to find among the array of Elements
//
// returns an Element matching the class_name
function find_element_from_array(array, class_name_to_find) {
  for (i=0; i < array.length; i++) {
    if (array[i].className.indexOf(class_name_to_find) != -1) {
      return array[i];
    }
  }
}

function is_correct_answer_new(answer_text) {
  if (answer_text === get_answer_new()){
    return true;
  }
  else {
    return false;
  }; 
}

//  changes the value of the question_result div
//
// correct - Boolean indicating whether the question is correct
//
// returns undefined (not intending this function to return anything useful)
function update_question_result_new(correct){
  var questionHTML = document.getElementById("question_result_new");
  if (correct){
    questionHTML.innerText = "Success!";
  }
  else{
    questionHTML.innerText = "Wrong! Which is harsh in my opinion."
  }
}

// processes an answer from the input field and displays right or wrong in the div
//
// returns undefined
function process_answer_submission_new(){
  var user_answer = given_answer_new();
  update_question_result_new(is_correct_answer_new(user_answer));
};

// returns the final score as an Integer
//
// returns Integer
function finalScore_new() {
  return ((score/number_of_questions) * 100);
}

//
function clearAnswer_new(){
  document.getElementById("answer-new").value = "";
  document.getElementById("question_result_new").innerText = "";
}

//
function nextQuestion_new(){
  if (is_correct_answer_new(given_answer_new())) {
    score++;
  }
  if (current_question < number_of_questions){
    toggle_visibility(get_current_question_new());
    current_question++;
    toggle_visibility(get_current_question_new());
    clearAnswer_new();
  }
  else {
    document.getElementById("total_result_new").innerText = "Your score is " + score + "/" + number_of_questions + "=" + finalScore_new() + "%.";
    document.getElementById("answer-new").style.display = "none";
    document.getElementById("submitter-new").style.display = "none";
    document.getElementById("next_new").style.display = "none";
  }
};

// this function will add a class if it isn't there and removes it if it is
//
// element is a DOM element
//
// returns nothing useful
function toggle_visibility(element) {
  element.classList.toggle("show");
  element.classList.toggle("hide");
}

var score = 0;
// Array of questions to be asked
var questions = [question1, question2, question3, question4];

var questionIndex = 0;

// Load displayQuestion function when page loads.
//
// returns undefined (not intending this function to return anything useful)
window.onload = function(){
  displayQuestion();
  document.getElementById("submitter-new").addEventListener("click", process_answer_submission_new);
  document.getElementById("next_new").addEventListener("click", nextQuestion_new);
};
