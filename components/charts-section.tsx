"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Chart from "chart.js/auto"

export default function ChartsSection() {
  const priceChartRef = useRef<HTMLCanvasElement>(null)
  const barsChartRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    let priceChart: Chart | null = null
    let barsChart: Chart | null = null

    if (priceChartRef.current) {
      const ctx = priceChartRef.current.getContext("2d")
      if (ctx) {
        priceChart = new Chart(ctx, {
          type: "bar",
          data: {
            labels: ["Precio Promedio General", "Precio en Bares Comparables"],
            datasets: [
              {
                label: "2024",
                data: [985.23, 985.23],
                backgroundColor: "rgba(251, 191, 36, 0.8)",
                borderColor: "rgba(217, 119, 6, 1)",
                borderWidth: 1,
              },
              {
                label: "2025",
                data: [1147.7, 1049.29],
                backgroundColor: "rgba(217, 119, 6, 0.8)",
                borderColor: "rgba(180, 83, 9, 1)",
                borderWidth: 1,
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
                  label: (context) => `${context.dataset.label}: $${context.parsed.y.toFixed(2)}`,
                },
              },
            },
            scales: {
              y: {
                beginAtZero: false,
                min: 800,
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

    if (barsChartRef.current) {
      const ctx = barsChartRef.current.getContext("2d")
      if (ctx) {
        barsChart = new Chart(ctx, {
          type: "pie",
          data: {
            labels: ["Bares de 2024", "Bares Nuevos 2025"],
            datasets: [
              {
                data: [44, 54],
                backgroundColor: ["rgba(245, 158, 11, 0.8)", "rgba(217, 119, 6, 0.8)"],
                borderColor: ["rgba(146, 64, 14, 1)", "rgba(180, 83, 9, 1)"],
                borderWidth: 1,
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
                  label: (context) => {
                    const value = context.raw as number
                    const total = (context.dataset.data as number[]).reduce((acc, val) => acc + val, 0)
                    const percentage = ((value / total) * 100).toFixed(1)
                    return `${context.label}: ${value} (${percentage}%)`
                  },
                },
              },
            },
          },
        })
      }
    }

    return () => {
      if (priceChart) priceChart.destroy()
      if (barsChart) barsChart.destroy()
    }
  }, [])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 scroll-mt-16" id="precios">
      <Card className="overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle>Comparación de Precios 2024-2025</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <canvas ref={priceChartRef} />
        </CardContent>
      </Card>

      <Card className="overflow-hidden" id="bares">
        <CardHeader className="pb-2">
          <CardTitle>Crecimiento de Bares 2024-2025</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <canvas ref={barsChartRef} />
        </CardContent>
      </Card>
    </div>
  )
}

