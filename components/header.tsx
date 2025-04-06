import Image from "next/image"
import Link from "next/link"

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-amber-700 to-amber-500 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <Link
          href="https://www.lisomaps.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 hover:opacity-90 transition-opacity"
        >
          <Image src="/images/lisomaps-logo.png" alt="Lisomaps Logo" width={60} height={60} className="rounded-full" />
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">Lisomaps</h1>
            <p className="text-amber-100 text-sm md:text-base">Análisis de Lisos en Santa Fe (2024-2025)</p>
          </div>
        </Link>
      </div>
    </header>
  )
}

