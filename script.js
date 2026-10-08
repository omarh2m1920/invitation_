const audio = document.querySelector('#soundtrack');
const opening = document.querySelector('#opening');
const site = document.querySelector('#site');
const musicButton = document.querySelector('#sound-toggle');
const musicLabel = document.querySelector('#sound-label');
const timeButtons = [...document.querySelectorAll('[data-time]')];
const selection = document.querySelector('#selection');
let chosenTime = null;
let chosenSong = null;
const songs = {
  kelma: { src: 'assets/kelma.mp3', name: 'Kelma' },
  'ya-hayat-el-roh': { src: 'assets/ya-hayat-el-roh.mp3', name: 'Ya Hayat El Roh' }
};

function syncMusic() {
  const playing = !audio.paused;
  musicButton.setAttribute('aria-pressed', String(playing));
  musicButton.setAttribute('aria-label', playing ? 'Pause music' : 'Play music');
  musicLabel.textContent = chosenSong ? `${songs[chosenSong].name} · ${playing ? 'on' : 'off'}` : 'Music off';
}

async function playMusic() {
  try { await audio.play(); }
  catch { /* Browser policy or unavailable audio: the visible control remains usable. */ }
  syncMusic();
}

document.querySelectorAll('[data-song]').forEach(button => button.addEventListener('click', () => {
  chosenSong = button.dataset.song;
  audio.src = songs[chosenSong].src;
  site.removeAttribute('inert');
  opening.classList.add('opening--closed');
  opening.setAttribute('aria-hidden', 'true');
  document.querySelector('#hero-title').setAttribute('tabindex', '-1');
  document.querySelector('#hero-title').focus({ preventScroll: true });
  playMusic();
  setTimeout(() => { opening.hidden = true; }, 800);
}));

musicButton.addEventListener('click', () => {
  if (audio.paused) playMusic();
  else { audio.pause(); syncMusic(); }
});
audio.addEventListener('play', syncMusic);
audio.addEventListener('pause', syncMusic);

function confetti() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const colors = ['#d76a80', '#d3ad6f', '#f1c8c9', '#64263f'];
  for (let i = 0; i < 38; i++) {
    const bit = document.createElement('span');
    bit.setAttribute('aria-hidden', 'true');
    bit.style.cssText = `position:fixed;z-index:20;left:${Math.random()*100}vw;top:-20px;width:${5+Math.random()*7}px;height:${8+Math.random()*11}px;background:${colors[i%colors.length]};transform:rotate(${Math.random()*360}deg);pointer-events:none;`;
    document.body.append(bit);
    bit.animate([{transform:'translateY(0) rotate(0)'},{transform:`translateY(${innerHeight+50}px) rotate(${360+Math.random()*720}deg)`}], {duration:2100+Math.random()*1600,easing:'cubic-bezier(.2,.6,.5,1)'}).onfinish = () => bit.remove();
  }
}

timeButtons.forEach(button => button.addEventListener('click', () => {
  chosenTime = button.dataset.time;
  timeButtons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  document.querySelector('#selection-title').textContent = chosenTime === '10:00' ? 'Morning mission it is! ☀' : 'Leg day is safe! ♥';
  document.querySelector('#selection-copy').textContent = chosenTime === '10:00'
    ? 'Saturday, 10 October at 10:00. I can wait at the gym parking lot, and we’ll head to La Reine together. Early birds, excellent taste.'
    : 'Saturday, 10 October at 16:00. I can wait at the gym parking lot, and we’ll head to La Reine together. Squats first, perfume mission after. Deal.';
  document.querySelector('#share-feedback').textContent = '';
  selection.hidden = false;
  confetti();
  selection.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'center' });
}));

document.querySelector('#share-choice').addEventListener('click', async () => {
  if (!chosenTime) return;
  const text = `Horraaa, scent mission it is! ♥ Saturday 10 October 2026 at ${chosenTime}. I can wait for you at the gym parking lot and we can head to La Reine Parfumerie in Lac 2 together. ${chosenTime === '16:00' ? 'Leg day is officially protected hhh.' : 'Morning mission wins!'} ${location.href.split('#')[0]}`;
  const feedback = document.querySelector('#share-feedback');
  try {
    if (navigator.share) {
      await navigator.share({ title: 'Our scent mission at La Reine ♥', text });
      feedback.textContent = 'Shared!';
    } else if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      feedback.textContent = 'Your answer was copied. Send it to me ♥';
    } else {
      throw new Error('Clipboard unavailable');
    }
  } catch (error) {
    if (error.name !== 'AbortError') {
      feedback.textContent = `Your answer: ${chosenTime}. We can go to La Reine together. Tell me however you like ♥`;
    }
  }
});

document.querySelector('#calendar-button').addEventListener('click', () => {
  if (!chosenTime) return;
  // Tunis is UTC+01:00 on this day. UTC times work across calendar apps.
  const starts = chosenTime === '10:00' ? '20261010T090000Z' : '20261010T150000Z';
  const ends = chosenTime === '10:00' ? '20261010T103000Z' : '20261010T163000Z';
  const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const lines = ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//La Reine Invitation//EN','BEGIN:VEVENT',`UID:la-reine-${chosenTime.replace(':','')}@invitation.local`,`DTSTAMP:${stamp}`,`DTSTART:${starts}`,`DTEND:${ends}`,'SUMMARY:Scent mission together at La Reine ♥','LOCATION:Gym parking lot (pickup spot to confirm)','DESCRIPTION:We can meet at the gym parking lot and go together to La Reine Parfumerie at Avenue de la Feuille d’Érable\, Immeuble Regency\, next to Billionaire Café\, Lac 2\, Tunis. Confirm the pickup spot together.','END:VEVENT','END:VCALENDAR'];
  const url = URL.createObjectURL(new Blob([lines.join('\r\n')+'\r\n'], {type:'text/calendar;charset=utf-8'}));
  const link = document.createElement('a');
  link.href = url;
  link.download = `la-reine-scent-mission-${chosenTime.replace(':','')}.ics`;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 30000);
});

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
  }), { threshold: .08 });
  document.querySelectorAll('[data-reveal]').forEach(element => observer.observe(element));
} else {
  document.querySelectorAll('[data-reveal]').forEach(element => element.classList.add('is-visible'));
}
