export default function loading() {
  return (
    <div className="w-[85%] mx-auto flex animate-pulse">
      {/* صور المنتج */}
      <div className="flex flex-col w-[50%] gap-6 p-5">
        <div className="relative  h-[400px] bg-gray-200 rounded-lg"></div>
        <div className="flex gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="w-20 h-20 bg-gray-200 rounded-md"></div>
          ))}
        </div>
      </div>

      {/* تفاصيل المنتج */}
      <div className="w-[50%] p-5 space-y-4">
        <div className="h-6 w-1/2 bg-gray-200 rounded"></div>
        <div className="h-4 w-1/3 bg-gray-200 rounded"></div>
        <div className="flex gap-2">
          <div className="h-6 w-24 bg-gray-200 rounded"></div>
          <div className="h-6 w-24 bg-gray-200 rounded"></div>
        </div>
        <div className="h-4 w-1/4 bg-gray-200 rounded"></div>
        <div className="h-20 w-full bg-gray-200 rounded"></div>
        <div className="flex gap-3">
          <div className="h-10 w-32 bg-gray-200 rounded"></div>
          <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
        </div>
      </div>
    </div>
  )
}
