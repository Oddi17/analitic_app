<h3 align="center">Привет, Я <a href="https://vladporsh17@gmail.com/" target="_blank">Vladislav Pershin</a>
<img src="https://github.com/blackcater/blackcater/raw/main/images/Hi.gif" height="32"/></h3>

**Описание проекта:**
Данный проект представляет собой аналитическое приложение для работы с данными с объектов компании. Backend реализован с использованием [FastAPI](https://fastapi.tiangolo.com/), обеспечивая высокую производительность и простоту разработки RESTful-сервисов. Для работы с базой данных PostgreSQL используется [SQLAlchemy](https://www.sqlalchemy.org/), а управление миграциями осуществляется посредством [Alembic](https://alembic.sqlalchemy.org/). Модели [Pydantic](https://pydantic-docs.helpmanual.io/) гарантируют корректную валидацию данных на уровне API.

Приложение реализует надежную авторизацию пользователей с использованием JWT-токенов, что позволяет четко разграничить роли и обеспечить безопасность системы. Backend предоставляет множество эндпоинтов для эффективной выборки и обработки данных. UPD: Добавлена страница для администрирования пользователей (добавление пользователя, удаление пользователя, установка новых паролей для пользователей, изменение ролей пользователей)

Фронтенд разработан на [React](https://reactjs.org/) с использованием библиотеки компонентов [Ant Design](https://ant.design/). Интерфейс приложения демонстрирует элегантный и удобный дизайн, с формами для авторизации и валидации данных и различными таблицами для отображения данных, что существенно улучшает пользовательский опыт.

Для развертывания приложения используется связка [Nginx](https://www.nginx.com/) и [Gunicorn](https://gunicorn.org/), обеспечивающая стабильную работу и надежность, благодаря проксированию.


**Скриншоты:**

*(В этом разделе будут размещены изображения приложения, демонстрирующие его интерфейс и основные функции.)*
<p align="center">                                 
<img src="https://github.com/Oddi17/analitic_app/blob/master/media/app.gif" width="600" >
<img src="https://github.com/Oddi17/analitic_app/blob/master/media/1.png" width="600" >
<img src="https://github.com/Oddi17/analitic_app/blob/master/media/2.png" width="600" >
<img src="https://github.com/Oddi17/analitic_app/blob/master/media/3.png" width="600" >
<img src="https://github.com/Oddi17/analitic_app/blob/master/media/4.png" width="600" >
<img src="https://github.com/Oddi17/analitic_app/blob/master/media/5.png" width="600" >
</p> 


