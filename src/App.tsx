import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './components/pages/Dashboard'
import Detail from './components/pages/Detail'

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/details" element={<Detail />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
