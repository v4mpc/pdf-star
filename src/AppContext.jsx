import { createContext, useCallback, useContext, useState } from "react";


const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [file, setFile] = useState(null);
  const [modifiedFile, setModifiedFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [scale, setScale] = useState(1);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedPageView, setSelectedPageView] = useState("single");

  function handleAddFile(file) {
    setFile(file);
  }

  function handleAddModifiedFile(file) {
    setModifiedFile(file);
  }

  function handleSetNumPages(numPages) {
    setNumPages(numPages);
  }

  function handleSetScale(scale) {
    setScale(scale);
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
        scale,
        handleSetScale,
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
