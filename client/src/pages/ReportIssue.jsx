import { useState } from "react";
import {
  Camera,
  MapPin,
  Upload,
  X,
  Loader2,
  CheckCircle,
} from "lucide-react";

function ReportIssue() {
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const [location, setLocation] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState("");

  const [analyzing, setAnalyzing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [showSubmit, setShowSubmit] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // ================= IMAGE =================

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    setImage(URL.createObjectURL(file));
    setImageFile(file);

    setAnalysis(null);
    setUploadMessage("");
  };


  const removeImage = () => {
    setImage(null);
    setImageFile(null);
    setAnalysis(null);
    setUploadMessage("");
  };


  // ================= LOCATION =================

  const getCurrentLocation = () => {
    setLocationError("");

    if (!navigator.geolocation) {
      setLocationError(
        "Your browser does not support location."
      );
      return;
    }

    setLocationLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const {
          latitude,
          longitude,
          accuracy,
        } = position.coords;

        setLocation({
          latitude,
          longitude,
          accuracy,
        });

        setLocationLoading(false);
      },

      (error) => {
        setLocationLoading(false);

        if (error.code === 1) {
          setLocationError(
            "Location permission was denied. Please allow location access in your browser."
          );
        } else if (error.code === 2) {
          setLocationError(
            "Unable to detect your location."
          );
        } else {
          setLocationError(
            "Location request timed out. Try again."
          );
        }
      },

      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };


  // ================= BACKEND UPLOAD =================

  const uploadImage = async () => {
  if (!imageFile) return false;

  setUploading(true);
  setUploadMessage("");

  try {
    const formData = new FormData();

    formData.append("image", imageFile);

    const response = await fetch(
      "https://fixmyarea-backend-kre4.onrender.com/api/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Upload failed"
      );
    }

    // Actual AI result from backend
    if (data.analysis) {
      setAnalysis(data.analysis);
    }

    setUploadMessage(
      "Image uploaded and analyzed successfully."
    );

    return true;

  } catch (error) {
    console.error("Upload / AI error:", error);

    setUploadMessage(
      error.message ||
        "Image upload or AI analysis failed."
    );

    return false;

  } finally {
    setUploading(false);
  }
};


  // ================= ANALYSIS =================

  const analyzeIssue = async () => {
  if (!imageFile) return;

  setAnalyzing(true);
  setAnalysis(null);
  setShowSubmit(false);
  setUploadMessage("");

  await uploadImage();

  setAnalyzing(false);
};

const submitReport = () => {
  const newReport = {
    id: `FM-${Date.now().toString().slice(-4)}`,
    title: analysis?.issueType || "Civic Issue",
    type: analysis?.issueType || "Other",
    location: location
      ? `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}`
      : "Location not provided",
    date: new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
    status: "Reported",
    severity: analysis?.severity || "Medium",
    icon:
      analysis?.issueType === "Road Damage"
        ? "🕳️"
        : analysis?.issueType === "Streetlight"
        ? "💡"
        : analysis?.issueType === "Garbage"
        ? "🗑️"
        : analysis?.issueType === "Water Leakage"
        ? "💧"
        : analysis?.issueType === "Fallen Tree"
        ? "🌳"
        : analysis?.issueType === "Traffic Signal"
        ? "🚦"
        : "⚠️",
    description:
      analysis?.description ||
      "Civic issue reported by the citizen.",
  };

  const existingReports = JSON.parse(
    localStorage.getItem("fixmyarea_reports") || "[]"
  );

  localStorage.setItem(
    "fixmyarea_reports",
    JSON.stringify([
      newReport,
      ...existingReports,
    ])
  );

  setSubmitted(true);
};

