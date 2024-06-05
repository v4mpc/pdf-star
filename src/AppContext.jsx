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
  const [numPages, setNumPages] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [scale, setScale] = useState(1);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedPageView, setSelectedPageView] = useState("single");
  let signatureMeta = useRef([]);
  let pageMeta = useRef([]);

  function handleAddFile(file) {
    setFile(file);
  }

  const handleSetCurrentPage = (page) => {
    setCurrentPage(page);
  };

  const handleAddSignature = (newSignature) => {
    const pageIndex = currentPage - 1;
    const id = Date.now();
    const pageInfo = pageMeta.current.filter(
      (f) => f.pageIndex === pageIndex,
    )[0];
    setSignature([...signature, { id, pageIndex, ...newSignature }]);
    signatureMeta.current.push({
      height: newSignature.dimensions.height / 2,
      width: newSignature.dimensions.width / 2,
      x: 0,
      y: 0,
      id,
      pageIndex: pageIndex,
    });
    console.log(signatureMeta.current);
  };

  const handleRemoveSignature = (id) => {
    setSignature(signature.filter((f) => f.id !== id));

    const index = signatureMeta.current.indexOf(
      signatureMeta.current.filter((f) => f.id === id)[0],
    );
    if (index > -1) {
      signatureMeta.current.splice(index, 1);
    }
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
        currentPage,
        handleSetCurrentPage,
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
