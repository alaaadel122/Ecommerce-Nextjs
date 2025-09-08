export default function Loading() {
  return (
    <div className="w-[85%] mx-auto space-y-6 p-4">
      <h1 className="text-gray-700 text-2xl my-5">My Orders</h1>

      {/* عنصر order skeleton */}
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="border p-4 rounded-lg shadow bg-white animate-pulse"
        >
          <div className="h-5 w-1/3 bg-gray-300 rounded mb-3"></div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2">Image</th>
                  <th className="p-2">Product</th>
                  <th className="p-2">Qty</th>
                  <th className="p-2">Price</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2].map((row) => (
                  <tr key={row} className="border-t">
                    <td className="p-2">
                      <div className="w-16 h-16 bg-gray-200 rounded"></div>
                    </td>
                    <td className="p-2">
                      <div className="h-4 w-24 bg-gray-200 rounded"></div>
                    </td>
                    <td className="p-2">
                      <div className="h-4 w-10 bg-gray-200 rounded"></div>
                    </td>
                    <td className="p-2">
                      <div className="h-4 w-14 bg-gray-200 rounded"></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex justify-between items-center">
            <div className="h-4 w-32 bg-gray-200 rounded"></div>
            <div className="h-4 w-20 bg-gray-200 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
