import { Routes, Route, HashRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CompetitionPage from "./pages/CompetitionPage";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/competition/:competitionId" element={<CompetitionPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
