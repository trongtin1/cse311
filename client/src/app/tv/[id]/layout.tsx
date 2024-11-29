import ProtectedLayout from "@/components/ProtectedLayout";

export default function TVLayout({ children }: { children: React.ReactNode }) {
  return <ProtectedLayout>{children}</ProtectedLayout>;
}
