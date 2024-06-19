import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainPage from "./app/page.tsx";
import "./index.css";
import EventCreatePage from "./app/create/page.tsx";
import RootLayout from "./app/layout.tsx";
import EventEditPage from "./app/edit/page.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "/create",
        element: <EventCreatePage />,
      },
      {
        path: "/edit/:id",
        element: <EventEditPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
