import { Card, CardContent } from "@/components/ui/card"

export default function NewBarsSection() {
  const newBars = [
    "1980",
    "Agora Campo",
    "Ametauna",
    "BAHARAT",
    "Bilbao Sur",
    "Bizarro",
    "Botánico Green Bar",
    "Casa Bianca",
    "Chacah",
    "Chopería Aristobulo",
    "Chopería Escalante",
    "Quatromil",
  ]

  return (
    <section id="nuevos" className="scroll-mt-16">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Nuevos Bares Añadidos</h2>
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <p className="mb-4">Se añadieron 54 nuevos bares al mapa actual, incluyendo:</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {newBars.map((bar, index) => (
              <div
                key={index}
                className="bg-amber-50 p-3 rounded border border-amber-200 hover:bg-amber-100 transition-colors"
              >
                {bar}
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-gray-600">... y muchos más (54 en total)</p>
        </CardContent>
      </Card>
    </section>
  )
}

