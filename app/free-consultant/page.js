"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Calendar,
  Clock,
  Users,
  Award,
  TrendingUp,
  Zap,
  Shield,
  Star,
  Phone,
  Mail,
  MessageSquare,
  Video,
  Target,
  Sparkles,
  ChevronRight,
  BookOpen,
  Globe,
  GraduationCap,
  FileText,
  Plane,
  DollarSign,
} from "lucide-react";
import toast from "react-hot-toast";

export default function FreeConsultationPage() {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [destinationOptions, setDestinationOptions] = useState([]);
  const [formData, setFormData] = useState({
    // Step 1
    name: "",
    email: "",
    phone: "",
    nationality: "",

    // Step 2
    studyDestination: "",
    studyLevel: "",
    fieldOfStudy: "",

    // Step 3
    goals: [],
    challenges: "",

    // Step 4
    preferredDate: "",
    preferredTime: "",
    consultationType: "video",
    additionalInfo: "",
  });

  const totalSteps = 4;
  const todayDate = new Date().toISOString().split("T")[0];

  useEffect(() => {
    let ignore = false;

    async function loadDestinations() {
      try {
        const res = await fetch("/api/destination", { cache: "no-store" });
        const data = await res.json();
        if (!ignore && data?.success) {
          const dynamicNames = Array.isArray(data.destinations)
            ? data.destinations.map((item) => item.name).filter(Boolean)
            : [];
          const uniqueNames = Array.from(new Set(dynamicNames));
          setDestinationOptions([...uniqueNames, "Not decided yet"]);
        }
      } catch (error) {
        console.error("Failed to load consultation destinations", error);
      }
    }

    loadDestinations();
    return () => {
      ignore = true;
    };
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      const currentGoals = formData.goals || [];
      setFormData({
        ...formData,
        goals: checked
          ? [...currentGoals, value]
          : currentGoals.filter((g) => g !== value),
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleNext = () => { if (step < totalSteps) setStep(step + 1); };
  const handlePrev = () => { if (step > 1) setStep(step - 1); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/consultations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok || !data?.success) {
        throw new Error(data?.error || "Failed to submit consultation request");
      }
      toast.success("Consultation request submitted successfully.");
      setIsSubmitted(true);
    } catch (error) {
      console.error(error);
      toast.error("Could not submit right now. Please try again.");
      setSubmitError("Could not submit right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const progressPercentage = (step / totalSteps) * 100;

  return (
    <div className="min-h-screen" style={{ background: "#f5f4f2", fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>

      {/* Hero Section */}
      <section style={{
        position: "relative",
        overflow: "hidden",
        background: "#29a8d4",
        paddingTop: "80px",
        paddingBottom: "80px",
        paddingLeft: "24px",
        paddingRight: "24px",
      }}>
        {/* Decorative background shapes */}
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", overflow: "hidden", pointerEvents: "none" }}>
          <svg style={{ position: "absolute", top: "-40px", left: "-60px", opacity: 0.07 }} width="400" height="400" viewBox="0 0 400 400">
            <circle cx="200" cy="200" r="200" fill="white" />
          </svg>
          <svg style={{ position: "absolute", bottom: "-60px", right: "-60px", opacity: 0.07 }} width="350" height="350" viewBox="0 0 350 350">
            <circle cx="175" cy="175" r="175" fill="white" />
          </svg>
          {/* Red accent shape */}
          <svg style={{ position: "absolute", top: "20px", right: "80px", opacity: 0.18 }} width="200" height="200" viewBox="0 0 200 200">
            <text x="-20" y="180" fontSize="220" fontWeight="900" fill="none" stroke="#e8265a" strokeWidth="3">S</text>
          </svg>
        </div>

        <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          {/* Badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "10px 20px", background: "rgba(232,38,90,0.15)",
            border: "1px solid rgba(232,38,90,0.4)", borderRadius: "9999px",
            color: "#ff7aaa", fontSize: "13px", fontWeight: "700",
            marginBottom: "24px", letterSpacing: "0.04em"
          }}>
            <GraduationCap size={16} />
            100% Free · No Obligation · Expert Guidance
          </div>

          <h1 style={{
            fontFamily: "Georgia, serif",
            fontSize: "clamp(32px, 5vw, 58px)",
            fontWeight: "700",
            color: "#ffffff",
            lineHeight: "1.2",
            margin: "0 0 20px 0",
            letterSpacing: "-0.02em",
          }}>
            Book Your Free
            <br />
            <span style={{ color: "#e8265a" }}>Study Abroad Consultation</span>
          </h1>

          <p style={{
            fontSize: "clamp(15px, 1.5vw, 18px)",
            color: "rgba(255,255,255,0.78)",
            lineHeight: "1.7",
            margin: "0 0 40px auto",
            maxWidth: "620px",
          }}>
            Get personalised guidance from StudySync's expert counsellors — from choosing the right university
            to securing your student visa. Your dream of studying abroad starts here.
          </p>

          {/* Value props */}
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "12px", marginBottom: "36px" }}>
            {[
              { icon: Clock, text: "30-min session" },
              { icon: Users, text: "Senior counsellor" },
              { icon: Globe, text: "50+ destinations" },
            ].map((item, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: "8px",
                background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "12px", padding: "12px 20px", color: "#ffffff", fontSize: "14px", fontWeight: "500"
              }}>
                <item.icon size={18} style={{ color: "#e8265a" }} />
                {item.text}
              </div>
            ))}
          </div>

          {/* Trust signals */}
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "24px", color: "rgba(255,255,255,0.65)", fontSize: "13px" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <CheckCircle size={14} style={{ color: "#4ade80" }} /> 2,000+ students placed
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Star size={14} style={{ color: "#fbbf24", fill: "#fbbf24" }} /> 4.9/5 counsellor rating
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Shield size={14} style={{ color: "#60a5fa" }} /> 98% visa success rate
            </span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section style={{ padding: "64px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "40px", alignItems: "start" }}>

            {/* Sidebar */}
            <div style={{ position: "sticky", top: "24px" }}>
              <div style={{
                background: "#ffffff", borderRadius: "20px",
                border: "1px solid rgba(26,20,100,0.08)",
                padding: "32px", boxShadow: "0 4px 24px rgba(26,20,100,0.07)"
              }}>
                <h3 style={{ fontFamily: "Georgia, serif", fontSize: "20px", fontWeight: "700", color: "#1a1464", margin: "0 0 24px 0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <BookOpen size={22} style={{ color: "#e8265a" }} />
                  What we cover
                </h3>

                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {[
                    { icon: GraduationCap, title: "University Selection", desc: "Best-fit institutions for your profile" },
                    { icon: FileText, title: "Application Strategy", desc: "SOP, LOR & document guidance" },
                    { icon: DollarSign, title: "Scholarships", desc: "Funding options & eligibility" },
                    { icon: Plane, title: "Visa Assistance", desc: "Step-by-step visa process" },
                    { icon: Globe, title: "Country Insights", desc: "Cost, lifestyle & work rights" },
                    { icon: TrendingUp, title: "Career Pathways", desc: "Post-study employment options" },
                  ].map((item, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px", padding: "10px", borderRadius: "12px" }}>
                      <div style={{
                        width: "38px", height: "38px", background: "#1a1464",
                        borderRadius: "10px", display: "flex", alignItems: "center",
                        justifyContent: "center", flexShrink: 0
                      }}>
                        <item.icon size={18} style={{ color: "#ffffff" }} />
                      </div>
                      <div>
                        <div style={{ fontWeight: "700", fontSize: "14px", color: "#1a1464", marginBottom: "2px" }}>{item.title}</div>
                        <div style={{ fontSize: "13px", color: "#6b7280" }}>{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: "24px", paddingTop: "20px", borderTop: "1px solid rgba(26,20,100,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "13px", color: "#059669", fontWeight: "600", display: "flex", alignItems: "center", gap: "4px" }}>
                    <Shield size={14} /> 100% Confidential
                  </span>
                  <span style={{ display: "flex", gap: "2px" }}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={13} style={{ fill: "#fbbf24", color: "#fbbf24" }} />
                    ))}
                  </span>
                </div>
              </div>
            </div>

            {/* Form */}
            <div>
              {!isSubmitted ? (
                <div style={{
                  background: "#ffffff", borderRadius: "20px",
                  border: "1px solid rgba(26,20,100,0.08)",
                  boxShadow: "0 8px 40px rgba(26,20,100,0.08)", overflow: "hidden"
                }}>
                  {/* Progress bar */}
                  <div style={{ height: "4px", background: "#f0f0f0" }}>
                    <div style={{
                      height: "100%", width: `${progressPercentage}%`,
                      background: "linear-gradient(to right, #1a1464, #e8265a)",
                      transition: "width 0.4s ease"
                    }} />
                  </div>

                  {/* Step header */}
                  <div style={{ background: "#f9f8ff", padding: "28px 36px", borderBottom: "1px solid rgba(26,20,100,0.07)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                      <div>
                        <div style={{ fontSize: "12px", fontWeight: "700", color: "#e8265a", letterSpacing: "0.08em", marginBottom: "6px", textTransform: "uppercase" }}>
                          Step {step} of {totalSteps}
                        </div>
                        <h2 style={{ fontFamily: "Georgia, serif", fontSize: "22px", fontWeight: "700", color: "#1a1464", margin: 0 }}>
                          {step === 1 && "Your Personal Details"}
                          {step === 2 && "Study Preferences"}
                          {step === 3 && "Goals & Concerns"}
                          {step === 4 && "Schedule Your Session"}
                        </h2>
                      </div>
                      <div style={{ fontSize: "32px", fontWeight: "800", color: "rgba(26,20,100,0.12)", fontFamily: "Georgia, serif" }}>
                        {step}/4
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "6px" }}>
                      {[...Array(totalSteps)].map((_, i) => (
                        <div key={i} style={{
                          flex: 1, height: "4px", borderRadius: "9999px",
                          background: i + 1 <= step ? "#1a1464" : "#e5e7eb",
                          transition: "background 0.3s"
                        }} />
                      ))}
                    </div>
                  </div>

                  {/* Form body */}
                  <form onSubmit={handleSubmit} style={{ padding: "36px" }}>

                    {/* Step 1 */}
                    {step === 1 && (
                      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                        <FormInput label="Full Name" name="name" type="text" value={formData.name} onChange={handleChange} placeholder="Enter your full name" icon={Users} required />
                        <FormInput label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Enter your email address" icon={Mail} required />
                        <FormInput label="Phone Number" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="Enter your phone number" icon={Phone} required />
                        <FormInput label="Country" name="country" type="text" value={formData.country} onChange={handleChange} placeholder="Enter your country" icon={Globe} required />
                      </div>
                    )}

                    {/* Step 2 */}
                    {step === 2 && (
                      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                        <FormSelect
                          label="Preferred Study Destination"
                          name="studyDestination"
                          value={formData.studyDestination}
                          onChange={handleChange}
                          options={destinationOptions.length ? destinationOptions : ["Not decided yet"]}
                          icon={Globe}
                          required
                        />
                        <FormSelect
                          label="Level of Study"
                          name="studyLevel"
                          value={formData.studyLevel}
                          onChange={handleChange}
                          options={["Foundation / Pathway", "Undergraduate (Bachelor's)", "Postgraduate (Master's)", "PhD / Research", "Vocational / TAFE", "English Language Course"]}
                          icon={GraduationCap}
                          required
                        />
                        <FormSelect
                          label="Field of Study"
                          name="fieldOfStudy"
                          value={formData.fieldOfStudy}
                          onChange={handleChange}
                          options={["Business & Management", "Engineering & Technology", "Health & Medicine", "IT & Computer Science", "Arts & Humanities", "Law", "Education", "Science & Environment", "Not sure yet"]}
                          icon={BookOpen}
                          required
                        />
                      </div>
                    )}

                    {/* Step 3 */}
                    {step === 3 && (
                      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                        <div>
                          <label style={{ display: "block", fontWeight: "700", fontSize: "14px", color: "#1a1464", marginBottom: "14px" }}>
                            What are your main goals? <span style={{ color: "#9ca3af", fontWeight: "400" }}>(select all that apply)</span>
                          </label>
                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                            {[
                              "Get into a top-ranked university",
                              "Find scholarship opportunities",
                              "Improve career prospects",
                              "Gain international experience",
                              "Permanent residency pathway",
                              "Affordable quality education",
                              "English language improvement",
                              "Family / partner visa options",
                            ].map((goal) => (
                              <label key={goal} style={{
                                display: "flex", alignItems: "center", gap: "10px",
                                padding: "12px 14px",
                                border: `2px solid ${formData.goals.includes(goal) ? "#1a1464" : "#e5e7eb"}`,
                                background: formData.goals.includes(goal) ? "rgba(26,20,100,0.05)" : "#fff",
                                borderRadius: "10px", cursor: "pointer", fontSize: "13px",
                                fontWeight: "500", color: "#374151", transition: "all 0.2s"
                              }}>
                                <input
                                  type="checkbox" name="goals" value={goal}
                                  checked={formData.goals.includes(goal)}
                                  onChange={handleChange}
                                  style={{ width: "16px", height: "16px", accentColor: "#1a1464" }}
                                />
                                {goal}
                              </label>
                            ))}
                          </div>
                        </div>
                        <FormTextarea
                          label="What's your biggest concern about studying abroad?"
                          name="challenges"
                          value={formData.challenges}
                          onChange={handleChange}
                          placeholder="E.g. visa rejection, high tuition fees, language barriers, choosing the right course..."
                          rows={4}
                          icon={MessageSquare}
                          required
                        />
                      </div>
                    )}

                    {/* Step 4 */}
                    {step === 4 && (
                      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                        <div>
                          <label style={{ display: "block", fontWeight: "700", fontSize: "14px", color: "#1a1464", marginBottom: "14px" }}>
                            How would you like to meet?
                          </label>
                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
                            {[
                              { value: "video", label: "Video Call", icon: Video },
                              { value: "phone", label: "Phone Call", icon: Phone },
                              { value: "chat", label: "Live Chat", icon: MessageSquare },
                            ].map((type) => (
                              <label key={type.value} style={{
                                display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
                                padding: "20px 12px",
                                border: `2px solid ${formData.consultationType === type.value ? "#1a1464" : "#e5e7eb"}`,
                                background: formData.consultationType === type.value ? "rgba(26,20,100,0.05)" : "#fff",
                                borderRadius: "12px", cursor: "pointer", transition: "all 0.2s"
                              }}>
                                <input type="radio" name="consultationType" value={type.value}
                                  checked={formData.consultationType === type.value}
                                  onChange={handleChange} style={{ display: "none" }} />
                                <type.icon size={28} style={{ color: formData.consultationType === type.value ? "#1a1464" : "#9ca3af" }} />
                                <span style={{ fontSize: "13px", fontWeight: "600", color: "#1a1464" }}>{type.label}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                          <FormInput label="Preferred Date" name="preferredDate" type="date" value={formData.preferredDate} onChange={handleChange} icon={Calendar} min={todayDate} required />
                          <FormSelect
                            label="Preferred Time"
                            name="preferredTime"
                            value={formData.preferredTime}
                            onChange={handleChange}
                            options={["9:00 AM – 10:00 AM", "10:00 AM – 11:00 AM", "11:00 AM – 12:00 PM", "1:00 PM – 2:00 PM", "2:00 PM – 3:00 PM", "3:00 PM – 4:00 PM", "4:00 PM – 5:00 PM"]}
                            icon={Clock}
                            required
                          />
                        </div>

                        <FormTextarea
                          label="Anything else you'd like to discuss?"
                          name="additionalInfo"
                          value={formData.additionalInfo}
                          onChange={handleChange}
                          placeholder="Previous study history, specific universities in mind, English test scores, etc."
                          rows={4}
                          icon={MessageSquare}
                        />
                      </div>
                    )}

                    {/* Navigation */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "32px", paddingTop: "24px", borderTop: "1px solid rgba(26,20,100,0.08)" }}>
                      {step > 1 ? (
                        <button type="button" onClick={handlePrev} style={{
                          display: "flex", alignItems: "center", gap: "6px",
                          padding: "12px 20px", background: "#f3f4f6",
                          color: "#374151", fontWeight: "600", fontSize: "14px",
                          borderRadius: "10px", border: "none", cursor: "pointer"
                        }}>
                          <ArrowLeft size={16} /> Back
                        </button>
                      ) : <div />}

                      {step < totalSteps ? (
                        <button type="button" onClick={handleNext} style={{
                          display: "flex", alignItems: "center", gap: "8px",
                          padding: "14px 28px", background: "#1a1464",
                          color: "#ffffff", fontWeight: "700", fontSize: "15px",
                          borderRadius: "10px", border: "none", cursor: "pointer",
                          transition: "background 0.2s"
                        }}>
                          Continue <ArrowRight size={18} />
                        </button>
                      ) : (
                        <button type="submit" disabled={isSubmitting} style={{
                          display: "flex", alignItems: "center", gap: "8px",
                          padding: "14px 28px", background: "#e8265a",
                          color: "#ffffff", fontWeight: "700", fontSize: "15px",
                          borderRadius: "10px", border: "none", cursor: "pointer"
                        }}>
                          {isSubmitting ? "Submitting..." : "Book My Free Consultation"} <CheckCircle size={18} />
                        </button>
                      )}
                    </div>
                    {submitError ? (
                      <p style={{ marginTop: "12px", color: "#dc2626", fontSize: "13px", fontWeight: "600" }}>{submitError}</p>
                    ) : null}
                  </form>
                </div>
              ) : (
                <SuccessMessage formData={formData} />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: "64px 24px", background: "#ffffff" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <h3 style={{ fontFamily: "Georgia, serif", fontSize: "28px", fontWeight: "700", color: "#1a1464", textAlign: "center", marginBottom: "48px" }}>
            Students who trusted StudySync
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
            {[
              { quote: "My counsellor helped me secure admission to the University of Melbourne with a partial scholarship. The process was so smooth!", author: "Priya Shrestha", from: "Kathmandu → Australia", rating: 5 },
              { quote: "StudySync guided me through every step — from shortlisting universities to my visa approval. Couldn't have done it without them.", author: "Rohan Joshi", from: "Delhi → Canada", rating: 5 },
              { quote: "I was confused about which country to choose. After one consultation, I had a clear plan. Now I'm studying in the UK!", author: "Sita Tamang", from: "Pokhara → United Kingdom", rating: 5 },
            ].map((t, i) => (
              <div key={i} style={{
                background: "#f9f8ff", borderRadius: "16px",
                border: "1px solid rgba(26,20,100,0.08)", padding: "28px"
              }}>
                <div style={{ display: "flex", gap: "3px", marginBottom: "14px" }}>
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} size={16} style={{ fill: "#fbbf24", color: "#fbbf24" }} />
                  ))}
                </div>
                <p style={{ fontSize: "14px", color: "#4b5563", lineHeight: "1.7", fontStyle: "italic", marginBottom: "20px" }}>"{t.quote}"</p>
                <div style={{ fontWeight: "700", fontSize: "14px", color: "#1a1464" }}>{t.author}</div>
                <div style={{ fontSize: "12px", color: "#e8265a", fontWeight: "600", marginTop: "2px" }}>{t.from}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "64px 24px", background: "#f5f4f2" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          <h3 style={{ fontFamily: "Georgia, serif", fontSize: "28px", fontWeight: "700", color: "#1a1464", textAlign: "center", marginBottom: "40px" }}>
            Common questions
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {[
              { q: "Is the consultation really free?", a: "Yes — completely free, no credit card required and no obligation to continue with us." },
              { q: "What happens after I book?", a: "We'll review your details and send a confirmation with your counsellor's info and meeting link within 24 hours." },
              { q: "Which countries does StudySync cover?", a: "We cover 50+ destinations including Australia, UK, Canada, USA, New Zealand, Germany, Ireland and more." },
              { q: "Do you help with scholarships?", a: "Absolutely. Our counsellors identify scholarships you're eligible for and help you craft a strong application." },
              { q: "What if I'm still in school / haven't finished my degree?", a: "No problem. We help students at every stage — from early planning to post-offer support." },
            ].map((faq, i) => (
              <FAQItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ===== Form Sub-components ===== */

function inputBase(hasIcon) {
  return {
    width: "100%",
    padding: hasIcon ? "13px 16px 13px 44px" : "13px 16px",
    background: "#f9f8ff",
    border: "2px solid #e5e7eb",
    borderRadius: "10px",
    fontSize: "14px",
    color: "#111827",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    transition: "border-color 0.2s",
  };
}

function FormInput({ label, name, type, value, onChange, placeholder, icon: Icon, required, min }) {
  return (
    <div>
      <label style={{ display: "block", fontWeight: "700", fontSize: "13px", color: "#1a1464", marginBottom: "8px" }}>
        {label} {required && <span style={{ color: "#e8265a" }}>*</span>}
      </label>
      <div style={{ position: "relative" }}>
        {Icon && <Icon size={16} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }} />}
        <input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} required={required} min={min} style={inputBase(!!Icon)} />
      </div>
    </div>
  );
}

function FormSelect({ label, name, value, onChange, options, icon: Icon, required }) {
  return (
    <div>
      <label style={{ display: "block", fontWeight: "700", fontSize: "13px", color: "#1a1464", marginBottom: "8px" }}>
        {label} {required && <span style={{ color: "#e8265a" }}>*</span>}
      </label>
      <div style={{ position: "relative" }}>
        {Icon && <Icon size={16} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#9ca3af", zIndex: 1 }} />}
        <select name={name} value={value} onChange={onChange} required={required} style={{ ...inputBase(!!Icon), appearance: "none", cursor: "pointer" }}>
          <option value="">Select an option</option>
          {options.map((o, i) => <option key={i} value={o}>{o}</option>)}
        </select>
        <ChevronRight size={16} style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%) rotate(90deg)", color: "#9ca3af", pointerEvents: "none" }} />
      </div>
    </div>
  );
}

function FormTextarea({ label, name, value, onChange, placeholder, rows, icon: Icon, required }) {
  return (
    <div>
      <label style={{ display: "block", fontWeight: "700", fontSize: "13px", color: "#1a1464", marginBottom: "8px" }}>
        {label} {required && <span style={{ color: "#e8265a" }}>*</span>}
      </label>
      <div style={{ position: "relative" }}>
        {Icon && <Icon size={16} style={{ position: "absolute", left: "14px", top: "14px", color: "#9ca3af" }} />}
        <textarea name={name} value={value} onChange={onChange} placeholder={placeholder} rows={rows} required={required}
          style={{ ...inputBase(!!Icon), resize: "none", lineHeight: "1.6" }} />
      </div>
    </div>
  );
}

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ background: "#ffffff", borderRadius: "12px", border: `2px solid ${open ? "#1a1464" : "#e5e7eb"}`, overflow: "hidden", transition: "border-color 0.2s" }}>
      <button onClick={() => setOpen(!open)} style={{
        width: "100%", padding: "18px 20px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        background: "none", border: "none", cursor: "pointer", textAlign: "left"
      }}>
        <span style={{ fontWeight: "700", fontSize: "14px", color: "#1a1464", paddingRight: "12px" }}>{question}</span>
        <div style={{
          width: "28px", height: "28px", borderRadius: "50%",
          background: open ? "#1a1464" : "#f0f0f8",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0, transition: "background 0.2s, transform 0.2s",
          transform: open ? "rotate(180deg)" : "rotate(0deg)"
        }}>
          <ChevronRight size={16} style={{ color: open ? "#ffffff" : "#1a1464", transform: "rotate(90deg)" }} />
        </div>
      </button>
      {open && (
        <div style={{ padding: "0 20px 18px 20px", fontSize: "14px", color: "#6b7280", lineHeight: "1.7" }}>
          {answer}
        </div>
      )}
    </div>
  );
}

function SuccessMessage({ formData }) {
  return (
    <div style={{
      background: "#ffffff", borderRadius: "20px",
      border: "1px solid rgba(26,20,100,0.08)",
      boxShadow: "0 8px 40px rgba(26,20,100,0.08)",
      padding: "56px 40px", textAlign: "center"
    }}>
      <div style={{
        width: "80px", height: "80px", background: "#e8265a",
        borderRadius: "50%", display: "flex", alignItems: "center",
        justifyContent: "center", margin: "0 auto 24px"
      }}>
        <CheckCircle size={40} style={{ color: "#ffffff" }} />
      </div>

      <h2 style={{ fontFamily: "Georgia, serif", fontSize: "32px", fontWeight: "700", color: "#1a1464", margin: "0 0 12px 0" }}>
        You're all set! 🎉
      </h2>
      <p style={{ fontSize: "16px", color: "#6b7280", lineHeight: "1.7", maxWidth: "480px", margin: "0 auto 36px" }}>
        Thank you, <strong style={{ color: "#1a1464" }}>{formData.name}</strong>! We've received your request
        and will send confirmation to <strong style={{ color: "#1a1464" }}>{formData.email}</strong> within 24 hours.
      </p>

      <div style={{ background: "#f9f8ff", borderRadius: "16px", padding: "28px", marginBottom: "32px", textAlign: "left", maxWidth: "480px", margin: "0 auto 32px" }}>
        <h3 style={{ fontWeight: "700", fontSize: "15px", color: "#1a1464", marginBottom: "18px" }}>What happens next?</h3>
        {[
          "We review your profile and prepare personalised recommendations",
          "You receive a confirmation email with your counsellor's details",
          "Join the session at your chosen date & time",
          "Get a clear study abroad roadmap tailored to your goals",
        ].map((text, i) => (
          <div key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start", marginBottom: i < 3 ? "14px" : 0 }}>
            <div style={{ width: "26px", height: "26px", background: "#1a1464", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "12px", fontWeight: "700", color: "#ffffff" }}>{i + 1}</div>
            <p style={{ fontSize: "14px", color: "#4b5563", lineHeight: "1.6", margin: 0, paddingTop: "3px" }}>{text}</p>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
        <Link href="/" style={{ padding: "12px 20px", background: "#f3f4f6", color: "#374151", fontWeight: "600", fontSize: "14px", borderRadius: "10px", textDecoration: "none" }}>
          Back to Home
        </Link>
       
      </div>
    </div>
  );
}
