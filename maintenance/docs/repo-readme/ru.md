*русский*:

# Webpack template

[![DeepScan grade](https://deepscan.io/api/teams/5038/projects/6835/branches/59639/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=5038&pid=6835&bid=59639)

## Обзор

Это js темплейт под вебпак:
- Дебажный сервер
- Настроенный бабел
- async/await. Добавляет лишние 900kB, можно отключить удалением `require("babel-polyfill")` в index.js
- замено логгеру (cgn.logger.log)
- eslinter. Поддержка [jsdoc plugin](https://github.com/gajus/eslint-plugin-jsdoc) для него
- настроенный конфиг под tsserver
- тесты, статистика покрытия
