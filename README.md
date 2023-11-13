# ㊙️ Социальная сеть "Sakura"

_Backend часть Open Source проекта "Sakura"_

---

[![preview](https://i.ibb.co/kqHHD2R/image.png)]()

---

**Sakura** - это социальная сеть для самураев, с помощью которой можно переписываться с другими самураями, отслеживать их деятельность и искать себе подобных.

Авторизованному пользователю доступны страницы: моя страница, новости, мессенджер, друзья, фотографии.

Также пользователь может менять **тему приложения** на _светлую_ или _темную_.   

---

Авторизация написана посредством JWT + Refresh token. Это предоставляет возможность пользователям единожды авторизоваться с помощью логин + пароль, а дальше система сама будет авторизовывать пользователя через access и refresh токены.

При регистрации, данные пользователя (имя, фамилия, эл. почта, пароль) валидируются и заносятся в основную базу данных (PostgreSQL). Также происходит проверка на уникальность электронной почты и хэширование пароля для дополнительной защиты данных пользователя.

При авторизации, refresh токен храниться в Redis в связке с id пользователя. Access токен обновляется посредством дополнительного эндпоинта для перевыпуска токенов, где также происходит их верификация.

REST API - регистрация, авторизация, взаимодействие с друзьями, получение информации о пользователе и т.д.
Socket.io - функционал получения всех типов уведомлений, чаты с другими пользователями.

---

🔨 Используемые технологии:

-    TypeScript
-    Express
-    JWT, bcrypt, zod
-    Socket.io
-    PostgreSQL (ORM: Prisma)
-    Redis
-    Docker
-    Pino, Prettier, husky
-    Swagger UI

