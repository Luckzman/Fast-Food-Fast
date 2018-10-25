import multer from 'multer';


export const responseMsg = (res, code, status, message, data) => res.status(code).json({
  status,
  message,
  data,
});

export const menuResponseMsg = (res, code, status, message, menu) => res.status(code).json({
  status,
  message,
  menu,
});

export const userResponseMsg = (res, code, status, message, user) => res.status(code).json({
  status,
  message,
  user,
});

export const orderResponseMsg = (res, code, status, message, order) => res.status(code).json({
  status,
  message,
  order,
});

export const cartResponseMsg = (res, code, status, message, cart) => res.status(code).json({
  status,
  message,
  cart,
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
