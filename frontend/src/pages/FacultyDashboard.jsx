import { useEffect, useState } from "react";
import FacultySidebar from "../components/dashboard/FacultySidebar";
import FacultyTopbar from "../components/dashboard/FacultyTopbar";
import StatCard from "../components/dashboard/StatCard";
import { getFacultySessions } from "../services/sessionApi";

const FacultyDashboard = () => {
  const [sessions, setSessions] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = async () => {
    try {
      const res = await getFacultySessions(user.faculty_id);
      setSessions(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
    <FacultySidebar />

      <div className="flex-1">
       <FacultyTopbar />

        <main className="p-8">

          {/* Statistics */}

          <div className="grid grid-cols-4 gap-6">
            <StatCard
              title="Total Sessions"
              value={sessions.length}
              color="#F97316"
            />

            <StatCard
              title="Students Online"
              value="0"
              color="#3B82F6"
            />

            <StatCard
              title="Live Polls"
              value="0"
              color="#8B5CF6"
            />

            <StatCard
              title="Engagement"
              value="0%"
              color="#E11D48"
            />
          </div>

          {/* Dashboard Content */}

          <div className="mt-8 grid grid-cols-2 gap-6">

            {/* Today's Schedule */}

            <div className="rounded-3xl bg-white p-8 shadow-sm">

              <h2 className="text-2xl font-bold">
                Today's Schedule
              </h2>

              <div className="mt-6 space-y-4">

                <div className="rounded-2xl border border-slate-200 p-5">
                  <p className="text-sm text-slate-500">
                    10:00 AM
                  </p>

                  <h3 className="mt-1 text-xl font-semibold">
                    Software Engineering
                  </h3>

                  <p className="text-slate-500">
                    CSIT-A
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 p-5">
                  <p className="text-sm text-slate-500">
                    2:00 PM
                  </p>

                  <h3 className="mt-1 text-xl font-semibold">
                    DBMS
                  </h3>

                  <p className="text-slate-500">
                    CSIT-B
                  </p>
                </div>

              </div>

            </div>

            {/* Recent Activity */}

            <div className="rounded-3xl bg-white p-8 shadow-sm">

              <h2 className="text-2xl font-bold">
                Recent Activity
              </h2>

              <div className="mt-6 space-y-4">

                <div className="rounded-xl bg-orange-50 p-4 text-slate-700">
                  ✅ Session created successfully
                </div>

                <div className="rounded-xl bg-blue-50 p-4 text-slate-700">
                  📊 Quiz completed by students
                </div>

                <div className="rounded-xl bg-green-50 p-4 text-slate-700">
                  🤖 AI quiz created succesfully
                </div>

              </div>

            </div>

          </div>

        </main>

      </div>

    </div>
  );
};

export default FacultyDashboard;