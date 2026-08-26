'use client'

import { useState } from 'react'
import {
  ArrowUpRight,
  BarChart3,
  Bell,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  CreditCard,
  Grid2X2,
  LayoutDashboard,
  Menu,
  MoreHorizontal,
  Plus,
  Settings,
  Sparkles,
  Users,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const bookings = [
  { time: '09:00', name: 'Sofía Ramírez', service: 'Sesión de terapia', status: 'Confirmada', color: 'sage' },
  { time: '10:30', name: 'Mateo López', service: 'Entrenamiento personal', status: 'Pendiente', color: 'lavender' },
  { time: '12:00', name: 'Valentina Cruz', service: 'Corte + barba', status: 'Confirmada', color: 'peach' },
  { time: '16:30', name: 'Diego Fernández', service: 'Consulta inicial', status: 'Confirmada', color: 'blue' },
]

const week = [
  { day: 'Lun', date: '12', values: [38, 54, 42, 68, 48, 74, 60] },
  { day: 'Mar', date: '13', values: [44, 36, 62, 48, 76, 58, 82] },
  { day: 'Mié', date: '14', values: [55, 64, 48, 74, 60, 86, 72] },
  { day: 'Jue', date: '15', values: [34, 58, 68, 52, 82, 68, 91] },
  { day: 'Vie', date: '16', values: [50, 44, 72, 64, 88, 76, 84] },
]

export default function Home() {
  const [section, setSection] = useState('Resumen')
  const [showModal, setShowModal] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [toast, setToast] = useState('')

  const notify = (message: string) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 2600)
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <aside className="sidebar fixed inset-y-0 left-0 z-20 hidden w-64 flex-col border-r border-border bg-card px-5 py-6 lg:flex">
        <div className="mb-10 flex items-center gap-3 px-2">
          <div className="brand-mark"><Sparkles size={16} strokeWidth={2.5} /></div>
          <span className="font-sans text-xl font-semibold tracking-[-0.04em]">agenda<span className="text-primary">.</span></span>
        </div>
        <p className="eyebrow px-3 pb-3">Workspace</p>
        <nav className="flex flex-col gap-1">
          {['Resumen', 'Calendario', 'Clientes', 'Servicios', 'Pagos'].map((item, index) => {
            const Icon = [LayoutDashboard, CalendarDays, Users, Grid2X2, CreditCard][index]
            return <button key={item} onClick={() => setSection(item)} className={`nav-item ${section === item ? 'active' : ''}`}><Icon size={18} /><span>{item}</span>{item === 'Pagos' && <span className="nav-badge">3</span>}</button>
          })}
        </nav>
        <div className="mt-auto flex flex-col gap-1">
          <button onClick={() => notify('Centro de ayuda próximamente')} className="nav-item"><Bell size={18} /><span>Notificaciones</span><span className="dot" /></button>
          <button onClick={() => notify('Configuración guardada')} className="nav-item"><Settings size={18} /><span>Configuración</span></button>
          <div className="mt-5 flex items-center gap-3 border-t border-border px-2 pt-5">
            <div className="avatar">MG</div><div className="min-w-0"><p className="truncate text-sm font-medium">María González</p><p className="truncate text-xs text-muted-foreground">Psicóloga</p></div><ChevronDown className="ml-auto text-muted-foreground" size={15} />
          </div>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="flex h-16 items-center justify-between border-b border-border bg-card/90 px-5 backdrop-blur-md sm:px-8">
          <div className="flex items-center gap-3"><button className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menú"><Menu size={21} /></button><div className="lg:hidden flex items-center gap-2"><div className="brand-mark size-7"><Sparkles size={13} /></div><span className="font-semibold">agenda.</span></div><span className="hidden text-sm text-muted-foreground lg:block">Mi workspace <span className="mx-2 text-border">/</span> {section}</span></div>
          <div className="flex items-center gap-3"><button className="icon-button" onClick={() => notify('No tienes nuevas notificaciones')} aria-label="Notificaciones"><Bell size={18} /><span className="notification-dot" /></button><Button onClick={() => setShowModal(true)} className="hidden gap-2 rounded-full px-4 sm:flex"><Plus size={16} /> Nueva cita</Button><button className="avatar" onClick={() => notify('Perfil de María González')}>MG</button></div>
        </header>

        {menuOpen && <div className="mobile-menu lg:hidden">{['Resumen', 'Calendario', 'Clientes', 'Servicios', 'Pagos'].map(item => <button key={item} onClick={() => { setSection(item); setMenuOpen(false) }} className={section === item ? 'selected' : ''}>{item}</button>)}</div>}

        <div className="mx-auto max-w-[1440px] px-5 py-7 sm:px-8 lg:px-10 lg:py-9">
          <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="eyebrow mb-2">Miércoles, 14 de mayo de 2025</p><h1 className="heading-xl">Buenos días, María <span className="wave">✦</span></h1><p className="mt-2 text-sm text-muted-foreground">Aquí tienes un resumen de lo que ocurre hoy.</p></div><div className="flex items-center gap-2"><Button variant="outline" onClick={() => notify('Exportando reporte...')} className="rounded-full bg-card">Exportar reporte <ArrowUpRight size={15} /></Button><Button onClick={() => setShowModal(true)} className="rounded-full sm:hidden"><Plus size={16} /></Button></div></div>

          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[['Citas este mes', '128', '+12.5%', CalendarDays, 'indigo'], ['Ingresos estimados', '$4,280', '+8.2%', CreditCard, 'mint'], ['Clientes activos', '86', '+6.4%', Users, 'orange'], ['Tasa de asistencia', '94.2%', '+2.1%', BarChart3, 'purple']].map(([label, value, trend, Icon, tone]) => <div className="stat-card" key={label as string}><div className="mb-5 flex items-start justify-between"><span className={`metric-icon ${tone}`}><Icon size={18} /></span><span className="trend"><ArrowUpRight size={13} />{trend}</span></div><p className="text-sm text-muted-foreground">{label}</p><p className="mt-1 text-2xl font-semibold tracking-[-0.04em]">{value}</p><p className="mt-2 text-xs text-muted-foreground">vs. mes anterior</p></div>)}
          </section>

          <section className="mt-7 grid gap-5 xl:grid-cols-[1.45fr_1fr]">
            <div className="panel"><div className="panel-header"><div><h2 className="panel-title">Actividad de reservas</h2><p className="panel-subtitle">Citas confirmadas durante esta semana</p></div><button className="filter-button" onClick={() => notify('Filtro: esta semana')} >Esta semana <ChevronDown size={14} /></button></div><div className="chart-wrap"><div className="chart-y"><span>100</span><span>75</span><span>50</span><span>25</span><span>0</span></div><div className="chart-area"><div className="grid-lines"><i/><i/><i/><i/><i/></div><div className="bars">{week.map((item) => <div className="bar-group" key={item.day}><div className="bar-stack">{item.values.map((height, i) => <div key={i} className={`bar ${i === 6 ? 'highlight' : ''}`} style={{ height: `${height}%` }} />)}</div><span className="text-xs text-muted-foreground">{item.day}</span><span className="date-label">{item.date}</span></div>)}</div></div></div></div>
            <div className="panel"><div className="panel-header"><div><h2 className="panel-title">Próximas citas</h2><p className="panel-subtitle">Tu agenda para hoy</p></div><button className="more-button" onClick={() => notify('Ver todas las citas')} aria-label="Más opciones"><MoreHorizontal size={19}/></button></div><div className="flex flex-col gap-1">{bookings.map((booking) => <div className="booking-row" key={booking.time}><span className="booking-time">{booking.time}</span><span className={`booking-avatar ${booking.color}`}>{booking.name.split(' ').map(n => n[0]).join('').slice(0,2)}</span><div className="min-w-0 flex-1"><p className="truncate text-sm font-medium">{booking.name}</p><p className="truncate text-xs text-muted-foreground">{booking.service}</p></div><span className={`status ${booking.status === 'Pendiente' ? 'pending' : ''}`}>{booking.status}</span></div>)}</div><button onClick={() => setSection('Calendario')} className="view-all">Ver calendario completo <ArrowUpRight size={14}/></button></div>
          </section>

          <section className="mt-5 grid gap-5 lg:grid-cols-[1fr_1.1fr]"><div className="panel"><div className="panel-header"><div><h2 className="panel-title">Tus servicios</h2><p className="panel-subtitle">Lo que tus clientes reservan</p></div><button className="more-button" onClick={() => setSection('Servicios')} aria-label="Gestionar servicios"><MoreHorizontal size={19}/></button></div><div className="service-list">{[['Terapia individual', '45 min', '$55', 'sage'], ['Consulta inicial', '60 min', '$70', 'lavender'], ['Seguimiento online', '30 min', '$35', 'peach']].map(([name, duration, price, color]) => <div className="service-row" key={name}><span className={`service-dot ${color}`} /><div className="flex-1"><p className="text-sm font-medium">{name}</p><p className="text-xs text-muted-foreground">{duration}</p></div><span className="text-sm font-semibold">{price}</span><button className="more-button" aria-label={`Editar ${name}`} onClick={() => notify(`Editando ${name}`)}><MoreHorizontal size={17}/></button></div>)}</div><Button variant="outline" onClick={() => setSection('Servicios')} className="mt-5 w-full rounded-full">Gestionar servicios</Button></div><div className="insight-card"><div className="insight-glow"/><div className="relative z-10 max-w-sm"><span className="insight-label"><Sparkles size={14}/> Insight de la semana</span><h2 className="mt-5 text-2xl font-semibold leading-tight tracking-[-0.04em]">Los miércoles son tu día más solicitado.</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">Tienes un 32% más de reservas a mitad de semana. Considera abrir un horario adicional.</p><button onClick={() => notify('Horario recomendado guardado')} className="mt-6 flex items-center gap-2 text-sm font-medium text-foreground underline decoration-border underline-offset-4">Ver recomendación <ArrowUpRight size={14}/></button></div><div className="insight-pattern"/></div></section>
        </div>
      </div>

      {toast && <div className="toast"><Check size={16}/>{toast}<button onClick={() => setToast('')} aria-label="Cerrar"><X size={14}/></button></div>}
      {showModal && <div className="modal-backdrop" onClick={() => setShowModal(false)}><div className="modal" onClick={e => e.stopPropagation()}><div className="flex items-start justify-between"><div><p className="eyebrow mb-2">Nueva reserva</p><h2 className="text-2xl font-semibold tracking-[-0.04em]">Agendar una cita</h2></div><button onClick={() => setShowModal(false)} className="more-button" aria-label="Cerrar"><X size={18}/></button></div><div className="form-fields"><label>Cliente<select><option>Selecciona un cliente</option><option>Sofía Ramírez</option><option>Mateo López</option><option>Valentina Cruz</option></select></label><label>Servicio<select><option>Selecciona un servicio</option><option>Terapia individual — $55</option><option>Consulta inicial — $70</option></select></label><div className="grid grid-cols-2 gap-3"><label>Fecha<input type="date" defaultValue="2025-05-14" /></label><label>Hora<input type="time" defaultValue="10:30" /></label></div></div><Button onClick={() => { setShowModal(false); notify('Cita creada correctamente') }} className="mt-6 w-full rounded-full">Confirmar cita</Button></div></div>}
    </main>
  )
}

// La capa de datos está desacoplada de esta vista para conectar Supabase o cualquier proveedor posteriormente.
// Las acciones actuales funcionan como una demo navegable sin credenciales ni variables de entorno.

