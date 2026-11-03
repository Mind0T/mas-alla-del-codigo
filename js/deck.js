/* ==========================================================================
   Motor de la presentación
   - Escala el lienzo 1600×900 a cualquier pantalla
   - Navegación: teclado, clicker, botones, clic en mitades, swipe
   - Notas del orador con el guion + cronómetro por bloque
   - URL con #s<n> para abrir directo en una diapositiva
   ========================================================================== */
(function () {
  "use strict";

  const BASE_W = 1600;
  const BASE_H = 900;

  // Minuto en que termina cada bloque (según el guion de 30 min)
  const BLOCKS = {
    0: { name: "Portada", end: 0 },
    1: { name: "01 · Nos han hecho creer", start: 0, end: 5 },
    2: { name: "Bloque 2 · El choque de mundos", start: 5, end: 13 },
    3: { name: "03 · Tú eres el protagonista de tu propio desarrollo", start: 13, end: 22 },
    4: { name: "04 · Equilibrio vida-trabajo", start: 22, end: 27 },
    5: { name: "05 · Hoy es el día perfecto para iniciar", start: 27, end: 30 },
  };

  const stage = document.getElementById("stage");
  const slides = Array.from(stage.querySelectorAll(".slide"));
  const countEl = document.getElementById("count");
  const progressEl = document.getElementById("progress");
  const notesPanel = document.getElementById("notesPanel");
  const notesBody = document.getElementById("notesBody");
  const notesBlock = document.getElementById("notesBlock");
  const notesNext = document.getElementById("notesNext");
  const timerEl = document.getElementById("timer");
  const help = document.getElementById("help");
  const btnNotes = document.getElementById("btnNotes");

  let current = 0;
  let timerStart = null; // empieza al avanzar de la portada
  const pad = (n) => String(n).padStart(2, "0");

  /* ---------- Escalado ---------- */
  function fit() {
    const vp = stage.parentElement.getBoundingClientRect();
    const scale = Math.min(vp.width / BASE_W, vp.height / BASE_H);
    stage.style.setProperty("--scale", scale.toFixed(4));
  }

  /* ---------- Navegación ---------- */
  function go(index, fromHash) {
    index = Math.max(0, Math.min(slides.length - 1, index));
    slides[current].classList.remove("is-active");
    current = index;
    slides[current].classList.add("is-active");

    countEl.textContent = pad(current + 1) + " / " + pad(slides.length);
    progressEl.style.setProperty("--progress", slides.length > 1 ? current / (slides.length - 1) : 1);

    if (current > 0 && timerStart === null) timerStart = Date.now();

    if (!fromHash) {
      const hash = "#s" + (current + 1);
      if (location.hash !== hash) history.replaceState(null, "", hash);
    }
    renderNotes();
  }
  const next = () => go(current + 1);
  const prev = () => go(current - 1);

  function fromHash() {
    const m = /^#s(\d+)$/.exec(location.hash);
    return m ? parseInt(m[1], 10) - 1 : 0;
  }

  /* ---------- Notas ---------- */
  function renderNotes() {
    const slide = slides[current];
    const notes = slide.querySelector(".notes");
    notesBody.innerHTML = notes ? notes.innerHTML : "<p class='cue'>(Sin notas)</p>";

    const block = BLOCKS[slide.dataset.block] || BLOCKS[0];
    const label = slide.dataset.label || "";
    const range = block.start !== undefined ? " · min " + pad(block.start) + "–" + pad(block.end) : "";
    notesBlock.textContent = block.name + range + " · " + label;

    const nxt = slides[current + 1];
    notesNext.textContent = nxt ? "Siguiente → " + (nxt.dataset.label || "") : "Última diapositiva";
    tick();
  }

  function tick() {
    if (timerStart === null) {
      timerEl.textContent = "00:00 / 30:00";
      timerEl.classList.remove("is-late");
      return;
    }
    const secs = Math.floor((Date.now() - timerStart) / 1000);
    timerEl.textContent = pad(Math.floor(secs / 60)) + ":" + pad(secs % 60) + " / 30:00";
    const block = BLOCKS[slides[current].dataset.block];
    timerEl.classList.toggle("is-late", !!block && block.end > 0 && secs > block.end * 60);
  }
  setInterval(tick, 1000);

  function toggleNotes(force) {
    const show = typeof force === "boolean" ? force : notesPanel.hidden;
    notesPanel.hidden = !show;
    btnNotes.setAttribute("aria-pressed", String(show));
  }

  function resetTimer() {
    timerStart = Date.now();
    tick();
  }

  function toggleFullscreen() {
    try {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(function () {});
      } else if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(function () {});
      }
    } catch (e) { /* algunos navegadores no lo permiten */ }
  }

  /* ---------- Teclado ---------- */
  document.addEventListener("keydown", function (e) {
    if (e.target.closest && e.target.closest("button") && (e.key === " " || e.key === "Enter")) return;
    switch (e.key) {
      case "ArrowRight": case "ArrowDown": case "PageDown": case " ": case "Enter":
        e.preventDefault(); next(); break;
      case "ArrowLeft": case "ArrowUp": case "PageUp": case "Backspace":
        e.preventDefault(); prev(); break;
      case "Home": go(0); break;
      case "End": go(slides.length - 1); break;
      case "n": case "N": toggleNotes(); break;
      case "t": case "T": resetTimer(); break;
      case "f": case "F": toggleFullscreen(); break;
      case "?": help.hidden = !help.hidden; break;
      case "Escape": help.hidden = true; toggleNotes(false); break;
    }
  });

  /* ---------- Botones ---------- */
  document.getElementById("btnPrev").addEventListener("click", prev);
  document.getElementById("btnNext").addEventListener("click", next);
  btnNotes.addEventListener("click", function () { toggleNotes(); });
  document.getElementById("btnTimer").addEventListener("click", resetTimer);
  document.getElementById("btnFull").addEventListener("click", toggleFullscreen);
  document.getElementById("btnHelp").addEventListener("click", function () { help.hidden = !help.hidden; });
  help.addEventListener("click", function () { help.hidden = true; });

  /* ---------- Clic en mitades del lienzo ---------- */
  stage.addEventListener("click", function (e) {
    const r = stage.getBoundingClientRect();
    (e.clientX - r.left) > r.width / 2 ? next() : prev();
  });

  /* ---------- Swipe ---------- */
  let touchX = null;
  stage.addEventListener("touchstart", function (e) { touchX = e.touches[0].clientX; }, { passive: true });
  stage.addEventListener("touchend", function (e) {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
    touchX = null;
  });

  /* ---------- Mostrar controles al mover el mouse ---------- */
  let idle;
  function wake() {
    document.body.classList.add("show-ui");
    clearTimeout(idle);
    idle = setTimeout(function () { document.body.classList.remove("show-ui"); }, 2200);
  }
  document.addEventListener("mousemove", wake);
  document.addEventListener("touchstart", wake, { passive: true });

  /* ---------- Inicio ---------- */
  window.addEventListener("resize", fit);
  window.addEventListener("hashchange", function () { go(fromHash(), true); });
  fit();
  slides.forEach(function (s) { s.classList.remove("is-active"); });
  current = 0;
  go(fromHash(), true);
})();
