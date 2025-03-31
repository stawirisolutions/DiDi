import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/app/libs/auth";
import { Session } from "next-auth";

export async function GET(request: NextRequest) {
  // Define session outside try/catch block so it's available in the catch block
  let session: Session | null = null;
  
  try {
    session = await getServerSession(authOptions) as Session | null;
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    // Note the corrected endpoint: /api/user/profile (singular) instead of /api/users/profile (plural)
    const backendResponse = await fetch('http://localhost:8000/api/user/profile', {
      headers: {
        'Authorization': `Bearer ${session.user.token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!backendResponse.ok) {
      throw new Error(`Backend API error: ${backendResponse.status}`);
    }
    
    const userData = await backendResponse.json();
    return NextResponse.json(userData);
  } catch (error) {
    console.error("Error fetching from backend:", error);
    
    // Now session is in scope for the catch block
    const fallbackUser = {
      _id: session?.user?.id || '',
      email: session?.user?.email || '',
      firstName: session?.user?.name?.split(' ')[0] || '',
      lastName: session?.user?.name?.split(' ').slice(1).join(' ') || '',
      phone: "Not Available", // Fallback value
      role: session?.user?.role || "Vendor",
      createdAt: new Date().toISOString()
    };
    
    return NextResponse.json(fallbackUser);
  }
}