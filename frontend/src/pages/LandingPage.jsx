import { FaQrcode, FaMobileAlt, FaCloud, FaGlobe } from "react-icons/fa";
import { Sparkles, Zap } from "lucide-react";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const BASE_API = import.meta.env.VITE_BASE_API;
import PrivacyPolicyModal from "../components/PrivacyPolicyModal";

export default function LandingPage() {
  const socialLinks = [
    { name: "Facebook", url: "#", icon: <FaFacebook /> },
    { name: "Instagram", url: "#", icon: <FaInstagram /> },
  ];

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    restaurantName: "",
    message: "",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [openPrivacy, setOpenPrivacy] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!form.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!form.message.trim()) {
      newErrors.message = "Message cannot be empty";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    if (error[e.target.name]) {
      setError({ ...error, [e.target.name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setError(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return; // ❌ Stop submission
    }

    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      const res = await fetch(`${BASE_API}/api/contact/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Something went wrong");

      setSuccess(true);
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
        restaurantName: "",
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePricingClick = () => {
    // 1. Scroll to contact section
    document.getElementById("contact-us")?.scrollIntoView({
      behavior: "smooth",
    });

    // 2. Blink WhatsApp after scroll
    setTimeout(() => {
      const whatsappCard = document.getElementById("whatsapp-cta");
      if (whatsappCard) {
        whatsappCard.classList.add("blink-highlight");

        // Remove class after animation finishes
        setTimeout(() => {
          whatsappCard.classList.remove("blink-highlight");
        }, 3000);
      }
    }, 600); // delay so scroll finishes first
  };

  return (
    <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full bg-slate-950/80 backdrop-blur-md z-50 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-emerald-400 to-teal-500 p-2 rounded-lg">
              <FaQrcode className="w-5 h-5 text-white" />
              <img src="/curv-bg.png" alt="" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              ScanMyMenu
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() =>
                document.getElementById("features")?.scrollIntoView({
                  behavior: "smooth",
                })
              }
              className="hidden sm:block text-sm text-gray-300 hover:text-white transition"
            >
              Features
            </button>
            <button
              onClick={() =>
                document.getElementById("pricing")?.scrollIntoView({
                  behavior: "smooth",
                })
              }
              className="hidden sm:block text-sm text-gray-300 hover:text-white transition"
            >
              Pricing
            </button>
            <button
              onClick={() =>
                document.getElementById("contact-us")?.scrollIntoView({
                  behavior: "smooth",
                })
              }
              className="hidden sm:block text-sm text-gray-300 hover:text-white transition"
            >
              Contact Us
            </button>
            <button
              className="text-sm px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 font-semibold shadow-lg shadow-emerald-500/20 transition"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className="text-sm px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 font-semibold shadow-lg shadow-emerald-500/20 transition"
              onClick={handlePricingClick}
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden pt-32 pb-20 px-4 sm:px-6">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="max-w-7xl mx-auto relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-2 mb-8">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-emerald-300">
                Trusted by 100+ restaurants
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight mb-6">
              Your Menu,
              <span className="block bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                Always Up-to-Date
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Create stunning QR menus in minutes. Update instantly. Delight
              your customers with a seamless digital experience — no apps
              required.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
              <button
                className="group px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl font-semibold shadow-xl shadow-emerald-500/25 hover:shadow-2xl hover:shadow-emerald-500/40 transition-all hover:scale-105"
                onClick={handlePricingClick}
              >
                Start Free Trial
                <Zap className="inline-block ml-2 w-5 h-5" />
              </button>
              <button className="px-8 py-4 bg-slate-800 hover:bg-slate-700 rounded-xl font-semibold border border-slate-700 hover:border-slate-600 transition-all">
                View Demo
              </button>
            </div>

            {/* Hero Visual */}
            <div className="relative max-w-4xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 blur-3xl"></div>
              <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl p-8 sm:p-12 border border-slate-700">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="bg-slate-950 rounded-2xl p-6 border border-emerald-500/20 hover:border-emerald-500/40 transition-all">
                    <FaQrcode className="text-emerald-400 w-20 h-20 mx-auto mb-4" />
                    <p className="text-center text-gray-300 font-medium">
                      Scan & View Instantly
                    </p>
                  </div>
                  <div className="bg-slate-950 rounded-2xl p-6 border border-teal-500/20 hover:border-teal-500/40 transition-all">
                    <FaMobileAlt className="text-teal-400 w-20 h-20 mx-auto mb-4" />
                    <p className="text-center text-gray-300 font-medium">
                      Mobile-First Design
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-8">
            <StatCard number="50K+" label="Menus Created" />
            <StatCard number="2M+" label="QR Scans Monthly" />
            <StatCard number="99.9%" label="Uptime" />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-20 px-4 sm:px-6 scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Powerful Features,
              <span className="block bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Simple to Use
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Everything you need to create and manage beautiful digital menus
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={<FaQrcode />}
              title="One-Time QR Code"
              text="Generate once, use forever. No reprinting needed when you update your menu."
              gradient="from-emerald-500 to-teal-500"
            />
            <FeatureCard
              icon={<FaCloud />}
              title="Real-Time Updates"
              text="Change prices, items, and availability instantly across all locations."
              gradient="from-teal-500 to-cyan-500"
            />
            <FeatureCard
              icon={<FaMobileAlt />}
              title="Mobile Optimized"
              text="Stunning experience on every device. Fast loading, smooth scrolling."
              gradient="from-cyan-500 to-blue-500"
            />
            <FeatureCard
              icon={<FaGlobe />}
              title="Multi-Currency"
              text="Reach global customers with support for multiple currencies."
              gradient="from-blue-500 to-indigo-500"
            />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 px-4 sm:px-6 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Launch in Minutes
            </h2>
            <p className="text-gray-400 text-lg">
              Simple setup, powerful results
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StepCard
              number="1"
              title="Sign Up"
              text="Create your account in seconds"
            />
            <StepCard
              number="2"
              title="Build Menu"
              text="Add items with photos & prices"
            />
            <StepCard
              number="3"
              title="Get QR Code"
              text="Download & print your code"
            />
            <StepCard
              number="4"
              title="Go Live"
              text="Customers scan & enjoy"
            />
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Loved by Restaurant Owners
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-8">
            <Testimonial
              text="Switching to ScanMyMenu was the best decision. Our customers love the digital experience!"
              author="Sarah Chen"
              role="Café Owner"
            />
            <Testimonial
              text="Menu updates used to take days. Now it takes seconds. Incredible time saver."
              author="Marco Rodriguez"
              role="Restaurant Manager"
            />
            <Testimonial
              text="The QR menus look professional and our staff can focus on service instead of printing."
              author="Priya Patel"
              role="Fine Dining Owner"
            />
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section
        id="pricing"
        className="py-20 px-4 sm:px-6 bg-gradient-to-b from-slate-900 to-slate-950"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Choose the perfect plan for your restaurant. All plans include
              unlimited updates. <br /> All prices are free to <b>Negotiate</b>
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Starter Plan */}
            <PricingCard
              name="Starter"
              price="₹199"
              period="per month"
              description="Perfect for small cafés and food trucks"
              features={[
                "1-5 QR Menu",
                "Unlimited menu updates",
                "Mobile optimized",
                "Basic analytics",
                "Email support",
              ]}
              buttonText="Start Free Trial"
              popular={false}
              onClick={handlePricingClick}
            />

            {/* Professional Plan */}
            <PricingCard
              name="Professional"
              price="₹399"
              period="per month"
              description="Ideal for restaurants and multiple locations"
              features={[
                "6-15 QR Menus",
                "Unlimited menu updates",
                "Advanced analytics",
                "Mobile optimized",

                "Priority support",
              ]}
              buttonText="Start Free Trial"
              popular={true}
              onClick={handlePricingClick}
            />

            {/* Enterprise Plan */}
            <PricingCard
              name="Enterprise"
              price="Custom"
              period="contact us"
              description="For restaurant chains and franchises"
              features={[
                "Unlimited QR Menus",
                "White-label solution",
                "API access",
                "Dedicated account manager",
                "Custom integrations",
                "24/7 phone support",
              ]}
              buttonText="Contact Sales"
              popular={false}
              onClick={handlePricingClick}
            />
          </div>

          <div className="mt-16 text-center">
            <p className="text-gray-400 mb-6">
              All plans include a 14-day free trial. No credit card required.
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <span className="text-emerald-400">✓</span>
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400">✓</span>
                <span>No setup fees</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400">✓</span>
                <span>30-day money back</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT US */}
      <section id="contact-us" className="py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Get in Touch
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Have questions? We'd love to hear from you. Send us a message and
              we'll respond as soon as possible.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800">
              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Name */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      placeholder="John"
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition"
                    />
                    {error.firstName && (
                      <p className="text-xs text-red-400 mt-1">
                        {error.firstName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      placeholder="Doe"
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition"
                    />
                    {error.lastName && (
                      <p className="text-xs text-red-400 mt-1">
                        {error.lastName}
                      </p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition"
                  />
                  {error.email && (
                    <p className="text-xs text-red-400 mt-1">{error.email}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">
                    Message
                  </label>
                  <textarea
                    rows="4"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help..."
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition resize-none"
                  />
                  {error.message && (
                    <p className="text-xs text-red-400 mt-1">{error.message}</p>
                  )}
                </div>

                {/* Feedback */}
                {success && (
                  <p className="text-sm text-emerald-400">
                    ✅ Message sent successfully. We’ll get back to you soon.
                  </p>
                )}

                {typeof error === "string" && (
                  <p className="text-sm text-red-400">{error}</p>
                )}
                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 rounded-xl font-semibold shadow-lg shadow-emerald-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 hover:border-emerald-500/30 transition-all">
                <div className="flex items-start gap-4">
                  <a
                    href="mailto:help.scanmymenu@gmail.com"
                    className="flex items-start gap-4 cursor-pointer"
                  >
                    <div className="bg-gradient-to-br from-emerald-500 to-teal-500 p-3 rounded-xl">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-2">Email Us</h3>
                      <p className="text-gray-400">help.scanmymenu@gmail.com</p>
                    </div>
                  </a>
                </div>
              </div>

              <div
                id="whatsapp-cta"
                className="bg-slate-900 rounded-3xl p-8 border border-slate-800 hover:border-emerald-500/30 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-br from-teal-500 to-cyan-500 p-3 rounded-xl">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <a
                      href="https://wa.me/919582307736"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer block"
                    >
                      <h3 className="text-xl font-semibold mb-2">
                        Chat on WhatsApp
                      </h3>
                      <p className="text-gray-400">+91-9582307736</p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-teal-600 opacity-90"></div>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Ready to Transform Your Menu?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Join thousands of restaurants already using ScanMyMenu. Start your
            free trial today — no credit card required.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              className="group px-8 py-4 bg-white text-emerald-600 rounded-xl font-bold shadow-2xl hover:shadow-white/20 transition-all hover:scale-105"
              onClick={handlePricingClick}
            >
              Start Free Trial
              <Sparkles className="inline-block ml-2 w-5 h-5" />
            </button>
          </div>

          <p className="mt-8 text-sm text-white/70">
            ✓ 14-day free trial ✓ No credit card needed ✓ Cancel anytime
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          {/* Top Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
            {/* Brand */}
            <div>
              <h2 className="text-2xl font-bold text-white">
                Scan<span className="text-emerald-500">My</span>Menu
              </h2>
              <p className="mt-3 text-sm text-slate-400 max-w-xs">
                Simple QR menus for modern restaurants. Create once, update
                anytime — no reprints ever.
              </p>
            </div>

            {/* Links */}
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wide mb-4">
                Product
              </h3>
              <ul className="space-y-3 text-sm text-slate-400">
                <li className="hover:text-emerald-500 transition">
                  <button
                    onClick={() =>
                      document.getElementById("features")?.scrollIntoView({
                        behavior: "smooth",
                      })
                    }
                    className="hidden sm:block text-sm text-gray-300 hover:text-white transition"
                  >
                    Features
                  </button>
                </li>
                <li className="hover:text-emerald-500 transition">
                  <button
                    onClick={() =>
                      document.getElementById("pricing")?.scrollIntoView({
                        behavior: "smooth",
                      })
                    }
                    className="hidden sm:block text-sm text-gray-300 hover:text-white transition"
                  >
                    Pricing
                  </button>
                </li>
                <li className="hover:text-emerald-500 transition">
                  <button
                    onClick={() =>
                      document.getElementById("contact-us")?.scrollIntoView({
                        behavior: "smooth",
                      })
                    }
                    className="hidden sm:block text-sm text-gray-300 hover:text-white transition"
                  >
                    Contact Us
                  </button>
                </li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wide mb-4">
                Follow Us
              </h3>
              <div className="flex gap-3">
                {socialLinks.map((social, i) => (
                  <a
                    key={i}
                    href="#"
                    className="p-3 rounded-xl bg-slate-800 hover:bg-emerald-500 transition"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-800 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500">
              © {new Date().getFullYear()} ScanMyMenu. All rights reserved.
            </p>

            <div className="flex gap-6 text-xs text-slate-500">
              <button
                onClick={() => setOpenPrivacy(true)}
                className="hover:text-emerald-500 cursor-pointer"
              >
                Privacy Policy
              </button>
            </div>
          </div>
        </div>
      </footer>
      <PrivacyPolicyModal
        open={openPrivacy}
        onClose={() => setOpenPrivacy(false)}
      />
    </div>
  );
}

function StatCard({ number, label }) {
  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 text-center border border-slate-700 hover:border-emerald-500/50 transition-all">
      <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-2">
        {number}
      </div>
      <div className="text-gray-400">{label}</div>
    </div>
  );
}

function FeatureCard({ icon, title, text, gradient }) {
  return (
    <div className="group bg-slate-900 rounded-2xl p-6 border border-slate-800 hover:border-slate-700 transition-all hover:scale-105">
      <div
        className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${gradient} mb-4 group-hover:scale-110 transition-transform`}
      >
        <div className="text-white text-2xl">{icon}</div>
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{text}</p>
    </div>
  );
}

function StepCard({ number, title, text }) {
  return (
    <div className="relative">
      <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 hover:border-emerald-500/50 transition-all">
        <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
          {number}
        </div>
        <h3 className="text-xl font-semibold mb-2 mt-4">{title}</h3>
        <p className="text-gray-400 text-sm">{text}</p>
      </div>
    </div>
  );
}

function Testimonial({ text, author, role }) {
  return (
    <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 hover:border-emerald-500/30 transition-all">
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-yellow-400">
            ★
          </span>
        ))}
      </div>
      <p className="text-gray-300 mb-4 italic">"{text}"</p>
      <div>
        <p className="font-semibold">{author}</p>
        <p className="text-sm text-gray-400">{role}</p>
      </div>
    </div>
  );
}

