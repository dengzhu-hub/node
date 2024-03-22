const Tour = require('../models/tourModels');
const ApiFeature = require('../utils/apiFeature');

const checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      error: 'Invalid input',
      message: 'body must have a name or price attribute',
    });
  }
  next();
};

const getTop5CheapTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

const getAllTours = async (req, res) => {
  try {
    const apiFeatures = new ApiFeature(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    // EXECUTE QUERY
    const tours = await apiFeatures.query;

    res.set({
      'X-My-Private-Info': 'jonasid',
      'X-My-Private-Info2': 'dengzhu-hub',
    });
    res.status(200).json({
      status: 'success', // 响应状态为成功
      result: tours.length, // 返回旅游信息的数量
      data: {
        tours, // 旅游信息
      },
      createAt: new Date(), // 创建时间为当前时间
    });
  } catch (error) {
    console.log(error);

    res.status(404).json({
      status: 'error',
      message: error.message,
    });
  }
};
const getTourById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const requestAt = req.requestTime;
    // 如果id在tours数组中找到对应的旅游信息

    const tour = await Tour.findById(id).exec();
    // const tour = await Tour.findOne({"_id": id})
    console.log(tour);

    // 返回成功响应并返回相应的数据
    res.status(200).json({
      status: 'success',
      requestAt,
      data: {
        tour,
      },
      createAt: new Date(),
    });
  } catch (error) {
    res.status(404).json({
      status: 'error',
      message: error.message,
    });
  }
  // 根据请求路径中的id获取旅游信息

  // 返回404错误并发送错误图片
};

const updateTour = async (req, res) => {
  try {
    const tourId = req.params.id; // 从 URL 参数获取要更新的旅游信息的 ID
    const tour = await Tour.findByIdAndUpdate(tourId, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
      createAt: new Date(),
    });
  } catch (err) {
    res.status(404).json({
      status: '更新失败',
      message: err.message,
    });
  }
};

const deleteTour = async (req, res) => {
  try {
    const tourId = req.params.id; // 从 URL 参数获取要更新的旅游信息的 ID
    await Tour.findByIdAndDelete(tourId);

    res.status(204).json({
      status: 'success',
    });
  } catch (err) {
    res.status(404).json({
      status: '删除失败',
      message: err.message,
    });
  }
};
const createTour = async (req, res) => {
  // const tourData = new Tour({})
  // tourData.save()
  try {
    const newTour = await Tour.create(req.body);
    res.set({
      'Contnet-Length': '1337',
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*',
    });
    res
      .cookie('access_token', 'Bearer ', {
        expires: new Date(Date.now() + 8 * 3600000), // cookie will be removed after 8 hours
      })
      .cookie('test', 'test');
    res.status(201).json({
      status: 'success',
      data: {
        tours: newTour,
      },
      createAt: new Date(),
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};


const getTourStars = async (req, res,) => {
  const stars = await Tour.aggregate([
    {
      $match:{ratingsAverage:{$gte: 4.5}},
      $group: {
        _id: '$ratingsAverage',
        count: {$sum: 1},
      },
    }
  ])
  try {
    const 
    
  } catch (error) {
    
  }


})
module.exports = {
  getAllTours,
  getTourById,
  updateTour,
  deleteTour,
  createTour,
  checkBody,
  getTop5CheapTours,
};
