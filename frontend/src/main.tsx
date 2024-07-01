import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import 'modern-css-reset'
import App from './App.tsx'
import Topic from './pages/Topic.tsx'
import TopicsKanban from './pages/TopicsKanban.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <TopicsKanban />,
  },
  {
    path: '/topic/:id',
    element: <Topic />
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div style={{margin: '0 10%'}}>
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>,
)
