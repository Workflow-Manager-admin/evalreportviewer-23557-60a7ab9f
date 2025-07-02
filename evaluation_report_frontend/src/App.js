import React, { useState, useEffect } from 'react';
import './App.css';

// Example evaluation report summary and (long) full content
const evaluationReportSummary = {
  title: "Evaluation Results: Model X",
  author: "Jane Doe",
  date: "2024-06-05",
  summary: "Performance of Model X was assessed on a variety of metrics. This summary provides a high-level overview, while the full report includes detailed analysis, error breakdowns, and methodology."
};

const evaluationReportContent = [
  "EVALUATION REPORT: MODEL X",
  "Author: Jane Doe",
  "Date: 2024-06-05",
  "",
  "Summary of Results:",
  "The model achieved the following results across evaluated benchmarks:",
  "",
  "Accuracy: 94.7%",
  "Precision: 93.8%",
  "Recall: 95.0%",
  "F1 Score: 94.4%",
  "",
  "Error Analysis:",
  "- The majority of misclassifications occurred on edge cases.",
  "- False positives were most common in the B subset.",
  "- See confusion matrix in Appendix A.",
  "",
  "Methodology:",
  "- 10-fold cross-validation was conducted.",
  "- Datasets X, Y, Z were used.",
  "Hyperparameters were tuned and fixed for fair comparison.",
  "",
  // Add ~40 filler lines for demonstration
  ...Array(40).fill().map((_,i)=>`Section ${i+1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec malesuada dui.`),
  "",
  "Conclusion:",
  "Model X demonstrates robust performance across a range of metrics, with low error rates and strong generalization in cross-validation. Further improvements may be realized via targeted augmentation in subset B.",
  "",
  "-- End of Report --"
].join('\n');

// PUBLIC_INTERFACE
function App() {
  // Modal open/close state
  const [showModal, setShowModal] = useState(false);

  // For modern minimal light theme, enforce Bootstrap's 'bg-light'
  useEffect(() => {
    document.body.classList.add("bg-light");
    return () => {
      document.body.classList.remove("bg-light");
    };
  }, []);

  // PUBLIC_INTERFACE
  const openModal = () => setShowModal(true);
  // PUBLIC_INTERFACE
  const closeModal = () => setShowModal(false);

  // PUBLIC_INTERFACE
  const handleDownload = () => {
    const blob = new Blob([evaluationReportContent], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = "evaluation_report.txt";
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="App container py-5" style={{minHeight: '100vh'}}>
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow-sm border-0 mb-4">
            <div className="card-body">
              <h2 className="card-title mb-2" style={{color: "#0d6efd"}}>{evaluationReportSummary.title}</h2>
              <div className="text-secondary small mb-2">
                <span>By {evaluationReportSummary.author}</span> &middot; <span>{evaluationReportSummary.date}</span>
              </div>
              <p className="card-text">{evaluationReportSummary.summary}</p>
              <button
                className="btn btn-primary px-4 py-2 mt-2"
                onClick={openModal}
                data-testid="open-report-btn"
                style={{borderRadius: '0.5rem', fontWeight: 500}}
              >
                View Full Report
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Modal */}
      {showModal && (
        <div
          className="modal fade show"
          tabIndex="-1"
          style={{display: "block", backgroundColor: "rgba(0,0,0,0.38)"}}
          aria-modal="true"
          role="dialog"
          data-testid="report-modal"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div className="modal-content border-0 shadow-sm">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title mb-0" id="modalTitle">{evaluationReportSummary.title}</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  aria-label="Close"
                  onClick={closeModal}
                  data-testid="modal-close-x"
                ></button>
              </div>
              <div className="modal-body" style={{maxHeight: '62vh', overflowY: 'auto', whiteSpace: 'pre-wrap', background: "#fcfcfc"}}>
                <pre
                  className="mb-0"
                  style={{
                    background: "none",
                    fontFamily: "monospace, Menlo, Consolas, monospace",
                    fontSize: "1rem",
                    color: "#333",
                    lineHeight: 1.5
                  }}
                  data-testid="modal-full-report"
                >
                  {evaluationReportContent}
                </pre>
              </div>
              <div className="modal-footer justify-content-between bg-light">
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={handleDownload}
                  data-testid="download-btn"
                  style={{borderRadius: '0.5rem', fontWeight: 500}}
                >
                  Download Report
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                  data-testid="cancel-btn"
                  style={{borderRadius: '0.5rem', fontWeight: 500}}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal backdrop (Bootstrap .modal-backdrop is not injected automatically) */}
      {showModal && (
        <div className="modal-backdrop fade show" style={{zIndex: 1040}}></div>
      )}
    </div>
  );
}

export default App;
