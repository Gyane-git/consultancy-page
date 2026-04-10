"use client";

import { useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Calendar,
  Clock,
  Users,
  Award,
  Phone,
  Mail,
  MessageSquare,
  Video,
  Target,
} from "lucide-react";

export default function FreeConsultationPage() {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    studyLevel: "",
    intake: "",
    budget: "",
    goals: [],
    background: "",
    preferredDate: "",
    preferredTime: "",
    consultationType: "video",
  });

  const totalSteps = 4;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      const current = formData.goals;
      setFormData({
        ...formData,
        goals: checked
          ? [...current, value]
          : current.filter((g) => g !== value),
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleNext = () => step < totalSteps && setStep(step + 1);
  const handlePrev = () => step > 1 && setStep(step - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HERO */}
      <section className="bg-blue-600 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Study Abroad Starts Here 🎓
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Free counselling to choose the right country, course & university.
        </p>
        <div className="flex justify-center gap-6 text-sm">
          <span>✔ Free Session</span>
          <span>✔ Visa Guidance</span>
          <span>✔ Scholarship Help</span>
        </div>
      </section>

      {/* FORM */}
      <section className="py-16 px-6 max-w-3xl mx-auto">
        {!isSubmitted ? (
          <div className="bg-white p-8 rounded-2xl shadow">
            <h2 className="text-2xl font-bold mb-6">
              Step {step} of 4
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* STEP 1 */}
              {step === 1 && (
                <>
                  <Input label="Full Name" name="name" onChange={handleChange} />
                  <Input label="Email" name="email" onChange={handleChange} />
                  <Input label="Phone" name="phone" onChange={handleChange} />
                </>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <>
                  <Select
                    label="Study Level"
                    name="studyLevel"
                    onChange={handleChange}
                    options={[
                      "Bachelor",
                      "Master",
                      "Diploma",
                      "Language Course",
                    ]}
                  />
                  <Select
                    label="Preferred Intake"
                    name="intake"
                    onChange={handleChange}
                    options={["Fall", "Spring", "Summer"]}
                  />
                  <Select
                    label="Budget"
                    name="budget"
                    onChange={handleChange}
                    options={[
                      "Under $5,000",
                      "$5k - $10k",
                      "$10k+",
                      "Need Scholarship",
                    ]}
                  />
                </>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <>
                  <label className="font-semibold">Your Goals</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      "Study Abroad",
                      "Scholarship",
                      "PR",
                      "Career Growth",
                    ].map((goal) => (
                      <label key={goal} className="flex gap-2">
                        <input
                          type="checkbox"
                          value={goal}
                          onChange={handleChange}
                          name="goals"
                        />
                        {goal}
                      </label>
                    ))}
                  </div>

                  <textarea
                    name="background"
                    placeholder="Your academic background..."
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg"
                  />
                </>
              )}

              {/* STEP 4 */}
              {step === 4 && (
                <>
                  <Select
                    label="Consultation Type"
                    name="consultationType"
                    onChange={handleChange}
                    options={["video", "phone", "chat"]}
                  />

                  <Input
                    label="Date"
                    type="date"
                    name="preferredDate"
                    onChange={handleChange}
                  />

                  <Select
                    label="Time"
                    name="preferredTime"
                    onChange={handleChange}
                    options={[
                      "9 AM",
                      "10 AM",
                      "11 AM",
                      "2 PM",
                      "4 PM",
                    ]}
                  />
                </>
              )}

              {/* BUTTONS */}
              <div className="flex justify-between pt-4">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="px-4 py-2 bg-gray-200 rounded"
                  >
                    Back
                  </button>
                )}

                {step < totalSteps ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="ml-auto px-6 py-2 bg-blue-600 text-white rounded"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="ml-auto px-6 py-2 bg-green-600 text-white rounded"
                  >
                    Book Now
                  </button>
                )}
              </div>
            </form>
          </div>
        ) : (
          <div className="bg-white p-10 text-center rounded-2xl shadow">
            <CheckCircle className="mx-auto text-green-500 mb-4" size={50} />
            <h2 className="text-2xl font-bold mb-2">
              You're One Step Closer 🎓
            </h2>
            <p>
              Thank you {formData.name}, our counsellor will contact you soon.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

/* COMPONENTS */

function Input({ label, name, onChange, type = "text" }) {
  return (
    <div>
      <label className="block mb-1 font-semibold">{label}</label>
      <input
        type={type}
        name={name}
        onChange={onChange}
        className="w-full p-3 border rounded-lg"
      />
    </div>
  );
}

function Select({ label, name, options, onChange }) {
  return (
    <div>
      <label className="block mb-1 font-semibold">{label}</label>
      <select
        name={name}
        onChange={onChange}
        className="w-full p-3 border rounded-lg"
      >
        <option value="">Select</option>
        {options.map((o, i) => (
          <option key={i}>{o}</option>
        ))}
      </select>
    </div>
  );
}