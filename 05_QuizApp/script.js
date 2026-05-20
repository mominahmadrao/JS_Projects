document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-btn");
  const nextBtn = document.getElementById("next-btn");
  const restartBtn = document.getElementById("restart-btn");
  const questionContainer = document.getElementById("question-container");
  const questionText = document.getElementById("question-text");
  const choicesList = document.getElementById("choices-list");
  const resultContainer = document.getElementById("result-container");
  const scoreDisplay = document.getElementById("score");

  let currentQuestionIndex = 0;
  let score = 0;
  let answered = false;
  let selectedLi = null;

  const questions = [
    { question: "What is the capital of France?", choices: ["Paris", "Rome", "Berlin", "Madrid"], answer: "Paris" },
    { question: "Which planet is known as the Red Planet?", choices: ["Earth", "Mars", "Venus", "Jupiter"], answer: "Mars" },
    { question: "Which is the largest ocean on Earth?", choices: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"], answer: "Pacific Ocean" },
    { question: "Who wrote the national anthem of Pakistan?", choices: ["Allama Iqbal", "Hafeez Jalandhari", "Faiz Ahmed Faiz", "Mirza Ghalib"], answer: "Hafeez Jalandhari" },
    { question: "What is the capital of Japan?", choices: ["Seoul", "Beijing", "Tokyo", "Bangkok"], answer: "Tokyo" }
  ];

  startBtn.addEventListener("click", startQuiz);

  nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showResults();
    }
  });

  restartBtn.addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    resultContainer.classList.add("hidden");
    startQuiz();
  });

  function startQuiz() {
    startBtn.classList.add("hidden");
    resultContainer.classList.add("hidden");
    questionContainer.classList.remove("hidden");
    showQuestion();
  }

  function showQuestion() {
    answered = false;
    selectedLi = null;
    nextBtn.classList.add("hidden");

    questionText.textContent = questions[currentQuestionIndex].question;
    choicesList.innerHTML = "";

    questions[currentQuestionIndex].choices.forEach((choice) => {
      const li = document.createElement("li");
      li.textContent = choice;

      li.addEventListener("click", () => {
        if (answered) return;

        answered = true;
        selectedLi = li;

        const correctAnswer = questions[currentQuestionIndex].answer;

        // highlight selected
        li.classList.add("selected");

        if (choice === correctAnswer) {
          li.classList.add("correct");
          score++;
        } else {
          li.classList.add("wrong");

          // show correct answer too
         // Array.from creates an new shallow copied Array instance from an interable and array-type object   
          Array.from(choicesList.children).forEach((child) => {
            if (child.textContent === correctAnswer) {
              child.classList.add("correct");
            }
          });
        }

        nextBtn.classList.remove("hidden");
      });

      choicesList.appendChild(li);
    });
  }

  function showResults() {
    questionContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");
    scoreDisplay.textContent = `${score} / ${questions.length}`;
  }
});