// server.js
require("dotenv").config();
const express = require("express");
const app = express();
const supabase = require("./supabaseClient"); // Supabase connection import

app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Backend running ✅ with Supabase" });
});

// Example: Get all courses (assuming a "courses" table in Supabase)
app.get("/courses", async (req, res) => {
  try {
    const { data, error } = await supabase.from("courses").select("*");
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Example: Add a new course
app.post("/courses", async (req, res) => {
  try {
    const { name, description } = req.body;
    const { data, error } = await supabase
      .from("courses")
      .insert([{ name, description }]);
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
