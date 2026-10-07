import { useState } from "react";
import {
  MapPin,
  Clock,
  CheckCircle,
  Loader2,
} from "lucide-react";

function Issues() {
  const [selectedFilter, setSelectedFilter] = useState("All Issues");

  const issues = [
    {
      id: 1,
      title: "Large Road Pothole",
      type: "Road Damage",
      description:
        "Large pothole causing difficulty for vehicles and pedestrians.",
      location: "Chennai",
      severity: "High",
      status: "In Progress",
      icon: "🕳️",
    },
    {
      id: 2,
      title: "Garbage Overflow",
      type: "Garbage",
      description:
        "Garbage has been overflowing near a residential area.",
      location: "Chennai",
      severity: "Medium",
      status: "Reported",
      icon: "🗑️",
    },
    {
      id: 3,
      title: "Broken Streetlight",
      type: "Streetlight",
      description:
        "Streetlight is not working, making the road unsafe at night.",
      location: "Chennai",
      severity: "High",
      status: "Resolved",
      icon: "💡",
    },
    {
      id: 4,
      title: "Water Leakage",
      type: "Water Leakage",
      description:
        "Water leakage reported near a residential street.",
      location: "Chennai",
      severity: "High",
      status: "In Progress",
      icon: "🚰",
    },
    {
      id: 5,
      title: "Fallen Tree",
      type: "Fallen Tree",
      description:
        "A fallen tree is partially blocking the roadside.",
      location: "Chennai",
      severity: "Medium",
      status: "Reported",
      icon: "🌳",
    },
    {
      id: 6,
      title: "Traffic Signal Issue",
      type: "Traffic Signal",
      description:
        "Traffic signal is not functioning properly at the junction.",
      location: "Chennai",
      severity: "High",
      status: "Resolved",
      icon: "🚦",
    },
  ];

  const filters = [
  "All Issues",
  "Road Damage",
  "Garbage",
  "Streetlight",
  "Water",
  "Fallen Tree",
  "Traffic Signal",
];

  const filteredIssues =
    selectedFilter === "All Issues"
      ? issues
      : issues.filter((issue) => {
          if (selectedFilter === "Water") {
            return issue.type === "Water Leakage";
          }

          return issue.type === selectedFilter;
        });

  const getStatusColor = (status) => {
    if (status === "Resolved") {
      return "text-green-400";
    }

    if (status === "In Progress") {
      return "text-yellow-400";
    }

    return "text-blue-400";
  };

  const getStatusIcon = (status) => {
    if (status === "Resolved") {
      return <CheckCircle size={18} />;
    }

    if (status === "In Progress") {
      return <Loader2 size={18} />;
    }

    return <Clock size={18} />;
  };

  const getSeverityStyle = (severity) => {
    if (severity === "High") {
      return "bg-red-500/10 text-red-400";
    }

    return "bg-yellow-500/10 text-yellow-400";
  };

  return (
    <main className="min-h-screen bg-[#02040a] px-6 pb-20 pt-16 text-white">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-500">
            Community Issues
          </p>

          <h1 className="mt-3 text-5xl font-bold">
            Reported Issues
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-slate-500">
            Explore civic problems reported by people in your community.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="mt-10 flex flex-wrap gap-3">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setSelectedFilter(filter)}
              className={`rounded-xl border px-5 py-3 text-sm font-medium transition-all ${
                selectedFilter === filter
                  ? "border-blue-500 bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                  : "border-white/[0.08] bg-[#070a12] text-slate-400 hover:border-blue-500/40 hover:text-white"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Issue Count */}
        <div className="mt-8">
          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-semibold text-white">
              {filteredIssues.length}
            </span>{" "}
            {filteredIssues.length === 1 ? "issue" : "issues"}
          </p>
        </div>

        {/* Issue Cards */}
        <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredIssues.map((issue) => (
            <div
              key={issue.id}
              className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#070a12] transition-all duration-300 hover:border-blue-500/40 hover:-translate-y-1"
            >
              {/* Image / Icon Area */}
              <div className="flex h-48 items-center justify-center bg-[#050811] text-7xl">
                {issue.icon}
              </div>

              {/* Card Content */}
              <div className="p-7">

                {/* Type + Severity */}
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-blue-400">
                    {issue.type}
                  </p>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${getSeverityStyle(
                      issue.severity
                    )}`}
                  >
                    {issue.severity}
                  </span>
                </div>

                {/* Title */}
                <h2 className="mt-4 text-2xl font-semibold">
                  {issue.title}
                </h2>

                {/* Description */}
                <p className="mt-4 min-h-[56px] text-sm leading-7 text-slate-500">
                  {issue.description}
                </p>

                {/* Bottom Info */}
                <div className="mt-7 flex items-center justify-between gap-4">

                  {/* Location */}
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <MapPin size={18} />
                    <span>{issue.location}</span>
                  </div>

                  {/* Status */}
                  <div
                    className={`flex items-center gap-2 text-sm font-semibold ${getStatusColor(
                      issue.status
                    )}`}
                  >
                    {getStatusIcon(issue.status)}
                    <span>{issue.status}</span>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredIssues.length === 0 && (
          <div className="mt-10 rounded-2xl border border-white/[0.08] bg-[#070a12] p-12 text-center">
            <p className="text-lg font-semibold">
              No issues found
            </p>

            <p className="mt-2 text-sm text-slate-500">
              There are no reported issues in this category yet.
            </p>
          </div>
        )}

      </div>
    </main>
  );
}

export default Issues;