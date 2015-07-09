var current_question = 1;
var number_of_questions = 4;
var score = 0;

// gets the answer in the 'answer' ID html element
//
// returns a String of what the input field contains
function given_answer(){
  return document.getElementById("answer").value
};
// Gets the current question Element from our Document
function get_current_question() {
  return document.getElementById("question" + current_question);
}
// Gets the answer from the current_question's answer div.
function get_answer() {
  var question = get_current_question();
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
// Checks to see if the answer given by the user is the correct answer
// 
// Accepts 1 argument, a String of the answer_text
// 
// Returns Boolean
function is_correct_answer(answer_text) {
  if (answer_text === get_answer()){
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
function update_question_result(correct){
  var questionHTML = document.getElementById("question_result");
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
function process_answer_submission(){
  var user_answer = given_answer();
  update_question_result(is_correct_answer(user_answer));
};

// returns the final score as an Integer
//
// returns Integer
function finalScore() {
  return ((score/number_of_questions) * 100);
}

// Clears the answer and question_result fields in our HTML
function clearAnswer(){
  document.getElementById("answer").value = "";
  document.getElementById("question_result").innerText = "";
}

// This method sets the new question onto the screen for our user, or displays their final score.
// This also sets the score to increment if they have chosen the correct answer.
// 
// Returns nothing.
function nextQuestion(){
  if (is_correct_answer(given_answer())) {
    score++;
  }
  if (current_question < number_of_questions){
    toggle_visibility(get_current_question());
    current_question++;
    toggle_visibility(get_current_question());
    clearAnswer();
  }
  else {
    document.getElementById("total_result").innerText = "Your score is " + score + "/" + number_of_questions + "=" + finalScore() + "%.";
    document.getElementById("answer").style.display = "none";
    document.getElementById("submitter").style.display = "none";
    document.getElementById("next").style.display = "none";
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

// Load displayQuestion function when page loads.
//
// returns undefined (not intending this function to return anything useful)
window.onload = function(){
  document.getElementById("submitter").addEventListener("click", process_answer_submission);
  document.getElementById("next").addEventListener("click", nextQuestion);
};
