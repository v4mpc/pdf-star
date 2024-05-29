import "./App.css";
import PDFViewer from "./PDFViewer.jsx";
import Home from "./pages/Home.jsx";
import Header from "./components/Header.jsx";
import SinglePageView from "./pages/SinglePageView.jsx";
import MultiPageView from "./pages/MultiPageView.jsx";
import { AppProvider } from "./AppContext.jsx";

function App() {
  return (
    <AppProvider>
      <Header />
      <MultiPageView />
    </AppProvider>
  );
}

export default App;
