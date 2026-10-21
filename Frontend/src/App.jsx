import { useState } from 'react'
import { RouterProvider } from "react-router-dom";
import { router } from './app.routes.jsx';
import { AuthProvider } from './features/auth/services/auth.context.jsx';
import { InterviewProvider } from './interview/Interview.context.jsx';
import "./index.css"
import Navbar from './components/Navbar.jsx';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AuthProvider >
        <InterviewProvider >
          <RouterProvider router={router} />
        </InterviewProvider>
      </AuthProvider>
    </>
  )
}

export default App
