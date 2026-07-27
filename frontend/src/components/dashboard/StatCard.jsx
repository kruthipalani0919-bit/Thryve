const StatCard = ({ title, value, color }) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-lg transition">
      <div
        className="mb-4 h-2 w-16 rounded-full"
        style={{ backgroundColor: color }}
      />

      <h3 className="text-slate-500">
        {title}
      </h3>

      <p className="mt-2 text-4xl font-bold text-slate-900">
        {value}
      </p>
    </div>
  );
};

export default StatCard;