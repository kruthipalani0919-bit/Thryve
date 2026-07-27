import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { updateSession } from "../../services/sessionApi";

const EditSessionModal = ({
  open,
  onClose,
  session,
  refreshSessions,
}) => {
  const [form, setForm] = useState({
    title: "",
    subject: "",
    section: "",
    start_time: "",
  });

  useEffect(() => {
    if (session) {
      setForm({
        title: session.title,
        subject: session.subject,
        section: session.section,
        start_time: session.start_time
          ? session.start_time.slice(0, 16)
          : "",
      });
    }
  }, [session]);

  if (!open || !session) return null;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      await updateSession(session.id, form);

      alert("Session Updated Successfully");

      refreshSessions();

      onClose();
    } catch (err) {
      console.log(err);
      alert("Failed to update session");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-3xl bg-white p-8 shadow-2xl">

        <div className="mb-8 flex items-center justify-between">

          <div>

            <h2 className="text-3xl font-bold">
              Edit Session
            </h2>

            <p className="mt-1 text-slate-500">
              Update classroom details
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
            value={form.title}
            onChange={handleChange}
            className="w-full rounded-xl border px-4 py-3"
          />

          <input
            name="subject"
            value={form.subject}
            onChange={handleChange}
            className="w-full rounded-xl border px-4 py-3"
          />

          <input
            name="section"
            value={form.section}
            onChange={handleChange}
            className="w-full rounded-xl border px-4 py-3"
          />

          <input
            type="datetime-local"
            name="start_time"
            value={form.start_time}
            onChange={handleChange}
            className="w-full rounded-xl border px-4 py-3"
          />

          <div className="flex justify-end gap-4">

            <button
              onClick={onClose}
              className="rounded-xl border px-6 py-3"
            >
              Cancel
            </button>

            <button
              onClick={handleUpdate}
              className="rounded-xl bg-orange-500 px-6 py-3 text-white hover:bg-orange-600"
            >
              Update Session
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};

export default EditSessionModal;