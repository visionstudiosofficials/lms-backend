import supabase from "../supabaseClient";

export default async function handler(req, res) {
  const { email } = req.query;

  // fetch enrollment
  const { data, error } = await supabase
    .from("enrollment")
    .select("*")
    .eq("email", email)
    .single();

  if (error) return res.status(500).json({ error: error.message });

  // determine which lesson to unlock
  const lessonNumber = data.lesson_unlocked;

  const { data: lesson } = await supabase
    .from("lesson")
    .select("*")
    .eq("course_id", data.course_id)
    .eq("lesson_number", lessonNumber)
    .single();

  return res.status(200).json(lesson);
}

