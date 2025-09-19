import supabase from "../supabaseClient";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, course_id } = req.body;

    // create enrollment entry
    const { data, error } = await supabase
      .from("enrollment")
      .insert([{ email, course_id, lesson_unlocked: 1 }]);

    if (error) return res.status(500).json({ error: error.message });

    // generate unique key
    const key = Math.random().toString(36).substr(2, 10);
    await supabase.from("profile").insert([{ email, access_key: key }]);

    return res.status(201).json({ message: "Enrolled!", key });
  }

  res.status(405).json({ error: "Method not allowed" });
}

