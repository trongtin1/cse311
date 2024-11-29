import ProtectedLayout from "@/components/ProtectedLayout";

export default function MovieLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProtectedLayout>{children}</ProtectedLayout>;
}
