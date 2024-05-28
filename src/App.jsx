import "./App.css";
import PDFViewer from "./PDFViewer.jsx";
import Home from "./pages/Home.jsx";
import Header from "./components/Header.jsx";

function App() {
  return (
    <div style={{margin:"10px"}}>
      <Header />
      <Home/>
    </div>
  );
}

export default App;
