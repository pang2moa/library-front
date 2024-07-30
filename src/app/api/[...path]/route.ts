import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  return handleProxy(request);
}

export async function POST(request: NextRequest) {
  return handleProxy(request);
}

export async function PUT(request: NextRequest) {
  return handleProxy(request);
}

export async function DELETE(request: NextRequest) {
  return handleProxy(request);
}

async function handleProxy(request: NextRequest): Promise<NextResponse> {
  const url = new URL(request.url);

  const path = url.pathname.replace("/api/", "");

  let target = "";
  if (path.startsWith("RentalCard")) {
    target = process.env.NEXT_PUBLIC_RENT_SERVICE_URL! + "/api/";
  } else if (path.startsWith("book")) {
    target = process.env.NEXT_PUBLIC_BOOK_SERVICE_URL! + "/api/";
  } else if (path.startsWith("Member")) {
    target = process.env.NEXT_PUBLIC_MEMBER_SERVICE_URL! + "/api/";
  } else if (path.startsWith("books")) {
    target = process.env.NEXT_PUBLIC_BEST_SELLER_SERVICE_URL! + "/api/";
  } else {
    return NextResponse.json({ message: "Not Found" }, { status: 404 });
  }

  alert(1234);
  console.log(path);
  console.log(target);

  const targetUrl = new URL(path, target);

  const headers = new Headers(request.headers);
  headers.delete("host");

  // content-length 헤더 제거
  headers.delete("content-length");

  let body: BodyInit | null = null;
  if (request.body) {
    body = await request.text(); // 또는 request.arrayBuffer()나 request.blob() 사용 가능
  }

  try {
    const response = await fetch(targetUrl.toString(), {
      method: request.method,
      headers: headers,
      body: body,
    });

    const data = await response.text();

    return new NextResponse(data, {
      status: response.status,
      headers: response.headers,
    });
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
