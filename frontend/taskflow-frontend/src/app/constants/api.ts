export const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:5000/api'
  : 'https://taskflow-ai-backend.onrender.com/api'; // Replace with your actual Render URL after deploying the backend