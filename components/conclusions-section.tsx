import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

export default function ConclusionsSection() {
  const conclusions = [
    {
      title: "Aumento General de Precios",
      content: "Se evidencia un aumento general del 16.49% en el precio promedio de los lisos.",
    },
    {
      title: "Mayor Oferta",
      content:
        "El número de lugares donde se puede consumir liso ha aumentado significativamente (+54 nuevos locales), lo que indica un crecimiento sustancial del mercado.",
    },
    {
      title: "Variabilidad en Aumentos",
      content:
        "Mientras algunos locales han aumentado considerablemente sus precios (hasta un 66.67%), otros han mantenido sus precios o incluso los han reducido, revelando diferentes estrategias de negocio.",
    },
    {
      title: "Consolidación del Mercado",
      content:
        "El aumento de locales y la estandarización de precios sugiere que el mercado de lisos en Santa Fe está madurando y consolidándose.",
    },
  ]

  return (
    <section id="conclusiones" className="scroll-mt-16">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Conclusiones</h2>
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <div className="space-y-4">
            {conclusions.map((item, index) => (
              <div key={index} className="flex items-start">
                <CheckCircle className="h-6 w-6 text-amber-600 mr-2 mt-0.5 shrink-0" />
                <p>
                  <strong>{item.title}:</strong> {item.content}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

