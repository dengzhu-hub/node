class ApiFeature {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  filter() {
    const queryObj = { ...this.queryStr };
    console.log(queryObj);
    const excludeQuery = ['page', 'limit', 'sort', 'fields'];
    excludeQuery.forEach((el) => delete queryObj[el]);
    console.log(queryObj);
    // const tours = await Tour.find({});
    const queryStr = JSON.stringify(queryObj);
    const replaceQuery = JSON.parse(
      queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`),
    );
    console.log(replaceQuery);

    // BUILD QUERY
    this.query = this.query.find(replaceQuery);
    return this;
  }

  sort() {
    const queryKey = this.queryStr.sort;
    console.log(typeof queryKey);
    if (queryKey) {
      const sortBy = queryKey.split(',').join(' ');
      console.log(sortBy);

      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  limitFields() {
    const queryKey = this.queryStr.fields;
    if (queryKey) {
      const fields = queryKey.split(',').join(' ');
      console.log(fields);

      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v -createdAt -updatedAt');
    }
    return this;
  }

  paginate() {
    const queryPage = this.queryStr.page * 1 || 1;
    const queryLimit = this.queryStr.limit * 1 || 100;
    const skip = (queryPage - 1) * queryLimit;
    if (isNaN(queryPage) || queryPage <= 0) {
      throw new Error('Invalid page number');
    }

    // 强制检查 queryLimit 是否为数字，如果不是则使用默认值 100
    if (isNaN(queryLimit) || queryLimit <= 0) {
      throw new Error('Invalid limit value');
    }

    this.query = this.query.skip(skip).limit(queryLimit);
    // console.log(query.query);

    return this;
  }
}
module.exports = ApiFeature;
