import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Login from '@/pages/login'
import Home from '@/pages/home'
import Products from '@/pages/products'
import Category from '@/pages/category'
import ProductNew from '@/pages/product-new'
import ProductEditPage from '@/pages/product-edit'
import CategoryNew from '@/pages/category-new'
import { AdminRoute, AppLayout, GuestRoute, ProtectedRoute } from '@/modules/app'

const router = createBrowserRouter([
  {
    element: <GuestRoute />,
    children: [{ path: '/login', element: <Login /> }]
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { path: '/', element: <Home /> },
          { path: '/products', element: <Products /> },
          { path: '/category', element: <Category /> },
          {
            element: <AdminRoute />,
            children: [
              { path: '/products/new', element: <ProductNew /> },
              { path: '/products/:id/edit', element: <ProductEditPage /> },
              { path: '/category/new', element: <CategoryNew /> }
            ]
          }
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
