import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

export async function uploadFile({ Body, Key, ContentType, Dir }) {
  const bytes = await Body.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET,
    Body: buffer,
    Key: `${Dir}/${Key}`,
    ContentType,
  });

  try {
    const res = await s3Client.send(command);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
}
