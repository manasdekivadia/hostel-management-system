import { useEffect, useRef, useState } from "react";
import { Modal } from "./Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader } from "../../Dashboards/Common/Loader";
import LoadingBar from 'react-top-loading-bar';

function Suggestions() {
  const [Progress, setProgress] = useState(0);
  const [loader, setLoader] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(false);
  const [allSuggestions, setAllSuggestions] = useState([]);
  const [approvedSuggestions, setApprovedSuggestions] = useState([]);

  const getSuggestions = async () => {
    setProgress(30);
    const hostel = JSON.parse(localStorage.getItem("hostel"));
    try {
      const response = await fetch("http://localhost:3000/api/suggestion/hostel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ hostel: hostel._id }),
      });

      const data = await response.json();
      if (data.success) {
        setProgress(60);
        setAllSuggestions(data.suggestions);
        setSuggestions(data.suggestions.filter((suggestion) => suggestion.status === "pending"));
        setApprovedSuggestions(data.suggestions.filter((suggestion) => suggestion.status === "approved"));
      } else {
        toast.error("Failed to fetch suggestions", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
        });
      }
    } catch (error) {
      toast.error("Something went wrong", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      });
    }
    setProgress(100);
  };

  const updateSuggestion = async (id) => {
    setLoader(true);
    setProgress(30);
    try {
      const response = await fetch("http://localhost:3000/api/suggestion/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({id, status: "approved"}),
      });

      const data = await response.json();
      if (data.success) {
        setProgress(60);
        toast.success("Suggestion approved successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
        });
        getSuggestions();
      } else {
        toast.error("Failed to approve suggestion", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
        });
      }
    } catch (error) {
      toast.error("Something went wrong", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      });
    }
    setLoader(false);
    setProgress(100);
  };

  const toggleModal = (suggestion = {}) => {
    setModalData(suggestion);
    setShowModal((showModal) => !showModal);
  };

  useEffect(() => {
    getSuggestions();
  }, []);

  return (
    <div className="w-full h-screen flex flex-col gap-4 items-center justify-center pt-16 pb-10 overflow-auto">
      <LoadingBar color='#0000FF' progress={Progress} onLoaderFinished={() => setProgress(0)} />
      <h1 className="text-white font-bold text-4xl">Suggestions</h1>
      
      <div className="flex flex-col items-center gap-6 w-full max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
          <div className="bg-neutral-900 p-4 rounded-xl shadow-2xl">
            <p className="text-gray-400 text-sm">Total Suggestions</p>
            <p className="text-white text-2xl font-bold mt-1">{allSuggestions.length}</p>
          </div>
          <div className="bg-neutral-900 p-4 rounded-xl shadow-2xl">
            <p className="text-gray-400 text-sm">Pending Suggestions</p>
            <p className="text-orange-500 text-2xl font-bold mt-1">{suggestions.length}</p>
          </div>
          <div className="bg-neutral-900 p-4 rounded-xl shadow-2xl">
            <p className="text-gray-400 text-sm">Approved Suggestions</p>
            <p className="text-green-500 text-2xl font-bold mt-1">{approvedSuggestions.length}</p>
          </div>
        </div>

        <div className="bg-neutral-900 p-6 rounded-xl shadow-2xl w-full">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-white text-xl font-bold">Pending Suggestions</h2>
            <span className="bg-orange-500/20 text-orange-500 px-3 py-1 rounded-full text-sm font-medium">
              {suggestions.length} Pending
            </span>
          </div>
          
          {suggestions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-gray-600 mb-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-white text-xl font-medium">No pending suggestions</p>
              <p className="text-gray-400 mt-2">All suggestions have been reviewed</p>
            </div>
          ) : (
            <div className="space-y-4">
              {suggestions.map((suggestion) => (
                <div
                  key={suggestion._id}
                  className="bg-neutral-800 p-4 rounded-lg hover:bg-neutral-700 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5 text-blue-500"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-white font-medium">{suggestion.title}</h3>
                        <p className="text-gray-400 text-sm mt-1 line-clamp-2">{suggestion.description}</p>
                        <button
                          className="text-blue-500 text-sm mt-2 hover:text-blue-400 transition-colors"
                          onClick={() => toggleModal(suggestion)}
                        >
                          Read more
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => updateSuggestion(suggestion._id)}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/20 text-green-500 hover:bg-green-500/30 transition-colors"
                    >
                      {loader ? (
                        <Loader />
                      ) : (
                        <>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span>Approve</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {showModal && (
        <Modal 
          closeModal={toggleModal} 
          suggestion={modalData} 
          updateSuggestion={updateSuggestion}
        />
      )}
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={true}
        pauseOnHover={false}
        theme="dark"
      />
    </div>
  );
}

export default Suggestions;
