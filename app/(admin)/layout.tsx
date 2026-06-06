export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-marine-50">
      {children}
    </div>
  );
}
