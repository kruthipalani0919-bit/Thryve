import { Plus } from "lucide-react";

const FloatingButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-8 right-8 flex h-16 w-16 items-center justify-center rounded-full bg-orange-500 text-white shadow-2xl transition hover:scale-110 hover:bg-orange-600"
    >
      <Plus size={32} />
    </button>
  );
};

export default FloatingButton;