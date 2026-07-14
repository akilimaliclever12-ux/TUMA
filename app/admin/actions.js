"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getAdminClient } from "../../lib/supabaseAdmin";
import { STATUSES } from "../config";

const COOKIE = "op_auth";

export async function login(formData) {
  const password = formData.get("password");
  const expected = process.env.ADMIN_PASSWORD;
  if (expected && password === expected) {
    cookies().set(COOKIE, expected, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 12, // 12h
    });
    redirect("/admin");
  }
  redirect("/admin?error=1");
}

export async function logout() {
  cookies().delete(COOKIE);
  redirect("/admin");
}

export async function updateStatus(formData) {
  const authed =
    cookies().get(COOKIE)?.value &&
    cookies().get(COOKIE)?.value === process.env.ADMIN_PASSWORD;
  if (!authed) redirect("/admin");

  const id = formData.get("id");
  const status = formData.get("status");
  const note = formData.get("operator_note");

  if (!id || !STATUSES.includes(status)) redirect("/admin");

  const supabase = getAdminClient();
  if (supabase) {
    await supabase
      .from("delivery_requests")
      .update({ status, operator_note: note || null })
      .eq("id", id);
  }
  redirect("/admin");
}
