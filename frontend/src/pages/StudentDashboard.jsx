import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentSidebar from "../components/dashboard/StudentSidebar";
import StudentTopbar from "../components/dashboard/StudentTopbar";
import QRScanner from "../components/student/QRScanner";
import JoinCodeModal from "../components/student/JoinCodeModal";
import { joinSession } from "../services/joinApi";

const StudentDashboard = () => {
  const navigate = useNavigate();

  const student = JSON.parse(localStorage.getItem("user"));

  const [showScanner, setShowScanner] = useState(false);
  const [showCodeModal, setShowCodeModal] = useState(false);

  const handleJoin = async (value) => {
    try {
      let sessionCode = value;

      // QR contains URL → extract session code
      if (value.startsWith("http")) {
        const parts = value.split("/");
        sessionCode = parts[parts.length - 1];
      }

      const res = await joinSession({
        session_code: sessionCode,
        student_id: student.student_id,
      });

      alert(res.data.message);

      setShowScanner(false);
      setShowCodeModal(false);

      navigate(`/join/${sessionCode}`);

    } catch (err) {
      console.log(err);

      alert(
        err.response?.data?.message ||
        "Unable to join session."
      );
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-100">

      <StudentSidebar />

      <div className="flex-1">

       <StudentTopbar />

        <main className="p-8">

          <h1 className="text-4xl font-bold">
            Student Dashboard
          </h1>

          <p className="mt-2 text-slate-500">
            Join your classroom instantly.
          </p>

          <div className="mt-10 flex gap-5">

            <button
              onClick={() => setShowScanner(true)}
              className="rounded-xl bg-orange-500 px-8 py-4 font-semibold text-white transition hover:bg-orange-600"
            >
              Scan QR
            </button>

            <button
              onClick={() => setShowCodeModal(true)}
              className="rounded-xl border border-slate-300 px-8 py-4 font-semibold transition hover:border-orange-500"
            >
              Enter Session Code
            </button>

          </div>

          {showScanner && (
            <div className="mt-8">
              <QRScanner
                onScan={handleJoin}
              />
            </div>
          )}

        </main>

      </div>

      <JoinCodeModal
        open={showCodeModal}
        onClose={() => setShowCodeModal(false)}
        onJoin={handleJoin}
      />

    </div>
  );
};

export default StudentDashboard;