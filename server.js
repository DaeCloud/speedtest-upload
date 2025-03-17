const fastify = require("fastify")({ logger: true });
const fs = require("fs");
const path = require("path");

// Register multipart plugin for file uploads
fastify.register(require("@fastify/multipart"));

// Upload endpoint
fastify.post("/speed/upload", async (request, reply) => {
  const data = await request.file();
  const filePath = path.join(__dirname, "uploads", data.filename);

  // Save the file
  await new Promise((resolve, reject) => {
    const fileStream = fs.createWriteStream(filePath);
    data.file.pipe(fileStream);
    data.file.on("end", resolve);
    data.file.on("error", reject);
  });

  reply.code(200).send({ message: "File uploaded successfully" });
});

fastify.listen({ port: 3000 }, (err, address) => {
  if (err) throw err;
});
