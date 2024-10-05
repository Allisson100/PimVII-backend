require("dotenv").config();

const { Upload } = require("@aws-sdk/lib-storage");
const { S3 } = require("@aws-sdk/client-s3");

const fs = require("fs");
const path = require("path");

const s3 = new S3({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },

  region: process.env.AWS_DEFAULT_REGION,
});

async function filesToS3(folder, file, unlinkFile) {
  const tempFile = path.join(__dirname, "..", "uploads", file);

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${folder}/${file}`,
    Body: fs.createReadStream(tempFile),
    ACL: "public-read",
  };

  const data = await new Upload({
    client: s3,
    params,
  }).done();

  if (unlinkFile) {
    await fs.promises.unlink(`./uploads/${file}`);
  }

  return data.Key;
}

async function uploadFilesToS3(folder, files, unlinkFile = true) {
  const uploadedFileNames = [];

  for (const file of files) {
    uploadedFileNames.push(await filesToS3(folder, file, unlinkFile));
  }

  return uploadedFileNames;
}

module.exports = uploadFilesToS3;
