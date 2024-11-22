import ProtectedLayout from "@/components/ProtectedLayout";

export default function HomePageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProtectedLayout>{children}</ProtectedLayout>;
}
