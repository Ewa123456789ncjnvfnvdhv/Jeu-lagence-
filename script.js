const berger = document.getElementById('berger');
const letters = document.querySelectorAll('.letter');
const scoreDiv = document.getElementById('score');

let isJumping = false;
let collectedLetters = '';

document.addEventListener('keydown', (e) => {
  if (e.code === 'Space' && !isJumping) {
    jump();
  }
});

function jump() {
  isJumping = true;
  let jumpHeight = 0;
  const up = setInterval(() => {
    if (jumpHeight >= 100) {
      clearInterval(up);
      const down = setInterval(() => {
        if (jumpHeight <= 0) {
          clearInterval(down);
          isJumping = false;
        } else {
          jumpHeight -= 5;
          berger.style.bottom = jumpHeight + 'px';
        }
      }, 20);
    } else {
      jumpHeight += 5;
      berger.style.bottom = jumpHeight + 'px';
    }
  }, 20);
}

setInterval(() => {
  const zombie = document.getElementById('zombie');
  const zombieX = zombie.getBoundingClientRect().left;
  const bergerX = berger.getBoundingClientRect().right;
  const bergerY = berger.getBoundingClientRect().bottom;

  if (zombieX < bergerX && zombieX > bergerX - 40 && bergerY < window.innerHeight - 10) {
    alert('Perdu !');
    location.reload();
  }

  letters.forEach(letter => {
    const letterX = letter.getBoundingClientRect().left;
    if (letterX < bergerX && letterX > bergerX - 40) {
      collectedLetters += letter.textContent;
      letter.style.display = 'none';
      scoreDiv.textContent = `Score : ${collectedLetters.length} | Lettres : ${collectedLetters}`;
      if (collectedLetters.length === 7) {
        alert('Bravo ! Tu as formé L’AGENCE 🎉`);
        location.reload();
      }
    }
  });
}, 50);
