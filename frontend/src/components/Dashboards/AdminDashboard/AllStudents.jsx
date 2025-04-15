import { useState, useEffect } from "react";
import { getAllStudents } from "../../../utils";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingBar from 'react-top-loading-bar';

function AllStudents() {
  const [Progress, setProgress] = useState(0);
  const [allStudents, setallStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);

  const getCSV = async () => {
    setIsDownloading(true);
    setProgress(30);
    const hostel = JSON.parse(localStorage.getItem('hostel'))._id;
    try {
      const res = await fetch("http://localhost:3000/api/student/csv", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ hostel }),
      });
      const data = await res.json();
      if (data.success) {
        setProgress(60);
        const link = document.createElement('a');
        link.href = "data:text/csv;charset=utf-8," + escape(data.csv);
        link.download = 'students.csv';
        link.click();
        toast.success('CSV Downloaded Successfully!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
      } else {
        toast.error(data.errors[0].msg, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
      }
    } catch (error) {
      toast.error("Failed to download CSV", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
    setProgress(100);
    setTimeout(() => {
      setIsDownloading(false);
    }, 4000);
  };

  const getAll = async () => {
    const data = await getAllStudents();
    setallStudents(data.students);
  };

  const deleteStudent = async (id) => {
    const res = await fetch("http://localhost:3000/api/student/delete-student", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    const data = await res.json();
    if (data.success) {
      setallStudents(allStudents.filter((student) => student._id !== id));
      toast.success(
        'Student Deleted Successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })
    } else {
      toast.error(
        data.errors[0].msg, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      })
    }
  };

  useEffect(() => {
    getAll();
  }, [allStudents.length]);

  return (
    <div className="w-full h-screen flex flex-col gap-6 items-center justify-center pt-16 pb-10 overflow-auto">
      <LoadingBar color='#0000FF' progress={Progress} onLoaderFinished={() => setProgress(0)} />
      <h1 className="text-white font-bold text-4xl">All Students</h1>
      
      <div className="flex flex-col items-center gap-6 w-full max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
          <div className="bg-neutral-900 p-4 rounded-xl shadow-2xl">
            <p className="text-gray-400 text-sm">Total Students</p>
            <p className="text-white text-2xl font-bold mt-1">{allStudents.length}</p>
          </div>
          <div className="bg-neutral-900 p-4 rounded-xl shadow-2xl">
            <p className="text-gray-400 text-sm">Active Students</p>
            <p className="text-green-500 text-2xl font-bold mt-1">{allStudents.length}</p>
          </div>
          <div className="bg-neutral-900 p-4 rounded-xl shadow-2xl">
            <p className="text-gray-400 text-sm">Available Rooms</p>
            <p className="text-blue-500 text-2xl font-bold mt-1">50</p>
          </div>
        </div>

        <div className="bg-neutral-900 p-6 rounded-xl shadow-2xl w-full">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            <div>
              <h2 className="text-white text-xl font-bold">Student List</h2>
              <p className="text-gray-400 mt-1">Manage and view all registered students</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-neutral-800 text-white px-4 py-2 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-gray-400 absolute right-3 top-2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </div>
              <div className="container">
                <label className="label">
                  <input 
                    type="checkbox" 
                    className="input" 
                    checked={isDownloading}
                    onChange={getCSV}
                  />
                  <span className="circle">
                    <svg
                      className="icon"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M12 19V5m0 14-4-4m4 4 4-4"
                      />
                    </svg>
                    <div className="square"></div>
                  </span>
                  <p className="title">Download</p>
                  <p className="title">Open</p>
                </label>
              </div>
            </div>
          </div>

          <div className="bg-neutral-950 px-10 py-5 rounded-xl shadow-xl sm:w-[50%] sm:min-w-[500px] w-full mt-5 max-h-96 overflow-auto">
            <span className="text-white font-bold text-xl">All Students</span>
            <ul role="list" className="divide-y divide-gray-700 text-white">
              {allStudents.length === 0 ?
                "No Students Found"
              :
              allStudents.map((student) => (
                <li className="py-3 px-5 rounded sm:py-4 hover:bg-neutral-700 hover:scale-105 transition-all" key={student._id}>
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate text-white">
                        {student.name}
                      </p>
                      <p className="text-sm truncate text-gray-400">
                        {student.cms_id} | Room: {student.room_no}
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <button className="hover:underline hover:text-green-600 hover:scale-125 transition-all">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                          />
                        </svg>
                      </button>
                      <button className="hover:underline hover:text-red-500 hover:scale-125 transition-all" onClick={() => deleteStudent(student._id)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </button>
                      <ToastContainer 
                        position="top-right"
                        autoClose={3000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="dark"/>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

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

      <style jsx>{`
        .container {
          padding: 0;
          margin: 0;
          box-sizing: border-box;
          font-family: Arial, Helvetica, sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .label {
          background-color: transparent;
          border: 2px solid rgb(91, 91, 240);
          display: flex;
          align-items: center;
          border-radius: 50px;
          width: 160px;
          cursor: pointer;
          transition: all 0.4s ease;
          padding: 5px;
          position: relative;
        }

        .label::before {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          background-color: #fff;
          width: 8px;
          height: 8px;
          transition: all 0.4s ease;
          border-radius: 100%;
          margin: auto;
          opacity: 0;
          visibility: hidden;
        }

        .label .input {
          display: none;
        }

        .label .title {
          font-size: 17px;
          color: #fff;
          transition: all 0.4s ease;
          position: absolute;
          right: 18px;
          bottom: 14px;
          text-align: center;
        }

        .label .title:last-child {
          opacity: 0;
          visibility: hidden;
        }

        .label .circle {
          height: 45px;
          width: 45px;
          border-radius: 50%;
          background-color: rgb(91, 91, 240);
          display: flex;
          justify-content: center;
          align-items: center;
          transition: all 0.4s ease;
          position: relative;
          box-shadow: 0 0 0 0 rgb(255, 255, 255);
          overflow: hidden;
        }

        .label .circle .icon {
          color: #fff;
          width: 30px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          transition: all 0.4s ease;
        }

        .label .circle .square {
          aspect-ratio: 1;
          width: 15px;
          border-radius: 2px;
          background-color: #fff;
          opacity: 0;
          visibility: hidden;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          transition: all 0.4s ease;
        }

        .label .circle::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          background-color: #3333a8;
          width: 100%;
          height: 0;
          transition: all 0.4s ease;
        }

        .label:has(.input:checked) {
          width: 57px;
          animation: installed 0.4s ease 3.5s forwards;
        }

        .label:has(.input:checked)::before {
          animation: rotate 3s ease-in-out 0.4s forwards;
        }

        .label .input:checked + .circle {
          animation:
            pulse 1s forwards,
            circleDelete 0.2s ease 3.5s forwards;
          rotate: 180deg;
        }

        .label .input:checked + .circle::before {
          animation: installing 3s ease-in-out forwards;
        }

        .label .input:checked + .circle .icon {
          opacity: 0;
          visibility: hidden;
        }

        .label .input:checked ~ .circle .square {
          opacity: 1;
          visibility: visible;
        }

        .label .input:checked ~ .title {
          opacity: 0;
          visibility: hidden;
        }

        .label .input:checked ~ .title:last-child {
          animation: showInstalledMessage 0.4s ease 3.5s forwards;
        }

        @keyframes pulse {
          0% {
            scale: 0.95;
            box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7);
          }
          70% {
            scale: 1;
            box-shadow: 0 0 0 16px rgba(255, 255, 255, 0);
          }
          100% {
            scale: 0.95;
            box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
          }
        }

        @keyframes installing {
          from {
            height: 0;
          }
          to {
            height: 100%;
          }
        }

        @keyframes rotate {
          0% {
            transform: rotate(-90deg) translate(27px) rotate(0);
            opacity: 1;
            visibility: visible;
          }
          99% {
            transform: rotate(270deg) translate(27px) rotate(270deg);
            opacity: 1;
            visibility: visible;
          }
          100% {
            opacity: 0;
            visibility: hidden;
          }
        }

        @keyframes installed {
          100% {
            width: 150px;
            border-color: rgb(35, 174, 35);
          }
        }

        @keyframes circleDelete {
          100% {
            opacity: 0;
            visibility: hidden;
          }
        }

        @keyframes showInstalledMessage {
          100% {
            opacity: 1;
            visibility: visible;
            right: 56px;
          }
        }
      `}</style>
    </div>
  );
}

export default AllStudents;
