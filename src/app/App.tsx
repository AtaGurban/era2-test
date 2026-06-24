import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueuePage } from '@/pages/QueuePage'

export function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 flex flex-col">
        <main className="flex-1">
          <Routes>
            <Route path="/queue" element={<QueuePage />} />
            <Route path="*" element={<Navigate to="/queue" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
