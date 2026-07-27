import { useState } from "react";
import { X } from "lucide-react";
import api from "../../services/api";

const CreateQuizModal = ({
  open,
  onClose,
  sessionId,
  refreshQuizzes,
}) => {

  const [form, setForm] = useState({
    title: "",
    duration: 30,
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

      await api.post("/quizzes", {
        session_id: sessionId,
        title: form.title,
        duration: Number(form.duration),
      });

      alert("Quiz Created Successfully");

      setForm({
        title: "",
        duration: 30,
      });

      refreshQuizzes();

      onClose();

    } catch (err) {

      console.log(err);

      alert("Failed to create quiz");

    }

  };

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl">

        <div className="mb-8 flex items-center justify-between">

          <div>

            <h2 className="text-3xl font-bold">
              Create Quiz
            </h2>

            <p className="mt-2 text-slate-500">
              Create a new classroom quiz
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
            placeholder="Quiz Title"
            value={form.title}
            onChange={handleChange}
            className="w-full rounded-xl border px-4 py-3"
          />

          <input
            type="number"
            name="duration"
            placeholder="Duration"
            value={form.duration}
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
              onClick={handleCreate}
              className="rounded-xl bg-orange-500 px-6 py-3 text-white hover:bg-orange-600"
            >
              Create Quiz
            </button>

          </div>

        </div>

      </div>

    </div>

  );

};

export default CreateQuizModal;