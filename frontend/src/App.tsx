import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
// import HomePage from "@/components/HomePage";
import Board from "./pages/Board/Board";
import { ActivityPage } from "./pages/Activity/ActivityPage";

function App() {
  return (
    <Layout>
      {/* <HomePage /> */}
      {/* <Dashboard /> */}
      <Routes>
        <Route path="/" element={<Board />} />
        <Route path="/board" element={<Board />} />
        <Route path="/activity" element={<ActivityPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
