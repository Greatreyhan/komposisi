import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './components/pages/Dashboard'
import Detail from './components/pages/Detail'
import AddComponent from './tests/AddComponent'
import AdminDashboard from "./tests/AdminDashboard"
import UpdateComponent from './tests/UpdateComponent'
import Test from './tests/Test'

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      {/* <Route path="/:type" element={<Dashboard />} /> */}
      <Route path="/details/:id" element={<Detail />} />
      <Route path="/test" element={<Test />} />
      <Route path="/add" element={<AddComponent />} />
      <Route path="/add/:id" element={<UpdateComponent />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
