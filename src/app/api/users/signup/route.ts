import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    console.log(reqBody);
    const { username, email, password } = reqBody;

    console.log(username,email,password);
    

    // Now Check whether the user already exists in db
    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }
    console.log("Entered signup/route.ts");
    // hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    //Create new user
    console.log("Creating new user");
    const newUser = new User({
      username: username,
      email: email,
      password: hashedPassword,
    });

    console.log(newUser);
    console.log("Calling save user");
    const savedUser = await newUser.save();

    console.log("Saved user is ",savedUser);

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser,
    });
  } catch (error) {
      console.log("Error in Route.ts")
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
