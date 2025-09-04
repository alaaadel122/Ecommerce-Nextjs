import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
export async function getUserOrders() {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    const res = await fetch(`${process.env.API}/orders/user/${userId}`,{
        cache: 'no-store',
          method: 'GET',
          headers: {
               'Content-type': 'application/json',
        }
    })
    const payload = await res.json()
    return payload
}