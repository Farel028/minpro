export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-950 px-6 text-center text-slate-200">
      <h1 className="text-3xl font-semibold">Halaman tidak ditemukan</h1>
      <p className="max-w-md text-sm text-slate-400">
        Rute yang kamu buka tidak tersedia. Kembali ke beranda untuk memilih quest.
      </p>
      <a
        className="rounded-full bg-gradient-to-r from-cyan-400 to-brand-dark px-4 py-2 text-sm font-semibold text-slate-950"
        href="/"
      >
        Kembali ke Beranda
      </a>
    </main>
  );
}
