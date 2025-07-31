const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

const questionsElement = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreDiv = document.getElementById("score");

let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || {};

function renderQuestions() {
  questionsElement.innerHTML = "";

  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");
    questionElement.classList.add("question");

    const questionText = document.createElement("p");
    questionText.textContent = `${i + 1}. ${question.question}`;
    questionElement.appendChild(questionText);

    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];

      const label = document.createElement("label");
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);

      if (userAnswers[`q${i}`] === choice) {
        choiceElement.checked = true;
      }

      choiceElement.addEventListener("change", () => {
        userAnswers[`q${i}`] = choice;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));
      });

      label.appendChild(choiceElement);
      label.appendChild(document.createTextNode(choice));
      questionElement.appendChild(label);
      questionElement.appendChild(document.createElement("br"));
    }

    questionsElement.appendChild(questionElement);
  }
}

function calculateScore() {
  let score = 0;

  questions.forEach((question, index) => {
    const userAnswer = userAnswers[`q${index}`];
    if (userAnswer === question.answer) {
      score++;
    }
  });

  scoreDiv.textContent = `Your score is ${score} out of ${questions.length}.`;
  localStorage.setItem("score", score);
}

renderQuestions();

const storedScore = localStorage.getItem("score");
if (storedScore !== null) {
  scoreDiv.textContent = `Your score is ${storedScore} out of ${questions.length}.`;
}

submitBtn.addEventListener("click", calculateScore);
