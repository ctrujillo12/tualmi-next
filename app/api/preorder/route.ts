export async function POST(request: Request) {
  const formData = await request.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  console.log("Preorder from:", name, email);

  return new Response("Preorder received!", { status: 200 });
}
