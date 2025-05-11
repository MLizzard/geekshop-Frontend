import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/v1'; // URL вашего Spring Boot-бэкенда

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Добавьте интерсепторы для обработки ошибок/токенов
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      console.error('Ошибка 401: Не авторизован');
      // Перенаправление на страницу входа
    }
    return Promise.reject(error);
  }
);

export default api;