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
  const dropArea = document.getElementById('drop-area');
  const milestoneBanner = document.getElementById('milestone-banner');

  // Milestones at powers of ten (1,10,100,...)
  const milestoneScores = [1,10,100,1000,10000];

  // Format score utility
  function formatScore(val) {
    return val % 1 === 0 ? val : val.toFixed(1);
  }

  function showMilestone(msg) {
    milestoneBanner.textContent = msg;
    milestoneBanner.classList.remove('hidden');
    milestoneBanner.classList.add('slide-in');
    setTimeout(() => {
      milestoneBanner.classList.remove('slide-in');
      milestoneBanner.classList.add('hidden');
    }, 2000);
  }

  function checkMilestone() {
    // Round down to nearest integer
    const intScore = Math.floor(score);
    if (milestoneScores.includes(intScore)) {
      showMilestone(`Milestone reached: ${intScore} Water Units!`);
    }
  }

  function updateScore() {
    scoreEl.textContent = `Water Units: ${formatScore(score)}`;
    scoreEl.classList.add('pulse');
    scoreEl.addEventListener('animationend', () => {
      scoreEl.classList.remove('pulse');
    }, { once: true });
    checkMilestone();
  }

  function updateCosts() {
    upgradeBtn.textContent = `Upgrade Clicker (Cost: ${10 * clickPower})`;
    buySystemBtn.textContent = `Buy Water System (Cost: ${50 * (passiveCount + 1)})`;
  }

  function spawnDrop() {
    const drop = document.createElement('div');
    drop.className = 'drop';
    dropArea.appendChild(drop);
    drop.addEventListener('click', () => {
      const factor = difficultyEl.value === 'hard' ? 0.1 : 1;
      score += clickPower * factor;
      updateScore();
      drop.remove();
    });
    setTimeout(() => drop.remove(), 5000);
  }

  clickBtn.addEventListener('click', () => {
    spawnDrop();
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
    dropArea.innerHTML = '';
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
