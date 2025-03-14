"use client"

import { DashboardGrid } from "./dashboard-grid"
import { useState, useEffect } from "react"

export function DashboardContainer() {
  const [containerHeight, setContainerHeight] = useState("calc(100vh - 2rem)")

  // Adjust container height based on window size
  useEffect(() => {
    const updateHeight = () => {
      setContainerHeight(`calc(100vh - 2rem)`)
    }

    window.addEventListener("resize", updateHeight)
    updateHeight()

    return () => window.removeEventListener("resize", updateHeight)
  }, [])

  return (
    <div
      className="p-4 md:p-6 lg:p-8 overflow-hidden bg-background"
      style={{ height: containerHeight, maxHeight: containerHeight }}
    >
      <DashboardGrid />
    </div>
  )
}

