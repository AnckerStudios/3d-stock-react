import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from './pages/ErrorPage';
import ProductPage, { loader as productLoader } from './pages/ProductPage';
import { UploadPage } from './pages/UploadPage';
import LoginPage from './pages/LoginPage';
import { Provider } from 'react-redux';
import store from './redux/store';
import Root from './Root';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import TestPage from './pages/TestPage';
const router = createBrowserRouter([
{
    path: "/",
    element: <Root/>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "product/:productId",
        element: <ProductPage />,
        loader: productLoader,
      },
      {
        path: "feed",
        element: <App />,
      },
      {
        path: ":id",
        element: <ProfilePage/>,
        errorElement: <ErrorPage />
      },
      {
        path: "test",
        element: <TestPage />,
      },
    ],
  },{
    path: "login",
    element: <LoginPage/>,
    errorElement: <ErrorPage />
  },{
    path: "register",
    element: <RegisterPage/>,
    errorElement: <ErrorPage />
  },{
    path: "upload",
    element: <UploadPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
