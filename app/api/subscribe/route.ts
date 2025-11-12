export async function POST(request: Request) {
  const formData = await request.formData();
  const email = formData.get("email");
  console.log("New subscriber:", email);

  return new Response("Subscribed!", { status: 200 });
}
