import rateLimit from 'express-rate-limit'

const chatLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 30, // máximo 30 peticiones por ventana de tiempo por IP
  message: {
    error: 'Demasiadas preguntas',
    message: 'Has excedido el límite de preguntas. Por favor espera un momento e intenta de nuevo.',
  },
  standardHeaders: true,
  legacyHeaders: false,
})

export default chatLimiter
