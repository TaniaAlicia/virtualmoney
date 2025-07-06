'use client'

import { useRouter } from 'next/navigation'

export default function SidebarDashboard() {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('token')
    router.push('/')
  }

  const linkClasses = 'block py-2 font-semibold text-sm hover:underline'

  return (
    <aside className="w-[200px] bg-green text-black min-h-screen p-4">
      <nav className="flex flex-col gap-2">
        <span className="font-bold">Inicio</span>
        <span className={linkClasses}>Actividad</span>
        <span className={linkClasses}>Tu perfil</span>
        <span className={linkClasses}>Cargar dinero</span>
        <span className={linkClasses}>Pagar servicios</span>
        <span className={linkClasses}>Tarjetas</span>
        <button
          onClick={handleLogout}
          className="mt-2 text-left text-sm text-dark/50 hover:text-dark font-semibold"
        >
          Cerrar sesión
        </button>
      </nav>
    </aside>
  )
}
