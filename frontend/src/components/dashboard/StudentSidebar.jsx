import {
  LayoutDashboard,
  BookOpen,
  User,
  Bot,
  LogOut,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const menu = [
  {
    icon: LayoutDashboard,
    text: "Dashboard",
    path: "/student-dashboard",
  },
  {
    icon: BookOpen,
    text: "My Classes",
    path: "/my-classes",
  },
  {
    icon: Bot,
    text: "AI Assistant",
    path: "/ai-assistant",
  },
  {
    icon: User,
    text: "Profile",
    path: "/profile",
  },
];

const StudentSidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-64 bg-slate-950 text-white p-6 flex flex-col">

      <h1 className="text-3xl font-bold text-orange-400">
        THRYVE
      </h1>

      <div className="mt-10 space-y-2">

        {menu.map((item) => {

          const Icon = item.icon;

          return (
            <Link
              key={item.text}
              to={item.path}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition
              ${
                location.pathname === item.path
                  ? "bg-orange-500"
                  : "hover:bg-slate-800"
              }`}
            >
              <Icon size={20} />
              {item.text}
            </Link>
          );

        })}

      </div>

      <button className="mt-auto rounded-xl bg-red-500 px-4 py-3 hover:bg-red-600">
        Logout
      </button>

    </aside>
  );
};

export default StudentSidebar;