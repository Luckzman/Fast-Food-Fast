import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'image/menu/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});


export const upload = multer({ storage });

export const responseMsg = (res, code, status, message, data) => res.status(code).json({
  status,
  message,
  data,
});
