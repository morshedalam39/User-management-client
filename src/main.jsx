import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import router from './Routes/Routes.jsx';
import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <div className='max-w-6xl mx-auto'>
   <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    </QueryClientProvider>
   </div>
  </React.StrictMode>,
)
