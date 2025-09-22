// import { error } from "console";
// import { getToken } from "next-auth/jwt";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(req: NextRequest) {
//      const token = await getToken({ req })
//      if (!token)
//           return NextResponse.json({ status: 401, error: "Unautherized" })
//      const res = await fetch(`${process.env.API}/cart`, {
//           cache: 'no-store',
//           method: 'GET',
//           headers: {
//                token: token.token
//           },
//      }
//      )
//      const payload = await res.json()
//      return NextResponse.json(payload)
// }
import { getTokenAuth } from "@/utilites/getTokenAuth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const token = await getTokenAuth()
  if (!token) {
    return NextResponse.json({ error: "Unauthorized, login first" }, { status: 401 });
  }
  try {
    
    const res = await fetch(`${process.env.API}/cart`, {
      method: "GET",
      headers: {
        token: String(token)
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`External API failed: ${errorText}`);
    }

    const data = await res.json();
    return NextResponse.json(data);

  } catch (err: any) {
    console.error("API ERROR 🚨:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
// import { getTokenAuth } from "@/utilites/getTokenAuth";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(req: NextRequest) {
//   const token = await getTokenAuth();
//   console.log("🔑 token:", token);

//   if (!token) {
//     return NextResponse.json(
//       { error: "Unauthorized, login first" },
//       { status: 401 }
//     );
//   }

//   if (!process.env.API) {
//     return NextResponse.json(
//       { error: "API URL is not configured" },
//       { status: 500 }
//     );
//   }

//   try {
//     const res = await fetch(`${process.env.API}/cart`, {
//       method: "GET",
//       headers: {
//         token: String(token)
//       },
//     });

//     if (!res.ok) {
//       return NextResponse.json(
//         { error: `External API failed: ${res.statusText}` },
//         { status: res.status }
//       );
//     }

//     const data = await res.json();
//     return NextResponse.json(data);

//   } catch (err: any) {
//     console.error("API ERROR 🚨:", err);
//     return NextResponse.json(
//       { error: err.message || "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }
