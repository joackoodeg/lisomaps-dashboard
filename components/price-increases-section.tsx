import { Card, CardContent } from "@/components/ui/card"

export default function PriceIncreasesSection() {
  const increases = [
    { bar: "Club Escalantito", previous: 600, current: 1000, difference: 400, percentage: 66.67 },
    { bar: "Liverpool Bar SF", previous: 1000, current: 1400, difference: 400, percentage: 40.0 },
    { bar: "Primos", previous: 900, current: 1200, difference: 300, percentage: 33.33 },
    { bar: "Civeta", previous: 800, current: 1000, difference: 200, percentage: 25.0 },
    { bar: "Club Sarmiento", previous: 800, current: 1000, difference: 200, percentage: 25.0 },
  ]

  return (
    <section id="aumentos" className="scroll-mt-16">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Bares con Mayor Aumento de Precios</h2>
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
                  <th className="py-3 px-4 text-right">Aumento</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {increases.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-3 px-4">{item.bar}</td>
                    <td className="py-3 px-4 text-right">${item.previous}</td>
                    <td className="py-3 px-4 text-right">${item.current}</td>
                    <td className="py-3 px-4 text-right">${item.difference}</td>
                    <td className="py-3 px-4 text-right font-bold text-green-600">{item.percentage.toFixed(2)}%</td>
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

