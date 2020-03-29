# Тестовое задание:

Этот код использует среду моего [webpack-template](https://github.com/tynrare/webpack-template)

Для сборки проекта необходимо сначала запустить `npm install`, затем `npm run manual-test-watch` для отладки или `npm run manual-test-build` для сборки.

При запуске будет доступно две ссылки:

- Canvas task с демонстрацией канваса
- SPA task с демонстрацией spa

# Пояснения

- cgn (core game namespace) - стандартный shared класс приложения, содержит основные методы вроде assert или events
- entry point для тестов - /src/test/manual.js
- пакеты backbone, backbone-localstorage, jquery идут вдовесок к самому backbone 

# Комментарии

- Я считаю зависимость jquery неуместной в этом проекте, но backbonejs без этого не работает
