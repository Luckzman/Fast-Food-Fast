const order = {
  getAllOrder(req, res) {
    res.status(200).json({
      message: 'get all order request successful',
    });
  },
  getOrderItem(req, res) {
    res.status(200).json({
      message: 'get a order request item successful',
    });
  },
  createOrder(req, res) {
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
