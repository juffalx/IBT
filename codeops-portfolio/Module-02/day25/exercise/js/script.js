const questions = [
  {
    q: "What are the four beats of a good project demo?",
    a: "The problem, live walkthrough, one proud part, one hard bug.",
  },
  {
    q: "What makes feedback useful rather than vague?",
    a: "It is specific, kind, and actionable, e.g. \"the total shows NaN when a dish has no price\" instead of \"the code is messy\".",
  },
  {
    q: "What does the Module 2 assessment cover, and what is the pass mark?",
    a: "Written and practical, covering HTML, CSS and JavaScript, with a 70% pass mark.",
  },
  {
    q: "Which parts of the module grade come from continuous work rather than the exam?",
    a: "Homework, exercises and the project (35%), plus attendance and participation (15%).",
  },
  {
    q: "Name three JavaScript concepts the assessment is likely to test.",
    a: "Array methods, async/await and fetch, and the state to render loop, among others.",
  },
  {
    q: "How does the hand-built state to render loop map onto what React gives you?",
    a: "state = {...} becomes useState, calling render() yourself becomes automatic re-render, and manual DOM updates become JSX components.",
  },
];

const quizEl = document.querySelector("#quiz");

questions.forEach((item, i) => {
  const block = document.createElement("div");
  block.className = "question";

  const q = document.createElement("p");
  q.textContent = (i + 1) + ". " + item.q;

  const button = document.createElement("button");
  button.textContent = "Show answer";

  const answer = document.createElement("p");
  answer.className = "answer";
  answer.hidden = true;
  answer.textContent = item.a;

  button.addEventListener("click", () => {
    answer.hidden = !answer.hidden;
  });

  block.appendChild(q);
  block.appendChild(button);
  block.appendChild(answer);
  quizEl.appendChild(block);
});
