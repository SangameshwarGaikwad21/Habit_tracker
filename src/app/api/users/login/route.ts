import User from "@/models/user.models";
import { ConnectionTODB } from "@/config/Db";
import { NextRequest,NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request:NextRequest) {
    try {

        await ConnectionTODB()

        const reqBody = await request.json();
        const{email,password} =reqBody

        if(!email || !password){
            return NextResponse.json(
                {error:"All fileds are required"},
                {status:401}
            )
        }

        const findUser = await User.findOne({email})
        
        if(!findUser){
            return NextResponse.json(
                {message:"Invalid email and password one"},
                {status:401}
            )
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            findUser.password
        )

        if (!isPasswordValid) {
            return NextResponse.json(
                { error: "Invalid email or password two" },
                { status: 401 }
            );
        }

       return NextResponse.json(
        {
            message: "Credentials verified successfully",
            success: true,
            user: {
                username: findUser.username,
                email: findUser.email,
            },
        },
        { 
            status: 200 
        }
        );
    } 
    catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Internal server error";

    console.error("Login error:", message);

    return NextResponse.json(
      { error: "Login failed. Please use correct credentails." },
      { status: 500 }
    );
  }
}