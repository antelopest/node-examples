# Node.js apps

## 1. Rate Limiter

Реализуй middleware для Express (на TS), который ограничивает количество запросов с одного IP:

* 100 запросов за 1 минуту на роут.
* Используй in-memory хранилище (Map).
* После превышения лимита необходимо 429 Too Many Requests с заголовком Retry-After.
* Написать тесты (jest).

[Rate Limiter](./apps/001-rate-limiter-app/README.md)

## 2. Реализация JWT Refresh Token Rotation + Blacklist

Сделай систему авторизации:

* accessToken — 15 минут.
* refreshToken — 30 дней, одноразовый (при использовании сразу генерируется новый).
* при refresh старый refreshToken попадает в blacklist (Redis или in-memory с TTL).
* реализуй logout (добавление refreshToken в blacklist).
* защита от повторного использования украденного refreshToken.

## 3. Event Emitter с поддержкой async/await и once()

Напиши свой EventEmitter на TypeScript (аналог Node.js EventEmitter), но с поддержкой:
* обработка ошибок в обработчика

```ts
emitter.on('event', async (data) => { ... })
await emitter.emitAsync('event', data) // должен дождаться всех обработчиков
emitter.once('event', handler)
```

## 4. Реализация Streaming CSV Parser + Transformer

Дан большой CSV-файл (>1 ГБ). Нужно:

* стримить его с диска;
* парсить (можно использовать csv-parser или написать свой простой)
* трансформировать строки (например, нормализовать телефоны, привести даты);
* записывать результат в новый файл или отдавать по HTTP chunked response;
* обработка ошибок без падения всего стрима.

## 5. WebSocket Rate-Limited Chat с комнатами

Реализуй WebSocket-сервер (ws или Socket.IO) с:

* комнаты (join/leave);
* лимит 5 сообщений в секунду на пользователя;
* broadcast только в комнату;
* если пользователь отключился — автоматически выйти из всех комнат;
* graceful shutdown (закрыть все соединения);

## 6. Пагинация с Keyset (Cursor-based) вместо OFFSET

Реализуй универсальный middleware/service для keyset-пагинации:

* работает с любой таблицей (PostgreSQL);
* принимает cursor (закодированный в base64 объект { id: 123, createdAt: '2025-...' });
* поддерживает сортировку по нескольким полям;
* возвращает hasNextPage, hasPrevPage, nextCursor, prevCursor;

## 7. Circuit Breaker Pattern

Реализуй Circuit Breaker для внешних HTTP-запросов (axios/fetch):

* состояния: CLOSED → OPEN → HALF_OPEN;
* порог ошибок (например, 5 ошибок → открывается на 30 сек);
* в состоянии OPEN — сразу бросать ошибку или возвращать fallback;
* напиши декоратор @CircuitBreaker().

## 8. Реализация Distributed Lock через Redis

Напиши сервис распределённых блокировок с автоматическим продлением:

* lock(key, ttl);
* unlock(key, token);
* продление блокировки каждые ttl/2 (watchdog);
* защита от дедлоков;
* используй RedLock алгоритм (минимум на одном инстансе, но с возможностью расширения).

## 9. Реализация Background Jobs с Retry + Dead Letter Queue

Сделай простую очередь задач (аналог BullMQ, но свою):

* добавление задачи с delay, attempts, backoff (exponential);
* worker, который выполняет задачи;
* если attempts исчерпаны → в DLQ;
* возможность перезапустить задачи из DLQ;
* хранение в Redis;

## 10. HTTP Cache Invalidation Service (самая сложная)

Есть API с кэшированием на уровне CDN (например, Cloudflare).
Нужно реализовать сервис инвалидации кэша при изменении данных:

* при PUT/POST/DELETE определённых сущностей (User, Product, Order) - автоматически слать PURGE-запросы
* зависимости: Product → Category → Brand (изменение продукта инвалидирует категорию и бренд)
* батчинг запросов (не более 30 зон/запрос для Cloudflare)
* идемпотентность и retry с backoff
* хранение графа зависимостей (можно в коде или в БД)
