import ProtectedLayout from "@/components/ProtectedLayout";

export default function TVShowsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProtectedLayout>{children}</ProtectedLayout>;
}
