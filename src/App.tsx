import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './components/pages/Dashboard'
import Detail from './components/pages/Detail'
import AddComponent from './tests/AddComponent'

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      {/* <Route path="/:type" element={<Dashboard />} /> */}
      <Route path="/details/:id" element={<Detail />} />
      <Route path="/add" element={<AddComponent />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
