import "./App.css";
import Home from "./pages/Home.jsx";
import Header from "./components/Header.jsx";
import SinglePageView from "./pages/SinglePageView.jsx";
import MultiPageView from "./pages/MultiPageView.jsx";
import { useApp } from "./AppContext.jsx";

function App() {
  const { file, modifiedFile } = useApp();
  return (
    <>
      <Header />
      {file === null && <Home />}
      {modifiedFile ? (
        <MultiPageView file={modifiedFile} />
      ) : (
        <MultiPageView file={file} />
      )}
    </>
  );
}

export default App;
