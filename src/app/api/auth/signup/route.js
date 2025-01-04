import createConnection from "@/lib/database";
import bcryptjs from "bcryptjs";


export const POST = async (req) => {
  try {
    const { email, password, name } = await req.json();

    // Validate input
    if (!email || !password || !name) {
      return new Response(
        JSON.stringify({ message: "All Fields Are Required", success: false }),
        { status: 400 }
      );
    }

    const connection = await createConnection();

    try {
      // Query to ensure the `stud` table exists
      await connection.query('SELECT * FROM stud');

      // Use parameterized query to prevent SQL injection
      const statement = `INSERT INTO stud (email, password, name) VALUES (?, ?, ?)`;
      const hashedPassword = bcryptjs.hashSync(password,10);
      const [result] = await connection.execute(statement, [email, hashedPassword, name]);

      console.log(result);
      return new Response(
        JSON.stringify({ message: "User Created", success: true }),
        { status: 200 }
      );
    } catch (error) {
      return new Response(
        JSON.stringify({ message: error.message, success: false }),
        { status: 500 }
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ message: error.message, success: false }),
      { status: 500 }
    );
  }
};
