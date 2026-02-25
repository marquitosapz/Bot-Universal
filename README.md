# 🤖 Bot Marquitos APZ

Bot de Discord desarrollado en Node.js con múltiples comandos de moderación y utilidades para servidores.

---

## 📦 Características

- 🔨 Comandos de moderación:
  - `ban`
  - `kick`
  - `clear`
- 📢 Comandos de utilidad:
  - `say`
- 🎫 Sistema de tickets:
  - `panelticket`
- ✅ Sistema de verificación:
  - `panelverificacion`
- ⚙️ Configuración mediante archivo JSON

---

## 🗂️ Estructura del proyecto

```
📁 botmarquitosapz
├── 📄 index.js
├── 📄 package.json
├── 📄 config.json
└── 📁 comandos
    ├── ban.js
    ├── clear.js
    ├── kick.js
    ├── panelticket.js
    ├── panelverificacion.js
    └── say.js
```

---

## 🚀 Instalación

1. Clona el repositorio o descarga los archivos

```bash
git clone <tu-repositorio>
cd botmarquitosapz
```

2. Instala las dependencias

```bash
npm install
```

3. Configura el archivo `config.json`

Ejemplo:

```json
{
  "token": "TU_TOKEN_DEL_BOT",
  "prefix": "!"
}
```

---

## ▶️ Uso

Inicia el bot con:

```bash
node index.js
```

---

## 💬 Comandos disponibles

| Comando | Descripción |
|--------|------------|
| `!ban` | Banea a un usuario |
| `!kick` | Expulsa a un usuario |
| `!clear` | Borra mensajes |
| `!say` | Hace que el bot envíe un mensaje |
| `!panelticket` | Crea un sistema de tickets |
| `!panelverificacion` | Crea sistema de verificación |

---

## ⚙️ Requisitos

- Node.js (v16 o superior recomendado)
- npm

---

## 🔒 Permisos necesarios

El bot necesita permisos como:

- Administrador (recomendado)
- Gestionar mensajes
- Expulsar miembros
- Banear miembros

---

## 🛠️ Tecnologías usadas

- Node.js
- Discord.js

---

## 📄 Licencia

Este proyecto es de uso libre. Puedes modificarlo y adaptarlo a tus necesidades.
