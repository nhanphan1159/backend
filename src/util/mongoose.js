module.exports = {
  mutipleMongooseToObject: function (mongooses) {
    return mongooses.map((mongoose) => mongoose.toObject());
  },
  mongoosesToObject: function (mongoose) {
    return mongoose ? mongoose.toObject() : mongoose;
  },
};
