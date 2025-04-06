import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-amber-800 to-amber-600 text-white p-4 md:p-6">
      <div className="container mx-auto text-center">
        <p className="text-lg font-semibold">Análisis de Lisos en Santa Fe - Comparativa 2024-2025</p>
        <p className="text-amber-100 text-sm mt-2">
          Desarrollado con tecnología de visualización de datos interactiva |
          <Link
            href="https://www.lisomaps.com"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 underline hover:text-amber-200"
          >
            Visitar Lisomaps.com
          </Link>
        </p>
      </div>
    </footer>
  )
}

