# PulseCX 📊✨

Panel de atención al cliente para contact centers, con métricas en vivo y un asistente que sugiere respuestas según lo que dice el cliente. Proyecto de práctica, pensado en el mundo **CX / contact center**.

![status](https://img.shields.io/badge/status-en%20desarrollo-6c5ce7)
![html](https://img.shields.io/badge/HTML5-orange)
![css](https://img.shields.io/badge/CSS3-blue)
![js](https://img.shields.io/badge/JavaScript-yellow)

## 🖥️ ¿Qué es esto?

Un dashboard pensado para un agente o supervisor de call center, con:

- **KPIs en vivo**: llamadas atendidas, tiempo promedio de espera, CSAT y tickets abiertos.
- **Gráficos** (Chart.js): volumen de interacciones por hora y distribución por canal (WhatsApp, llamada, chat, email).
- **Cola de tickets** con prioridad y estado.
- **Asistente IA** (simulado con reglas): el agente escribe lo que dice el cliente y el asistente sugiere cómo responder. Pensado para poder conectarse a una API de IA real más adelante.
- **Modo claro / oscuro**.
- Diseño responsive.

Todos los datos son simulados — es un proyecto de portfolio, no un producto en producción.

## 🚀 Cómo verlo

No necesita instalación. Alcanza con abrir `index.html` en el navegador, o servirlo con cualquier servidor estático:

```bash
# opción simple con Python
python3 -m http.server 8000
```

Después abrir `http://localhost:8000` en el navegador.

## 🧱 Stack

- HTML5 + CSS3 (grid/flexbox, variables CSS para temas)
- JavaScript vanilla
- [Chart.js](https://www.chartjs.org/) vía CDN

Elegido a propósito: es un stack simple, sin build ni dependencias, fácil de levantar en cualquier lado.

## 🗺️ Ideas para seguir

- Conectar el asistente a una API de IA real (OpenAI, Claude, etc.)
- Traer datos reales desde un backend (Node/Python + base de datos)
- Autenticación de agentes
- Exportar reportes

## 👋 Sobre este proyecto

Lo armé como práctica personal, con la idea del día a día de un contact center. Cualquier feedback es bienvenido.
