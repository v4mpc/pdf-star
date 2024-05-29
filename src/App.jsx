import "./App.css";
import PDFViewer from "./PDFViewer.jsx";
import Home from "./pages/Home.jsx";
import Header from "./components/Header.jsx";
import SinglePageView from "./pages/SinglePageView.jsx";

function App() {
  return (
    <div >
      <Header />
      <SinglePageView/>
    </div>
  );
}

export default App;
