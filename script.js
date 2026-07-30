/* ============================================================
   PulseCX Dashboard
   Proyecto de práctica: panel de atención al cliente con
   métricas simuladas + un asistente de respuestas basado en
   reglas (pensado para poder reemplazarse por una API de IA
   real más adelante).
   ============================================================ */

// ---------- 1. Datos simulados ----------
const tickets = [
  { cliente: "Marcos Díaz", canal: "WhatsApp", prioridad: "alta", estado: "abierto" },
  { cliente: "Lucía Fernández", canal: "Llamada", prioridad: "media", estado: "progreso" },
  { cliente: "Nahuel Ríos", canal: "Chat", prioridad: "baja", estado: "resuelto" },
  { cliente: "Camila Ortiz", canal: "Email", prioridad: "media", estado: "abierto" },
  { cliente: "Tomás Herrera", canal: "WhatsApp", prioridad: "alta", estado: "progreso" },
  { cliente: "Valentina Suárez", canal: "Llamada", prioridad: "baja", estado: "resuelto" },
];

const kpis = { calls: 328, wait: 42, csat: 91, open: 14 };

const volumeByHour = {
  labels: ["9h", "10h", "11h", "12h", "13h", "14h", "15h", "16h", "17h", "18h"],
  data: [12, 19, 24, 31, 22, 18, 27, 35, 29, 21],
};

const channelShare = {
  labels: ["WhatsApp", "Llamada", "Chat web", "Email"],
  data: [42, 28, 20, 10],
};

// ---------- 2. Render de KPIs (con animación de conteo) ----------
function animateNumber(el, target, suffix = "") {
  let current = 0;
  const step = Math.max(1, Math.round(target / 40));
  const interval = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(interval);
    }
    el.textContent = current + suffix;
  }, 25);
}

animateNumber(document.getElementById("kpiCalls"), kpis.calls);
animateNumber(document.getElementById("kpiWait"), kpis.wait, "s");
animateNumber(document.getElementById("kpiCsat"), kpis.csat, "%");
animateNumber(document.getElementById("kpiOpen"), kpis.open);

// ---------- 3. Tabla de tickets ----------
const ticketsBody = document.getElementById("ticketsBody");
tickets.forEach((t) => {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${t.cliente}</td>
    <td>${t.canal}</td>
    <td><span class="badge ${t.prioridad}">${t.prioridad}</span></td>
    <td><span class="badge ${t.estado}">${t.estado}</span></td>
  `;
  ticketsBody.appendChild(row);
});

// ---------- 4. Gráficos (Chart.js) ----------
const rootStyles = getComputedStyle(document.documentElement);

new Chart(document.getElementById("volumeChart"), {
  type: "line",
  data: {
    labels: volumeByHour.labels,
    datasets: [
      {
        label: "Interacciones",
        data: volumeByHour.data,
        borderColor: "#6c5ce7",
        backgroundColor: "rgba(108, 92, 231, 0.15)",
        tension: 0.4,
        fill: true,
        pointRadius: 3,
      },
    ],
  },
  options: {
    plugins: { legend: { display: false } },
    scales: {
      y: { beginAtZero: true, grid: { color: "rgba(120,120,150,0.1)" } },
      x: { grid: { display: false } },
    },
  },
});

new Chart(document.getElementById("channelChart"), {
  type: "doughnut",
  data: {
    labels: channelShare.labels,
    datasets: [
      {
        data: channelShare.data,
        backgroundColor: ["#6c5ce7", "#00d2b4", "#ffb020", "#ff6b6b"],
        borderWidth: 0,
      },
    ],
  },
  options: {
    plugins: { legend: { position: "bottom", labels: { boxWidth: 10, font: { size: 11 } } } },
    cutout: "65%",
  },
});

// ---------- 5. Asistente IA (simulado, basado en palabras clave) ----------
const chatWindow = document.getElementById("chatWindow");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");

const rules = [
  {
    keywords: ["pedido", "envio", "envío", "llego", "llegó", "entrega"],
    reply:
      "Entiendo la demora. Te sugiero: pedile el número de seguimiento, confirmá la dirección de entrega y ofrecele un estado actualizado o reenvío sin costo si superó el plazo comprometido.",
  },
  {
    keywords: ["factura", "cobro", "cobraron", "pago", "tarjeta"],
    reply:
      "Para reclamos de cobro: verificá el último movimiento en el sistema, explicá el concepto facturado y, si corresponde, generá la nota de crédito o reversa del cargo.",
  },
  {
    keywords: ["enojado", "molesto", "pesimo", "pésimo", "terrible", "queja"],
    reply:
      "Cliente con alta frustración: priorizá la empatía antes que la solución técnica. Reconocé el malestar, disculpate por la experiencia y ofrecé un canal directo de seguimiento.",
  },
  {
    keywords: ["gracias", "genial", "excelente", "buenísimo"],
    reply:
      "¡Buen momento para cerrar con una nota positiva! Agradecé el contacto e invitá a calificar la atención (CSAT).",
  },
];

function botReply(message) {
  const lower = message.toLowerCase();
  const match = rules.find((r) => r.keywords.some((k) => lower.includes(k)));
  if (match) return match.reply;
  return "No tengo una sugerencia puntual para ese caso todavía, pero podés escalarlo al equipo de Tech Lab para ampliar las reglas del asistente 🙂";
}

function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.className = `chat-msg ${sender}`;
  msg.textContent = text;
  chatWindow.appendChild(msg);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = chatInput.value.trim();
  if (!value) return;
  addMessage(value, "user");
  chatInput.value = "";
  setTimeout(() => addMessage(botReply(value), "bot"), 400);
});

// ---------- 6. Toggle de tema claro / oscuro ----------
const themeToggle = document.getElementById("themeToggle");
const root = document.documentElement;

function setTheme(theme) {
  if (theme === "dark") {
    root.setAttribute("data-theme", "dark");
    themeToggle.textContent = "☀️ Modo claro";
  } else {
    root.removeAttribute("data-theme");
    themeToggle.textContent = "🌙 Modo oscuro";
  }
}

themeToggle.addEventListener("click", () => {
  const isDark = root.getAttribute("data-theme") === "dark";
  setTheme(isDark ? "light" : "dark");
});
