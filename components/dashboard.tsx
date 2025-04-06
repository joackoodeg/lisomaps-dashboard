"use client"

import { useState } from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Header from "@/components/header"
import Sidebar from "@/components/sidebar"
import Footer from "@/components/footer"
import StatsSection from "@/components/stats-section"
import ChartsSection from "@/components/charts-section"
import GeoAnalysisSection from "@/components/geo-analysis-section"
import TrendsSection from "@/components/trends-section"
import TypesSection from "@/components/types-section"
import PriceIncreasesSection from "@/components/price-increases-section"
import PriceDecreasesSection from "@/components/price-decreases-section"
import NewBarsSection from "@/components/new-bars-section"
import ConclusionsSection from "@/components/conclusions-section"

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <div className="flex-1 flex flex-col md:flex-row">
        {/* Mobile Sidebar Trigger */}
        <div className="md:hidden p-4">
          <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] sm:w-[320px]">
              <Sidebar setIsSidebarOpen={setIsSidebarOpen} />
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Sidebar */}
        <div className="hidden md:block w-64 shrink-0">
          <div className="sticky top-0 h-[calc(100vh-64px)] overflow-y-auto p-4">
            <Sidebar setIsSidebarOpen={setIsSidebarOpen} />
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <div className="max-w-6xl mx-auto space-y-8">
            <StatsSection />
            <ChartsSection />
            <GeoAnalysisSection />
            <TrendsSection />
            <TypesSection />
            <PriceIncreasesSection />
            <PriceDecreasesSection />
            <NewBarsSection />
            <ConclusionsSection />
          </div>
        </main>
      </div>

      <Footer />
    </div>
  )
}

