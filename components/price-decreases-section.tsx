import { Card, CardContent } from "@/components/ui/card"

export default function PriceDecreasesSection() {
  const decreases = [
    { bar: "Say Mon's", previous: 1200, current: 800, difference: -400, percentage: -33.33 },
    { bar: "El Fogolar", previous: 1200, current: 1100, difference: -100, percentage: -8.33 },
  ]

  return (
    <section id="bajadas" className="scroll-mt-16">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Bares con Precios a la Baja</h2>
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-amber-600 text-white">
                <tr>
                  <th className="py-3 px-4 text-left">Bar</th>
                  <th className="py-3 px-4 text-right">Precio Anterior</th>
                  <th className="py-3 px-4 text-right">Precio Actual</th>
                  <th className="py-3 px-4 text-right">Diferencia</th>
                  <th className="py-3 px-4 text-right">Variación</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {decreases.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-3 px-4">{item.bar}</td>
                    <td className="py-3 px-4 text-right">${item.previous}</td>
                    <td className="py-3 px-4 text-right">${item.current}</td>
                    <td className="py-3 px-4 text-right">${item.difference}</td>
                    <td className="py-3 px-4 text-right font-bold text-red-600">{item.percentage.toFixed(2)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

