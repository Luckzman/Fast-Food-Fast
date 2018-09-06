import model from '../model/order';

const order = {
  getAllOrder(req, res) {
    res.status(200).json({
      message: 'get all order request successful',
      data: model,
    });
  },
  getOrderItem(req, res) {
    res.status(200).json({
      message: 'get a order request item successful',
    });
  },
  createOrder(req, res) {
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
    res.status(200).json({
      message: 'create order request successful',
    });
  },
  updateOrder(req, res) {
    res.status(200).json({
      message: 'update order request successful',
    });
  },
};

export default order;
