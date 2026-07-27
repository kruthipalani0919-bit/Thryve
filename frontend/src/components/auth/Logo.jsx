const Logo = () => {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-xl font-bold text-white shadow-lg">
        T
      </div>

      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          THRYVE
        </h1>

        <p className="text-sm text-slate-500">
          Classroom Engagement Platform
        </p>
      </div>
    </div>
  );
};

export default Logo;