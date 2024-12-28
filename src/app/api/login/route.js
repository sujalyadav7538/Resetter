export const POST = async (req) => {
    try {
      const { email, password } = await req.json(); 
  
      console.log({ email, password });
     
      return new Response(JSON.stringify({ message: "hello" }), { status: 200 });
    } catch (error) {
      return new Response(
        JSON.stringify({ message: "Internal Server Error", error: error.message }),
        { status: 500 }
      );
    }
  };
  