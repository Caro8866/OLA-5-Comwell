import "./globals.css";
import ProtectedRoute from "@/utils/ProtectedRoute";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
