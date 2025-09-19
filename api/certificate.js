import supabase from "../supabaseClient";
import sendEmail from "../utils/sendEmail"; // ya koi email library

export default async function handler(req, res) {
  const { email } = req.body;

  // check if course completed
  const { data } = await supabase
    .from("enrollment")
    .select("*")
    .eq("email", email)
    .single();

  if (data.lesson_unlocked <= data.total_lessons)
    return res.status(400).json({ error: "Course not completed yet" });

  // generate certificate and send email
  await sendEmail(email, "Certificate of Completion", "Here is your certificate PDF...");

  return res.status(200).json({ message: "Certificate sent!" });
}

