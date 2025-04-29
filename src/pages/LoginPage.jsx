export default function LoginPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-md">
      <h1 className="text-3xl font-semibold mb-6">Sign In</h1>
      <form className="space-y-4">
        <input type="email" placeholder="Email" className="w-full border p-2 rounded" />
        <input type="password" placeholder="Password" className="w-full border p-2 rounded" />
        <button type="submit" className="bg-brand text-white px-4 py-2 rounded w-full">Sign In</button>
      </form>
    </div>
  );
}
