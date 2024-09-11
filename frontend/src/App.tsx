import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
// import HomePage from "@/components/HomePage";
import Dashboard from "./pages/Dashboard/Dashboard";
import Board from "./pages/Board/Board";
import { ActivityPage } from "./pages/Activity/ActivityPage";

function App() {
  return (
    <Layout>
      {/* <HomePage /> */}
      {/* <Dashboard /> */}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/board" element={<Board />} />
        <Route path="/activity" element={<ActivityPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
