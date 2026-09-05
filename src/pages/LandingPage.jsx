import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormField from "../components/FormField";
import StepRail from "../components/StepRail";
import { useQuiz } from "../context/QuizContext";

const DOMICILE_OPTIONS = [
  "Jakarta",
  "Bandung",
  "Surabaya",
  "Yogyakarta",
  "Medan",
  "Lainnya",
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^(\+62|62|0)8[0-9]{8,11}$/;

function validate(form) {
  const errors = {};

  if (!form.name.trim()) {
    errors.name = "Nama wajib diisi.";
  } else if (form.name.trim().length < 3) {
    errors.name = "Nama minimal 3 karakter.";
  }

  if (!form.email.trim()) {
    errors.email = "Email wajib diisi.";
  } else if (!EMAIL_PATTERN.test(form.email.trim())) {
    errors.email = "Format email tidak valid.";
  }

  if (!form.whatsapp.trim()) {
    errors.whatsapp = "Nomor WhatsApp wajib diisi.";
  } else if (!PHONE_PATTERN.test(form.whatsapp.trim())) {
    errors.whatsapp = "Gunakan format nomor Indonesia, contoh 081234567890.";
  }

  if (!form.domicile) {
    errors.domicile = "Pilih domisili atau target program.";
  }

  return errors;
}

function LandingPage() {
  const navigate = useNavigate();
  const { setProfile } = useQuiz();
  const [form, setForm] = useState({ name: "", email: "", whatsapp: "", domicile: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    setProfile(form);

    // Brief pause so the transition doesn't feel abrupt after a form submit.
    window.setTimeout(() => {
      navigate("/tes");
    }, 350);
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-xl flex-col px-6 py-12 sm:py-16">
      <header className="flex items-center justify-between">
        <span className="whitespace-nowrap font-display text-base text-ink sm:text-lg">Assessment Erin</span>
        <StepRail activeStep={1} />
      </header>

      <div className="mt-14">
        <h1 className="font-display text-3xl leading-tight text-ink sm:text-4xl">
          Cari tahu level belajarmu dalam 15 soal
        </h1>
        <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ink-soft">
          Isi data dirimu untuk memulai. Hasilnya akan menunjukkan level kemampuanmu
          saat ini dan program yang paling sesuai untuk memulai.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-5" noValidate>
        <FormField
          label="Nama lengkap"
          name="name"
          value={form.name}
          onChange={handleChange}
          error={errors.name}
          placeholder="Nama sesuai identitas"
        />
        <FormField
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="nama@email.com"
        />
        <FormField
          label="Nomor WhatsApp"
          name="whatsapp"
          type="tel"
          value={form.whatsapp}
          onChange={handleChange}
          error={errors.whatsapp}
          placeholder="081234567890"
        />
        <FormField
          label="Domisili / target program"
          name="domicile"
          as="select"
          value={form.domicile}
          onChange={handleChange}
          error={errors.domicile}
          placeholder="Pilih salah satu"
          options={DOMICILE_OPTIONS}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-3 inline-flex items-center justify-center rounded-md bg-forest px-5 py-3 text-[15px] font-medium text-white transition-colors hover:bg-forest-dark disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Menyiapkan tes..." : "Mulai tes"}
        </button>
      </form>

      <p className="mt-6 text-sm text-ink-faint">
        Tes terdiri dari 15 soal pilihan ganda dan memakan waktu sekitar 10 menit.
        Progresmu tersimpan otomatis jika kamu perlu berhenti sejenak.
      </p>
    </div>
  );
}

export default LandingPage;
