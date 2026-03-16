const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

/* ---------------- Locations ---------------- */

const locations = {
  kankanady: [12.8698, 74.8451],
  hampankatta: [12.8690, 74.8429],
  surathkal: [13.0080, 74.7955],
  lalbagh: [12.8926, 74.8446],
  kadri: [12.8876, 74.8560]
};

/* ---------------- Danger Zones ---------------- */

const dangerZones = [
  {
    name: "Isolated Road - Kadri",
    coords: [12.8890, 74.8585],
    risk: "High Risk Area"
  },
  {
    name: "Dark Street - Lalbagh",
    coords: [12.8935, 74.8420],
    risk: "Low Lighting Area"
  },
  {
    name: "Silent Area - Surathkal",
    coords: [13.0100, 74.7920],
    risk: "Less Crowd at Night"
  }
];

/* ---------------- API: Get Locations ---------------- */

app.get("/api/locations", (req, res) => {
  res.json(locations);
});

/* ---------------- API: Get Danger Zones ---------------- */

app.get("/api/danger-zones", (req, res) => {
  res.json(dangerZones);
});

/* ---------------- API: Search Route ---------------- */

app.post("/api/search-route", (req, res) => {

  const { from, to, mode } = req.body;

  const start = locations[from];
  const end = locations[to];

  if (!start || !end) {
    return res.status(400).json({
      error: "Location not found"
    });
  }

  if (from === to) {
    return res.status(400).json({
      error: "Start and destination cannot be same"
    });
  }

  /* Demo distance + time calculation */

  const distance = (Math.random() * 5 + 3).toFixed(2);
  const duration = (Math.random() * 15 + 10).toFixed(1);

  /* Safety Score */

  let safetyScore;

  if (mode === "safe") {
    safetyScore = Math.floor(Math.random() * 20) + 80;
  } else {
    safetyScore = Math.floor(Math.random() * 20) + 60;
  }

  res.json({
    from,
    to,
    mode,
    start,
    end,
    distance: distance + " km",
    duration: duration + " min",
    safetyScore
  });

});

/* ---------------- Server ---------------- */

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});