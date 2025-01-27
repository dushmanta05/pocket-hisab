const categorySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    totalSpending: { type: Number, default: 0 },
    spending: [{ type: Schema.Types.ObjectId, ref: 'Spending' }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Category', categorySchema);
