"use client"

import { ArrowUpRight, Users, BarChart3 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function DashboardCards() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="overflow-hidden border-none shadow-md">
        <CardHeader className="bg-primary/10 pb-2">
          <CardTitle className="text-lg font-medium flex items-center justify-between">
            <span>Active Users</span>
            <Users className="h-5 w-5 text-primary" />
          </CardTitle>
          <CardDescription>Daily active users on your platform</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex items-baseline justify-between">
            <div className="text-3xl font-bold">2,845</div>
            <div className="flex items-center text-sm text-green-600">
              <ArrowUpRight className="mr-1 h-4 w-4" />
              <span>12.5%</span>
            </div>
          </div>
          <div className="mt-4 h-[60px] w-full">
            {/* Placeholder for chart */}
            <div className="flex h-full w-full items-end gap-1">
              {[40, 25, 35, 30, 45, 35, 55, 25, 40, 30, 55, 30].map((height, i) => (
                <div key={i} className="bg-primary/20 rounded-t w-full" style={{ height: `${height}%` }}></div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-none shadow-md">
        <CardHeader className="bg-secondary/10 pb-2">
          <CardTitle className="text-lg font-medium flex items-center justify-between">
            <span>Revenue</span>
            <BarChart3 className="h-5 w-5 text-secondary" />
          </CardTitle>
          <CardDescription>Monthly revenue overview</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex items-baseline justify-between">
            <div className="text-3xl font-bold">$24,568</div>
            <div className="flex items-center text-sm text-green-600">
              <ArrowUpRight className="mr-1 h-4 w-4" />
              <span>8.2%</span>
            </div>
          </div>
          <div className="mt-4 h-[60px] w-full">
            {/* Placeholder for chart */}
            <div className="flex h-full w-full items-end gap-1">
              {[30, 45, 25, 50, 35, 40, 60, 35, 45, 50, 40, 35].map((height, i) => (
                <div key={i} className="bg-secondary/20 rounded-t w-full" style={{ height: `${height}%` }}></div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

