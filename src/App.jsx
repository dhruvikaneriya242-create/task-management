import './App.css'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'

const DefaultRoute = () => {
  const authData = JSON.parse(localStorage.getItem('authData'));
  if (authData) {
    return <Navigate to="/login" replace/>    
  }
  return <Navigate to="/register" replace/>
}
function App() {
 const route = createBrowserRouter([
  {
    path:"/",
    element:<DefaultRoute/>
  },
  {
    path:"/login",
    element: <Login/> 
  },
   {
    path:"/register",
    element: <Register/>
   }

 ])

 return<RouterProvider router={route}/>
}

export default App