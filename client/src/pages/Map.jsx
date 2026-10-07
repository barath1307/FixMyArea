import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import {
  MapPin,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

// Fix Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

function MapPage() {
  const issues = [
    {
      id: 1,
      position: [13.0475, 80.203],
      title: "Large Road Pothole",
      type: "Road Damage",
      severity: "High",
      status: "In Progress",
      location: "Virugambakkam, Chennai",
    },
    {
      id: 2,
      position: [13.0418, 80.2341],
      title: "Broken Streetlight",
      type: "Streetlight",
      severity: "High",
      status: "Reported",
      location: "T. Nagar, Chennai",
    },
    {
      id: 3,
      position: [13.0502, 80.2126],
      title: "Garbage Overflow",
      type: "Garbage",
      severity: "Medium",
      status: "Reported",
      location: "Vadapalani, Chennai",
    },
    {
      id: 4,
      position: [13.0827, 80.2707],
      title: "Water Leakage",
      type: "Water Leakage",
      severity: "High",
      status: "In Progress",
      location: "Egmore, Chennai",
    },
    {
      id: 5,
      position: [13.0068, 80.2206],
      title: "Fallen Tree",
      type: "Fallen Tree",
      severity: "Medium",
      status: "Resolved",
      location: "Guindy, Chennai",
    },
  ];

  const activeReports = issues.filter(
    (issue) => issue.status !== "Resolved"
  ).length;

  const highPriority = issues.filter(
    (issue) => issue.severity === "High"
  ).length;

  const resolvedReports = issues.filter(
    (issue) => issue.status === "Resolved"
  ).length;

  return (
    <main className="min-h-screen bg-[#02040a] px-6 pb-20 pt-16 text-white">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-500">
            Live Community Map
          </p>

          <h1 className="mt-3 text-5xl font-bold">
            Issues Near You
          </h1>

          <p className="mt-4 text-lg text-slate-500">
            Explore civic issues reported across your area and see where
            attention is needed most.
          </p>
        </div>

        {/* Map */}
        <div className="mt-10 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#070a12]">
          <MapContainer
            center={[13.0475, 80.203]}
            zoom={13}
            minZoom={10}
            maxZoom={19}
            maxBounds={[
              [12.5, 79.5],
              [13.8, 80.8],
            ]}
            maxBoundsViscosity={1.0}
            scrollWheelZoom={true}
            className="h-[600px] w-full"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              maxZoom={19}
              keepBuffer={4}
              updateWhenZooming={true}
              updateWhenIdle={false}
            />

            {/* Markers */}
            {issues.map((issue) => (
              <Marker
                key={issue.id}
                position={issue.position}
              >
                <Popup>
                  <div className="min-w-[220px]">
                    <h3 className="font-bold text-gray-900">
                      {issue.title}
                    </h3>

                    <p className="mt-1 text-sm text-gray-600">
                      {issue.type}
                    </p>

                    <p className="mt-2 text-sm text-gray-600">
                      📍 {issue.location}
                    </p>

                    <div className="mt-3 flex gap-2">
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-semibold ${
                          issue.severity === "High"
                            ? "bg-red-100 text-red-600"
                            : "bg-yellow-100 text-yellow-600"
                        }`}
                      >
                        {issue.severity}
                      </span>

                      <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-600">
                        {issue.status}
                      </span>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Stats */}
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {/* Active Reports */}
          <div className="rounded-2xl border border-white/[0.08] bg-[#070a12] p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10">
                <MapPin
                  size={24}
                  className="text-blue-500"
                />
              </div>

              <div>
                <p className="text-3xl font-bold">
                  {activeReports}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Active Reports
                </p>
              </div>
            </div>
          </div>

          {/* High Priority */}
          <div className="rounded-2xl border border-white/[0.08] bg-[#070a12] p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10">
                <AlertTriangle
                  size={24}
                  className="text-red-500"
                />
              </div>

              <div>
                <p className="text-3xl font-bold">
                  {highPriority}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  High Priority
                </p>
              </div>
            </div>
          </div>

          {/* Resolved */}
          <div className="rounded-2xl border border-white/[0.08] bg-[#070a12] p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10">
                <CheckCircle
                  size={24}
                  className="text-green-500"
                />
              </div>

              <div>
                <p className="text-3xl font-bold">
                  {resolvedReports}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Resolved
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default MapPage;