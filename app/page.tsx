"use client";

import { useState, FormEvent } from "react";

export default function Home() {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", project_type: "", message: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [formError, setFormError] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError("");
    if (!formData.name.trim()) { setFormError("Name is required."); return; }
    if (!formData.message.trim()) { setFormError("Message is required."); return; }
    if (!formData.phone.trim() && !formData.email.trim()) {
      setFormError("Please include a phone number or email so JDOB can follow up.");
      return;
    }
    setFormStatus("sending");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setFormError(data.error || "Something went wrong. Please call or email instead.");
        setFormStatus("error");
        return;
      }
      setFormStatus("success");
      setFormData({ name: "", phone: "", email: "", project_type: "", message: "" });
    } catch {
      setFormError("Something went wrong. Please call or email instead.");
      setFormStatus("error");
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* HEADER */}
      <header className="w-full bg-white border-b-4 border-forest">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <a href="#" className="flex items-center no-underline">
            <div className="bg-forest text-white px-4 py-2 leading-none">
              <div className="text-2xl font-bold tracking-wide font-sans">JDOB</div>
              <div className="text-[10px] tracking-[0.3em] mt-0.5 font-sans">CONSTRUCTION</div>
            </div>
          </a>
          <nav className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm font-sans">
            <a href="#services" className="text-text-dark hover:text-forest-medium transition-colors">Services</a>
            <a href="#projects" className="text-text-dark hover:text-forest-medium transition-colors">Backyard Projects</a>
            <a href="#service-area" className="text-text-dark hover:text-forest-medium transition-colors">Service Area</a>
            <a href="#contact" className="bg-forest text-white px-5 py-2.5 rounded hover:bg-forest-medium transition-colors text-sm font-semibold">Request estimate</a>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* HERO */}
        <section className="bg-tan">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12 sm:py-20 lg:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div>
                <p className="text-forest-muted text-xs sm:text-sm tracking-[0.25em] uppercase font-sans mb-4">Backyard · Carpentry · Repairs</p>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-forest leading-tight font-serif mb-6">
                  Backyard construction, carpentry, and home repair built with care.
                </h1>
                <p className="text-base sm:text-lg text-brown leading-relaxed mb-8 max-w-xl">
                  From small handyman fixes to gazebos, sauna bases, decks, fences, and simple outdoor structures — JDOB helps homeowners improve their property one project at a time.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a href="#contact" className="bg-forest text-white px-6 py-3.5 rounded text-base font-semibold text-center hover:bg-forest-medium transition-colors">Request a backyard estimate</a>
                  <a href="#contact" className="border-2 border-forest text-forest bg-transparent px-6 py-3.5 rounded text-base font-semibold text-center hover:bg-forest hover:text-white transition-colors">Ask about handyman work</a>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-forest text-white rounded p-5 sm:p-6 flex flex-col justify-center min-h-[120px]">
                    <span className="text-lg sm:text-xl font-bold font-serif">Gazebos &amp; Structures</span>
                  </div>
                  <div className="bg-forest-medium text-white rounded p-5 sm:p-6 flex flex-col justify-center min-h-[120px]">
                    <span className="text-lg sm:text-xl font-bold font-serif">Sauna Bases &amp; Pads</span>
                  </div>
                  <div className="bg-forest-muted text-white rounded p-5 sm:p-6 flex flex-col justify-center min-h-[120px]">
                    <span className="text-lg sm:text-xl font-bold font-serif">Decks &amp; Fences</span>
                  </div>
                  <div className="bg-brown text-white rounded p-5 sm:p-6 flex flex-col justify-center min-h-[120px]">
                    <span className="text-lg sm:text-xl font-bold font-serif">Carpentry</span>
                  </div>
                </div>
                <div className="bg-brown-gold/20 border-2 border-brown-gold rounded p-4 flex items-center justify-center min-h-[60px]">
                  <span className="text-brown font-semibold font-serif text-base sm:text-lg">Handyman Work</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* RECENT BACKYARD PROJECTS */}
        <section id="projects" className="bg-cream">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12 sm:py-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-forest font-serif mb-3">Recent backyard projects</h2>
            <p className="text-brown text-base sm:text-lg mb-8 max-w-2xl">
              Examples of the type of work JDOB is building toward. Photos and completed project details can be added as the portfolio grows.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {[
                { title: "Wooden Gazebo", loc: "North York · 2024", bg: "bg-forest/10" },
                { title: "Sauna Foundation", loc: "Etobicoke · 2024", bg: "bg-forest-medium/10" },
                { title: "Pressure-Treated Deck", loc: "Mississauga · 2024", bg: "bg-forest-muted/10" },
              ].map((p) => (
                <div key={p.title} className={`${p.bg} border border-forest-muted/30 rounded p-6 sm:p-8`}>
                  <div className="h-32 sm:h-40 bg-forest-muted/10 rounded mb-4 flex items-center justify-center text-forest-muted text-sm font-sans">Photo placeholder</div>
                  <h3 className="text-lg font-bold text-forest font-serif mb-1">{p.title}</h3>
                  <p className="text-brown text-sm font-sans">{p.loc}</p>
                </div>
              ))}
            </div>
            <p className="text-forest-muted text-sm mt-6 font-sans italic">Portfolio photos coming soon as new projects are completed.</p>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="bg-white">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12 sm:py-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-forest font-serif mb-2">Services</h2>
            <h3 className="text-xl sm:text-2xl font-bold text-text-dark font-serif mb-3">Help around the home, with a focus on backyard construction.</h3>
            <p className="text-brown text-base sm:text-lg mb-8 max-w-2xl">
              JDOB Construction is starting with practical homeowner projects and growing into larger backyard and construction work. Small jobs are welcome, especially when they help homeowners get reliable work done without confusion.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { title: "Handyman Work", desc: "Small repairs, installs, fixes, mounting, assembly, patching, minor improvements, and general help around the house.", label: "Available now" },
                { title: "Gazebos & Outdoor Structures", desc: "Simple outdoor builds, structure assembly, wood framing, and backyard additions.", label: "Project-dependent" },
                { title: "Sauna Bases & Pads", desc: "Simple concrete pads, bases, and prep work for backyard saunas and outdoor features.", label: "Project-dependent" },
                { title: "Decks & Fences", desc: "Repairs, replacements, small builds, privacy features, gates, boards, and outdoor woodwork.", label: "Project-dependent" },
                { title: "Concrete Pads & Simple Bases", desc: "Small pads, basic foundations, steps, walkway sections, and prep for outdoor structures.", label: "Project-dependent" },
                { title: "Carpentry & Backyard Upgrades", desc: "Wood repairs, trim, framing basics, outdoor improvements, and custom practical upgrades.", label: "Project-dependent" },
              ].map((s) => (
                <div key={s.title} className="bg-off-white border border-forest-muted/25 rounded p-6 flex flex-col">
                  <h4 className="text-lg font-bold text-forest font-serif mb-2">{s.title}</h4>
                  <p className="text-brown text-sm leading-relaxed mb-3 flex-1">{s.desc}</p>
                  <span className="text-xs font-semibold text-forest-muted tracking-wide uppercase font-sans">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PLACEHOLDER_END */}
      </main>
    </div>
  );
}
