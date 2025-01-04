import createConnection from "@/lib/database.js";
import bcryptjs  from 'bcryptjs';
export const POST = async (req) => {
    try {
     const {email,password}=await req.json();
     if(!email || !password) {
      return new Response(
        JSON.stringify({ message: "All Fields Are Required", success: false }),
        { status: 400 }
      );
     }
     const connection=await createConnection();

     try {
      await connection.query('SELECT * FROM stud');
      const statement = `SELECT * FROM STUD WHERE email=?`;
      const [result] = await connection.execute(statement, [email]);
      if(bcryptjs.compareSync(password,result[0].password)){
        return new Response(
          JSON.stringify({ message: "Valid User", success: true }),
          { status: 200 }
        ); 
      }
      else{
        return new Response(
          JSON.stringify({ message: "Wrong Credentials", success: false }),
          { status: 404 }
        ); 
      }
       

     } catch (error) {
      return new Response(
        JSON.stringify({ message: error.sqlmessage, success: false }),
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
  