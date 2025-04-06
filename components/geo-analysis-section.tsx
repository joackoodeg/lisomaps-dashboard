"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Chart from "chart.js/auto"
import { Map } from "lucide-react"

export default function GeoAnalysisSection() {
  const accessibilityChartRef = useRef<HTMLCanvasElement>(null)
  const densityChartRef = useRef<HTMLCanvasElement>(null)
  const timeAvailabilityChartRef = useRef<HTMLCanvasElement>(null)
  const heatmapCanvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    let accessibilityChart: Chart | null = null
    let densityChart: Chart | null = null
    let timeAvailabilityChart: Chart | null = null

    if (accessibilityChartRef.current) {
      const ctx = accessibilityChartRef.current.getContext("2d")
      if (ctx) {
        accessibilityChart = new Chart(ctx, {
          type: "radar",
          data: {
            labels: ["Centro", "Norte", "Sur", "Este", "Oeste", "Noroeste"],
            datasets: [
              {
                label: "2024",
                data: [0.8, 1.9, 1.5, 1.2, 2.1, 2.5],
                backgroundColor: "rgba(251, 191, 36, 0.2)",
                borderColor: "rgba(251, 191, 36, 0.8)",
                borderWidth: 2,
                pointBackgroundColor: "rgba(245, 158, 11, 0.8)",
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "rgba(245, 158, 11, 0.8)",
              },
              {
                label: "2025",
                data: [0.5, 1.2, 0.9, 0.7, 1.3, 1.7],
                backgroundColor: "rgba(217, 119, 6, 0.2)",
                borderColor: "rgba(217, 119, 6, 0.8)",
                borderWidth: 2,
                pointBackgroundColor: "rgba(217, 119, 6, 0.8)",
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "rgba(217, 119, 6, 0.8)",
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
                  label: (context) => `${context.dataset.label}: ${context.parsed.r}km`,
                },
              },
            },
            scales: {
              r: {
                angleLines: {
                  display: true,
                },
                suggestedMin: 0,
                suggestedMax: 3,
                ticks: {
                  stepSize: 1,
                  callback: (value) => value + "km",
                },
              },
            },
          },
        })
      }
    }

    if (densityChartRef.current) {
      const ctx = densityChartRef.current.getContext("2d")
      if (ctx) {
        densityChart = new Chart(ctx, {
          type: "doughnut",
          data: {
            labels: ["Centro", "Norte", "Sur", "Este", "Oeste", "Noroeste"],
            datasets: [
              {
                data: [32, 14, 16, 9, 8, 8],
                backgroundColor: [
                  "rgba(245, 158, 11, 0.8)",
                  "rgba(217, 119, 6, 0.8)",
                  "rgba(180, 83, 9, 0.8)",
                  "rgba(251, 191, 36, 0.8)",
                  "rgba(146, 64, 14, 0.8)",
                  "rgba(252, 211, 77, 0.8)",
                ],
                borderColor: "rgba(255, 255, 255, 0.8)",
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "right",
              },
              tooltip: {
                callbacks: {
                  label: (context) => {
                    const value = context.raw as number
                    const total = (context.dataset.data as number[]).reduce((acc, val) => acc + val, 0)
                    const percentage = ((value / total) * 100).toFixed(1)
                    return `${context.label}: ${value} bares (${percentage}%)`
                  },
                },
              },
            },
          },
        })
      }
    }

    if (timeAvailabilityChartRef.current) {
      const ctx = timeAvailabilityChartRef.current.getContext("2d")
      if (ctx) {
        timeAvailabilityChart = new Chart(ctx, {
          type: "line",
          data: {
            labels: ["10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "22:00", "00:00", "02:00"],
            datasets: [
              {
                label: "Bares Abiertos",
                data: [15, 35, 46, 43, 51, 78, 87, 76, 28],
                backgroundColor: "rgba(217, 119, 6, 0.2)",
                borderColor: "rgba(217, 119, 6, 0.8)",
                borderWidth: 2,
                tension: 0.4,
                fill: true,
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
                  label: (context) => {
                    const value = context.parsed.y
                    return `Bares abiertos: ${value} (${((value / 87) * 100).toFixed(1)}%)`
                  },
                },
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: "Cantidad de bares abiertos",
                },
                suggestedMax: 90,
              },
              x: {
                title: {
                  display: true,
                  text: "Hora del día",
                },
              },
            },
          },
        })
      }
    }

    // Dibujar el mapa de calor de densidad
    if (heatmapCanvasRef.current) {
      const ctx = heatmapCanvasRef.current.getContext("2d")
      if (ctx) {
        // Dibujar un mapa simplificado de Santa Fe con zonas
        drawHeatmap(ctx)
      }
    }

    return () => {
      if (accessibilityChart) accessibilityChart.destroy()
      if (densityChart) densityChart.destroy()
      if (timeAvailabilityChart) timeAvailabilityChart.destroy()
    }
  }, [])

  // Función para dibujar el mapa de calor
  const drawHeatmap = (ctx: CanvasRenderingContext2D) => {
    const width = ctx.canvas.width
    const height = ctx.canvas.height

    // Limpiar el canvas
    ctx.clearRect(0, 0, width, height)

    // Dibujar fondo
    ctx.fillStyle = "#f5f5f5"
    ctx.fillRect(0, 0, width, height)

    // Datos de densidad por zona (normalizado de 0 a 1)
    const densityData = {
      centro: 0.9, // 32 bares - máxima densidad
      norte: 0.4, // 14 bares
      sur: 0.5, // 16 bares
      este: 0.25, // 9 bares
      oeste: 0.22, // 8 bares
      noroeste: 0.22, // 8 bares
    }

    // Colores para el mapa de calor (de menor a mayor densidad)
    const getHeatColor = (value: number) => {
      // Escala de colores ámbar
      if (value < 0.2) return "rgba(254, 243, 199, 0.9)" // amber-100
      if (value < 0.4) return "rgba(252, 211, 77, 0.9)" // amber-300
      if (value < 0.6) return "rgba(245, 158, 11, 0.9)" // amber-500
      if (value < 0.8) return "rgba(217, 119, 6, 0.9)" // amber-600
      return "rgba(146, 64, 14, 0.9)" // amber-800
    }

    // Dibujar las zonas (simplificado)
    // Centro
    ctx.beginPath()
    ctx.fillStyle = getHeatColor(densityData.centro)
    ctx.moveTo(width * 0.4, height * 0.3)
    ctx.lineTo(width * 0.6, height * 0.3)
    ctx.lineTo(width * 0.6, height * 0.7)
    ctx.lineTo(width * 0.4, height * 0.7)
    ctx.closePath()
    ctx.fill()
    ctx.strokeStyle = "rgba(255,255,255,0.8)"
    ctx.lineWidth = 1
    ctx.stroke()
    ctx.fillStyle = "rgba(0,0,0,0.7)"
    ctx.font = "10px Arial"
    ctx.fillText("Centro", width * 0.45, height * 0.5)

    // Norte
    ctx.beginPath()
    ctx.fillStyle = getHeatColor(densityData.norte)
    ctx.moveTo(width * 0.4, height * 0.1)
    ctx.lineTo(width * 0.6, height * 0.1)
    ctx.lineTo(width * 0.6, height * 0.3)
    ctx.lineTo(width * 0.4, height * 0.3)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()
    ctx.fillStyle = "rgba(0,0,0,0.7)"
    ctx.fillText("Norte", width * 0.45, height * 0.2)

    // Sur
    ctx.beginPath()
    ctx.fillStyle = getHeatColor(densityData.sur)
    ctx.moveTo(width * 0.4, height * 0.7)
    ctx.lineTo(width * 0.6, height * 0.7)
    ctx.lineTo(width * 0.6, height * 0.9)
    ctx.lineTo(width * 0.4, height * 0.9)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()
    ctx.fillStyle = "rgba(0,0,0,0.7)"
    ctx.fillText("Sur", width * 0.47, height * 0.8)

    // Este
    ctx.beginPath()
    ctx.fillStyle = getHeatColor(densityData.este)
    ctx.moveTo(width * 0.6, height * 0.3)
    ctx.lineTo(width * 0.9, height * 0.3)
    ctx.lineTo(width * 0.9, height * 0.7)
    ctx.lineTo(width * 0.6, height * 0.7)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()
    ctx.fillStyle = "rgba(0,0,0,0.7)"
    ctx.fillText("Este", width * 0.75, height * 0.5)

    // Oeste
    ctx.beginPath()
    ctx.fillStyle = getHeatColor(densityData.oeste)
    ctx.moveTo(width * 0.1, height * 0.3)
    ctx.lineTo(width * 0.4, height * 0.3)
    ctx.lineTo(width * 0.4, height * 0.7)
    ctx.lineTo(width * 0.1, height * 0.7)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()
    ctx.fillStyle = "rgba(0,0,0,0.7)"
    ctx.fillText("Oeste", width * 0.2, height * 0.5)

    // Noroeste
    ctx.beginPath()
    ctx.fillStyle = getHeatColor(densityData.noroeste)
    ctx.moveTo(width * 0.1, height * 0.1)
    ctx.lineTo(width * 0.4, height * 0.1)
    ctx.lineTo(width * 0.4, height * 0.3)
    ctx.lineTo(width * 0.1, height * 0.3)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()
    ctx.fillStyle = "rgba(0,0,0,0.7)"
    ctx.fillText("Noroeste", width * 0.17, height * 0.2)

    // Dibujar leyenda
    const legendX = width * 0.05
    const legendY = height * 0.93
    const legendWidth = width * 0.9
    const legendHeight = height * 0.05

    // Gradiente para la leyenda
    const gradient = ctx.createLinearGradient(legendX, 0, legendX + legendWidth, 0)
    gradient.addColorStop(0, "rgba(254, 243, 199, 0.9)") // amber-100
    gradient.addColorStop(0.25, "rgba(252, 211, 77, 0.9)") // amber-300
    gradient.addColorStop(0.5, "rgba(245, 158, 11, 0.9)") // amber-500
    gradient.addColorStop(0.75, "rgba(217, 119, 6, 0.9)") // amber-600
    gradient.addColorStop(1, "rgba(146, 64, 14, 0.9)") // amber-800

    ctx.fillStyle = gradient
    ctx.fillRect(legendX, legendY, legendWidth, legendHeight)
    ctx.strokeStyle = "rgba(0,0,0,0.3)"
    ctx.strokeRect(legendX, legendY, legendWidth, legendHeight)

    // Etiquetas de la leyenda
    ctx.fillStyle = "rgba(0,0,0,0.7)"
    ctx.font = "8px Arial"
    ctx.fillText("Baja", legendX, legendY - 2)
    ctx.fillText("Alta", legendX + legendWidth - 15, legendY - 2)
    ctx.fillText("Densidad de bares", legendX + legendWidth / 2 - 30, legendY - 2)
  }

  return (
    <section id="analisis-geo" className="scroll-mt-16">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Análisis Geográfico y de Disponibilidad</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle>Accesibilidad a Liso</CardTitle>
          </CardHeader>
          <CardContent className="h-[280px]">
            <canvas ref={accessibilityChartRef} />
          </CardContent>
          <div className="px-6 pb-4 text-sm text-gray-600">
            Distancia promedio a un bar con liso desde diferentes puntos de la ciudad
          </div>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Map className="h-4 w-4 text-amber-600" />
              Densidad por Zona
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="h-[200px]">
              <canvas ref={densityChartRef} />
            </div>
            <div className="h-[200px] border rounded-md p-2 bg-gray-50">
              <canvas ref={heatmapCanvasRef} width="200" height="200" />
            </div>
          </CardContent>
          <div className="px-6 pb-4 text-sm text-gray-600">
            Concentración de bares con liso por zona de Santa Fe (2025)
          </div>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle>Disponibilidad por Horario</CardTitle>
          </CardHeader>
          <CardContent className="h-[280px]">
            <canvas ref={timeAvailabilityChartRef} />
          </CardContent>
          <div className="px-6 pb-4 text-sm text-gray-600">Cantidad de bares abiertos según la franja horaria</div>
        </Card>
      </div>
    </section>
  )
}

