import model from '../model/order';

export const getAllOrder = (req, res) => {
  res.status(200).json({
    success: true,
    message: 'get all order request successful',
    data: model,
  });
};

export const getOrderItem = (req, res) => {
  for (const data of model) {
    if (data.id === parseInt(req.params.id, 10)) {
      return res.status(200).json({
        success: true,
        message: 'get a order request item successful',
        data,
      });
    }
  }
  return res.status(404).json({
    success: false,
    message: 'order id not correct',
  });
};

export const createOrder = (req, res) => {
  const newOrder = {
    orderId: 3,
    name: 'Chicken Pie',
    description: 'This is a brief description of the food order',
    quantity: 5,
    image: 'file//image2.jpeg',
    price: 2000,
    date_ordered: '25/08/2018',
    sub_total: 6000,
    status: 'delivered',
  };
  model.push(newOrder);
  res.status(201).json({
    success: true,
    message: 'create order request successful',
  });
};

export const updateOrder = (req, res) => {
  for (const data of model) {
    if (data.id === parseInt(req.params.id, 10)) {
      data.status = req.body.status;
      return res.status(201).json({
        success: true,
        message: 'update order request successful',
        data,
      });
    }
  }
  return res.status(400).json({
    message: 'update order request not successful',
  });
};
