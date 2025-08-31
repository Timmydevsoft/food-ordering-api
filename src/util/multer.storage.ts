import multer from 'multer';

const storage = multer.memoryStorage(); // in-memory for direct buffer to Cloudinary

const upload = multer({ storage });

export default upload;