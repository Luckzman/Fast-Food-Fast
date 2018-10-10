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
  destination: (req, file, next) => {
    next(null, 'image/menu/');
  },
  filename: (req, file, next) => {
    next(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, next) => {
  const image = file.mimetype === 'image/jpeg' || file.mimetype === 'image/png';
  if (!file) {
    next();
  }
  if (image) {
    next(null, true);
  } else {
    const error = new Error('file type not supported');
    error.status = 400;
    next(error, false);
  }
};

export const upload = multer({ storage, limits: 1024 * 1024 * 5, fileFilter });
