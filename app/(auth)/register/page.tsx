import type { Metadata } from "next";
import AuthScreen from "../_components/AuthScreen";

export const metadata: Metadata = {
  title: "Create account — CourtEase",
  description: "Daftar CourtEase dan mulai booking lapangan serta berjejaring dengan komunitas olahraga.",
};

export default function Page() {
  return <AuthScreen mode="register" />;
}
