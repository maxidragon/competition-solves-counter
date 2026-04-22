import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CompetitionPage from "./pages/CompetitionPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/competition/:competitionId" element={<CompetitionPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
