import createConnection from "@/lib/database";
import SendMail from "@/lib/mailSend";
import createLink from "@/lib/resetLink";

export const POST = async (req) => {
  try {
    const { email } = await req.json();

    if (!email) {
      return new Response(
        JSON.stringify({ message: 'Email ID Required', success: false }),
        { status: 405 }
      );
    }

    // User Authentication
    const connection = await createConnection();
    const [result] = await connection.query(`SELECT * FROM stud WHERE email = ?`, [email]);

    if (!result.length) {
      return new Response(
        JSON.stringify({ message: 'No user found with the given email', success: false }),
        { status: 404 }
      );
    }

    // Check if a token already exists for the given email
    const [existingToken] = await connection.query(`SELECT * FROM token_verify WHERE email = ?`, [email]);

    if (existingToken.length > 0) {
      // Assuming the token has an expiration field, check if the token is expired
      console.log('ALreday Exist')
      const tokenAgeInMs = Date.now() - new Date(existingToken[0].created_at).getTime();
      const isTokenExpired = tokenAgeInMs > 10 * 60 * 1000; // 10 minutes in milliseconds
      if (!isTokenExpired) {
        return new Response(
          JSON.stringify({ message: 'Token already sent and is still valid', success: false }),
          { status: 400 }
        );
      } else {
        // Token is expired, delete the old record
        await connection.query(`DELETE FROM token_verify WHERE email = ?`, [email]);
      }
    }

    // Save Token and Generate Link
    const [reset_link, token] = await createLink({ id: result[0].id, mail: email });

    // Sending Mail to user
    const mail_status = await SendMail({ recipient: email, link: reset_link });

    if (!mail_status) {
      return new Response(
        JSON.stringify({ message: 'Failed to send mail', success: false }),
        { status: 500 }
      );
    }

    // Insert the new token
    const saveToken = await connection.query(
      `INSERT INTO token_verify (id, email, token) VALUES (?, ?, ?)`,
      [result[0].id, email, token]
    );


  
    return new Response(
      JSON.stringify({ message: "Mail Sent Successfully!", success: true }),
      { status: 200 }
    );
  } catch (error) {
    console.error("ERROR", error);
    return new Response(
      JSON.stringify({ message: error.sqlMessage || 'An error occurred', success: false }),
      { status: 500 }
    );
  }
};
