const container = document.getElementById('particleContainer');
const flower = document.querySelector('.flower');

function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('particle-heart');
    
    heart.innerHTML = '❤';

    const posX = Math.random() * 100;
    
    const size = 10 + Math.random() * 20;
    
    const duration = 12 + Math.random() * 6;
    
    const rotate = (Math.random() - 0.5) * 360;

    heart.style.left = `${posX}%`;
    heart.style.fontSize = `${size}px`;
    heart.style.animationDuration = `${duration}s`;
    heart.style.animationName = 'heartFloat';
    
    heart.style.setProperty('--rotate', `${rotate}deg`);

    container.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, duration * 1000);
}

setInterval(createHeart, 3000); 

for(let i=0; i<5; i++) {
    setTimeout(createHeart, i * 200);
}

function burstHearts(e) {
    if (e) e.stopPropagation();

    const amount = 15;
    for (let i = 0; i < amount; i++) {
        const heart = document.createElement('div');
        heart.classList.add('burst-heart');
        heart.innerHTML = '❤';

        const angle = Math.random() * Math.PI * 2;
        const velocity = 60 + Math.random() * 140;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;
        const tr = (Math.random() - 0.5) * 500;

        heart.style.setProperty('--tx', `${tx}px`);
        heart.style.setProperty('--ty', `${ty}px`);
        heart.style.setProperty('--tr', `${tr}deg`);

        heart.style.animation = 'heartBurst 0.8s ease-out forwards';

        container.appendChild(heart);

        setTimeout(() => heart.remove(), 800);
    }
}

flower.addEventListener('pointerdown', (e) => {
    if (e.button === 0 || e.pointerType === 'touch') {
        burstHearts(e);
    }
});


function heartD(cx, cy, sz) {
      const r   = sz * 0.70;   
      const top = cy - r * 2.0; 
      const bot = cy + r * 0.9; 
      const mid = cy - r * 0.1; 
      const dip = cy - r * 0.3; 

      return `M${cx},${bot}
        C${cx - r*1.4},${mid} ${cx - r*1.4},${top} ${cx},${dip}
        C${cx + r*1.4},${top} ${cx + r*1.4},${mid} ${cx},${bot} Z`;
    }

    function drawHearts() {
        const container = document.getElementById('frame');
        const svg = document.getElementById('hearts-svg');
        const W = container.offsetWidth;
        const H = container.offsetHeight;
        svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
        svg.innerHTML = '';

        const COLOR = 'black';
        const HEART_SIZE = 30;
        const GAP        = 160;
        const MARGIN     = 35;
        const R          = HEART_SIZE * 1.4;

        function addHeart(cx, cy) {
          const p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          p.setAttribute('d', heartD(cx, cy, HEART_SIZE));
          p.setAttribute('fill', 'none');
          p.setAttribute('stroke', COLOR);
          p.setAttribute('stroke-width', '4');
          svg.appendChild(p);
        }

        function addLine(x1, y1, x2, y2) {
          const l = document.createElementNS('http://www.w3.org/2000/svg', 'line');
          l.setAttribute('x1', x1); l.setAttribute('y1', y1);
          l.setAttribute('x2', x2); l.setAttribute('y2', y2);
          l.setAttribute('stroke', COLOR);
          l.setAttribute('stroke-width', '3');
          svg.appendChild(l);
        }

         const topCount = Math.max(2, Math.round((W - MARGIN*2) / GAP));
          const sideCount = Math.max(2, Math.round((H - MARGIN*2) / GAP));

          const xs = [];
          for (let i = 0; i <= topCount; i++) {
            xs.push(MARGIN + (W - MARGIN*2) * i / topCount);
          }

          const ys = [];
          for (let i = 1; i < sideCount; i++) {
            ys.push(MARGIN + (H - MARGIN*2) * i / sideCount);
          }

          xs.forEach(x => { addHeart(x, MARGIN); addHeart(x, H - MARGIN); });
          ys.forEach(y => { addHeart(MARGIN, y); addHeart(W - MARGIN, y); });

          for (let i = 0; i < xs.length - 1; i++) {
            addLine(xs[i] + R,     MARGIN,     xs[i+1] - R, MARGIN);
            addLine(xs[i] + R,     H - MARGIN, xs[i+1] - R, H - MARGIN);
          }

          const allY = [MARGIN, ...ys, H - MARGIN];
          for (let i = 0; i < allY.length - 1; i++) {
            addLine(MARGIN,     allY[i] + R, MARGIN,     allY[i+1] - R);
            addLine(W - MARGIN, allY[i] + R, W - MARGIN, allY[i+1] - R);
          }
      }

      drawHearts();
      window.addEventListener('resize', drawHearts);