const categorySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    name: { type: String, required: true },
    totalSpending: { type: Number, default: 0 },
    spending: [{ type: Schema.Types.ObjectId, ref: 'spending' }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('category', categorySchema);
