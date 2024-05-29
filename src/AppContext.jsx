import { createContext, useCallback, useContext, useState } from "react";
// import pdfFile from "./pages/samples/A6.pdf";
import pdfFile from "./pages/samples/book.pdf";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [file, setFile] = useState(null);
  const [modifiedFile, setModifiedFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedPageView, setSelectedPageView] = useState(null);

  function handleAddFile(file) {
    setFile(file);
  }

  function handleAddModifiedFile(file) {
    setModifiedFile(file);
  }

  function handleSetNumPages(numPages) {
    setNumPages(numPages);
  }

  function handleSetSelectedIndex(pageIndex) {
    setSelectedIndex((curr) => (curr === pageIndex ? null : pageIndex));
  }

  const handleSetSelectedPageView = useCallback((pageViewValue) => {
    setSelectedPageView(pageViewValue);
  }, []);

  return (
    <AppContext.Provider
      value={{
        file,
        handleAddFile,
        modifiedFile,
        handleAddModifiedFile,
        numPages,
        handleSetNumPages,
        selectedIndex,
        handleSetSelectedIndex,
        selectedPageView,
        handleSetSelectedPageView,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

function useApp() {
  const context = useContext(AppContext);
  if (context === undefined)
    throw new Error("App context was used outside of AppProvider");
  return context;
}

export { AppProvider, useApp };
