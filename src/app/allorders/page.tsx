import React from "react";
import { getUserOrders } from "./_actions/getUserOrder.action";
import { singleOrder } from "./interfaces/allOrders.interface";
import Image from "next/image";

export default async function Page() {
  const res = await getUserOrders();
  const orders: singleOrder[] = Array.isArray(res) ? res : res?.orders ?? [];

  return (
    <div className="w-[85%] mx-auto space-y-6 p-4">
      <h1 className="text-gray-700 text-2xl after:ml-0.5 before:text-main before:content-['|'] my-5">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">You have no orders yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="border p-4 rounded-lg shadow bg-white">
            <h2 className="font-bold text-lg mb-2">Order #{order._id}</h2>

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
                  {order.cartItems?.map((item) => (
                    <tr key={item._id} className="border-t">
                      <td className="p-2">
                        {item.product?.imageCover && (
                          <img
                            src={item.product.imageCover}
                            alt={item.product.title}
                            className="w-16 h-16 object-cover rounded"
                          />
                        )}
                      </td>
                      <td className="p-2">{item.product?.title}</td>
                      <td className="p-2">{item.count}</td>
                      <td className="p-2">{item.price} EGP</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <span className="font-bold text-main">
                Total: {order.totalOrderPrice} EGP
              </span>
              <span className="text-sm text-gray-600">
                {order.isPaid ? "✅ Paid" : "❌ Not Paid"} |{" "}
                {order.isDelivered ? "📦 Delivered" : "⏳ Pending"}
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

