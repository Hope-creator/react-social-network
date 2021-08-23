# Social Network React

## Live Demo
Может запускаться в течении минуты\
`https://social-network-hope-creator.herokuapp.com/`

Тестовый аккаунт: \
Login: `Test@mail.com`\
Password: `Test@123`

###### Реализованный функционал
### Frontend:
* Страница логина и регистрации, регистрация реализована через отправку ссылки на почту и без подтверждения почты пользоваться профилем невозможно (p.s. В тестовом варианте билда используется фейковый почтовый сервис, поэтому регистрационная ссылка была сделана при регистрации для удобства) ссылка генирируется автоматический с использование рандомного кода из 6 символов. Гость может посмотреть конкретный профиль без регистрации, а также посмотреть всех пользователей во вкладке Users.
* Страница восстановления пароля. Пароль хранится в базе с использованием Bcrypt. При восстановлении на почту отправляется 6 символьный случайный код, при повторных восстановлениях старый код удаляется и для восстановления всегда испозуется один код.
* Страница профиля с возможностью постов (включая постинг фото и видео), информация профиля, статус, смена фотографии профиля, галерея
* Страница диалогов, диалоги появляются в реальном времени с использованием Socket.io, сообщения также реализованы в реальном времени
* Страница новостей, новости появляются со всех профилей, которых зафолловил пользователь. Загрузка новостей происходит только при загрузке страницы в сортировке по самым свежим новостям.
* Страница друзей. Отображает всех зафоллвовленных пользователей.
* Страница пользователей. Отображает всех существующих пользователей. Реализован поиск, поикс в шапке и на странице пользователей одинаков.  
Все посты, картинки из галереи, диалоги, сообщения, друзья, пользователи используют пагинацию при загрузке.  
Все картинки могут быть открыты в full-screen моде.

### Backend:  
Реализованы REST API для всех страниц фронтенда, роуты описаны в коде в файлах папки routes.
Загрузка всех файлов использует multer и загружает все файлы на локальную машину/сервер.  
p.s. По сколько тестовый билд развернут на heroku, загруженные файлы будут существовать лишь до рестарта dyno системы heroku которая удаляет все загруженные после развертывания сервера файлы

## Stack

Backend:
* NodeJS
* Express
* Mongoose
* Multer
* Nodemailer
* Socket.io
* JWT
* Cookie-Session
* CSURF

Frontend:
* ReactJS
* Redux
* Redux Thunk
* React Router
* Axios
* Sass
* Reselect
* Immer
* React Final Form

## Установка

1. `npm install` в корневой папке проекта
2. `npm install` в папке server
4. установить и запустить MongoDB
5. создать файл `.env` и заполнить его по шаблону, указанному в `.env.example`
6. в корневой папке выполнить `npm start`
