import "./App.css";
import "../node_modules/primeflex/primeflex.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScoreList from "./score/ScoreList";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ScoreList />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
