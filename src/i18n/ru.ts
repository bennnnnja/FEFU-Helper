import type en from './en'

const ru: typeof en = {
  // generic
  ok: 'Ок',
  cancel: 'Отмена',
  save: 'Сохранить',
  close: 'Закрыть',
  back: 'Назад',
  send: 'Отправить',
  search: 'Поиск',
  loading: 'Загрузка…',
  error: 'Что-то пошло не так',
  comingSoon: 'Скоро',
  todo: 'Это экран-прототип',

  // app / nav
  appName: 'FEFU HELPER',
  navHome: 'Главная',
  navSchedule: 'Расписание',
  navMap: 'Карта',
  navChats: 'Чаты',
  navProfile: 'Профиль',

  // language / theme
  language: 'Язык',
  theme: 'Тема',
  themeLight: 'Светлая',
  themeDark: 'Тёмная',

  // home
  greeting: 'Добрый день, Alex!',
  greetingSub: 'Вот что сегодня происходит в ДВФУ',
  quickSchedule: 'Расписание',
  quickMap: 'Карта кампуса',
  quickWeather: 'Погода',
  quickChats: 'Чаты',
  todaySchedule: 'Расписание на сегодня',
  week: 'Неделя',
  fullSchedule: 'Всё расписание',
  campusMap: 'Карта кампуса',
  openMap: 'Открыть карту',
  weatherIn: 'Погода во Владивостоке',
  notifications: 'Уведомления',
  viewAll: 'Все',
  practicalSession: 'Практическое занятие',
  lecture: 'Лекция',

  // weather
  humidity: 'Влажность',
  wind: 'Ветер',
  pressure: 'Давление',
  feelsLike: 'Ощущается как',
  weatherAdvice: 'Что надеть',
  weatherTitle: 'Погода сегодня',
  takeUmbrella: 'возьмите зонт',
  adviceCold: 'тёплая куртка, шапка, перчатки',
  adviceCool: 'куртка, шарф',
  adviceMild: 'ветровка или лёгкая куртка',
  adviceWarm: 'футболка, лёгкая одежда',
  adviceHot: 'лёгкая одежда, головной убор от солнца',

  // schedule
  scheduleTitle: 'Расписание',
  noClasses: 'Занятий нет',
  room: 'Аудитория',

  // map
  mapTitle: 'Карта кампуса',
  filterAll: 'Все',
  catFood: 'Питание',
  catBuildings: 'Корпуса',
  catTransport: 'Транспорт',
  catCity: 'Город',
  catAttractions: 'Достопримечательности',
  mapFallbackNote: 'Используется OpenStreetMap (ключ API не задан)',

  // chats
  chatsTitle: 'Чаты',
  searchChats: 'Поиск чатов…',
  allChats: 'Все чаты',
  groups: 'Группы',
  contacts: 'Контакты',
  members: 'участников',
  createGroup: 'Создать группу',
  groupName: 'Название группы',
  typeMessage: 'Сообщение…',
  create: 'Создать',
  yesterday: 'Вчера',

  // translator
  translatorTitle: 'Переводчик',
  enterText: 'Введите текст…',
  translate: 'Перевести',
  translation: 'Перевод',
  translationPlaceholder: 'Здесь появится перевод…',
  copy: 'Копировать',
  speak: 'Озвучить',
  copied: 'Скопировано!',
  langEnglish: 'Английский',
  langChinese: 'Китайский',
  langRussian: 'Русский',

  // profile
  profileTitle: 'Профиль',
  groupSearch: 'Поиск групп',
  findFriend: 'Найти друга',
  addContact: 'Добавить контакт',
  myProfile: 'Мой профиль',
  settings: 'Настройки',
  logout: 'Выйти',
  student: 'Студент',

  // support
  support: 'Поддержка',
  hotline: 'Горячая линия',
  hotlineDesc: 'Свяжитесь с нами через мессенджер',
  askForHelp: 'Задать вопрос',
  askForHelpDesc: 'Отправьте вопрос, и мы поможем вам',
  call: 'Позвонить',
  yourQuestion: 'Ваш вопрос',
  questionSent: 'Ваш вопрос отправлен!',

  // psych help
  psychTitle: 'Психологическая помощь',
  psychDesc:
    'Если вам тяжело, специалисты телефона доверия готовы выслушать и поддержать вас конфиденциально, круглосуточно.',
  trustLine: 'Телефон доверия',

  // events
  eventsTitle: 'Мероприятия',

  // shuttles
  shuttlesTitle: 'Шаттлы',
  shuttleSchedule: 'Расписание шаттлов',
  departure: 'Отправление',
  route: 'Маршрут',

  // tour booking
  tourTitle: 'Запись на экскурсию',
  tourDesc: 'Запишитесь на экскурсию по кампусу ДВФУ.',
  date: 'Дата',
  time: 'Время',
  name: 'Имя',
  book: 'Записаться',
  tourBooked: 'Вы записаны! Увидимся на экскурсии.',

  // find friends
  friendsTitle: 'Поиск друзей',
  languagePartner: 'Языковой наставник',
  nativeLang: 'Родной',
  learning: 'Изучает',
  interests: 'Интересы',
  connect: 'Связаться',
  filterByLanguage: 'Фильтр по языку',
  connected: 'Запрос отправлен!',

  // city adaptation
  cityTitle: 'Адаптация в городе',
  cityDesc: 'Полезные места Владивостока: ТЦ, магазины, больницы, аптеки.',
  catMall: 'ТЦ',
  catShop: 'Магазины',
  catHospital: 'Больницы',
  catPharmacy: 'Аптеки',
  catSight: 'Места',

  // single window
  singleWindowTitle: 'Единое окно',
  singleWindowDesc: 'Решайте вопросы учёбы и проживания в одном месте.',
  swStudy: 'Вопросы учёбы',
  swStudyDesc: 'Переводы, пересдачи, справки',
  swDorm: 'Проживание',
  swDormDesc: 'Общежитие, заселение, ремонт',
  swDocs: 'Документы',
  swDocsDesc: 'Справки и выписки',
  swFinance: 'Финансы',
  swFinanceDesc: 'Стипендия, оплаты',
  requestSent: 'Заявка отправлена!',
  describeIssue: 'Опишите ваш вопрос',

  // notifications page
  notificationsTitle: 'Уведомления',

  // misc menu
  events: 'Мероприятия',
  shuttles: 'Шаттлы',
  tourBooking: 'Запись на экскурсию',
  cityAdaptation: 'Адаптация в городе',
  translator: 'Переводчик',
  more: 'Другие сервисы',
}

export default ru
