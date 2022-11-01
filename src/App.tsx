import { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import MainFrame from "./components/MainFrame";
import DownloadManager from "./components/pages/DownloadManager";
import SideBar from "./components/SideBar";

function App() {

  const [sidebarOpen, setSidebarOpen] = useState(false)
  return (
    <Router>
      <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <MainFrame setSidebarOpen={setSidebarOpen}>
        <Routes>
          <Route path="/download-manager" element={<DownloadManager />} />
        </Routes>
      </MainFrame>
    </Router>

  )
}

export default App;
