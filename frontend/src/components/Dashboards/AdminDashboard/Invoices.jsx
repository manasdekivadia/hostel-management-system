import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingBar from 'react-top-loading-bar'

function Invoices() {
  const genInvoices = async () => {
    setProgress(30)
    let hostel = JSON.parse(localStorage.getItem("hostel"));
    try {
      const res = await fetch("http://localhost:3000/api/invoice/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ hostel: hostel._id })
      });
      setProgress(60)
      const data = await res.json();
      if (data.success) {
        toast.success(
          "Invoices generated succesfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        })
        getInvoices();
      }
      else {
        toast.error(
          data.errors, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        })
      }
    } catch (err) {
      toast.error(
        err.errors, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })
    }
    setProgress(100)
  };

  const approveInvoice = async (id) => {
    setProgress(30);
    try {
      const res = await fetch("http://localhost:3000/api/invoice/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ student: id, status: "approved" })
      });
      setProgress(60);
      const data = await res.json();
      if (data.success) {
        toast.success(
          "Invoice approved succesfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        })
        getInvoices();
      }
      else {
        toast.error(
          "Something went wrong!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        })
      }
    } catch (err) {
      toast.error(
        "Something went wrong!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })
    }
    setProgress(100);
  };

  const getInvoices = async () => {
    setProgress(30);
    let hostel = JSON.parse(localStorage.getItem("hostel"));
    try {
      const res = await fetch("http://localhost:3000/api/invoice/getbyid", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ hostel: hostel._id })
      });
      setProgress(60);
      const data = await res.json();
      if (data.success) {
        setAllInvoices(data.invoices);
        setPendingInvoices(data.invoices.filter((invoice) => invoice.status === "pending"));
      }
      else {
        toast.error(
          data.errors, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        })
      }
    } catch (err) {
      toast.error(
        err.errors, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",

      })
    }
    setProgress(100);
  };

  const [Progress, setProgress] = useState(0)
  const [allInvoices, setAllInvoices] = useState([]);
  const [pendingInvoices, setPendingInvoices] = useState([]);

  useEffect(() => {
    getInvoices();
  }, [allInvoices.length, pendingInvoices.length]);

  return (
    <div className="w-full h-screen flex flex-col gap-6 items-center justify-center pt-20 pb-10 overflow-auto">
      <LoadingBar color='#0000FF' progress={Progress} onLoaderFinished={() => setProgress(0)} />
      <h1 className="text-white font-bold text-5xl mt-16">Invoices</h1>
      
      <div className="flex flex-col items-center gap-8 w-full max-w-6xl">
        <div className="bg-neutral-900 p-8 rounded-xl shadow-2xl w-full">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            <div>
              <h2 className="text-white text-2xl font-bold">Invoice Management</h2>
              <p className="text-gray-400 mt-1">Generate and manage student invoices</p>
            </div>
            <button 
              onClick={genInvoices} 
              className="flex items-center gap-2 py-3 px-6 rounded-lg font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/20"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Generate Invoices
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-neutral-800 p-4 rounded-lg">
              <p className="text-gray-400 text-sm">Total Invoices</p>
              <p className="text-white text-2xl font-bold">{allInvoices.length}</p>
            </div>
            <div className="bg-neutral-800 p-4 rounded-lg">
              <p className="text-gray-400 text-sm">Pending Invoices</p>
              <p className="text-orange-500 text-2xl font-bold">{pendingInvoices.length}</p>
            </div>
            <div className="bg-neutral-800 p-4 rounded-lg">
              <p className="text-gray-400 text-sm">Approved Invoices</p>
              <p className="text-green-500 text-2xl font-bold">{allInvoices.length - pendingInvoices.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-neutral-900 p-8 rounded-xl shadow-2xl w-full">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-white text-2xl font-bold">Pending Invoices</h2>
            <span className="bg-orange-500/20 text-orange-500 px-3 py-1 rounded-full text-sm font-medium">
              {pendingInvoices.length} Pending
            </span>
          </div>
          
          {pendingInvoices.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-gray-600 mb-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V19.5a2.25 2.25 0 002.25 2.25h.75m0-3H12m-.75 3h3.75m-3.75 0V19.5m0 3h6.75M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" />
              </svg>
              <p className="text-white text-xl font-medium">No pending invoices</p>
              <p className="text-gray-400 mt-2">All invoices have been processed</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-white">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="py-3 px-4 text-left">Student</th>
                    <th className="py-3 px-4 text-left">Room</th>
                    <th className="py-3 px-4 text-left">Amount</th>
                    <th className="py-3 px-4 text-left">Date</th>
                    <th className="py-3 px-4 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingInvoices.map((invoice) => (
                    <tr key={invoice.id} className="border-b border-gray-800 hover:bg-neutral-800 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                            <span className="text-blue-500 font-medium">{invoice.student.name.charAt(0)}</span>
                          </div>
                          <span>{invoice.student.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">{invoice.student.room_no}</td>
                      <td className="py-4 px-4 font-medium">Rs. {invoice.amount}</td>
                      <td className="py-4 px-4 text-gray-400">
                        {new Date(invoice.date).toLocaleDateString('en-US', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </td>
                      <td className="py-4 px-4">
                        <button 
                          onClick={() => approveInvoice(invoice.student._id)}
                          className="flex items-center gap-1 text-green-500 hover:text-green-400 transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>Approve</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default Invoices;
