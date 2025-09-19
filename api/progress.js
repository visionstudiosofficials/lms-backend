import supabase from "../supabaseClient";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, lesson_completed } = req.body;

    // increment lesson_unlocked
    const { data, error } = await supabase
      .from("enrollment")
      .update({ lesson_unlocked: lesson_completed + 1 })
      .eq("email", email);

    if (error) return res.status(500).json({ error: error.message });

    return res.status(200).json({ message: "Progress updated!" });
  }

  res.status(405).json({ error: "Method not allowed" });
}

