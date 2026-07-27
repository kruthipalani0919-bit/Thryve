import { useEffect, useState } from "react";

import FacultySidebar from "../components/dashboard/FacultySidebar";
import FacultyTopbar from "../components/dashboard/FacultyTopbar";
import SessionCard from "../components/dashboard/SessionCard";
import FloatingButton from "../components/dashboard/FloatingButton";

import CreateSessionModal from "../components/session/CreateSessionModal";
import EditSessionModal from "../components/session/EditSessionModal";

import { getFacultySessions } from "../services/sessionApi";

const MySessions = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [sessions, setSessions] = useState([]);

  const [openCreateModal, setOpenCreateModal] = useState(false);

  const [openEditModal, setOpenEditModal] = useState(false);

  const [selectedSession, setSelectedSession] = useState(null);

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

  const handleEdit = (session) => {
    setSelectedSession(session);
    setOpenEditModal(true);
  };

  return (
    <div className="flex min-h-screen bg-slate-100">

      <FacultySidebar />

      <div className="flex-1">

        <FacultyTopbar />

        <main className="p-8">

          <h1 className="mb-8 text-4xl font-bold">
            My Sessions
          </h1>

          <div className="grid grid-cols-2 gap-6">

            {sessions.map((session) => (
              <SessionCard
                key={session.id}
                session={session}
                onEdit={handleEdit}
                refreshSessions={loadSessions}
              />
            ))}

          </div>

        </main>

        <FloatingButton
          onClick={() => setOpenCreateModal(true)}
        />

        <CreateSessionModal
          open={openCreateModal}
          onClose={() => setOpenCreateModal(false)}
          refreshSessions={loadSessions}
        />

        <EditSessionModal
          open={openEditModal}
          onClose={() => setOpenEditModal(false)}
          session={selectedSession}
          refreshSessions={loadSessions}
        />

      </div>

    </div>
  );
};

export default MySessions;