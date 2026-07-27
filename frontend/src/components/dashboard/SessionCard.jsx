import { useNavigate } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import { deleteSession } from "../../services/sessionApi";

const SessionCard = ({
  session,
  onEdit,
  refreshSessions,
}) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this session?"
    );

    if (!confirmDelete) return;

    try {
      await deleteSession(session.id);

      alert("Session Deleted Successfully");

      refreshSessions();
    } catch (err) {
      console.log(err);
      alert("Failed to delete session");
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg">

      {/* Top Row */}

      <div className="flex items-start justify-between">

        <div>

          <h3 className="text-xl font-semibold text-slate-900">
            {session.title}
          </h3>

          <p className="mt-1 text-slate-500">
            {session.subject}
          </p>

          <p className="mt-2 text-sm text-slate-400">
            Section : {session.section}
          </p>

          <p className="mt-1 text-sm text-slate-400">
            Code : {session.session_code}
          </p>

        </div>

        {/* Edit/Delete Icons */}

        <div className="flex gap-2">

          <button
            onClick={() => onEdit(session)}
            className="rounded-lg p-2 text-blue-600 hover:bg-blue-100"
          >
            <Pencil size={18} />
          </button>

          <button
            onClick={handleDelete}
            className="rounded-lg p-2 text-red-600 hover:bg-red-100"
          >
            <Trash2 size={18} />
          </button>

        </div>

      </div>

      {/* Open Button */}

      <button
        onClick={() => navigate(`/live/${session.session_code}`)}
        className="mt-6 w-full rounded-xl bg-orange-500 py-3 text-white transition hover:bg-orange-600"
      >
        Open Session
      </button>


      <button
  onClick={() => navigate(`/quiz/${session.id}`)}
  className="mt-3 w-full rounded-xl border border-orange-500 py-3 font-semibold text-orange-500 hover:bg-orange-50"
>
  Manage Quiz
</button>

    </div>
  );
};

export default SessionCard;