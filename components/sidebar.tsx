"use client"

import Link from "next/link"
import {
  BarChart3,
  Map,
  TrendingUp,
  Beer,
  ArrowUpCircle,
  ArrowDownCircle,
  PlusCircle,
  CheckCircle2,
} from "lucide-react"
import Image from "next/image"

interface SidebarProps {
  setIsSidebarOpen: (open: boolean) => void
}

export default function Sidebar({ setIsSidebarOpen }: SidebarProps) {
  const handleLinkClick = () => {
    setIsSidebarOpen(false)
  }

  const menuItems = [
    { id: "estadisticas", label: "Estadísticas Generales", icon: <BarChart3 className="h-4 w-4 mr-2" /> },
    { id: "precios", label: "Comparación de Precios", icon: <BarChart3 className="h-4 w-4 mr-2" /> },
    { id: "bares", label: "Comparación de Bares", icon: <Beer className="h-4 w-4 mr-2" /> },
    { id: "analisis-geo", label: "Análisis Geográfico", icon: <Map className="h-4 w-4 mr-2" /> },
    { id: "tendencias", label: "Análisis de Tendencias", icon: <TrendingUp className="h-4 w-4 mr-2" /> },
    { id: "tipos", label: "Tipos de Liso", icon: <Beer className="h-4 w-4 mr-2" /> },
    { id: "aumentos", label: "Mayores Aumentos", icon: <ArrowUpCircle className="h-4 w-4 mr-2" /> },
    { id: "bajadas", label: "Precios a la Baja", icon: <ArrowDownCircle className="h-4 w-4 mr-2" /> },
    { id: "nuevos", label: "Nuevos Bares", icon: <PlusCircle className="h-4 w-4 mr-2" /> },
    { id: "conclusiones", label: "Conclusiones", icon: <CheckCircle2 className="h-4 w-4 mr-2" /> },
  ]

  return (
    <nav className="py-4">
      <div className="mb-6 flex justify-center">
        <Link
          href="https://www.lisomaps.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center hover:opacity-90 transition-opacity"
        >
          <Image
            src="/images/lisomaps-logo.png"
            alt="Lisomaps Logo"
            width={80}
            height={80}
            className="rounded-full mb-2"
          />
          <span className="text-amber-700 font-semibold">www.lisomaps.com</span>
        </Link>
      </div>
      <h3 className="text-lg font-bold text-amber-700 mb-4">Contenido</h3>
      <ul className="space-y-1">
        {menuItems.map((item) => (
          <li key={item.id}>
            <Link
              href={`#${item.id}`}
              className="flex items-center p-2 text-gray-700 hover:bg-amber-50 hover:text-amber-700 rounded-md transition-colors"
              onClick={handleLinkClick}
            >
              {item.icon}
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

