import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    if (request.method !== "POST") {
      return NextResponse.json(
        { error: "Method not allowed" },
        { status: 405 }
      );
    }

    const body = await request.json();
    const { name, phone, email, project_type, message } = body;

    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: "Name is required." },
        { status: 400 }
      );
    }

    if (!message || !message.trim()) {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 }
      );
    }

    if (!phone && !email) {
      return NextResponse.json(
        { error: "Please include a phone number or email so JDOB can follow up." },
        { status: 400 }
      );
    }

    const { error: insertError } = await supabase.from("leads").insert({
      name: name.trim(),
      phone: phone?.trim() || null,
      email: email?.trim() || null,
      project_type: project_type || null,
      message: message.trim(),
    });

    if (insertError) {
      console.error("Supabase insert error:", insertError);
      return NextResponse.json(
        { error: "Something went wrong. Please call or email instead." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Thanks — your request was sent. JDOB will follow up soon." },
      { status: 200 }
    );
  } catch (err) {
    console.error("Lead submission error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please call or email instead." },
      { status: 500 }
    );
  }
}
