const fs = require("fs");
const readline = require("readline");

const DATA_FILE = "./data.json";

let quizData = { questions: {} };
if (fs.existsSync(DATA_FILE)) {
  quizData = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(question) {
  return new Promise(resolve => rl.question(question, resolve));
}

async function main() {
  console.log("=== BDSM Quiz Admin CLI ===");

  while (true) {
    const action = await ask(
      "Choose action: [a]dd/update question, [e]xit: "
    );

    if (action.toLowerCase() === "e") break;

    const qid = await ask("Question ID (e.g., q11): ");
    const qtext = await ask("Question text: ");
    const traitsInput = await ask(
      "Traits (comma-separated, e.g., submissive,masochist): "
    );
    const weightsInput = await ask(
      "Weights (comma-separated, matching traits, e.g., 1,1): "
    );

    const traits = traitsInput.split(",").map(t => t.trim());
    const weightsArr = weightsInput.split(",").map(w => Number(w.trim()));

    if (traits.length !== weightsArr.length) {
      console.log("! Number of traits and weights must match!");
      continue;
    }

    const weights = {};
    for (let i = 0; i < traits.length; i++) {
      weights[traits[i]] = weightsArr[i];
    }

    quizData.questions[qid] = { text: qtext, weights };
    console.log(`Question ${qid} added/updated.`);

    fs.writeFileSync(DATA_FILE, JSON.stringify(quizData, null, 2), "utf-8");
    console.log("data.json saved.\n");
  }

  rl.close();
  console.log("Exiting admin CLI. Bye!");
}

main();
