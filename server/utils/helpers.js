import multer from 'multer';

export const responseMsg = (res, code, status, message, data) => res.status(code).json({
  status,
  message,
  data,
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'image/menu/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  }
  cb(null, false);
};

export const upload = multer({ storage, limits: 1024 * 1024 * 5, fileFilter });
