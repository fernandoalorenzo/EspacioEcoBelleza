# 🌿 Espacio Ecobelleza - Fullstack E-commerce

Tienda online completa para productos NATURA con backend Node.js + Express y frontend React + Vite + Bootstrap.

## 🚀 Estructura del Proyecto

```
proyecto/
├── backend/                 # API Node.js + Express
│   ├── data/               # Datos de productos
│   ├── models/             # Modelos de datos
│   ├── routes/             # Rutas de la API
│   ├── middleware/         # Middlewares (CORS, etc.)
│   └── server.js           # Servidor principal
├── src/                    # Frontend React + Vite
│   ├── components/         # Componentes React
│   ├── hooks/             # Custom hooks para API
│   ├── context/           # Context para carrito
│   └── pages/             # Páginas de la aplicación
└── README.md              # Este archivo
```

## ⚡ Inicio Rápido

### Backend (Terminal 1)
```bash
cd backend
npm install
npm run dev
# Servidor en http://localhost:3001
```

### Frontend (Terminal 2)
```bash
npm install
npm run dev
# Aplicación en http://localhost:5173
```

## 🛠️ Tecnologías

**Backend:**
- Node.js + Express
- CORS, Helmet, Morgan
- API REST completa
- Generación automática de WhatsApp

**Frontend:**
- React 18 + TypeScript
- Vite para desarrollo rápido
- Bootstrap 5 + React Bootstrap
- Axios para llamadas API
- React Hot Toast

## 📱 Funcionalidades

✅ Catálogo de productos NATURA
✅ Carrito de compras completo
✅ Envío automático por WhatsApp
✅ API REST documentada
✅ Diseño responsivo con Bootstrap
✅ Manejo de errores y fallbacks
✅ Estados de carga

## 🌐 API Endpoints

- `GET /api/products` - Todos los productos
- `GET /api/products/:id` - Producto específico
- `POST /api/orders` - Crear pedido
- `GET /api/health` - Estado del servidor

## 📞 Contacto

WhatsApp: +54 9 341 519-1714

¡Listo para vender productos NATURA! 🛒✨