function PricingCard({
  name,
  price,
  period,
  description,
  features,
  buttonText,
  popular,
  onClick,
}) {
  return (
    <div
      className={`relative bg-slate-900 rounded-3xl p-8 border ${
        popular
          ? "border-emerald-500 shadow-xl shadow-emerald-500/20 scale-105"
          : "border-slate-800"
      } transition-all hover:border-emerald-500/50`}
    >
      {popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-bold px-4 py-1 rounded-full shadow-lg">
            Most Popular
          </span>
        </div>
      )}

      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold mb-2">{name}</h3>
        <p className="text-gray-400 text-sm mb-4">{description}</p>
        <div className="mb-2">
          <span className="text-5xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
            {price}
          </span>
        </div>
        <p className="text-gray-500 text-sm">{period}</p>
      </div>

      <ul className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <span className="text-emerald-400 mt-1 flex-shrink-0">✓</span>
            <span className="text-gray-300 text-sm">{feature}</span>
          </li>
        ))}
      </ul>
      <button
        onClick={onClick}
        className={`w-full py-4 rounded-xl font-semibold transition-all ${
          popular
            ? "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-lg shadow-emerald-500/25"
            : "bg-slate-800 hover:bg-slate-700 border border-slate-700"
        }`}
      >
        {buttonText}
      </button>
    </div>
  );
}
