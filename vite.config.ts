import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'import.meta.env.VITE_BUILD_TIME': JSON.stringify(new Date().toLocaleString('es-ES', { timeZone: 'America/Bogota' }))
  },
  resolve: {
    alias: {
      'react': path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
    }
  },
  server: {
    headers: {
      // ── Anti-Clickjacking ──────────────────────────────────────────
      'X-Frame-Options': 'SAMEORIGIN',
      // ── Prevención de MIME-Sniffing ────────────────────────────────
      'X-Content-Type-Options': 'nosniff',
      // ── Protección XSS legacy ──────────────────────────────────────
      'X-XSS-Protection': '1; mode=block',
      // ── Política de referencia ─────────────────────────────────────
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      // ── Política de permisos ───────────────────────────────────────
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=(self), payment=()',
      // ── Content Security Policy (desarrollo) ───────────────────────
      // NOTA: En desarrollo, Vite HMR requiere 'unsafe-inline' y
      // 'unsafe-eval' en script-src, y WebSockets (ws:) en connect-src.
      // En producción, .htaccess / _headers / vercel.json aplican la
      // política estricta SIN unsafe-inline NI unsafe-eval.
      'Content-Security-Policy': [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "font-src 'self' https://fonts.gstatic.com",
        "img-src 'self' data: https://images.unsplash.com",
        "connect-src 'self' ws://localhost:* wss://localhost:* https://images.unsplash.com",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
        "frame-ancestors 'self'"
      ].join('; ') + ';',
    }
  }
})
