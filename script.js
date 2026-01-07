function buildQuiz(questions) {
  const container = document.getElementById("questions");

  for (const [qid, qdata] of Object.entries(questions)) {
    const questionDiv = document.createElement("div");
    questionDiv.className = "question";

    // h2 question text
    const h2 = document.createElement("h2");
    h2.textContent = qdata.text;
    questionDiv.appendChild(h2);

    const radioGroup = document.createElement("div");
    radioGroup.className = "radio-group";

    const first = document.createElement("input");
    first.type = "radio";
    first.name = qid;
    first.value = "1";
    first.required = true;
    radioGroup.appendChild(first);

    for (let i = 2; i <= 6; i++) {
      const label = document.createElement("label");
      label.className = "radio-cell";

      const input = document.createElement("input");
      input.type = "radio";
      input.name = qid;
      input.value = String(i);

      label.appendChild(input);
      radioGroup.appendChild(label);
    }

    const last = document.createElement("input");
    last.type = "radio";
    last.name = qid;
    last.value = "7";
    radioGroup.appendChild(last);

    questionDiv.appendChild(radioGroup);

    const scale = document.createElement("div");
    scale.className = "scale-labels";

    const left = document.createElement("span");
    left.textContent = "Strongly disagree";

    const right = document.createElement("span");
    right.textContent = "Strongly agree";

    scale.appendChild(left);
    scale.appendChild(right);

    questionDiv.appendChild(scale);

    container.appendChild(questionDiv);
  }
}

let data;

fetch("data.json")
  .then(res => res.json())
  .then(json => {
    data = json;
    buildQuiz(data.questions);
  })
  .catch(err => console.error("Failed to load data.json", err));

document.getElementById("quizForm").addEventListener("submit", function(e){
  e.preventDefault()
    const formData = new FormData(this);
  const answers = {};
  
  for (let [qid, value] of formData.entries()) {
    answers[qid] = Number(value);
  }

  const result = {};
  const allCategories = new Set();
  for (const q of Object.values(data.questions)) {
    for (const category of Object.keys(q.weights)) {
      allCategories.add(category);
    }
  }
  for (const category of allCategories) result[category] = 0;

  const maxScore = {};
  for (const category of allCategories) {
    let max = 0;
    for (const [qid, q] of Object.entries(data.questions)) {
      if (q.weights[category]) {
        max += Math.abs(q.weights[category]) * 3;
      }
    }
    maxScore[category] = max;
  }

  for (const [qid, value] of Object.entries(answers)) {
    const centered = value - 4; 
    const qWeights = data.questions[qid].weights;
    for (const [category, w] of Object.entries(qWeights)) {
      result[category] += centered * w;
    }
  }

  const finalResult = {};
  for (const [category, score] of Object.entries(result)) {
    const max = maxScore[category];
    finalResult[category] = max === 0 ? 50 : Math.round(((score + max) / (2 * max)) * 100);
  }

  console.log(finalResult);
  alert(JSON.stringify(finalResult, null, 2));
});