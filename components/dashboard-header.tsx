"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Sun, Moon, User, Users, Truck, LayoutDashboard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"

export function DashboardHeader() {
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  const isActive = (path: string) => {
    return pathname.includes(path)
  }

  return (
    <header className="bg-white shadow-sm dark:bg-gray-900 dark:border-gray-800 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <Link href="/" className="mr-4">
              <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">PathPredict</h1>
            </Link>
            <nav className="hidden md:flex items-center space-x-1">
              <Link href="/dashboard/admin">
                <Button
                  variant={isActive("/admin") ? "default" : "ghost"}
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Admin</span>
                </Button>
              </Link>
              <Link href="/dashboard/driver">
                <Button
                  variant={isActive("/driver") ? "default" : "ghost"}
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <Truck className="h-4 w-4" />
                  <span>Driver</span>
                </Button>
              </Link>
              <Link href="/dashboard/parent">
                <Button
                  variant={isActive("/parent") ? "default" : "ghost"}
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <Users className="h-4 w-4" />
                  <span>Parent</span>
                </Button>
              </Link>
              <Link href="/dashboard/student">
                <Button
                  variant={isActive("/student") ? "default" : "ghost"}
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <User className="h-4 w-4" />
                  <span>Student</span>
                </Button>
              </Link>
            </nav>
          </div>

          {/* Mobile dropdown for dashboard navigation */}
          <div className="md:hidden">
            <select
              className="bg-transparent border border-gray-300 rounded-md text-sm dark:border-gray-700 dark:text-gray-300"
              onChange={(e) => (window.location.href = e.target.value)}
              value={pathname}
            >
              <option value="/dashboard/admin">Admin Dashboard</option>
              <option value="/dashboard/driver">Driver Dashboard</option>
              <option value="/dashboard/parent">Parent Dashboard</option>
              <option value="/dashboard/student">Student Dashboard</option>
            </select>
          </div>

          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>
        </div>
      </div>
    </header>
  )
}
