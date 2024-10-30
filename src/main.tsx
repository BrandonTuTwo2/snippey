import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App.tsx'
import { Login } from './routes/Login.tsx';
import './index.css'
import netlifyIdentity from 'netlify-identity-widget';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "home",
    element: <App/>
  },
]);

//window.netlifyIdentity = netlifyIdentity;
netlifyIdentity.init();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
