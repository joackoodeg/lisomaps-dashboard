"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Chart from "chart.js/auto"

export default function TrendsSection() {
  const trendChartRef = useRef<HTMLCanvasElement>(null)
  const distributionChartRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    let trendChart: Chart | null = null
    let distributionChart: Chart | null = null

    if (trendChartRef.current) {
      const ctx = trendChartRef.current.getContext("2d")
      if (ctx) {
        // Crear gradiente para el fondo
        const trendGradient = ctx.createLinearGradient(0, 0, 0, 300)
        trendGradient.addColorStop(0, "rgba(245, 158, 11, 0.5)")
        trendGradient.addColorStop(1, "rgba(245, 158, 11, 0.0)")

        trendChart = new Chart(ctx, {
          type: "line",
          data: {
            labels: ["2024", "2025", "2026 (est.)", "2027 (est.)", "2028 (est.)"],
            datasets: [
              {
                label: "Precio Promedio del Liso",
                data: [985.23, 1147.7, 1337.0, 1557.5, 1814.3],
                backgroundColor: trendGradient,
                borderColor: "rgba(217, 119, 6, 0.8)",
                borderWidth: 2,
                tension: 0.3,
                fill: true,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "top",
              },
              tooltip: {
                callbacks: {
                  label: (context) => `Precio: $${context.parsed.y.toFixed(2)}`,
                },
              },
            },
            scales: {
              y: {
                title: {
                  display: true,
                  text: "Precio en pesos",
                },
              },
            },
          },
        })
      }
    }

    if (distributionChartRef.current) {
      const ctx = distributionChartRef.current.getContext("2d")
      if (ctx) {
        distributionChart = new Chart(ctx, {
          type: "bar",
          data: {
            labels: ["$800-$900", "$901-$1000", "$1001-$1100", "$1101-$1200", "$1201-$1300", "Más de $1300"],
            datasets: [
              {
                label: "Cantidad de Bares",
                data: [8, 32, 18, 17, 8, 4],
                backgroundColor: [
                  "rgba(252, 211, 77, 0.8)",
                  "rgba(251, 191, 36, 0.8)",
                  "rgba(245, 158, 11, 0.8)",
                  "rgba(217, 119, 6, 0.8)",
                  "rgba(180, 83, 9, 0.8)",
                  "rgba(146, 64, 14, 0.8)",
                ],
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
                  label: (context) => `Bares: ${context.parsed.y} (${((context.parsed.y / 87) * 100).toFixed(1)}%)`,
                },
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: "Cantidad de bares",
                },
              },
              x: {
                title: {
                  display: true,
                  text: "Rango de precios",
                },
              },
            },
          },
        })
      }
    }

    return () => {
      if (trendChart) trendChart.destroy()
      if (distributionChart) distributionChart.destroy()
    }
  }, [])

  return (
    <section id="tendencias" className="scroll-mt-16">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Análisis de Tendencias</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle>Proyección de Precios 2024-2028</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <canvas ref={trendChartRef} />
          </CardContent>
          <div className="px-6 pb-4 text-sm text-gray-600">
            Proyección basada en la tasa de crecimiento actual (16.49% anual)
          </div>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle>Distribución de Precios 2025</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <canvas ref={distributionChartRef} />
          </CardContent>
          <div className="px-6 pb-4 text-sm text-gray-600">
            Concentración de precios en diferentes rangos en el mapa actual
          </div>
        </Card>
      </div>
    </section>
  )
}

