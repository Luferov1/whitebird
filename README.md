# White Bird Blog App

**Деплой:** [https://whitebird-iota.vercel.app/](https://whitebird-iota.vercel.app/)

---

## 📌 Описание

Блог-приложение на **Next.js 15** с клиентским рендерингом и использованием контекста для управления состоянием.

Реализовано:

- Просмотр постов и пользователей
- Детали поста + комментарии
- Лайк/дизлайк/избранное
- Создание и удаление локальных постов
- Управление приоритетом постов (админ)
- Редактирование пользователей (админ)
- Редактирование профиля текущего пользователя
- Страница избранного `/favorites`

---

## 🏗 Архитектура

- **Next.js 15** (App Router)
- **React 19** + **TypeScript 5**
- **Tailwind CSS 4** для стилей
- **Context API + useReducer** для глобального состояния
- **localStorage** для сохранения данных между сессиями

### Контекст

`AppContext` хранит:

- `currentUser` — текущий пользователь
- `users` — список всех пользователей
- `posts` — список всех постов (API + локальные)
- `comments` — комментарии по `postId`
- `likes` — объект `{ likes: Set<number>, dislikes: Set<number> }`
- `favorites` — объект `{ favorites: Set<number> }`
- `priorities` — объект `{ [postId]: number }`

Действия (`dispatch`) включают:

- `SET_USERS`, `UPDATE_USER`, `SET_CURRENT_USER`
- `SET_POSTS`, `ADD_POST`, `REMOVE_POST`
- `SET_COMMENTS`, `ADD_COMMENT`
- `TOGGLE_LIKE`, `TOGGLE_DISLIKE`, `TOGGLE_FAVORITE`
- `SET_PRIORITY`

### LocalStorage ключи

| Ключ            | Описание |
|-----------------|----------|
| `currentUser`   | Текущий пользователь |
| `users`         | Все пользователи |
| `posts`         | Все посты (API + локальные) |
| `comments`      | Комментарии по `postId` |
| `likes`         | `{ likes: number[], dislikes: number[] }` |
| `favorites`     | `{ favorites: number[] }` |
| `priorities`    | `{ [postId]: number }` |

---

## 🚀 Запуск

1. Клонировать репозиторий:

```bash
git clone <repo-url>
cd <repo-folder>
```
2. Установить зависимости:
```bash
yarn install
```

3. Запустить проект:
```bash
npm run dev
```

4. Открыть в браузере:
```bash
http://localhost:3000
```