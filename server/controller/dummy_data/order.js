import model from '../model/order';

/**
 *GetAllOrder function  return all orders
 * @param {object} req
 * @param {object} res
 */
export const getAllOrder = (req, res) => {
  res.status(200).json({
    success: true,
    message: 'get all order request successful',
    data: model,
  });
};

/**
 * GetOrderItem function returns an order item based on the params id
 * @param {object} req
 * @param {object} res
 */
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

/**
 * CreateOrder function create a new order
 * @param {object} req
 * @param {object} res
 */
export const createOrder = (req, res) => {
  const newOrder = {
    id: 4,
    customer_name: 'Olumide Emmanuel',
    customer_address: '5, Itori Street, Aguda',
    city: 'Surulere',
    additional_info: '',
    phone_no: 1,
    ordered_food: 'Burger',
    quantity_ordered: '2',
    total_price: '1000',
    date_ordered: '24/08/2018',
    status: 'pending',
  };
  model.push(newOrder);
  res.status(201).json({
    success: true,
    message: 'create order request successful',
  });
};

/**
 * UpdateOrder Function updates the status of an order
 * @param {object} req
 * @param {object} res
 */
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
