import model from '../model/order';

const order = {
  getAllOrder(req, res) {
    res.status(200).json({
      success: true,
      message: 'get all order request successful',
      data: model,
    });
  },
  getOrderItem(req, res) {
    const orderId = parseInt(req.params.id, 10);
    for (let i = 0; i < model.length; i += 1) {
      if (orderId === model[i].id) {
        return res.status(200).json({
          message: 'get a order request item successful',
          data: model[i],
        });
      }
    }
    return res.status(404).json({
      message: 'order id not correct',
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
    res.status(201).json({
      success: true,
      message: 'create order request successful',
    });
  },
  updateOrder(req, res) {
    const orderId = parseInt(req.params.id, 10);
    for (let i = 0; i < model.length; i += 1) {
      if (orderId === model[i].id) {
        model[i].status = req.body.status;
        return res.status(201).json({
          success: true,
          message: 'update order request successful',
          data: model[i],
        });
      }
    }
    return res.status(400).json({
      message: 'update order request not successful',
    });
  },
};

export default order;
