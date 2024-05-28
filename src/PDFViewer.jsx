import {useState} from "react";
import {pdfjs, Document, Page} from 'react-pdf';


pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdf.worker.min.js',
    import.meta.url,
).toString();

const options = {
    cMapUrl: '/cmaps/',
    standardFontDataUrl: '/standard_fonts/',
};

const resizeObserverOptions = {};

const maxWidth = 800;


const PdfViewer = () => {
    const [file, setFile] = useState(null);
    const [numPages, setNumPages] = useState();
    const [containerRef, setContainerRef] = useState(null);
    const [containerWidth, setContainerWidth] = useState();

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };


    function onDocumentLoadSuccess({numPages: nextNumPages}) {
        setNumPages(nextNumPages);
    }

    return (
        <>
            <div>
                <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileChange}
                />
            </div>

            <div className="Example__container__document" ref={setContainerRef}>
                <Document
                    file={file}
                    onLoadSuccess={onDocumentLoadSuccess}
                    options={options}
                >
                    {Array.from(new Array(numPages), (el, index) => (
                        <Page
                            key={`page_${index + 1}`}
                            pageNumber={index + 1}
                            width={
                                containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth
                            }
                        />
                    ))}
                </Document>
            </div>
        </>
    );
};

export default PdfViewer;
