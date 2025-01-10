import createConnection from "@/lib/database.js";
import bcryptjs from "bcryptjs";

export const POST = async (req) => {
  try {
    const { email, newPassword } = await req.json();

    // Validate input
    if (!newPassword || !email) {
      return new Response(
        JSON.stringify({
          message: "Email and password are required",
          success: false,
        }),
        { status: 400 } // Use 400 for bad request
      );
    }

    // Create database connection
    const connection = await createConnection();

    // Check if the email exists in the token_verify table
    const [isRequested] = await connection.query(
      `SELECT * FROM token_verify WHERE email = ?`,
      [email]
    );

    if (!isRequested.length) {
      return new Response(
        JSON.stringify({
          message: "Email is not verified or token has expired",
          success: false,
        }),
        { status: 401 }
      );
    }

    // Hash the new password
    const hashedPassword = bcryptjs.hashSync(newPassword, 10);

    // Update password in the stud table
    const [result] = await connection.query(
      `UPDATE stud SET password = ? WHERE email = ?`,
      [hashedPassword, email]
    );

    // Check if the update was successful
    if (result.affectedRows === 0) {
      return new Response(
        JSON.stringify({
          message: "Failed to update the password",
          success: false,
        }),
        { status: 500 }
      );
    }

    // Delete the token from token_verify table
    await connection.query(`DELETE FROM token_verify WHERE email = ?`, [email]);

    // Return success response
    return new Response(
      JSON.stringify({
        message: "Password updated successfully",
        success: true,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in updating password:", error);
    return new Response(
      JSON.stringify({
        message: "An internal server error occurred",
        success: false,
      }),
      { status: 500 }
    );
  }
};
