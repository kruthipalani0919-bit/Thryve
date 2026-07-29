import {
  LayoutDashboard,
  Calendar,
  Sparkles,
  BrainCircuit,
  Settings,
  LogOut,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
const menu = [
  {
    icon: LayoutDashboard,
    text: "Dashboard",
    path: "/faculty",
  },
  {
    icon: Calendar,
    text: "My Sessions",
    path: "/my-sessions",
  },
  {
    icon: Sparkles,
    text: "AI Quiz Library",
    path: "/ai-quiz-library",
},
  {
    icon: BrainCircuit,
    text: "AI Insights",
    path: "/ai-insights",
  },
  {
    icon: Settings,
    text: "Settings",
    path: "/settings",
  },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="flex w-64 flex-col bg-slate-950 p-6 text-white">

      <h1 className="text-3xl font-bold tracking-wide text-orange-400">
        THRYVE
      </h1>

      <div className="mt-10 space-y-2">

        {menu.map((item) => {
          const Icon = item.icon;

          const active = location.pathname === item.path;

          return (
            <button
              key={item.text}
              onClick={() => navigate(item.path)}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 transition
                ${
                  active
                    ? "bg-orange-500 text-white"
                    : "hover:bg-slate-800"
                }`}
            >
              <Icon size={20} />
              {item.text}
            </button>
          );
        })}

      </div>

      <button
        onClick={() => {
          localStorage.clear();
          navigate("/");
        }}
        className="mt-auto flex items-center gap-3 rounded-xl bg-red-500 px-4 py-3 transition hover:bg-red-600"
      >
        <LogOut size={18} />
        Logout
      </button>

    </aside>
  );
};

export default Sidebar;