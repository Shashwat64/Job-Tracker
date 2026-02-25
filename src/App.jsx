import { RouterProvider } from "react-router-dom"
import { router } from "./router"



export default function App() {
  return (
    <>
      {/* Global Providers Here */}
      <RouterProvider router={router} />
    </>
  )
}
