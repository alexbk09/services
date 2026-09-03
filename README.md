# agenda. — Gestión de citas para profesionales

SaaS de reservas y gestión de agenda para profesionales independientes (psicología, barbería, fitness y bienestar). Incluye **landing de conversión** + **workspace funcional** con calendario, clientes, servicios, pagos, notificaciones y panel de administración.

Desarrollado con **Next.js 16 + React 19 + Tailwind CSS 4 + TypeScript estricto**.

> 🧑‍💻 **Desarrollado por:** [Keiber Paez](https://portafolio-new-jet.vercel.app)

## Funcionalidades

### Landing pública
- Hero con propuesta de valor y prueba social (+2,400 profesionales).
- Secciones de funciones, proceso de 3 pasos, precio (plan esencial gratuito) y formulario de contacto.
- Navegación responsive con menú móvil y doble CTA hacia el workspace.

### Workspace (demo interactiva)
- **Dashboard**: métricas de citas, ingresos, clientes y asistencia + gráfico semanal.
- **Módulos navegables**: Resumen, Calendario, Clientes, Servicios, Pagos, Notificaciones, Administración y Configuración.
- **Búsqueda y filtros** en listados dinámicos según el módulo activo.
- **Registro rápido** (modal de creación de citas/clientes/servicios) con notificaciones toast.
- **Administración**: panel de usuarios/permisos y logs de actividad del sistema.

## Arquitectura

```
app/
  layout.tsx          → Metadata, SEO y Analytics
  page.tsx            → Alterna entre landing y workspace bajo demanda
  globals.css         → Tokens de tema (oklch) + utilidades @apply reutilizables
components/
  marketing-landing.tsx → Landing y Workspace (UI por secciones tipadas)
  ui/button.tsx         → Sistema de botones (shadcn/base-ui)
lib/
  utils.ts              → Helper `cn` para combinar clases
```

## Reglas de calidad

- **Componentes autocontenidos**: cada sección recibe sus props tipadas (callbacks y datos).
- **Estados de UI claros**: formularios con confirmación visual, notificaciones toast, botones deshabilitados cuando corresponde.
- **Diseño atómico con Tailwind**: clases declarativas reutilizables vía `@apply` + design tokens en `globals.css`.
- **Accesible**: navegación con `aria-label`, foco visible personalizado y jerarquía semántica por secciones.

## Scripts

```bash
pnpm dev        # Desarrollo: http://localhost:3000
pnpm build      # Compilación de producción
pnpm start      # Servir la build de producción