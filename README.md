# 🍝 syncpasta
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![AWS S3](https://img.shields.io/badge/AWS%20S3-569A31?style=for-the-badge&logo=amazons3&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-DD2C00?style=for-the-badge&logo=firebase&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)

**Веб-сервіс для синхронізації мультимедійного контенту між платформами на основі відкритого API**

## 🚀 Запуск
1. Клонуйте репозиторій: `git clone https://github.com/sayolight/syncpasta.git`
2. Скопіюйте файл `.env.example` у `.env` і заповніть його своїми даними.
3. Зробіть свій AWS S3 bucket відкритим для перегляду
4. Запуск за допомогою Docker: `docker compose up -d`

## ⚙️ Конфігурація
 - APP_HOST - доменне ім'я застосунку
 - APP_URL - доменне ім'я застосунку із протоколом https
 - POSTGRES_HOST - адреса сервера PostgreSQL
 - POSTGRES_PORT - порт PostgreSQL
 - POSTGRES_DB - назва бази даних
 - POSTGRES_USER - користувач PostgreSQL
 - POSTGRES_PASSWORD - пароль користувача
 - FIREBASE_* - дані Firebase Service Account
 - S3_ENDPOINT - ендпоїнт S3-сховища
 - S3_ACCESS_KEY_ID - ключ доступу до сховища
 - S3_SECRET_ACCESS_KEY - секретний ключ доступу до сховища
 - S3_BUCKET_NAME - назва S3 bucket для збереження мультимедійного контенту
 - CLOUDFLARED_TOKEN - API-токен Cloudflared Tunnel (при розробці)
