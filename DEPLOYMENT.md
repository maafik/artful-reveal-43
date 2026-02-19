# Развертывание сайта на GitHub Pages

## Автоматическое развертывание

Сайт автоматически развертывается на GitHub Pages при каждом пуше в ветку `main`.

## URL сайта
- **Основной домен**: https://[username].github.io/artful-reveal-43/
- **Пользовательский домен**: https://sketch-master.online (настроен отдельно)

## Настройка пользовательского домена

1. Перейдите в настройки репозитория → Settings → Pages
2. В разделе "Custom domain" введите: `sketch-master.online`
3. Настройте DNS записи у вашего доменного регистратора:
   ```
   CNAME -> [username].github.io
   ```
4. Включите "Enforce HTTPS"

## Структура проекта

- `src/` - исходный код
- `dist/` - собранный проект (автоматически)
- `.github/workflows/deploy.yml` - CI/CD для развертывания

## Локальная разработка

```bash
# Установка зависимостей
npm install
# или pnpm install

# Запуск dev сервера
npm run dev
# или pnpm run dev

# Сборка для продакшена
npm run build
# или pnpm run build
```

## GitHub Actions

Процесс развертывания:
1. Пуш в `main` → триггер GitHub Actions
2. Сборка проекта → создание `dist/`
3. Развертывание на GitHub Pages
4. Сайт доступен по адресу через несколько минут
