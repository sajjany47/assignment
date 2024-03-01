import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScoreList from "./score/ScoreList";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import "primeflex/primeflex.css"; // flex

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ScoreList />} />
          <Route path="/single-card/:id" element={<ScoreList />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
