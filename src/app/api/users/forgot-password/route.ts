
import User from "@/models/user.models";
import { ConnectionTODB } from "@/config/Db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { randomInt, createHash } from "crypto";
import { sendVerificationEmail } from "@/helpers/sendVerification";

export async function POST(request: NextRequest) {
 try {
    await ConnectionTODB()


 } 
 catch (error) {

 }
}
