import { useState } from "react";
import { Input } from "./Input";
import { Button } from "../Common/PrimaryButton";
import { Loader } from "../Common/Loader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from "framer-motion";

function RegisterStudent() {
  const [cms, setCms] = useState("");
  const [name, setName] = useState("");
  const [room_no, setRoomNo] = useState("");
  const [batch, setBatch] = useState("");
  const [dept, setDept] = useState("");
  const [course, setCourse] = useState("");
  const [email, setEmail] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState("");
  const [cnic, setCnic] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const hostel = JSON.parse(localStorage.getItem("hostel"))?.name || "";

  const registerStudent = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const student = {
        name,
        cms_id: cms,
        room_no,
        batch,
        dept,
        course,
        email,
        father_name: fatherName,
        contact,
        address,
        dob,
        cnic,
        hostel,
        password
      };

      const res = await fetch("http://localhost:3000/api/student/register-student", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student),
      });

      const data = await res.json();

      if (data.success) {
        toast.success(`Student ${data.student.name} Registered Successfully!`);
        setCms(""); setName(""); setRoomNo(""); setBatch("");
        setDept(""); setCourse(""); setEmail(""); setFatherName("");
        setContact(""); setAddress(""); setDob(""); setCnic(""); setPassword("");
      } else {
        data.errors.forEach((err) => toast.error(err.msg));
      }
    } catch (err) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full pt-20 px-4 flex flex-col items-center justify-start bg-black text-white relative"> 
      {/* Removed the animated gradient div */}

      <motion.h1 
        className="text-4xl md:text-5xl font-extrabold mb-8 z-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Register Student
      </motion.h1>

      <motion.div
        className="w-full max-w-5xl p-8 md:p-12 bg-neutral-900 rounded-2xl shadow-2xl z-10 backdrop-blur-sm border border-neutral-700"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <form onSubmit={registerStudent} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Input field={{ name: "name", placeholder: "Student Name", type: "text", req: true, value: name, onChange: (e) => setName(e.target.value) }} />
            <Input field={{ name: "ID", placeholder: "Student ID", type: "number", req: true, value: cms, onChange: (e) => setCms(e.target.value) }} />
            <Input field={{ name: "DOB", placeholder: "Date of Birth", type: "date", req: true, value: dob, onChange: (e) => setDob(e.target.value) }} />
            <Input field={{ name: "Aadhaar", placeholder: "Student Aadhaar", type: "text", req: true, value: cnic, onChange: (e) => setCnic(e.target.value) }} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input field={{ name: "email", placeholder: "Student Email", type: "email", req: true, value: email, onChange: (e) => setEmail(e.target.value) }} />
            <Input field={{ name: "contact", placeholder: "Contact Number", type: "text", req: true, value: contact, onChange: (e) => setContact(e.target.value) }} />
            <Input field={{ name: "father's Name", placeholder: "Father's Name", type: "text", req: true, value: fatherName, onChange: (e) => setFatherName(e.target.value) }} />
          </div>

          <div className="grid grid-cols-1">
            <Input
              field={{
                name: "address",
                placeholder: "Student Address",
                type: "textarea",
                req: true,
                value: address,
                onChange: (e) => setAddress(e.target.value),
              }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input field={{ name: "room", placeholder: "Room Number", type: "number", req: true, value: room_no, onChange: (e) => setRoomNo(e.target.value) }} />
            <Input field={{ name: "hostel", placeholder: "Hostel Name", type: "text", req: true, value: hostel, disabled: true }} />
            <Input field={{ name: "dept", placeholder: "Department", type: "text", req: true, value: dept, onChange: (e) => setDept(e.target.value) }} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input field={{ name: "course", placeholder: "Course", type: "text", req: true, value: course, onChange: (e) => setCourse(e.target.value) }} />
            <Input field={{ name: "batch", placeholder: "Batch", type: "number", req: true, value: batch, onChange: (e) => setBatch(e.target.value) }} />
          </div>

          <Input field={{ name: "password", placeholder: "Password", type: "password", req: true, value: password, onChange: (e) => setPassword(e.target.value) }} />

          <div className="flex justify-center mt-6">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button>
                {loading ? (
                  <>
                    <Loader /> Registering...
                  </>
                ) : (
                  "Register Student"
                )}
              </Button>
            </motion.div>
          </div>
        </form>
      </motion.div>
      <ToastContainer />
    </div>
  );
}

export default RegisterStudent;