# CTA Assistant - Asistente Educativo IA

Aplicación web educativa para estudiantes de 5to de secundaria en el área de Ciencia, Tecnología y Ambiente (CTA) basada en el currículo peruano.

## Características

- **3 Competencias del Currículo Peruano**: Indagación científica, Explicación del mundo físico, y Diseño de soluciones tecnológicas
- **Videos Educativos**: Links curados de YouTube organizados por tema
- **Laboratorios Virtuales**: Simulaciones interactivas de PhET y Educaplus
- **Chatbot IA**: Asistente conversacional con OpenAI contextualizado al currículo peruano
- **Diseño Responsive**: Interfaz moderna con Tailwind CSS

## Tecnologías

### Frontend
- React 18
- Vite
- Tailwind CSS
- React Router
- Axios

### Backend
- Node.js
- Express
- OpenAI API (GPT-3.5-turbo)
- Express Rate Limit

## Instalación Local

### Requisitos Previos
- Node.js 18+ instalado
- Cuenta de OpenAI con API key

### Pasos de Instalación

1. **Clonar o descargar el proyecto**
```bash
cd cta-assistant
```

2. **Configurar variables de entorno**
```bash
# Crear archivo .env en la carpeta server/
cp .env.example server/.env
```

Editar `server/.env` y agregar tu API key de OpenAI:
```
OPENAI_API_KEY=tu-api-key-aqui
PORT=3000
NODE_ENV=development
```

3. **Instalar dependencias**
```bash
# Instalar dependencias del cliente
cd client
npm install

# Instalar dependencias del servidor
cd ../server
npm install
```

4. **Ejecutar en modo desarrollo**

Abre dos terminales:

Terminal 1 - Frontend:
```bash
cd client
npm run dev
```

Terminal 2 - Backend:
```bash
cd server
npm run dev
```

5. **Abrir en el navegador**
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## Despliegue en Render

### Configuración

1. **Crear cuenta en Render**: https://render.com

2. **Crear nuevo Web Service**:
   - Conectar repositorio de GitHub
   - Tipo: Web Service
   - Environment: Node

3. **Configurar Build & Deploy**:
   - Build Command: `npm run build`
   - Start Command: `npm start`
   - Environment: Node

4. **Variables de entorno en Render**:
   - `OPENAI_API_KEY`: tu-openai-api-key
   - `NODE_ENV`: production
   - `PORT`: 10000 (Render lo asigna automáticamente)

5. **Desplegar**

### Comandos de Build

El proyecto está configurado para construir automáticamente en Render:
```bash
npm run build  # Instala e construye cliente y servidor
npm start      # Inicia el servidor en producción
```

## Estructura del Proyecto

```
cta-assistant/
├── client/                 # Frontend React
│   ├── src/
│   │   ├── components/    # Componentes reutilizables
│   │   ├── pages/         # Páginas principales
│   │   ├── data/          # Archivos JSON de datos
│   │   ├── services/      # Servicios API
│   │   └── App.jsx
│   ├── index.html
│   └── package.json
├── server/                # Backend Express
│   ├── routes/           # Rutas de la API
│   ├── middleware/       # Middleware (rate limiting)
│   ├── utils/            # Utilidades (OpenAI config)
│   ├── data/             # Datos del currículo
│   ├── server.js
│   └── package.json
├── package.json          # Scripts raíz
└── README.md
```

## Uso de la Aplicación

### Para Estudiantes

1. **Explorar Competencias**: En la página principal, selecciona una de las 3 competencias
2. **Ver Recursos**: Cada competencia muestra:
   - Capacidades a desarrollar
   - Temas de estudio
   - Videos educativos de YouTube
   - Laboratorios virtuales interactivos
3. **Chatbot IA**: Click en el botón flotante para:
   - Hacer preguntas sobre los temas
   - Recibir explicaciones contextualizadas al currículo peruano
   - Obtener orientación pedagógica

## API Endpoints

### POST /api/chat
Envía un mensaje al chatbot IA

**Request Body:**
```json
{
  "message": "¿Qué es la velocidad?",
  "competencyId": "comp1",
  "topic": "Movimiento de los cuerpos",
  "conversationHistory": []
}
```

**Response:**
```json
{
  "message": "La velocidad es...",
  "competency": "Indaga mediante métodos científicos...",
  "topic": "Movimiento de los cuerpos"
}
```

## Límites y Restricciones

- **Rate Limiting**: 30 peticiones cada 15 minutos por IP
- **Longitud de mensaje**: Máximo 500 caracteres
- **Historial de conversación**: Últimos 10 mensajes

## Costos Estimados

- **OpenAI API**: ~$10-30/mes para 50-100 estudiantes
- **Render Hosting**:
  - Free tier disponible (con limitaciones)
  - Starter: $7/mes (recomendado para prototipo)

## Soporte

Para problemas o preguntas:
- Revisar logs en Render Dashboard
- Verificar que la API key de OpenAI esté activa
- Comprobar límites de uso de la API

## Licencia

MIT

## Créditos

- Currículo Nacional del Perú - MINEDU
- Videos educativos de YouTube (diversos creadores)
- Simulaciones de PhET Interactive Simulations (Universidad de Colorado Boulder)
- Laboratorios virtuales de Educaplus
