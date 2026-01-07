document.getElementById("quizForm").addEventListener("submit", function(e){
    e.preventDefault()
    const formData = new FormData(this);
    const answers = {};
    let weight = {
      vanilla: {q1: 0,q2:0,q3:0,q4:0            ,q5:0,q6:0,q7:0,q8:1,q9:1,q10:1,q11:0,q12:0,q13:0,q14:0},
      dominant: {q1: 1,q2:0,q3:1,q4:1           ,q5:0,q6:0,q7:0,q8:0,q9:0,q10:0,q11:0,q12:0,q13:0,q14:0},
      submissive: {q1: 0,q2:0,q3:0,q4:0         ,q5:0,q6:0,q7:0,q8:0,q9:0,q10:0,q11:1,q12:0,q13:0,q14:0},
      masochist: {q1: 0,q2:1,q3:0,q4:0         ,q5:1,q6:1,q7:1,q8:0,q9:0,q10:0,q11:0,q12:0,q13:0,q14:0},
      sadist: {q1: 0,q2:0,q3:0,q4:0             ,q5:0,q6:0,q7:0,q8:0,q9:0,q10:0,q11:0,q12:0,q13:0,q14:0},
      bratTamer: {q1: 0,q2:0,q3:0,q4:1          ,q5:0,q6:0,q7:0,q8:0,q9:0,q10:0,q11:0,q12:0,q13:0,q14:0},
      brat: {q1: 0,q2:0,q3:0,q4:0               ,q5:0,q6:0,q7:0,q8:0,q9:0,q10:0,q11:0,q12:0,q13:0,q14:0},
      rigger: {q1: 0,q2:0,q3:0,q4:0             ,q5:0,q6:0,q7:0,q8:0,q9:0,q10:0,q11:0,q12:0,q13:0,q14:0},
      ropeBunny: {q1: 0,q2:0,q3:0,q4:0          ,q5:0,q6:0,q7:0,q8:0,q9:0,q10:0,q11:0,q12:0,q13:0,q14:0},
      primal: {q1: 0,q2:0,q3:0,q4:0             ,q5:0,q6:0,q7:0,q8:0,q9:0,q10:0,q11:0,q12:0,q13:0,q14:0},
      knifeplay: {q1: 0,q2:0,q3:0,q4:0          ,q5:0,q6:0,q7:0,q8:0,q9:0,q10:0,q11:0,q12:0,q13:0,q14:0},
      asphyxiationGiv: {q1: 0,q2:0,q3:0,q4:0    ,q5:0,q6:0,q7:0,q8:0,q9:0,q10:0,q11:0,q12:0,q13:0,q14:0},
      asphyxiationRec: {q1: 0,q2:0,q3:0,q4:0    ,q5:0,q6:0,q7:0,q8:0,q9:0,q10:0,q11:0,q12:0,q13:0,q14:0},
      experimentalist: {q1: 0,q2:0,q3:0,q4:0    ,q5:0,q6:0,q7:0,q8:0,q9:0,q10:0,q11:0,q12:0,q13:0,q14:0},
      daddy_mommy: {q1: 0,q2:0,q3:0,q4:0        ,q5:0,q6:0,q7:0,q8:0,q9:0,q10:0,q11:0,q12:0,q13:0,q14:0},
      degradee: {q1: 0,q2:0,q3:0,q4:0           ,q5:0,q6:0,q7:0,q8:0,q9:0,q10:0,q11:0,q12:0,q13:0,q14:0},
      degrader: {q1: 0,q2:0,q3:0,q4:0           ,q5:0,q6:0,q7:0,q8:0,q9:0,q10:0,q11:0,q12:0,q13:0,q14:0},
      recievingPraise: {q1: 0,q2:0,q3:0,q4:0    ,q5:0,q6:0,q7:0,q8:0,q9:0,q10:0,q11:0,q12:0,q13:0,q14:0},
      praising: {q1: 0,q2:0,q3:0,q4:0           ,q5:0,q6:0,q7:0,q8:0,q9:0,q10:0,q11:0,q12:0,q13:0,q14:0},
      switch: {q1: 0,q2:0,q3:0,q4:0             ,q5:0,q6:0,q7:0,q8:0,q9:0,q10:0,q11:0,q12:0,q13:0,q14:0},
      gunplay: {q1: 0,q2:0,q3:0,q4:0            ,q5:0,q6:0,q7:0,q8:0,q9:0,q10:0,q11:0,q12:0,q13:0,q14:0},
      sapiosexuality: {q1: 0,q2:0,q3:0,q4:0     ,q5:0,q6:0,q7:0,q8:0,q9:0,q10:0,q11:0,q12:0,q13:0,q14:0},
      CNC: {q1: 0,q2:0,q3:0,q4:0                ,q5:0,q6:0,q7:0,q8:0,q9:0,q10:0,q11:0,q12:0,q13:0,q14:0},
      somnophilia: {q1: 0,q2:0,q3:0,q4:0        ,q5:0,q6:0,q7:0,q8:0,q9:0,q10:0,q11:0,q12:0,q13:0,q14:0},
      edging: {q1: 0,q2:0,q3:0,q4:0             ,q5:0,q6:0,q7:1,q8:0,q9:0,q10:0,q11:0,q12:0,q13:0,q14:0},
    }
    let result = {
      vanilla: 0,
      submissive: 0,
      dominant: 0,
      masochist: 0,
      sadist: 0,
      bratTamer: 0,
      brat: 0,
      rigger: 0,
      ropeBunny: 0,
      primal: 0,
      knifeplay: 0,
      asphyxiationGiv:0,
      asphyxiationRec:0,
      experimentalist:0,
      daddy_mommy:0,
      degradee:0,
      degrader:0,
      recievingPraise:0,
      praising:0,
      switch:0,
      gunplay:0,
      sapiosexuality:0,
      CNC:0,
      somnophilia:0,
      edging:0,
    }

    const maxScore = {}
    for (const category in weight){
      let max = 0
      for (const question in weight[category]) {
        max += Math.abs(weight[category][question]) * 3
      }
      maxScore[category] = max
    }
    for (let [question, value] of formData.entries()) {
    answers[question] = value;
    }
    console.log(answers);
    console.log(answers["q1"])
    for (const [question, value] of Object.entries(answers)){
      const centered = Number(value)-4;
      for (const category in weight){
        const w = weight[category][question] || 0;
        result[category] += centered * w;}}
  const finalResult = {}
  for (const category in result){
    const max = maxScore[category]
    if (max === 0){
      finalResult[category] = 50
    }else{
      finalResult[category] = Math.round(
        ((result[category] + max) / (2*max)) *100
      )
    }
  }
  console.log(finalResult);

})