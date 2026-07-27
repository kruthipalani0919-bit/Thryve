import { useState } from "react";
import { X } from "lucide-react";
import { createSession } from "../../services/sessionApi";

const CreateSessionModal = ({ open, onClose, refreshSessions }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [form, setForm] = useState({
    title: "",
    subject: "",
    section: "",
    start_time: "",
  });

  if (!open) return null;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreate = async () => {
    try {
      await createSession({
        ...form,
        faculty_id: user.faculty_id,
        end_time: null,
      });

      alert("Session Created Successfully");

      refreshSessions();

      setForm({
        title: "",
        subject: "",
        section: "",
        start_time: "",
      });

      onClose();
    } catch (err) {
      console.log(err);
      alert("Failed to create session");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-3xl bg-white p-8 shadow-2xl">

        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">
              Create Session
            </h2>

            <p className="mt-1 text-slate-500">
              Start a new classroom session
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-slate-100"
          >
            <X />
          </button>
        </div>

        <div className="space-y-5">

          <input
            name="title"
            placeholder="Session Title"
            value={form.title}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500"
          />

          <input
            name="subject"
            placeholder="Subject"
            value={form.subject}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500"
          />

          <input
            name="section"
            placeholder="Section"
            value={form.section}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500"
          />

          <div>
            <label className="mb-2 block text-sm text-slate-600">
              Start Time
            </label>

            <input
              type="datetime-local"
              name="start_time"
              value={form.start_time}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500"
            />
          </div>

          <div className="flex justify-end gap-4 pt-4">

            <button
              onClick={onClose}
              className="rounded-xl border px-6 py-3 font-medium"
            >
              Cancel
            </button>

            <button
              onClick={handleCreate}
              className="rounded-xl bg-orange-500 px-6 py-3 font-medium text-white transition hover:bg-orange-600"
            >
              Create Session
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};

export default CreateSessionModal;