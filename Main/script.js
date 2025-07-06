// script.js

// Ensure the DOM is loaded before accessing elements
window.addEventListener('DOMContentLoaded', () => {
  let score = 0;
  let clickPower = 1;
  let passiveCount = 0;
  let seconds = 0;

  const scoreEl = document.getElementById('score');
  const clickBtn = document.getElementById('click-button');
  const upgradeBtn = document.getElementById('upgrade-clicker');
  const buySystemBtn = document.getElementById('buy-system');
  const timerEl = document.getElementById('timer');

  function updateScore() {
    scoreEl.textContent = `Water Units: ${score}`;
  }

  function updateCosts() {
    upgradeBtn.textContent = `Upgrade Clicker (Cost: ${10 * clickPower})`;
    buySystemBtn.textContent = `Buy Water System (Cost: ${50 * (passiveCount + 1)})`;
  }

  clickBtn.addEventListener('click', () => {
    score += clickPower;
    updateScore();
    // visual feedback
    clickBtn.style.backgroundColor = 'var(--color-dark-green)';
    setTimeout(() => clickBtn.style.backgroundColor = 'var(--color-blue)', 100);
  });

  upgradeBtn.addEventListener('click', () => {
    const cost = 10 * clickPower;
    if (score >= cost) {
      score -= cost;
      clickPower += 1;
      updateScore();
      updateCosts();
    }
  });

  buySystemBtn.addEventListener('click', () => {
    const cost = 50 * (passiveCount + 1);
    if (score >= cost) {
      score -= cost;
      passiveCount += 1;
      updateScore();
      updateCosts();
    }
  });

  // passive income per second
  setInterval(() => {
    if (passiveCount > 0) {
      score += passiveCount;
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

