import User from "@/models/user.models";
import { ConnectionTODB } from "@/config/Db";
import { NextRequest,NextResponse } from "next/server";
import bcrypt from "bcryptjs";



export async function POST(request:NextRequest) {
    try {

        await ConnectionTODB()

        const reqBody = await request.json();
        const{username,email,password} =reqBody

        if(!username || !email || !password){
            return NextResponse.json(
                {error:"All fileds are required"},
                {status:401}
            )
        }

        const findUser = await User.findOne({email})
        
        if(findUser){
            return NextResponse.json(
                {message:"User is Already Existed"},
                {status:401}
            )
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const savedUser = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        return NextResponse.json(
            {
                message:"User Registered Successfully",
                savedUser,
                success:true
            },
            {
                status:200
            }
        )

    } 
    catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Internal server error";

    console.error("Registration error:", message);

    return NextResponse.json(
      { error: "Registration failed. Please try again." },
      { status: 500 }
    );
  }
}