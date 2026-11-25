import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Login from '@/pages/login'
import Products from '@/pages/products'
import { ProtectedRoute } from '@/modules/app/auth'

const router = createBrowserRouter([
  { path: '/', element: <Login /> },
  {
    element: <ProtectedRoute />,
    children: [{ path: '/products', element: <Products /> }]
  },
  { path: '*', element: <Navigate to='/' replace /> }
])

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer position='top-right' />
    </>
  )
}
