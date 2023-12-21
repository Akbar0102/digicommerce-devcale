import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: process.env.WASABI_ACCESS_KEY,
  secretAccessKey: process.env.WASABI_SECRET_KEY,
  region: process.env.WASABI_REGION,
});

const S3 = new AWS.S3({
  endpoint: "https://s3.ap-southeast-1.wasabisys.com",
});

export const uploadFile = (file, folder) => {
  const S3Params = {
    Bucket: process.env.WASABI_BUCKET,
    Key: `${folder}/${file.name}`,
    Body: file,
  };

  return new Promise((resolve, reject) => {
    S3.upload(S3Params, (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
};
