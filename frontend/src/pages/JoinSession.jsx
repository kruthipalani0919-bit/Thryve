import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BookOpen, Users, Sparkles } from "lucide-react";
import { getSessionDetails } from "../services/sessionApi";

const JoinSession = () => {
  const { sessionCode } = useParams();

  const [session, setSession] = useState(null);

  useEffect(() => {
    loadSession();
  }, []);

  const loadSession = async () => {
    try {
      const res = await getSessionDetails(sessionCode);
      setSession(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}

      <div className="bg-slate-900 px-10 py-6 text-white shadow-lg">
        <h1 className="text-3xl font-bold">
          THRYVE Classroom
        </h1>

        <p className="mt-2 text-slate-300">
          Live Interactive Classroom
        </p>
      </div>

      <div className="mx-auto max-w-7xl p-8">
        <div className="grid grid-cols-3 gap-6">

          {/* Left */}

          <div className="col-span-2 space-y-6">

            <div className="rounded-3xl bg-white p-8 shadow">

              <div className="flex items-start gap-4">

                <BookOpen
                  className="mt-2 text-orange-500"
                  size={34}
                />

                <div>

                  <h2 className="text-4xl font-bold text-slate-900">
                    {session?.title || "Loading..."}
                  </h2>

                  <p className="mt-3 text-lg text-slate-600">
                    📘 {session?.subject}
                  </p>

                  <p className="mt-1 text-slate-600">
                    👨‍🏫 Faculty :
                    <span className="font-semibold">
                      {" "}
                      {session?.faculty_name}
                    </span>
                  </p>

                  <p className="mt-1 text-slate-600">
                    🏫 Section :
                    <span className="font-semibold">
                      {" "}
                      {session?.section}
                    </span>
                  </p>

                  <p className="mt-3 text-slate-500">
                    🔑 Session Code :
                    <span className="font-bold text-orange-500">
                      {" "}
                      {session?.session_code}
                    </span>
                  </p>

                </div>

              </div>

            </div>

            {/* Quiz Area */}

            <div className="rounded-3xl bg-white p-8 shadow">

              <h3 className="mb-5 text-2xl font-bold">
                Quiz Area
              </h3>

              <div className="rounded-2xl border-2 border-dashed border-slate-300 p-16 text-center">

                <p className="text-xl text-slate-500">
                  Waiting for faculty to start the quiz...
                </p>

              </div>

            </div>

          </div>

          {/* Right */}

          <div className="space-y-6">

            <div className="rounded-3xl bg-white p-6 shadow">

              <div className="flex items-center gap-3">

                <Users className="text-orange-500" />

                <h2 className="text-xl font-bold">
                  Participants
                </h2>

              </div>

              <div className="mt-6 space-y-3">

                <div className="rounded-xl bg-slate-100 p-3">
                  Waiting for students...
                </div>

              </div>

            </div>

            <div className="rounded-3xl bg-white p-6 shadow">

              <div className="flex items-center gap-3">

                <Sparkles className="text-orange-500" />

                <h2 className="text-xl font-bold">
                  AI Assistant
                </h2>

              </div>

              <div className="mt-5 rounded-2xl bg-orange-50 p-4">

                AI explanations will appear here during the session.

              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default JoinSession;