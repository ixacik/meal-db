import Nav from "@/components/shared/nav/nav";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="mt-20 p-20">
      <Nav />
      {children}
    </main>
  );
}
