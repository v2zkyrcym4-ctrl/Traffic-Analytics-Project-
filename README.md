# Greenwood Apartments Odessa

Сайт люксовых апартаментов Greenwood в Одессе: лендинг с онлайн-поиском дат, каталогом апартаментов, галереей и страницей бронирования, готовой к подключению [YieldPlanet](https://www.yieldplanet.com/) Booking Engine. Три языка — RU (основной), EN, UA.

Стек: Next.js (App Router) + TypeScript + Tailwind CSS 4 + next-intl.

## Запуск локально

```bash
npm install
npm run dev
```

Открыть http://localhost:3000 (редиректит на `/ru`).

Сборка для продакшена:

```bash
npm run build
npm run start
```

## Структура

- `src/app/[locale]/` — страницы (главная, `/booking`)
- `src/components/` — секции сайта (Hero, Rooms, Amenities, Gallery, Booking и т.д.)
- `messages/{ru,en,ua}.json` — весь текстовый контент сайта по языкам. Чтобы поменять любой текст, цену или описание номера — правьте эти файлы, верстка ничего не хардкодит.
- `src/lib/site.ts` — контакты, соцсети, адрес
- `src/lib/yieldplanet.ts` — конфигурация подключения YieldPlanet
- `public/images/` — фотографии (сейчас там сгенерированные заглушки)

## Фото и логотип

Сейчас вместо фотографий стоят фирменные SVG-заглушки (зелёный градиент + подпись), сгенерированные скриптом `scripts/gen-placeholders.mjs` — так сайт выглядит целостно и без «битых картинок», пока не пришлют реальные фото.

Чтобы вставить свои фотографии, положите файлы в `public/images/` и поправьте путь (`src`) в соответствующем компоненте на своё расширение (`.jpg`/`.png`/`.webp`):

| Где                          | Файл                                   |
|-------------------------------|-----------------------------------------|
| Hero (главный экран)           | `public/images/hero.svg`               |
| О нас                          | `public/images/about.svg`              |
| Апартаменты (4 шт.)             | `public/images/rooms/studio.svg`, `one-bedroom.svg`, `suite.svg`, `penthouse.svg` |
| Галерея (8 фото)                | `public/images/gallery/1.svg` … `8.svg` |

Логотип: сейчас это иконка листа (lucide) + текст "Greenwood Apartments" в `src/components/Header.tsx` и `Footer.tsx`. Пришлёте файл логотипа — заменим на `<Image src="/images/logo.svg" .../>`.

## Подключение YieldPlanet (бронирование + оплата)

Оплата и само бронирование выполняются внутри бронирующего виджета/страницы YieldPlanet — YieldPlanet сам интегрирован с платёжными шлюзами и обрабатывает платежи на своей стороне. Наша задача — корректно встроить их Booking Engine на сайт.

Шаги:

1. Заключите договор с YieldPlanet и получите доступ к их партнёрской панели (или попросите менеджера YieldPlanet выдать данные для вашего объекта).
2. В панели YieldPlanet найдите настройки Booking Engine для вашего отеля/апартаментов — там будет **Hotel ID** и **ссылка/код для встраивания** (iframe URL или JS-сниппет) для сайта.
3. Скопируйте `.env.example` в `.env.local` и заполните:

   ```bash
   NEXT_PUBLIC_YIELDPLANET_HOTEL_ID=ваш_hotel_id
   NEXT_PUBLIC_YIELDPLANET_BE_URL=ссылка_от_yieldplanet_с_токенами
   ```

   `NEXT_PUBLIC_YIELDPLANET_BE_URL` — это URL, который выдаст YieldPlanet. Если он поддерживает параметры дат/гостей в query-строке, можно вставить в шаблон токены `{hotelId}`, `{checkIn}`, `{checkOut}`, `{guests}`, `{roomId}`, `{locale}` — они на лету подставляются данными из поиска на сайте (см. `src/lib/yieldplanet.ts`).

4. Перезапустите сайт (`npm run build && npm run start`, либо передеплойте на хостинге с этими переменными окружения). На странице `/booking` вместо формы заявки автоматически появится живой виджет YieldPlanet.

Пока переменные не заполнены, страница `/booking` показывает форму «оставить заявку», которая отправляется на `/api/booking-request` (`src/app/api/booking-request/route.ts`). Сейчас заявка просто логируется на сервере — перед запуском в продакшен нужно подключить туда реальное уведомление (email через Resend/SMTP, Telegram-бот, вебхук в вашу CRM и т.д.).

## Деплой

Проще всего — [Vercel](https://vercel.com) (создатели Next.js): подключить репозиторий, указать переменные окружения из `.env.example` в настройках проекта, задеплоить. Подойдёт и любой другой хостинг с поддержкой Node.js (Netlify, свой сервер и т.д.).

## Языки

Переключатель RU/EN/UA — в шапке сайта. Маршруты вида `/ru`, `/en`, `/ua`. Добавить язык: создать `messages/xx.json` и добавить код в `src/i18n/routing.ts`.
