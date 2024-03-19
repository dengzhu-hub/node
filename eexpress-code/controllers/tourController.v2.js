const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

const checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      error: 'Invalid input',
      message: 'body must have a name or price attribute',
    });
  }
  next();
};
const getAllTours = (req, res) => {
  // 获取所有旅游信息并返回成功响应
  res.status(200).json({
    status: 'success', // 响应状态为成功
    result: tours.length, // 返回旅游信息的数量
    data: {
      tours, // 旅游信息
    },
    createAt: new Date(), // 创建时间为当前时间
  });
};
const getTourById = (req, res) => {
  // 根据请求路径中的id获取旅游信息
  const { id } = req.params;
  const requestAt = req.requestTime;
  // 如果id在tours数组中找到对应的旅游信息
  if (tours.find((tour) => tour.id === Number(id))) {
    // 返回成功响应并返回相应的数据
    res.status(200).json({
      status: 'success',
      requestAt,
      data: {
        tour: tours.find((tour) => tour.id === Number(id)),
      },
      createAt: new Date(),
    });
  } else {
    // 返回404错误并发送错误图片
    res
      .status(404)
      .sendFile(`${__dirname}/dev-data/img/Error-404-on-Opera.png`);
  }
};

const updateTour = (req, res) => {
  const tourId = parseInt(req.params.id); // 从 URL 参数获取要更新的旅游信息的 ID
  const updatedInfo = req.body; // 从请求体获取要更新的信息
  console.log(updatedInfo);

  // 在 tours 数组中找到要更新的旅游信息对象
  const tourToUpdate = tours.find((tour) => tour.id === tourId);
  console.log(tourToUpdate);

  if (!tourToUpdate) {
    return res.status(404).json({ error: 'Tour not found' });
  }

  // 更新旅游信息对象的部分内容
  for (let key in updatedInfo) {
    if (key in tourToUpdate) {
      tourToUpdate[key] = updatedInfo[key];
    }
  }

  return res.json({ message: 'Tour updated successfully', tour: tourToUpdate });
};

const deleteTour = (req, res) => {
  // 将请求参数中的id转换为整数
  const id = parseInt(req.params.id);
  // 查找要删除的tour的索引位置
  const tourToDelete = tours.findIndex((tour) => tour.id === id);
  console.log(tourToDelete);

  // 如果tour不存在，则返回404错误
  if (tourToDelete === -1) {
    return res.status(404).json({
      error: 'tour not found',
    });
  }
  // 从tours数组中删除指定的tour
  tours.splice(tourToDelete, 1);
  // 返回成功删除的响应
  return res.status(204).json({
    message: 'tour deleted successfully',
  });
};
const createTour = (req, res) => {
  // 根据已有tour的最新id，生成新的id
  const newId = tours[tours.length - 1]?.id + 1;
  // 创建一个新的tour对象，包含id和请求体中的属性
  const newTour = {
    id: newId,
    ...req.body,
  };
  // 将新的tour对象添加到tours数组中
  tours.push(newTour);
  // 将tours数组转换为json字符串并写入文件
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err) {
        console.log(err);
      }
      // 返回成功响应，并包含tours数组、创建时间等信息
      res.status(201).json({
        status: 'success',
        data: {
          tours,
        },
        createAt: new Date(),
      });
    }
  );
};
module.exports = {
  getAllTours,
  getTourById,
  updateTour,
  deleteTour,
  createTour,
  checkBody,
};
