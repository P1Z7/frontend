import { NextApiHandler } from "next";

export const GET: NextApiHandler = async (req, res) => {
  if (req.url) {
    const url = new URL(req.url);
    const code = url.searchParams.get("code")!;
    const signinMethod = url.pathname.split("/").pop()!;
    const signinRes = await fetch(`http://${process.env.NEXT_PUBLIC_BASE_URL}/auth`, { method: "POST", body: JSON.stringify({ code, signinMethod, email: "", password: "" }) });
  }
};
