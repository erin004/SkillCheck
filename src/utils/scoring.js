function calculateScore(questions, answers) {
  const total = questions.length;
  let correct = 0;

  questions.forEach((q) => {
    if (answers[q.id] === q.answer) correct += 1;
  });

  const percentage = total === 0 ? 0 : Math.round((correct / total) * 100);

  let levelKey = "beginner";
  if (percentage >= 76) levelKey = "advanced";
  else if (percentage >= 41) levelKey = "intermediate";

  return { correct, total, percentage, levelKey };
}

function buildWhatsAppMessage({ name, levelLabel, percentage, programTitle }) {
  const lines = [
    `Halo, saya ${name}.`,
    `Saya baru saja menyelesaikan tes penempatan dengan skor ${percentage}% dan berada di level ${levelLabel}.`,
    `Saya ingin bertanya lebih lanjut tentang ${programTitle}.`,
  ];
  return encodeURIComponent(lines.join(" "));
}

export { calculateScore, buildWhatsAppMessage };
