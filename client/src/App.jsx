import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ReportIssue from "./pages/ReportIssue";
import Navbar from "./components/Navbar";
import Issues from "./pages/Issues";
import MapPage from "./pages/Map";
import MyReports from "./pages/MyReports";

function Home() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#02040a] pt-20 text-white">

        {/* ================= HERO ================= */}
        <section className="relative overflow-hidden bg-[#02040a]">

          <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[140px]" />

          <div className="relative mx-auto max-w-7xl px-6 py-20 text-center lg:py-24">

            <div className="mx-auto mb-6 inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/[0.06] px-4 py-2 text-sm text-blue-400">
              🌍 Together, we can improve our neighbourhoods
            </div>

            <h1 className="mx-auto max-w-5xl text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              See a problem?
              <br />
              <span className="text-blue-500">
                Help fix it.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-500">
              Report potholes, broken streetlights, garbage, water leaks
              and other civic issues. Let AI help identify and prioritize
              problems in your area.
            </p>

            {/* Hero Buttons */}
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">

              {/* Report an Issue */}
              <Link
                to="/report"
                className="rounded-xl bg-blue-600 px-8 py-4 font-semibold shadow-lg shadow-blue-600/20 transition hover:bg-blue-500"
              >
                📸 Report an Issue
              </Link>

              {/* Explore Issues */}
              <Link
                to="/issues"
                className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-8 py-4 font-semibold text-slate-300 transition hover:border-white/15 hover:bg-white/[0.06] hover:text-white"
              >
                🗺️ Explore Issues
              </Link>

            </div>

            {/* Stats */}
            <div className="mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">

              <div className="rounded-2xl border border-white/[0.06] bg-[#070a12] p-6">
                <p className="text-3xl font-bold">
                  1,248
                </p>

                <p className="mt-2 text-sm text-slate-500">
                  Issues Reported
                </p>
              </div>

              <div className="rounded-2xl border border-white/[0.06] bg-[#070a12] p-6">
                <p className="text-3xl font-bold text-green-400">
                  847
                </p>

                <p className="mt-2 text-sm text-slate-500">
                  Issues Resolved
                </p>
              </div>

              <div className="rounded-2xl border border-white/[0.06] bg-[#070a12] p-6">
                <p className="text-3xl font-bold text-blue-400">
                  92
                </p>

                <p className="mt-2 text-sm text-slate-500">
                  Active Areas
                </p>
              </div>

            </div>

          </div>
        </section>


        {/* ================= REPORT CATEGORIES ================= */}
        <section className="border-t border-white/[0.05] bg-[#03060d]">

          <div className="mx-auto max-w-7xl px-6 py-20">

            <div className="text-center">

              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-500">
                Report anything
              </p>

              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                What can you report?
              </h2>

              <p className="mx-auto mt-3 max-w-2xl text-slate-500">
                Spotted something that needs attention? Report it and help
                your community get it fixed.
              </p>

            </div>


            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

              {/* Road Damage */}
              <Link
                to="/report"
                className="group cursor-pointer rounded-2xl border border-white/[0.06] bg-[#070a12] p-7 transition hover:-translate-y-1 hover:border-blue-500/30 hover:bg-[#090d18]"
              >
                <div className="text-4xl">
                  🕳️
                </div>

                <h3 className="mt-5 text-xl font-semibold">
                  Road Damage
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Report potholes, damaged roads and unsafe surfaces.
                </p>
              </Link>


              {/* Streetlight */}
              <Link
                to="/report"
                className="group cursor-pointer rounded-2xl border border-white/[0.06] bg-[#070a12] p-7 transition hover:-translate-y-1 hover:border-blue-500/30 hover:bg-[#090d18]"
              >
                <div className="text-4xl">
                  💡
                </div>

                <h3 className="mt-5 text-xl font-semibold">
                  Streetlight
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Report broken or non-working streetlights.
                </p>
              </Link>


              {/* Garbage */}
              <Link
                to="/report"
                className="group cursor-pointer rounded-2xl border border-white/[0.06] bg-[#070a12] p-7 transition hover:-translate-y-1 hover:border-blue-500/30 hover:bg-[#090d18]"
              >
                <div className="text-4xl">
                  🗑️
                </div>

                <h3 className="mt-5 text-xl font-semibold">
                  Garbage
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Report overflowing bins and illegal dumping.
                </p>
              </Link>


              {/* Water Leakage */}
              <Link
                to="/report"
                className="group cursor-pointer rounded-2xl border border-white/[0.06] bg-[#070a12] p-7 transition hover:-translate-y-1 hover:border-blue-500/30 hover:bg-[#090d18]"
              >
                <div className="text-4xl">
                  🚰
                </div>

                <h3 className="mt-5 text-xl font-semibold">
                  Water Leakage
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Report leaking pipes, flooding and water wastage.
                </p>
              </Link>


              {/* Fallen Tree */}
              <Link
                to="/report"
                className="group cursor-pointer rounded-2xl border border-white/[0.06] bg-[#070a12] p-7 transition hover:-translate-y-1 hover:border-blue-500/30 hover:bg-[#090d18]"
              >
                <div className="text-4xl">
                  🌳
                </div>

                <h3 className="mt-5 text-xl font-semibold">
                  Fallen Tree
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Report fallen trees or dangerous branches.
                </p>
              </Link>


              {/* Traffic Signal */}
              <Link
                to="/report"
                className="group cursor-pointer rounded-2xl border border-white/[0.06] bg-[#070a12] p-7 transition hover:-translate-y-1 hover:border-blue-500/30 hover:bg-[#090d18]"
              >
                <div className="text-4xl">
                  🚦
                </div>

                <h3 className="mt-5 text-xl font-semibold">
                  Traffic Signal
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Report damaged or malfunctioning traffic signals.
                </p>
              </Link>

            </div>

          </div>

        </section>


        {/* ================= RECENT ISSUES ================= */}
        <section className="border-t border-white/[0.05] bg-[#02040a]">

          <div className="mx-auto max-w-7xl px-6 py-20">

            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

              <div>

                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-500">
                  Community
                </p>

                <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                  Recent Issues
                </h2>

                <p className="mt-3 max-w-xl text-slate-500">
                  See what people are reporting in their neighbourhoods.
                </p>

              </div>

              {/* View All Issues */}
              <Link
                to="/issues"
                className="w-fit rounded-lg border border-white/[0.07] bg-white/[0.02] px-5 py-2.5 text-sm text-slate-400 transition hover:bg-white/[0.05] hover:text-white"
              >
                View All Issues →
              </Link>

            </div>


            <div className="mt-10 grid gap-6 lg:grid-cols-3">

              {/* Issue 1 */}
              <Link
                to="/issues"
                className="block overflow-hidden rounded-2xl border border-white/[0.06] bg-[#070a12] transition hover:-translate-y-1 hover:border-blue-500/30"
              >

                <div className="flex h-44 items-center justify-center bg-[#050811] text-6xl">
                  🕳️
                </div>

                <div className="p-6">

                  <div className="flex items-center justify-between gap-3">

                    <h3 className="text-xl font-semibold">
                      Large Road Pothole
                    </h3>

                    <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs font-medium text-red-400">
                      High
                    </span>

                  </div>

                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    Large pothole causing difficulty for vehicles and pedestrians.
                  </p>

                  <div className="mt-5 flex items-center justify-between text-sm">

                    <span className="text-slate-600">
                      📍 Chennai
                    </span>

                    <span className="text-yellow-400">
                      In Progress
                    </span>

                  </div>

                </div>

              </Link>


              {/* Issue 2 */}
              <Link
                to="/issues"
                className="block overflow-hidden rounded-2xl border border-white/[0.06] bg-[#070a12] transition hover:-translate-y-1 hover:border-blue-500/30"
              >

                <div className="flex h-44 items-center justify-center bg-[#050811] text-6xl">
                  🗑️
                </div>

                <div className="p-6">

                  <div className="flex items-center justify-between gap-3">

                    <h3 className="text-xl font-semibold">
                      Garbage Overflow
                    </h3>

                    <span className="rounded-full bg-yellow-500/10 px-3 py-1 text-xs font-medium text-yellow-400">
                      Medium
                    </span>

                  </div>

                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    Garbage has been overflowing near a residential area.
                  </p>

                  <div className="mt-5 flex items-center justify-between text-sm">

                    <span className="text-slate-600">
                      📍 Chennai
                    </span>

                    <span className="text-blue-400">
                      Reported
                    </span>

                  </div>

                </div>

              </Link>


              {/* Issue 3 */}
              <Link
                to="/issues"
                className="block overflow-hidden rounded-2xl border border-white/[0.06] bg-[#070a12] transition hover:-translate-y-1 hover:border-blue-500/30"
              >

                <div className="flex h-44 items-center justify-center bg-[#050811] text-6xl">
                  💡
                </div>

                <div className="p-6">

                  <div className="flex items-center justify-between gap-3">

                    <h3 className="text-xl font-semibold">
                      Broken Streetlight
                    </h3>

                    <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs font-medium text-red-400">
                      High
                    </span>

                  </div>

                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    Streetlight is not working, making the road unsafe at night.
                  </p>

                  <div className="mt-5 flex items-center justify-between text-sm">

                    <span className="text-slate-600">
                      📍 Chennai
                    </span>

                    <span className="text-green-400">
                      Resolved
                    </span>

                  </div>

                </div>

              </Link>

            </div>

          </div>

        </section>

      </main>
    </>
  );
}


function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route
          path="/report"
          element={<ReportIssue />}
        />

        <Route
          path="/issues"
          element={<Issues />}
        />

        <Route
          path="/map"
          element={<MapPage />}
        />

        <Route
          path="/my-reports"
          element={<MyReports />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;