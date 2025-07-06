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

  function updateScore() {
    scoreEl.textContent = `Water Units: ${score}`;
    // Score pulse animation
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
    score += clickPower;
    updateScore();

    // Button pop animation
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

      // Button pop animation
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

      // Button pop animation
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

    // Button pop animation
    resetBtn.classList.add('pop');
    resetBtn.addEventListener('animationend', () => {
      resetBtn.classList.remove('pop');
    }, { once: true });
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


