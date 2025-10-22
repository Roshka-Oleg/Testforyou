# 📦 Инструкция по публикации проекта на GitHub

## Шаг 1: Создание репозитория на GitHub

1. Перейдите на https://github.com и войдите в свой аккаунт
2. Нажмите кнопку "New" (создать новый репозиторий)
3. Заполните форму:
   - **Repository name:** `loan-application`
   - **Description:** "Тестовое задание: приложение для подачи заявки на займ с React, TypeScript и React Router"
   - **Visibility:** Public или Private (на ваш выбор)
   - **НЕ** инициализируйте репозиторий с README, .gitignore или лицензией (они уже есть локально)
4. Нажмите "Create repository"

## Шаг 2: Подключение локального репозитория к GitHub

После создания репозитория на GitHub выполните следующие команды:

```bash
cd /Users/olegroshka/loan-application

# Добавьте удаленный репозиторий (замените YOUR_USERNAME на ваше имя пользователя)
git remote add origin https://github.com/YOUR_USERNAME/loan-application.git

# Или используйте SSH (если настроен)
# git remote add origin git@github.com:YOUR_USERNAME/loan-application.git

# Отправьте код на GitHub
git push -u origin main
```

## Шаг 3: Проверка публикации

1. Обновите страницу вашего репозитория на GitHub
2. Убедитесь, что все файлы загружены
3. README.md должен отображаться на главной странице репозитория

## Альтернативный способ: GitHub CLI

Если у вас установлен GitHub CLI (gh):

```bash
cd /Users/olegroshka/loan-application

# Авторизуйтесь (если еще не авторизованы)
gh auth login

# Создайте репозиторий и отправьте код
gh repo create loan-application --public --source=. --push
```

## Дополнительно: GitHub Pages (опционально)

Чтобы развернуть приложение на GitHub Pages:

### 1. Обновите vite.config.ts

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/loan-application/', // Название вашего репозитория
})
```

### 2. Добавьте скрипт deploy в package.json

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

### 3. Установите gh-pages

```bash
npm install --save-dev gh-pages
```

### 4. Деплой

```bash
npm run deploy
```

### 5. Настройте GitHub Pages

1. Перейдите в Settings → Pages вашего репозитория
2. В разделе "Source" выберите ветку `gh-pages`
3. Нажмите "Save"

Приложение будет доступно по адресу: `https://YOUR_USERNAME.github.io/loan-application/`

## Структура опубликованного репозитория

```
loan-application/
├── .gitignore              # Игнорируемые файлы
├── README.md               # Полная документация
├── QUICKSTART.md           # Быстрый старт
├── CHECKLIST.md            # Чек-лист выполнения ТЗ
├── DEPLOY.md               # Эта инструкция
├── package.json            # Зависимости проекта
├── index.html              # HTML точка входа
├── vite.config.ts          # Конфигурация Vite
├── tsconfig.json           # Конфигурация TypeScript
├── tsconfig.node.json      # Конфигурация TypeScript для Node
└── src/                    # Исходный код
    ├── App.tsx             # Главный компонент
    ├── main.tsx            # Точка входа React
    ├── components/         # React компоненты
    ├── hooks/              # Кастомные хуки
    ├── types/              # TypeScript типы
    └── utils/              # Утилиты
```

## Что включено в репозиторий

✅ Весь исходный код приложения  
✅ Конфигурационные файлы  
✅ Документация (README, QUICKSTART, CHECKLIST)  
✅ .gitignore для исключения node_modules и build файлов  
✅ package.json с полным списком зависимостей  

## Что НЕ включено (как и должно быть)

❌ node_modules/ (зависимости)  
❌ dist/ (собранные файлы)  
❌ .env файлы с секретами  
❌ IDE конфигурации (.vscode, .idea)  

## После публикации

Убедитесь, что в описании репозитория на GitHub указано:

- **Description:** "Тестовое задание: приложение для подачи заявки на займ с React, TypeScript и React Router"
- **Topics (теги):** `react`, `typescript`, `react-router`, `bootstrap`, `vite`, `form-validation`

---

**Проект готов к публикации и проверке! 🚀**

