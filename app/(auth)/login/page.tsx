import type { Metadata } from "next";
import AuthScreen from "../_components/AuthScreen";

export const metadata: Metadata = {
  title: "Sign in — CourtEase",
  description: "Masuk ke CourtEase untuk mengatur pemesanan lapangan dan aktivitas komunitas Anda.",
};

export default function Page() {
  return <AuthScreen mode="login" />;
}
