export class DBRepository {
  sModel;
  constructor(model) {
    this.sModel = model;
  }
  async create(item) {
    return await this.sModel.insertOne(item);
  }
  async update(filter, update, options = {}) {
    return await this.sModel.findOneAndUpdate(filter, update, options);
  }

  async updateAll(filter, update, options = {}) {
    return await this.sModel.updateMany(filter, update, options);
  }

  async replace(filter, update, options = { runValidators: true }) {
    return await this.sModel.findOneAndReplace(filter, update, options);
  }
  async getOne(filter, projection = {}, options = {}) {
    return await this.sModel.findOne(filter, projection, options);
  }
  async getAll(filter = {}, projection = {}, options = {}) {
    return await this.sModel.find(filter, projection, options);
  }
  async delete(filter, options = {}) {
    return await this.sModel.deleteOne(filter, options);
  }
}
