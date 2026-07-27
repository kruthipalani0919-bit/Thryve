import { Bell, Search } from "lucide-react";

const StudentTopbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-8 py-5">

      <div>
        <h2 className="text-3xl font-bold text-slate-900">
          Dashboard
        </h2>

        <p className="text-slate-500">
          Welcome back 👋
        </p>
      </div>

      <div className="flex items-center gap-5">

        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            placeholder="Search..."
            className="rounded-xl border border-slate-300 py-2 pl-10 pr-4 outline-none focus:border-orange-500"
          />
        </div>

        <button className="rounded-xl bg-slate-100 p-3 transition hover:bg-orange-100">
          <Bell size={20} />
        </button>

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-500 font-bold text-white">
            {user?.name?.charAt(0)}
          </div>

          <div>
            <h3 className="font-semibold text-slate-900">
              {user?.name}
            </h3>

            <p className="text-sm text-slate-500">
              Student
            </p>
          </div>

        </div>

      </div>

    </header>
  );
};

export default StudentTopbar;