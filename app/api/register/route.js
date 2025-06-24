import { ConnectDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"; // Add this line


export async function POST(req) {
    try {
        const { name, email, password } = await req.json();

        await ConnectDB();
        const hashedPass = await bcrypt.hash(password, 10);
        await User.create({ name, email, password: hashedPass });

        return NextResponse.json({ message: "User Registered Successfully." }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "An error occurred while registering the user." }, { status: 500 });
    }
}