if (submitted) {
  return (
    <div className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto flex min-h-[70vh] max-w-2xl items-center justify-center">

        <div className="w-full rounded-3xl border border-green-500/20 bg-slate-900 p-8 text-center shadow-2xl">

          {/* SUCCESS ICON */}
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10">
            <CheckCircle
              size={52}
              className="text-green-400"
            />
          </div>

          {/* TITLE */}
          <h1 className="mt-6 text-3xl font-bold">
            Report Submitted Successfully!
          </h1>

          <p className="mx-auto mt-4 max-w-md text-slate-400">
            Your civic issue has been successfully reported.
            Thank you for helping improve your area.
          </p>

          {/* REPORT STATUS */}
          <div className="mt-8 rounded-2xl border border-green-500/20 bg-green-500/5 p-5 text-left">

            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">
                Status
              </span>

              <span className="rounded-full bg-green-500/10 px-3 py-1 text-sm font-semibold text-green-400">
                Submitted
              </span>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-slate-400">
                Issue
              </span>

              <span className="font-medium text-white">
                {analysis?.issueType}
              </span>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <span className="text-sm text-slate-400">
                Severity
              </span>

              <span className="font-semibold text-red-400">
                {analysis?.severity}
              </span>
            </div>

          </div>

          {/* ACTION */}
          <button
            type="button"
            onClick={() => {
              window.location.href = "/my-reports";
            }}
            className="mt-8 w-full rounded-xl bg-blue-600 px-6 py-4 font-semibold transition hover:bg-blue-500"
          >
            View My Reports
          </button>

        </div>

      </div>
    </div>
  );
}

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-10 text-white">

      <div className="mx-auto max-w-3xl">

        {/* HEADER */}

        <div className="mb-10">

          <p className="text-sm font-semibold uppercase tracking-widest text-blue-500">
            New Report
          </p>

          <h1 className="mt-3 text-4xl font-bold">
            Report an Issue
          </h1>

          <p className="mt-3 text-slate-400">
            Upload a photo and tell us what is happening
            in your area. Our AI will help analyze the issue.
          </p>

        </div>


        {/* ================= PHOTO ================= */}

        <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">

          <h2 className="text-xl font-semibold">
            1. Add a photo
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            A clear photo helps identify the problem accurately.
          </p>


          {!image ? (

            <label className="mt-6 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-white/10 bg-slate-950 px-6 py-16 transition hover:border-blue-500/50 hover:bg-blue-500/5">

              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-500/10 text-blue-400">
                <Camera size={28} />
              </div>

              <p className="mt-4 font-medium">
                Upload a photo
              </p>

              <p className="mt-2 text-sm text-slate-500">
                PNG, JPG or WEBP
              </p>

              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="hidden"
                onChange={handleImageChange}
              />

            </label>

          ) : (

            <div className="relative mt-6 overflow-hidden rounded-xl border border-white/10">

              <img
                src={image}
                alt="Issue preview"
                className="max-h-[450px] w-full object-cover"
              />

              <button
                onClick={removeImage}
                className="absolute right-3 top-3 rounded-full bg-black/70 p-2 text-white transition hover:bg-red-500"
              >
                <X size={20} />
              </button>

            </div>

          )}

        </div>


        {/* ================= LOCATION ================= */}

        <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900 p-6">

          <h2 className="text-xl font-semibold">
            2. Location
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Where did you find this issue?
          </p>


          <button
            onClick={getCurrentLocation}
            disabled={locationLoading}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-slate-950 px-5 py-4 font-medium transition hover:border-blue-500/50 hover:bg-blue-500/5 disabled:cursor-not-allowed disabled:opacity-60"
          >

            {locationLoading ? (
              <>
                <Loader2
                  size={20}
                  className="animate-spin text-blue-400"
                />

                Detecting your location...
              </>
            ) : (
              <>
                <MapPin
                  size={20}
                  className="text-blue-400"
                />

                {location
                  ? "Location Detected"
                  : "Use my current location"}
              </>
            )}

          </button>


          {location && (

            <div className="mt-4 rounded-xl border border-green-500/20 bg-green-500/5 p-4">

              <div className="flex items-center gap-2 text-green-400">

                <CheckCircle size={18} />

                <span className="font-medium">
                  Location detected
                </span>

              </div>


              <div className="mt-3 grid gap-2 text-sm text-slate-400 sm:grid-cols-3">

                <div>
                  <span className="text-slate-500">
                    Latitude
                  </span>

                  <p className="text-slate-200">
                    {location.latitude.toFixed(6)}
                  </p>
                </div>


                <div>
                  <span className="text-slate-500">
                    Longitude
                  </span>

                  <p className="text-slate-200">
                    {location.longitude.toFixed(6)}
                  </p>
                </div>


                <div>
                  <span className="text-slate-500">
                    Accuracy
                  </span>

                  <p className="text-slate-200">
                    {Math.round(location.accuracy)} m
                  </p>
                </div>

              </div>

            </div>

          )}


          {locationError && (

            <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-400">
              {locationError}
            </div>

          )}

        </div>


        {/* ================= AI ================= */}

        <div className="mt-6 rounded-2xl border border-blue-500/20 bg-blue-500/5 p-6">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10">
              🤖
            </div>

            <div>

              <h2 className="font-semibold">
                AI Issue Analysis
              </h2>

              <p className="text-sm text-slate-400">
                Analyze the uploaded image to identify the issue.
              </p>

            </div>

          </div>


          <div className="mt-5 grid gap-3 sm:grid-cols-3">

            <div className="rounded-xl bg-slate-950 p-4">

              <p className="text-xs text-slate-500">
                Issue Type
              </p>

              <p className="mt-1 text-sm text-slate-300">
                {analysis?.issueType || "Waiting for analysis"}
              </p>

            </div>


            <div className="rounded-xl bg-slate-950 p-4">

              <p className="text-xs text-slate-500">
                Severity
              </p>

              <p
                className={`mt-1 text-sm font-semibold ${
                  analysis?.severity === "High"
                    ? "text-red-400"
                    : "text-slate-300"
                }`}
              >
                {analysis?.severity || "—"}
              </p>

            </div>


            <div className="rounded-xl bg-slate-950 p-4">

              <p className="text-xs text-slate-500">
                Confidence
              </p>

              <p className="mt-1 text-sm text-slate-300">
                {analysis?.confidence || "—"}
              </p>

            </div>

          </div>


          {analysis && (

            <div className="mt-4 rounded-xl bg-slate-950 p-4">

              <p className="text-xs text-slate-500">
                AI Description
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-300">
                {analysis.description}
              </p>

            </div>

          )}


          {uploadMessage && (

            <div
              className={`mt-4 rounded-xl p-4 text-sm ${
                uploadMessage.includes("successfully")
                  ? "border border-green-500/20 bg-green-500/5 text-green-400"
                  : "border border-red-500/20 bg-red-500/5 text-red-400"
              }`}
            >
              {uploadMessage}
            </div>

          )}

        </div>


        {/* ================= ANALYZE ================= */}

        <button
  onClick={() => {
    if (analysis) {
      setShowSubmit(true);
    } else {
      analyzeIssue();
    }
  }}
          disabled={!imageFile || analyzing || uploading}
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-4 font-semibold transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-40"
        >

          {analyzing || uploading ? (
            <>
              <Loader2
                size={20}
                className="animate-spin"
              />

              {uploading
                ? "Uploading image..."
                : "Analyzing image..."}
            </>
          ) : (
            <>
              <Upload size={20} />
{analysis ? "Continue to Submit Report" : "Analyze & Continue"}
            </>
          )}

        </button>
        {showSubmit && (
  <div className="mt-6 rounded-2xl border border-green-500/20 bg-green-500/5 p-6">

    <h2 className="text-xl font-semibold">
      3. Submit Report
    </h2>

    <p className="mt-2 text-sm text-slate-400">
      Review the AI analysis and submit this civic issue.
    </p>

    <div className="mt-5 rounded-xl bg-slate-950 p-4">
      <p className="text-xs text-slate-500">
        Detected Issue
      </p>

      <p className="mt-1 text-lg font-semibold text-white">
        {analysis?.issueType}
      </p>

      <p className="mt-2 text-sm text-slate-400">
        Severity:{" "}
        <span className="font-semibold text-red-400">
          {analysis?.severity}
        </span>
      </p>
    </div>

   <button
  type="button"
  onClick={submitReport}
  className="mt-5 w-full rounded-xl bg-green-600 px-6 py-4 font-semibold transition hover:bg-green-500"
>
  Submit Civic Report
</button>

  </div>
)}

      </div>

    </div>
  );
}

export default ReportIssue;