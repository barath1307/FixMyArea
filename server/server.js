const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs/promises");

require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");

const app = express();

const PORT = process.env.PORT || 5000;

// ================= GEMINI =================

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});


// ================= MIDDLEWARE =================

app.use(cors());
app.use(express.json());


// ================= IMAGE UPLOAD =================

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(
      null,
      uniqueName + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage,

  limits: {
    fileSize: 5 * 1024 * 1024,
  },

  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Only JPG, PNG and WEBP images are allowed."
        )
      );
    }
  },
});


// ================= BASIC ROUTES =================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "FixMyArea API is running 🚀",
  });
});


app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "Backend connection successful",
  });
});


// ================= AI IMAGE ANALYSIS =================

app.post(
  "/api/upload",
  upload.single("image"),
  async (req, res) => {

    try {

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No image uploaded",
        });
      }


      // Read uploaded image
      const imageBuffer = await fs.readFile(
        req.file.path
      );

      const base64Image =
        imageBuffer.toString("base64");


      // Send image to Gemini
      const response = await ai.models.generateContent({

        model: "gemini-3.5-flash-lite",

        contents: [
          {
            inlineData: {
              mimeType: req.file.mimetype,
              data: base64Image,
            },
          },

          {
            text: `
You are the AI vision system for FixMyArea,
a civic issue reporting platform.

Analyze the uploaded image and identify
a visible civic or public infrastructure problem.

Possible issue types:

- Road Damage
- Streetlight
- Garbage
- Water Leakage
- Fallen Tree
- Traffic Signal
- Drainage
- Other

Severity must be:

- Low
- Medium
- High

Return ONLY JSON.

Use exactly this structure:

{
  "issueType": "Road Damage",
  "severity": "High",
  "confidence": 92,
  "description": "Short description of the visible issue."
}

Rules:

- confidence must be a number from 0 to 100.
- description must describe only what is visible.
- Do not invent information.
- If there is no obvious civic issue, use "Other".
- Keep the description short and useful.
            `,
          },
        ],

        config: {
          responseMimeType: "application/json",

          responseSchema: {
            type: "object",

            properties: {
              issueType: {
                type: "string",
              },

              severity: {
                type: "string",
              },

              confidence: {
                type: "number",
              },

              description: {
                type: "string",
              },
            },

            required: [
              "issueType",
              "severity",
              "confidence",
              "description",
            ],
          },
        },

      });


      // Gemini response
      const aiText = response.text.trim();

      const analysis = JSON.parse(aiText);


      // Send result to frontend
      res.json({

        success: true,

        message:
          "Image uploaded and analyzed successfully",

        file: {
          originalName: req.file.originalname,
          filename: req.file.filename,
          size: req.file.size,
          path: req.file.path,
        },

        analysis: {
          issueType: analysis.issueType,
          severity: analysis.severity,
          confidence: `${analysis.confidence}%`,
          description: analysis.description,
        },

      });

    } catch (error) {

      console.error(
        "Gemini AI analysis error:",
        error
      );

      res.status(500).json({

        success: false,

        message:
          "Image uploaded, but AI analysis failed.",

        error:
          error.message || "Unknown error",

      });

    }

  }
);


// ================= ERROR HANDLER =================

app.use((error, req, res, next) => {

  console.error(error);

  res.status(400).json({
    success: false,
    message:
      error.message ||
      "Something went wrong",
  });

});


// ================= SERVER =================

app.listen(PORT, () => {

  console.log(
    `🚀 FixMyArea server running on http://localhost:${PORT}`
  );

});