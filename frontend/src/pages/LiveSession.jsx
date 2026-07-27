import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import FacultySidebar from "../components/dashboard/FacultySidebar";
import FacultyTopbar from "../components/dashboard/FacultyTopbar";
import socket from "../services/socket";

const LiveSession = () => {
  const { code } = useParams();

  const [students, setStudents] = useState([]);

  const joinUrl = `http://localhost:5173/join/${code}`;

  // Join Socket Room
  useEffect(() => {
    socket.emit("join-room", code);

    return () => {
      socket.off("student-joined");
    };
  }, [code]);

  // Listen for new students
  useEffect(() => {
    socket.on("student-joined", (student) => {
setStudents((prev) => {
  const exists = prev.find(
    (s) => s.student_id === student.student_id
  );

  if (exists) return prev;

  return [...prev, student];
});
    });

    return () => {
      socket.off("student-joined");
    };
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-100">
      <FacultySidebar />

      <div className="flex-1">
       <FacultyTopbar />

        <main className="p-8">
          <div className="rounded-3xl bg-white p-10 shadow">

            <h1 className="text-3xl font-bold">
              Live Classroom
            </h1>

            <p className="mt-2 text-slate-500">
              Session Code
            </p>

            <h2 className="mt-2 text-5xl font-bold tracking-widest text-orange-500">
              {code}
            </h2>

            <div className="mt-10 flex justify-center">
              <div className="rounded-2xl bg-white p-6 shadow">
                <QRCode
                  value={joinUrl}
                  size={240}
                />
              </div>
            </div>

            <div className="mt-10 rounded-2xl bg-slate-100 p-5">

              <h3 className="text-xl font-semibold">
                Students Joined ({students.length})
              </h3>

              <div className="mt-4 space-y-2">

                {students.length === 0 ? (
                  <p className="text-slate-500">
                    No students yet...
                  </p>
                ) : (
                 students.map((student) => (
                      <div key={student.student_id}>
                        {student.student_name}
                      </div>
                    ))
                                    )}

              </div>

            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default LiveSession;