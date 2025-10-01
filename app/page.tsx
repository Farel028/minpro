export default function Home() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-6xl flex-col gap-16 px-4 pb-20 pt-16 sm:px-6 lg:px-8 lg:pt-24">
      <section className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-teal-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-teal-700 dark:bg-teal-400/10 dark:text-teal-200">
            Sewa lapangan tanpa ribet
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            Booking lapangan favorit dan temukan partner olahraga di satu tempat.
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-300 sm:text-lg">
            CourtEase mempermudah kamu mencari jadwal kosong, membayar sewa lapangan, dan mengatur komunitas olahraga. Semua dalam antarmuka yang ringan dan mendukung mode gelap.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="/register"
              className="inline-flex items-center justify-center rounded-full bg-[#14B8A6] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0D9488] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-200 focus-visible:ring-offset-2 dark:focus-visible:ring-teal-900/40 dark:focus-visible:ring-offset-slate-950"
            >
              Mulai gratis
            </a>
            <a
              href="/explore"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-800 transition hover:border-[#14B8A6] hover:text-[#14B8A6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-200 focus-visible:ring-offset-2 dark:border-white/10 dark:text-slate-100 dark:hover:border-[#14B8A6] dark:focus-visible:ring-teal-900/40 dark:focus-visible:ring-offset-slate-950"
            >
              Jelajahi venue
            </a>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white p-6 shadow-xl dark:border-white/5 dark:bg-slate-950/60">
          <div className="absolute -top-20 right-10 h-40 w-40 rounded-full bg-[#14B8A6]/20 blur-3xl" />
          <div className="absolute -bottom-24 left-6 h-48 w-48 rounded-full bg-[#F97316]/10 blur-3xl" />
          <div className="relative space-y-4">
            <div className="flex items-center justify-between rounded-2xl border border-slate-100/80 bg-slate-50/60 px-5 py-4 shadow-sm dark:border-white/10 dark:bg-white/5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
                  Jadwal berikutnya
                </p>
                <p className="mt-1 text-base font-semibold text-slate-900 dark:text-white">
                  Lapangan Futsal Galaxy
                </p>
              </div>
              <span className="rounded-full bg-[#14B8A6]/10 px-3 py-1 text-xs font-medium text-[#0D9488] dark:bg-[#14B8A6]/15 dark:text-[#5eead4]">
                17.30 WIB
              </span>
            </div>
            <div className="rounded-2xl border border-slate-100/80 bg-white/70 p-5 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
              <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Community meetup</h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">
                Gabung sesi sparring setiap Kamis dan dapatkan partner latihan yang seimbang.
              </p>
              <div className="mt-4 flex items-center gap-2">
                {["/avatars/1.png", "/avatars/2.png", "/avatars/3.png"].map((src) => (
                  <span
                    key={src}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white bg-gradient-to-br from-[#14B8A6] to-[#0D9488] text-xs font-semibold text-white shadow-sm dark:border-slate-900"
                  >
                    CE
                  </span>
                ))}
                <span className="text-xs font-medium text-slate-500 dark:text-slate-300">+120 anggota</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-lg dark:border-white/10 dark:bg-slate-950/60 sm:grid-cols-3">
        {FEATURES.map((feature) => (
          <div key={feature.title} className="space-y-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#14B8A6]/10 text-[#0D9488] dark:bg-[#14B8A6]/15 dark:text-[#5eead4]">
              {feature.emoji}
            </span>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              {feature.title}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">{feature.description}</p>
          </div>
        ))}
      </section>
    </main>
  );
}

const FEATURES = [
  {
    emoji: "📅",
    title: "Jadwal real-time",
    description: "Lihat ketersediaan lapangan dan pesan slot terbaik tanpa harus menelepon pengelola.",
  },
  {
    emoji: "🤝",
    title: "Komunitas aktif",
    description: "Temukan partner olahraga yang sefrekuensi dan bangun komunitasmu sendiri di CourtEase.",
  },
  {
    emoji: "💳",
    title: "Pembayaran aman",
    description: "Dukungan multi-metode pembayaran dengan riwayat transaksi yang transparan dan mudah dilacak.",
  },
] as const;
