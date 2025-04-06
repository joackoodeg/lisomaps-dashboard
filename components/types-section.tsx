"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Chart from "chart.js/auto"

export default function TypesSection() {
  const typeEstimationChartRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    let typeEstimationChart: Chart | null = null

    if (typeEstimationChartRef.current) {
      const ctx = typeEstimationChartRef.current.getContext("2d")
      if (ctx) {
        typeEstimationChart = new Chart(ctx, {
          type: "bar",
          data: {
            labels: ["Marca SANTA FE (estimado)", "Otras marcas (estimado)"],
            datasets: [
              {
                label: "Precio Estimado",
                data: [1180, 1130],
                backgroundColor: ["rgba(217, 119, 6, 0.8)", "rgba(245, 158, 11, 0.8)"],
                borderColor: "rgba(255, 255, 255, 0.5)",
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                callbacks: {
                  label: (context) => `Precio Estimado: $${context.parsed.y}`,
                },
              },
            },
            scales: {
              y: {
                beginAtZero: false,
                min: 1000,
                title: {
                  display: true,
                  text: "Precio en pesos (estimado)",
                },
              },
            },
          },
        })
      }
    }

    return () => {
      if (typeEstimationChart) typeEstimationChart.destroy()
    }
  }, [])

  return (
    <section id="tipos" className="scroll-mt-16">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Análisis por Tipo de Liso</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle>Mapa Anterior</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">En el mapa anterior, solo se identificó un tipo de liso explícitamente:</p>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-gray-50 rounded-lg overflow-hidden">
                <thead className="bg-amber-500 text-white">
                  <tr>
                    <th className="py-2 px-4 text-left">Tipo</th>
                    <th className="py-2 px-4 text-right">Locales</th>
                    <th className="py-2 px-4 text-right">Precio</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 px-4">Quilmes (Chopp)</td>
                    <td className="py-2 px-4 text-right">1</td>
                    <td className="py-2 px-4 text-right">$1,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-gray-600">
              El único local identificado con tipo específico fue "Choperia Santa Fe" con tipo "Quilmes" (sinónimo de
              Chopp).
            </p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle>Mapa Actual (Estimación)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">En el mapa actual, podemos estimar los tipos basados en los tags disponibles:</p>
            <div className="h-[220px]">
              <canvas ref={typeEstimationChartRef} />
            </div>
            <p className="mt-4 text-gray-600">
              Los datos sugieren una ligera diferencia de precio entre LISO SANTA FE y CHOPP, que son términos
              utilizados para la misma bebida según la región o marca.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

