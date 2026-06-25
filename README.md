# FEFU Helper

Учебный проект — мобильное веб-приложение-помощник для студентов
Дальневосточного федерального университета (ДВФУ, кампус на острове
Русский, Владивосток).

A mobile web companion app for students of Far Eastern Federal
University (FEFU). This is an educational project: **3 features are fully
functional**, the rest are clickable prototypes with mock data.

## Стек / Stack

- **Vite + React + TypeScript**
- **Tailwind CSS** (тёмная тема через `darkMode: 'class'`)
- **React Router** для навигации
- **react-leaflet + OpenStreetMap** для карт (без ключа). Опциональная
  поддержка **Яндекс.Карт JS API v3** — см. ниже
- **lucide-react** для иконок
- Без бэкенда: данные в JSON-файлах (`src/data`) и React state

## Запуск / Getting started

```bash
npm install      # установить зависимости
npm run dev      # запустить dev-сервер (http://localhost:5173)
npm run build    # production-сборка
npm run preview  # предпросмотр сборки
```

## Рабочие функции / Working features

1. **Переводчик (Translator)** — реальный перевод через бесплатный
   [MyMemory API](https://mymemory.translated.net/) (English / Chinese /
   Russian), кнопки «копировать» и «озвучить» (Web Speech API).
2. **Карта кампуса (Map)** — интерактивная карта с маркерами и
   фильтрами категорий (Питание / Корпуса / Транспорт /
   Достопримечательности). Координаты в `src/data/campusPoints.json`.
3. **Чаты (Chats)** — список чатов, поиск, табы, создание группы,
   экран переписки с отправкой сообщений (state). Моки в
   `src/data/chats.json`.

Плюс глобально: переключение **RU / EN**, **светлая / тёмная** тема
(сохраняются в `localStorage`) и стартовая **модалка погоды** с
рекомендацией по одежде ([Open-Meteo API](https://open-meteo.com/),
без ключа).

## Карта: Яндекс.Карты или OpenStreetMap

По умолчанию используется **OpenStreetMap + Leaflet** — ключ не нужен,
всё работает «из коробки».

Чтобы переключиться на **Яндекс.Карты**:

1. Зайдите в [кабинет разработчика Яндекса](https://developer.tech.yandex.ru/)
   и получите **бесплатный** ключ для сервиса
   **«JavaScript API и HTTP Геокодер»** (*API JavaScript and Geocoder HTTP*).
2. Скопируйте `.env.example` в `.env` и вставьте ключ:
   ```env
   VITE_YANDEX_MAPS_KEY=ваш_ключ
   ```
3. В файле `src/components/MapView.tsx` поставьте константу
   `export const USE_YANDEX_MAPS = true`.
4. Перезапустите `npm run dev`.

Если ключа нет или константа `false` — автоматически работает
бесплатный вариант на OpenStreetMap.

## Прототипы / Prototype screens

Single window (Единое окно), Support (с реальным номером горячей линии
ДВФУ), Psychological help (телефон доверия), Events, Shuttles, Campus
tour booking, Find friends / Language partner, City adaptation,
Notifications, Schedule, Weather, Home. Телефоны вынесены в
`src/data/contacts.ts`.

## Структура / Project structure

```
src/
├── components/   BottomNav, TopBar, Card, ChatBubble, PhoneFrame,
│                 WeatherModal, MapView, CategoryFilter, PageHeader, Logo
├── context/      LangContext, ThemeContext, ChatsContext
├── i18n/         ru.ts, en.ts, index.ts (все строки интерфейса)
├── lib/          weather.ts, translate.ts
├── data/         schedule, chats, campusPoints, cityPoints, events,
│                 friends, notifications, shuttles (JSON) + contacts.ts
├── pages/        Home, Schedule, MapPage, Chats, ChatRoom, Profile,
│                 Translator, Weather, Support, SingleWindow, PsychHelp,
│                 Events, Shuttles, TourBooking, FindFriends,
│                 CityAdaptation, Notifications
├── App.tsx       роуты + layout
└── main.tsx      провайдеры (Theme → Lang → Chats → Router)
```
