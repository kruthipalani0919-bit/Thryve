import { useState } from "react";
import { X } from "lucide-react";

const JoinCodeModal = ({ open, onClose, onJoin }) => {
  const [code, setCode] = useState("");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

      <div className="w-full max-w-md rounded-3xl bg-white p-8">

        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-2xl font-bold">
            Join Session
          </h2>

          <button onClick={onClose}>
            <X />
          </button>

        </div>

        <input
          placeholder="Enter Session Code"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500"
        />

        <button
          onClick={() => onJoin(code)}
          className="mt-6 w-full rounded-xl bg-orange-500 py-3 font-semibold text-white hover:bg-orange-600"
        >
          Join Session
        </button>

      </div>

    </div>
  );
};

export default JoinCodeModal;