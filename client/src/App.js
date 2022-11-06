import Home from "../src/pages/Home/home.component.jsx";
import PageNotFound from "./pages/pageNotFound/pageNotFound.component.jsx";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element = {<Home />} />
          <Route path="*" element = {<PageNotFound />} />
        </Routes>
      </BrowserRouter> 
  );
}

export default App;
