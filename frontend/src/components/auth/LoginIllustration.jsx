import { GraduationCap, BrainCircuit, BarChart3 } from "lucide-react";

const LoginIllustration = () => {
  return (
    <div className="flex h-full flex-col justify-center">
      <div className="mb-8 inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-900 shadow-xl">
        <GraduationCap className="h-10 w-10 text-white" />
      </div>

      <h2 className="mb-5 text-5xl font-bold leading-tight text-slate-900">
        Smarter
        <br />
        Classroom
        <br />
        Experience.
      </h2>

      <p className="mb-10 max-w-md text-lg leading-8 text-slate-600">
        Live quizzes, polls, AI insights, QR attendance and instant classroom
        engagement — all in one platform.
      </p>

      <div className="grid grid-cols-3 gap-5">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <BrainCircuit className="mb-3 h-8 w-8 text-orange-500" />
          <p className="text-sm font-semibold">AI Insights</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <BarChart3 className="mb-3 h-8 w-8 text-indigo-600" />
          <p className="text-sm font-semibold">Analytics</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <GraduationCap className="mb-3 h-8 w-8 text-orange-500" />
          <p className="text-sm font-semibold">Engagement</p>
        </div>
      </div>
    </div>
  );
};

export default LoginIllustration;