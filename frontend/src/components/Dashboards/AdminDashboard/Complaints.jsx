import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingBar from 'react-top-loading-bar';

function Complaints() {
  const [Progress, setProgress] = useState(0);
  const [unsolvedComplaints, setComplaints] = useState([]);
  const [resolvedComplaints, setResolvedComplaints] = useState([]);
  const [allComplaints, setAllComplaints] = useState([]);
  const [graphData, setGraphData] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const getComplaints = async () => {
    setProgress(30);
    const hostel = JSON.parse(localStorage.getItem("hostel"))._id;
    try {
      const response = await fetch(
        `http://localhost:3000/api/complaint/hostel`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ hostel }),
        }
      );

      const data = await response.json();
      if (data.success) {
        const complaints = [];
        data.complaints.map((complaint) => {
          let date = new Date(complaint.date);
          complaints.unshift({
            id: complaint._id,
            type: complaint.type,
            title: complaint.title,
            desc: complaint.description,
            student: complaint.student.name,
            room: complaint.student.room_no,
            status: complaint.status,
            date: date.toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" }),
          });
        });
        setProgress(60);
        setAllComplaints(complaints);
        const resolved = complaints.filter(
          (complaint) => complaint.status.toLowerCase() !== "pending"
        );
        setResolvedComplaints(resolved);
        setComplaints(
          complaints.filter(
            (complaint) => complaint.status.toLowerCase() === "pending"
          )
        );
      }
    } catch (error) {
      toast.error("Failed to fetch complaints", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
    setProgress(100);
  };

  const dismissComplaint = async (id) => {
    setProgress(30);
    try {
      const response = await fetch(
        "http://localhost:3000/api/complaint/resolve/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        }
      );

      const data = await response.json();
      if (data.success) {
        toast.success("Complaint resolved successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setProgress(60);
        setComplaints(
          allComplaints.filter((complaint) => complaint.id !== id)
        );
        setResolvedComplaints(
          resolvedComplaints.concat(
            allComplaints.filter((complaint) => complaint.id === id)
          )
        );
        setShowDetails(false);
        setSelectedComplaint(null);
      } else {
        toast.error("Failed to resolve complaint", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      toast.error("Something went wrong", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
    setProgress(100);
  };

  const handleReadMore = (complaint) => {
    setSelectedComplaint(complaint);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedComplaint(null);
  };

  useEffect(() => {
    getComplaints();
    const dates = [
      new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toLocaleDateString(
        "en-US",
        { day: "numeric", month: "long", year: "numeric" }
      ),
      new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toLocaleDateString(
        "en-US",
        { day: "numeric", month: "long", year: "numeric" }
      ),
      new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toLocaleDateString(
        "en-US",
        { day: "numeric", month: "long", year: "numeric" }
      ),
      new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toLocaleDateString(
        "en-US",
        { day: "numeric", month: "long", year: "numeric" }
      ),
      new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toLocaleDateString(
        "en-US",
        { day: "numeric", month: "long", year: "numeric" }
      ),
      new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toLocaleDateString(
        "en-US",
        { day: "numeric", month: "long", year: "numeric" }
      ),
      new Date(Date.now() - 0 * 24 * 60 * 60 * 1000).toLocaleDateString(
        "en-US",
        { day: "numeric", month: "long", year: "numeric" }
      ),
    ];

    const labels = dates.map((date) => date);
    setGraphData(
      labels.map(
        (date) =>
          allComplaints.filter((complaint) => complaint.date === date).length
      )
    );
  }, [allComplaints.length, unsolvedComplaints.length, resolvedComplaints.length]);

  const graph = (
    <div className="bg-neutral-900 p-6 rounded-xl shadow-2xl w-full">
      <h2 className="text-white text-xl font-bold mb-2">Complaints Trend</h2>
      <div className="h-48">
        <Line
          data={{
            labels: [
              new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toLocaleDateString(
                "en-US",
                { day: "numeric", month: "short" }
              ),
              new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toLocaleDateString(
                "en-US",
                { day: "numeric", month: "short" }
              ),
              new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toLocaleDateString(
                "en-US",
                { day: "numeric", month: "short" }
              ),
              new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toLocaleDateString(
                "en-US",
                { day: "numeric", month: "short" }
              ),
              new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toLocaleDateString(
                "en-US",
                { day: "numeric", month: "short" }
              ),
              new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toLocaleDateString(
                "en-US",
                { day: "numeric", month: "short" }
              ),
              new Date(Date.now() - 0 * 24 * 60 * 60 * 1000).toLocaleDateString(
                "en-US",
                { day: "numeric", month: "short" }
              ),
            ],
            datasets: [
              {
                label: "Complaints",
                data: graphData,
                borderColor: "rgb(59, 130, 246)",
                backgroundColor: "rgba(59, 130, 246, 0.1)",
                tension: 0.4,
                fill: true,
                pointBackgroundColor: "rgb(59, 130, 246)",
                pointBorderColor: "#fff",
                pointBorderWidth: 2,
                pointRadius: 3,
                pointHoverRadius: 5,
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                titleColor: "#fff",
                bodyColor: "#fff",
                padding: 10,
                displayColors: false,
                callbacks: {
                  label: function(context) {
                    return `${context.parsed.y} complaints`;
                  }
                }
              },
            },
            scales: {
              x: {
                grid: {
                  display: false,
                  drawBorder: false,
                },
                ticks: {
                  color: "#9CA3AF",
                  font: {
                    size: 10
                  }
                },
              },
              y: {
                beginAtZero: true,
                grid: {
                  color: "rgba(75, 85, 99, 0.2)",
                  drawBorder: false,
                },
                ticks: {
                  color: "#9CA3AF",
                  stepSize: 1,
                  font: {
                    size: 10
                  }
                },
              },
            },
          }}
        />
      </div>
    </div>
  );

  return (
    <div className="w-full min-h-screen flex flex-col gap-6 items-center pt-20 pb-10 px-4 overflow-auto">
      <LoadingBar color='#0000FF' progress={Progress} onLoaderFinished={() => setProgress(0)} />
      
      <div className="w-full max-w-7xl">
        <h1 className="text-white font-bold text-4xl mb-6">Complaints Management</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-neutral-900 p-4 rounded-xl shadow-2xl">
            <p className="text-gray-400 text-sm">Total Complaints</p>
            <p className="text-white text-2xl font-bold mt-1">{allComplaints.length}</p>
          </div>
          <div className="bg-neutral-900 p-4 rounded-xl shadow-2xl">
            <p className="text-gray-400 text-sm">Pending Complaints</p>
            <p className="text-yellow-500 text-2xl font-bold mt-1">{unsolvedComplaints.length}</p>
          </div>
          <div className="bg-neutral-900 p-4 rounded-xl shadow-2xl">
            <p className="text-gray-400 text-sm">Resolved Complaints</p>
            <p className="text-green-500 text-2xl font-bold mt-1">{resolvedComplaints.length}</p>
          </div>
        </div>

        {graph}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <div className="bg-neutral-900 p-6 rounded-xl shadow-2xl">
            <h2 className="text-white text-xl font-bold mb-4">Pending Complaints</h2>
            <div className="space-y-4 max-h-[400px] overflow-y-auto">
              {unsolvedComplaints.length === 0 ? (
                <p className="text-gray-400 text-center py-4">No pending complaints</p>
              ) : (
                unsolvedComplaints.map((complaint) => (
                  <div key={complaint.id} className="bg-neutral-800 p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-white font-semibold">{complaint.title}</h3>
                      <span className="text-yellow-500 text-sm">{complaint.status}</span>
                    </div>
                    <p className="text-gray-400 text-sm mb-2 line-clamp-2">{complaint.desc}</p>
                    <div className="flex justify-between items-center text-sm">
                      <div className="text-gray-400">
                        <span className="font-medium text-white">{complaint.student}</span> • Room {complaint.room}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleReadMore(complaint)}
                          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                        >
                          Read More
                        </button>
                        <button
                          onClick={() => dismissComplaint(complaint.id)}
                          className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                        >
                          Resolve
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="bg-neutral-900 p-6 rounded-xl shadow-2xl">
            <h2 className="text-white text-xl font-bold mb-4">Resolved Complaints</h2>
            <div className="space-y-4 max-h-[400px] overflow-y-auto">
              {resolvedComplaints.length === 0 ? (
                <p className="text-gray-400 text-center py-4">No resolved complaints</p>
              ) : (
                resolvedComplaints.map((complaint) => (
                  <div key={complaint.id} className="bg-neutral-800 p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-white font-semibold">{complaint.title}</h3>
                      <span className="text-green-500 text-sm">{complaint.status}</span>
                    </div>
                    <p className="text-gray-400 text-sm mb-2 line-clamp-2">{complaint.desc}</p>
                    <div className="flex justify-between items-center text-sm">
                      <div className="text-gray-400">
                        <span className="font-medium text-white">{complaint.student}</span> • Room {complaint.room}
                      </div>
                      <span className="text-gray-500">{complaint.date}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Complaint Details Modal */}
      {showDetails && selectedComplaint && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-neutral-900 rounded-xl shadow-2xl w-full max-w-2xl p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-white text-2xl font-bold">{selectedComplaint.title}</h2>
              <button 
                onClick={handleCloseDetails}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-400 text-sm mb-2">From: <span className="text-white font-medium">{selectedComplaint.student}</span> • Room {selectedComplaint.room}</p>
              <p className="text-gray-400 text-sm mb-2">Date: <span className="text-white">{selectedComplaint.date}</span></p>
              <p className="text-gray-400 text-sm mb-2">Type: <span className="text-white">{selectedComplaint.type}</span></p>
              <p className="text-gray-400 text-sm mb-2">Status: <span className="text-yellow-500">{selectedComplaint.status}</span></p>
            </div>
            
            <div className="bg-neutral-800 p-4 rounded-lg mb-6">
              <h3 className="text-white font-semibold mb-2">Description</h3>
              <p className="text-gray-300">{selectedComplaint.desc}</p>
            </div>
            
            <div className="flex justify-end">
              <button
                onClick={handleCloseDetails}
                className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 text-white rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
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

export default Complaints;
