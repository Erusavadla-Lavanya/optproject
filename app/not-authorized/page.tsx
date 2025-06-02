// app/unauthorized/page.tsx
export default function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <h1 className="text-xl font-semibold text-red-600">Access Denied: Only Employers Can Access This Page</h1>
    </div>
  );
}
