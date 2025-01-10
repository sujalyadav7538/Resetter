import createConnection from "@/lib/database";

export const POST = async (req) => {
    try {
      const {email,token}=await req.json();
  
      if (!email || !token) {
        return new Response(
          JSON.stringify({ message: 'Invalid URL', success: false }),
          { status: 400 } // Use 400 for bad request
        );
      }
  
      const connection = await createConnection();
      const [result] = await connection.query(`SELECT * FROM token_verify WHERE email = ?`, [email]);
  
      if (!result.length) {
        return new Response(
          JSON.stringify({ message: 'No Reset Request Find ', success: false }),
          { status: 404 }
        );
      }
  
      const user = result[0];
      const isTokenValid = user.token === token;
      const tokenAgeInMs = Date.now() - new Date(user.created_at).getTime();

      const isTokenExpired = tokenAgeInMs > 10 * 60 * 1000; // 10 minutes in milliseconds
      if(isTokenValid){
        if(isTokenExpired){
          await connection.query(`DELETE  FROM token_verify WHERE email = ?`, [email])
          return new Response(
            JSON.stringify({ message: 'Token is expired', success: false }),
            { status: 400 }
            );
        }
        else{
          return new Response(
            JSON.stringify({ message: 'Valid credentials', success: true }),
            { status: 200 }
          );
        }
      }
      else{
        return new Response(
          JSON.stringify({ message: 'Invalid Token', success: false }),
          { status: 401 }
          );
      }
      
    } catch (error) {
      console.log(error)
      return new Response(
        JSON.stringify({ message: error.sqlMessage || 'An error occurred', success: false }),
        { status: 500 }
      );
    }
  };
  