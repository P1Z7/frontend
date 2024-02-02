export async function GetData() {
  const response = await fetch(`/api/artist/group?page=1&size=12`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ZmMxM2MyOC0yNmY1LTRlYzAtYWQ0MS1iODU0OGFlYWE5YzgiLCJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE3MDY2ODg5MTEsImV4cCI6MTcwOTI4MDkxMX0.x33-F0hzp58Og0aSEe6QbKG6lxtxPKEoqiYWuyEgA08",
    },
  });

  return await response.json();
}

// export async function PostData(newData, path: string) {
//   const response = await fetch(`/api/${path}`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(newData),
//   });

//   if (!response.ok) {
//     throw new Error("Failed to upload the post.");
//   }

//   return await response.json();
// }
