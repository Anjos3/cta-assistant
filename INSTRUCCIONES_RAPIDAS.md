# Instrucciones Rápidas - CTA Assistant

## 🚀 Para Ejecutar en Local (Desarrollo)

### 1. Instalar Dependencias

Abre una terminal en la carpeta `cta-assistant` y ejecuta:

```bash
# Navegar a la carpeta client
cd client
npm install

# Volver y navegar a la carpeta server
cd ../server
npm install
```

### 2. Ejecutar el Proyecto

Necesitas **2 terminales abiertas**:

**Terminal 1 - Frontend (React):**
```bash
cd client
npm run dev
```
Se abrirá en: http://localhost:5173

**Terminal 2 - Backend (Express + OpenAI):**
```bash
cd server
npm run dev
```
Se ejecutará en: http://localhost:3000

### 3. Probar la Aplicación

1. Abre http://localhost:5173 en tu navegador
2. Verás las 3 competencias del currículo peruano
3. Click en una competencia para ver:
   - Capacidades
   - Videos educativos
   - Laboratorios virtuales
4. Click en el botón flotante 💬 para usar el chatbot IA

---

## 📦 Para Desplegar en Render (Producción)

### Opción 1: Despliegue Rápido (Sin GitHub)

1. **Comprimir el proyecto**
   - Comprime toda la carpeta `cta-assistant` en un ZIP

2. **Crear cuenta en Render**
   - Ve a https://render.com y regístrate

3. **Deploy manual** (sin Git)
   - No es la opción ideal, mejor usar GitHub

### Opción 2: Despliegue con GitHub (RECOMENDADO)

1. **Crear repositorio en GitHub**
   ```bash
   # En la carpeta cta-assistant
   git add .
   git commit -m "Initial commit"
   ```

   - Ve a https://github.com/new
   - Crea un repositorio nuevo
   - Copia el comando que GitHub te da:
   ```bash
   git remote add origin https://github.com/TU-USUARIO/cta-assistant.git
   git push -u origin main
   ```

2. **Conectar con Render**
   - En Render: New + → Web Service
   - Conecta tu GitHub
   - Selecciona el repositorio
   - Configuración:
     - **Build Command**: `npm run build`
     - **Start Command**: `npm start`
     - **Environment Variables**:
       ```
       OPENAI_API_KEY = tu-api-key-de-openai
       NODE_ENV = production
       ```

3. **Deploy**
   - Click "Create Web Service"
   - Espera 5-10 minutos
   - Render te dará una URL como: `https://cta-assistant-xxxx.onrender.com`

---

## ⚙️ Variables de Entorno Importantes

La API key de OpenAI debe estar configurada en `server/.env`:
```
OPENAI_API_KEY=tu-openai-api-key-aqui
```

**IMPORTANTE**: Esta API key es sensible. En producción (Render), configúrala como variable de entorno, NO la subas a GitHub público.

---

## 📝 Estructura de Datos

### Competencias
El archivo `client/src/data/competencies.json` contiene las 3 competencias:
1. Indaga mediante métodos científicos
2. Explica el mundo físico
3. Diseña y construye soluciones tecnológicas

### Videos
`client/src/data/videos.json` - 9 temas con links de YouTube:
- Mediciones de magnitudes físicas
- Movimiento de los cuerpos
- Leyes de Isaac Newton
- Los fluidos
- La energía
- Las ondas
- La electricidad
- El magnetismo
- Física moderna

### Laboratorios Virtuales
`client/src/data/labs.json` - Simulaciones interactivas de PhET y Educaplus

---

## 🛠️ Troubleshooting

### El frontend no conecta con el backend
- Verifica que ambos servidores estén corriendo
- El frontend en puerto 5173
- El backend en puerto 3000

### El chatbot no responde
- Verifica que la API key de OpenAI esté configurada en `server/.env`
- Revisa la consola del servidor para errores
- Comprueba tu crédito en OpenAI: https://platform.openai.com/usage

### Error al instalar dependencias
```bash
# Borrar node_modules y reinstalar
rm -rf client/node_modules server/node_modules
cd client && npm install
cd ../server && npm install
```

### El build falla en Render
- Verifica que los archivos `package.json` existan en:
  - Raíz del proyecto
  - carpeta `client`
  - carpeta `server`
- Revisa los logs de Render para el error específico

---

## 📚 Recursos Adicionales

- **README.md** - Documentación completa del proyecto
- **DEPLOY_RENDER.md** - Guía detallada de despliegue en Render
- OpenAI Platform: https://platform.openai.com
- Render Docs: https://render.com/docs

---

## 💰 Costos Estimados

- **Desarrollo Local**: GRATIS
- **Render Hosting**:
  - Free tier: $0/mes (con sleep después de inactividad)
  - Starter: $7/mes (recomendado, siempre activo)
- **OpenAI API**: ~$10-30/mes para 50-100 usuarios

---

## 🎯 Siguientes Pasos Sugeridos

1. **Prueba local completa**: Verifica todas las funciones
2. **Personalización**: Ajusta colores, textos, etc.
3. **Deploy a Render**: Sigue DEPLOY_RENDER.md
4. **Pruebas con usuarios reales**: 2-3 estudiantes de 5to
5. **Ajustes basados en feedback**: Mejora el chatbot, agrega más recursos
6. **Módulo de profesores**: Implementar en siguiente iteración

---

¿Necesitas ayuda? Revisa los archivos README.md y DEPLOY_RENDER.md para más detalles.
