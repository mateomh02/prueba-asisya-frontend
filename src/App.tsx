import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Login from '@/pages/login'
import Products from '@/pages/products'
import Category from '@/pages/category'
import { AppLayout, ProtectedRoute } from '@/modules/app'

const router = createBrowserRouter([
  { path: '/', element: <Login /> },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { path: '/products', element: <Products /> },
          { path: '/category', element: <Category /> }
        ]
      }
    ]
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
