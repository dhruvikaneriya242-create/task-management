import './App.css'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import AuthGuard from './Auth/AuthGuard'
import Dashboard from './pages/dashboard'

const DefaultRoute = () => {
  const loginData = JSON.parse(localStorage.getItem('loginData'));
  if (loginData) {
    return <Navigate to="/dashboard" replace/>    
  }
  return <Navigate to="/login" replace/>
}
function App() {
 const route = createBrowserRouter([
  {
    path:"/",
    element:<DefaultRoute/>
  },
  {
    path:"/login",
    element:<AuthGuard required={false}><Login/></AuthGuard> 
  },
   {
    path:"/register",
    element:<AuthGuard required={false}><Register/> </AuthGuard>
   },
    { 
    path:"/dashboard",
    element:<AuthGuard required={true}><Dashboard/></AuthGuard> 
    }

 ])

 return <RouterProvider router={route}/>
}

export default App;