import multer from 'multer';
import AWS from 'aws-sdk';
import multerS3 from 'multer-s3';
import fs from 'fs';

export function createUploader() {
  const haveS3 = process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY && process.env.AWS_S3_BUCKET && process.env.AWS_S3_REGION;
  if (haveS3) {
    const s3 = new AWS.S3({ region: process.env.AWS_S3_REGION });
    const storage = multerS3({
      s3,
      bucket: process.env.AWS_S3_BUCKET,
      acl: 'private',
      contentType: multerS3.AUTO_CONTENT_TYPE,
      metadata: (req, file, cb) => cb(null, { fieldName: file.fieldname }),
      key: (req, file, cb) => cb(null, `media/${Date.now()}_${file.originalname}`)
    });
    return multer({ storage });
  }
  const dir = '/tmp/uploads';
  try { fs.mkdirSync(dir, { recursive: true }); } catch {}
  const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, dir),
    filename: (req, file, cb) => cb(null, `${Date.now()}_${file.originalname}`)
  });
  return multer({ storage });
}