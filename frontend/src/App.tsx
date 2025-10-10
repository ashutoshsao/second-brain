import { BrowserRouter, Route, Routes } from "react-router-dom"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import { Landing } from "./pages/Landing"
import Dashboard from "./pages/Dashboard"

function App() {
  return <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/landing" element={<Landing />} />
    </Routes>
  </BrowserRouter>

}
export default App