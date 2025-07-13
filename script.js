// script.js

window.addEventListener('DOMContentLoaded', () => {
  let score = 0;
  let clickPower = 1;
  let passiveCount = 0;
  let seconds = 0;

  const scoreEl = document.getElementById('score');
  const clickBtn = document.getElementById('click-button');
  const upgradeBtn = document.getElementById('upgrade-clicker');
  const buySystemBtn = document.getElementById('buy-system');
  const resetBtn = document.getElementById('reset-button');
  const timerEl = document.getElementById('timer');
  const difficultyEl = document.getElementById('difficulty');

  // Helper to format score with decimals only when needed
  function formatScore(val) {
    return val % 1 === 0 ? val : val.toFixed(1);
  }

  function updateScore() {
    scoreEl.textContent = `Water Units: ${formatScore(score)}`;
    scoreEl.classList.add('pulse');
    scoreEl.addEventListener('animationend', () => {
      scoreEl.classList.remove('pulse');
    }, { once: true });
  }

  function updateCosts() {
    upgradeBtn.textContent = `Upgrade Clicker (Cost: ${10 * clickPower})`;
    buySystemBtn.textContent = `Buy Water System (Cost: ${50 * (passiveCount + 1)})`;
  }

  clickBtn.addEventListener('click', () => {
    const factor = difficultyEl.value === 'hard' ? 0.1 : 1;
    score += clickPower * factor;
    updateScore();
    clickBtn.classList.add('pop');
    clickBtn.addEventListener('animationend', () => {
      clickBtn.classList.remove('pop');
    }, { once: true });
  });

  upgradeBtn.addEventListener('click', () => {
    const cost = 10 * clickPower;
    if (score >= cost) {
      score -= cost;
      clickPower += 1;
      updateScore();
      updateCosts();
      upgradeBtn.classList.add('pop');
      upgradeBtn.addEventListener('animationend', () => {
        upgradeBtn.classList.remove('pop');
      }, { once: true });
    }
  });

  buySystemBtn.addEventListener('click', () => {
    const cost = 50 * (passiveCount + 1);
    if (score >= cost) {
      score -= cost;
      passiveCount += 1;
      updateScore();
      updateCosts();
      buySystemBtn.classList.add('pop');
      buySystemBtn.addEventListener('animationend', () => {
        buySystemBtn.classList.remove('pop');
      }, { once: true });
    }
  });

  resetBtn.addEventListener('click', () => {
    score = 0;
    clickPower = 1;
    passiveCount = 0;
    seconds = 0;
    updateScore();
    updateCosts();
    timerEl.textContent = 'Time: 00:00';
    resetBtn.classList.add('pop');
    resetBtn.addEventListener('animationend', () => {
      resetBtn.classList.remove('pop');
    }, { once: true });
  });

  // passive income per second
  setInterval(() => {
    const factor = difficultyEl.value === 'hard' ? 0.1 : 1;
    if (passiveCount > 0) {
      score += passiveCount * factor;
      updateScore();
    }
  }, 1000);

  // game timer
  setInterval(() => {
    seconds += 1;
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    timerEl.textContent = `Time: ${m}:${s}`;
  }, 1000);

  // initial render
  updateCosts();
  updateScore();
});
