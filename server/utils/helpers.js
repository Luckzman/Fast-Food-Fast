import multer from 'multer';


export const responseMsg = (res, code, statusType, message, data) => res.status(code).json({
  statusType,
  message,
  data,
});

export const menuResponseMsg = (res, code, statusType, message, menu) => res.status(code).json({
  statusType,
  message,
  menu,
});

export const userResponseMsg = (res, code, statusType, message, user) => res.status(code).json({
  statusType,
  message,
  user,
});

export const orderResponseMsg = (res, code, statusType, message, order) => res.status(code).json({
  statusType,
  message,
  order,
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
