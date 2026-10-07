import { useState } from "react";
import {
  MapPin,
  Clock,
  CheckCircle,
  Loader2,
  FileText,
} from "lucide-react";

function MyReports() {
  // ================= DEMO REPORTS =================

  const demoReports = [
    {
      id: "FM-1024",
      title: "Large Road Pothole",
      type: "Road Damage",
      location: "Virugambakkam, Chennai",
      date: "Oct 04, 2026",
      status: "In Progress",
      severity: "High",
      icon: "🕳️",
      description:
        "Large pothole causing difficulty for vehicles and pedestrians.",
    },

    {
      id: "FM-1018",
      title: "Broken Streetlight",
      type: "Streetlight",
      location: "T. Nagar, Chennai",
      date: "Sep 29, 2026",
      status: "Resolved",
      severity: "High",
      icon: "💡",
      description:
        "Streetlight was not working and making the road unsafe at night.",
    },

    {
      id: "FM-1007",
      title: "Garbage Overflow",
      type: "Garbage",
      location: "Vadapalani, Chennai",
      date: "Sep 21, 2026",
      status: "Reported",
      severity: "Medium",
      icon: "🗑️",
      description:
        "Garbage was overflowing near a residential area.",
    },
  ];

  // ================= SAVED REPORTS =================

  const [reports] = useState(() => {
    const savedReports = JSON.parse(
      localStorage.getItem("fixmyarea_reports") || "[]"
    );

    return [...savedReports, ...demoReports];
  });


  // ================= STATUS COLORS =================

  const getStatusColor = (status) => {
    if (status === "Resolved") {
      return "text-green-400";
    }

    if (status === "In Progress") {
      return "text-yellow-400";
    }

    return "text-blue-400";
  };


  // ================= STATUS ICON =================

  const getStatusIcon = (status) => {
    if (status === "Resolved") {
      return <CheckCircle size={17} />;
    }

    if (status === "In Progress") {
      return <Loader2 size={17} />;
    }

    return <Clock size={17} />;
  };


  // ================= SEVERITY STYLE =================

  const getSeverityStyle = (severity) => {
    if (severity === "High") {
      return "bg-red-500/10 text-red-400";
    }

    return "bg-yellow-500/10 text-yellow-400";
  };


  // ================= COUNTS =================

  const totalReports = reports.length;

  const inProgressReports = reports.filter(
    (report) => report.status === "In Progress"
  ).length;

  const resolvedReports = reports.filter(
    (report) => report.status === "Resolved"
  ).length;


  // ================= UI =================

  return (
    <main className="min-h-screen bg-[#02040a] px-6 pb-20 pt-16 text-white">

      <div className="mx-auto max-w-7xl">

        {/* ================= HEADER ================= */}

        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">

          <div>

            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-500">
              My Activity
            </p>

            <h1 className="mt-3 text-4xl font-bold sm:text-5xl">
              My Reports
            </h1>

            <p className="mt-4 max-w-2xl text-slate-500">
              Track the civic issues you have reported and follow their
              progress until they are resolved.
            </p>

          </div>


          {/* TOTAL REPORTS */}

          <div className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-[#070a12] px-5 py-3">

            <FileText
              size={20}
              className="text-blue-400"
            />

            <div>

              <p className="text-lg font-bold">
                {totalReports}
              </p>

              <p className="text-xs text-slate-500">
                Total Reports
              </p>

            </div>

          </div>

        </div>


        {/* ================= SUMMARY ================= */}

        <div className="mt-10 grid gap-4 sm:grid-cols-3">

          {/* TOTAL */}

          <div className="rounded-2xl border border-white/[0.06] bg-[#070a12] p-5">

            <p className="text-sm text-slate-500">
              Total Reports
            </p>

            <p className="mt-2 text-3xl font-bold">
              {totalReports}
            </p>

          </div>


          {/* IN PROGRESS */}

          <div className="rounded-2xl border border-white/[0.06] bg-[#070a12] p-5">

            <p className="text-sm text-slate-500">
              In Progress
            </p>

            <p className="mt-2 text-3xl font-bold text-yellow-400">
              {inProgressReports}
            </p>

          </div>


          {/* RESOLVED */}

          <div className="rounded-2xl border border-white/[0.06] bg-[#070a12] p-5">

            <p className="text-sm text-slate-500">
              Resolved
            </p>

            <p className="mt-2 text-3xl font-bold text-green-400">
              {resolvedReports}
            </p>

          </div>

        </div>


        {/* ================= REPORTS ================= */}

        <div className="mt-10 space-y-5">

          {reports.map((report) => (

            <div
              key={report.id}
              className="overflow-hidden rounded-2xl border border-white/[0.06] bg-[#070a12] transition hover:border-blue-500/30"
            >

              <div className="flex flex-col gap-6 p-6 lg:flex-row lg:items-center">

                {/* ICON */}

                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl bg-[#050811] text-5xl">
                  {report.icon}
                </div>


                {/* MAIN INFO */}

                <div className="min-w-0 flex-1">

                  <div className="flex flex-wrap items-center gap-3">

                    <p className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                      {report.type}
                    </p>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${getSeverityStyle(
                        report.severity
                      )}`}
                    >
                      {report.severity}
                    </span>

                  </div>


                  <h2 className="mt-2 text-xl font-semibold">
                    {report.title}
                  </h2>


                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {report.description}
                  </p>


                  <div className="mt-4 flex flex-wrap gap-5 text-sm text-slate-500">

                    <span className="flex items-center gap-2">

                      <MapPin size={16} />

                      {report.location}

                    </span>


                    <span className="flex items-center gap-2">

                      <Clock size={16} />

                      {report.date}

                    </span>


                    <span>
                      ID: {report.id}
                    </span>

                  </div>

                </div>


                {/* STATUS */}

                <div className="shrink-0 lg:text-right">

                  <p className="text-xs text-slate-600">
                    CURRENT STATUS
                  </p>


                  <div
                    className={`mt-2 flex items-center gap-2 font-semibold ${getStatusColor(
                      report.status
                    )} lg:justify-end`}
                  >

                    {getStatusIcon(report.status)}

                    {report.status}

                  </div>

                </div>

              </div>


              {/* ================= PROGRESS ================= */}

              <div className="border-t border-white/[0.05] bg-[#050811] px-6 py-4">

                <div className="flex items-center justify-between text-xs">

                  <span className="text-slate-500">
                    Report Progress
                  </span>


                  <span className={getStatusColor(report.status)}>

                    {report.status === "Resolved"
                      ? "100%"
                      : report.status === "In Progress"
                      ? "60%"
                      : "20%"}

                  </span>

                </div>


                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">

                  <div
                    className={`h-full rounded-full ${
                      report.status === "Resolved"
                        ? "w-full bg-green-500"
                        : report.status === "In Progress"
                        ? "w-[60%] bg-yellow-500"
                        : "w-[20%] bg-blue-500"
                    }`}
                  />

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </main>
  );
}

export default MyReports;