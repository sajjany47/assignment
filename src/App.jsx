import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScoreList from "./score/ScoreList";
import "primereact/resources/themes/md-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import "primeflex/primeflex.css"; // flex
import SingleScore from "./score/SingleScore";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ScoreList />} />
          <Route path="/single-card" element={<SingleScore />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
