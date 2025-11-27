# Node.js apps

## 1. Rate Limiter

Реализуй middleware для Express (на TS), который ограничивает количество запросов с одного IP:

* 100 запросов за 1 минуту на роут.
* Используй in-memory хранилище (Map).
* После превышения лимита необходимо 429 Too Many Requests с заголовком Retry-After.
* Написать тесты (jest).

## 2. Реализация JWT Refresh Token Rotation + Blacklist

Сделай систему авторизации:

* accessToken — 15 минут.
* refreshToken — 30 дней, одноразовый (при использовании сразу генерируется новый).
* при refresh старый refreshToken попадает в blacklist (Redis или in-memory с TTL).
* реализуй logout (добавление refreshToken в blacklist).
* защита от повторного использования украденного refreshToken.