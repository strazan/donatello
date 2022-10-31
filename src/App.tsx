import { useState } from "react";
import MainFrame from "./components/MainFrame";
import SideBar from "./components/SideBar";

function App() {

  const [sidebarOpen, setSidebarOpen] = useState(false)
  return (
    <div>
      <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <MainFrame setSidebarOpen={setSidebarOpen} />
    </div>
  )
}

export default App;
