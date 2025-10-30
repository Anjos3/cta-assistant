# Guía de Despliegue en Render

## Paso 1: Preparar el Repositorio

1. **Inicializar Git (si no existe)**
```bash
cd cta-assistant
git init
git add .
git commit -m "Initial commit - CTA Assistant"
```

2. **Crear repositorio en GitHub**
   - Ve a https://github.com/new
   - Crea un nuevo repositorio (puede ser privado o público)
   - NO inicialices con README (ya tenemos uno)

3. **Conectar y subir a GitHub**
```bash
git remote add origin https://github.com/TU-USUARIO/cta-assistant.git
git branch -M main
git push -u origin main
```

## Paso 2: Configurar Render

1. **Crear cuenta en Render**
   - Ve a https://render.com
   - Regístrate con GitHub (recomendado)

2. **Crear nuevo Web Service**
   - Click en "New +" → "Web Service"
   - Conecta tu repositorio de GitHub
   - Selecciona el repositorio `cta-assistant`
   - Click "Connect"

3. **Configurar el servicio**

**Settings:**
- **Name**: `cta-assistant` (o el nombre que prefieras)
- **Region**: Selecciona la más cercana a Perú (ej: Oregon, USA)
- **Branch**: `main`
- **Root Directory**: (dejar en blanco)
- **Runtime**: Node
- **Build Command**: `npm run build`
- **Start Command**: `npm start`
- **Instance Type**:
  - Free (para pruebas - con limitaciones)
  - Starter ($7/month - recomendado para producción)

4. **Configurar Variables de Entorno**

En la sección "Environment", agregar:

```
OPENAI_API_KEY = tu-openai-api-key-aqui

NODE_ENV = production
```

**IMPORTANTE**: Render asigna automáticamente el PORT, no es necesario especificarlo.

5. **Deploy**
   - Click en "Create Web Service"
   - Render comenzará a construir y desplegar automáticamente
   - Espera 5-10 minutos para el primer despliegue

## Paso 3: Verificar el Despliegue

1. **Monitorear Logs**
   - En el dashboard de Render, ve a la pestaña "Logs"
   - Deberías ver mensajes como:
     ```
     🚀 Servidor corriendo en puerto 10000
     📚 Modo: production
     🤖 OpenAI API: Configurada
     ```

2. **Probar la aplicación**
   - Render te dará una URL tipo: `https://cta-assistant.onrender.com`
   - Abre esa URL en tu navegador
   - Verifica que:
     - La página principal carga correctamente
     - Puedes navegar entre competencias
     - Los videos y laboratorios se muestran
     - El chatbot responde (prueba con una pregunta simple)

## Paso 4: Configurar Dominio Personalizado (Opcional)

Si tienes un dominio propio:

1. En Render, ve a "Settings" → "Custom Domain"
2. Agrega tu dominio
3. Configura los registros DNS según las instrucciones de Render

## Solución de Problemas

### Error: "Build failed"
- Verifica que todas las dependencias estén en los `package.json`
- Revisa los logs de build para identificar el error específico

### Error: "Application failed to respond"
- Verifica que la variable `OPENAI_API_KEY` esté configurada correctamente
- Comprueba que el servidor está escuchando en `process.env.PORT`

### Error de OpenAI: "insufficient_quota"
- Tu API key de OpenAI ha excedido el límite
- Ve a https://platform.openai.com/account/billing
- Agrega créditos o verifica tu plan

### El chatbot no responde
- Verifica en los logs de Render si hay errores de OpenAI
- Comprueba que la API key sea válida
- Revisa el rate limiting (máximo 30 requests por 15 min)

## Actualizaciones Futuras

Cada vez que hagas cambios:

```bash
git add .
git commit -m "Descripción de los cambios"
git push origin main
```

Render detectará automáticamente el push y reconstruirá la aplicación.

## Monitoreo y Mantenimiento

1. **Logs**: Revisa regularmente los logs en Render
2. **Métricas**: Monitorea el uso de CPU y memoria
3. **Costos OpenAI**: Revisa tu uso en https://platform.openai.com/usage
4. **Rate Limits**: Ajusta según sea necesario en `server/middleware/rateLimit.js`

## Consideraciones de Seguridad

✅ La API key está en variables de entorno (no en el código)
✅ Rate limiting implementado
✅ CORS configurado
✅ Validación de inputs
✅ Límite de tamaño de mensajes

## Contacto con MCP de Render

Para conectar Render mediante MCP (Model Context Protocol), consulta la documentación oficial de Claude Code y Render.

**Nota**: En el momento de este README, necesitarías instalar un servidor MCP que conecte con Render. Esto requiere configuración adicional fuera del alcance de este despliegue básico.

## Enlaces Útiles

- Dashboard de Render: https://dashboard.render.com
- Documentación de Render: https://render.com/docs
- OpenAI Platform: https://platform.openai.com
- Panel de uso de OpenAI: https://platform.openai.com/usage
