import { Card, CardContent } from "@/components/ui/card"

export default function StatsSection() {
  return (
    <section id="estadisticas" className="scroll-mt-16">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Estadísticas Generales</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard
          title="Precio Promedio Actual"
          value="$1,148"
          description="↗︎ 16.49% desde el mapa anterior"
          isPositive={true}
        />
        <StatCard
          title="Precio Promedio Anterior"
          value="$985"
          description="Línea base de comparación"
          isNeutral={true}
        />
        <StatCard title="Total de Bares Actuales" value="87" description="↗︎ 43 nuevos bares (97%)" isPositive={true} />
        <StatCard
          title="Aumento Promedio"
          value="$162"
          description="En bares comparables: $64 (8.10%)"
          isPositive={true}
        />
      </div>
    </section>
  )
}

interface StatCardProps {
  title: string
  value: string
  description: string
  isPositive?: boolean
  isNegative?: boolean
  isNeutral?: boolean
}

function StatCard({ title, value, description, isPositive, isNegative, isNeutral }: StatCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardContent className="p-6">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <p className="text-3xl font-bold mt-2 bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">
          {value}
        </p>
        <p className={`text-sm mt-2 ${isPositive ? "text-green-600" : isNegative ? "text-red-600" : "text-gray-500"}`}>
          {description}
        </p>
      </CardContent>
    </Card>
  )
}

