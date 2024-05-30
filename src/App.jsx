import "./App.css";
import Home from "./pages/Home.jsx";
import Header from "./components/Header.jsx";
import SinglePageView from "./pages/SinglePageView.jsx";
import MultiPageView from "./pages/MultiPageView.jsx";
import { useApp } from "./AppContext.jsx";
import { useState, memo, useCallback } from "react";

function App() {
  const { file, selectedPageView } = useApp();
  const render = useCallback(() => {
    switch (selectedPageView) {
      case "single":
        return <SinglePageView file={file} />;
      case "multi":
        return <MultiPageView file={file} />;
      default:
        return <p>error</p>;
    }
  }, [selectedPageView, file]);

  return (
    <>
      <Header />
      {file === null ? <Home /> : render()}
    </>
  );
}

export default App;
