export default function Loading() {
  return (
    <div className="container m-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse bg-gray-200 h-20 rounded-lg"
        />
      ))}
    </div>
  );
}
