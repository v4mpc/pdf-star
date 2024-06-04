import {
  createContext,
  useCallback,
  useContext,
  useState,
  useRef,
} from "react";

const AppContext = createContext(undefined);

const AppProvider = ({ children }) => {
  const [file, setFile] = useState(null);
  const [signature, setSignature] = useState([]);
  const [modifiedFile, setModifiedFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [scale, setScale] = useState(1);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedPageView, setSelectedPageView] = useState("single");
  let signatureMeta = useRef([]);
  let pageMeta = useRef([]);

  function handleAddFile(file) {
    setFile(file);
  }

  const handleAddSignature = (newSignature) => {
    const pageIndex = 0;
    const id = Date.now();
    const pageInfo = pageMeta.current.filter(
      (f) => (f.pageIndex = pageIndex),
    )[0];
    setSignature([...signature, { id, pageIndex: 0, ...newSignature }]);
    signatureMeta.current.push({
      height: newSignature.dimensions.height,
      width: newSignature.dimensions.width,
      x: pageInfo.width / 2,
      y: pageInfo.height / 2,
      id,
      pageIndex: pageIndex,
    });
    console.log(signatureMeta.current)
  };

  const handleRemoveSignature = (id) => {
    setSignature(signature.filter((f) => f.id !== id));
  };

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
        signature,
        handleAddSignature,
        signatureMeta,
        handleRemoveSignature,
        pageMeta,
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
