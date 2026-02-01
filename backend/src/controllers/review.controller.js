import { Review } from "../models/review.model.js";

export async function createReview(req, res) {
  try {
    const { productId, orderId, rating } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ error: "Rating must be between 1 and 5" });
    }
    const user = req.user;
    //verify that the order belongs to the user
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    if (order.clearId !== user.clearId) {
      return res
        .status(403)
        .json({ error: "You are not authorized to review this order" });
    }
    if (order.status !== "delivered") {
      return res
        .status(400)
        .json({ error: "You can only review delivered orders" });
    }

    //verify  product is in order
    const productInOrder = order.orderItems.find(
      (item) => item.product.toString() === productId.toString()
    );
    if (!productInOrder) {
      return res.status(400).json({ error: "Product not found in order" });
    }

    //check if review already exists for this order and product
    const existingReview = await Review.findOne({
      product: productId,
      user: user._id,
    });
    if (existingReview) {
      return res.status(400).json({
        error: "You have already reviewed this product for this order",
      });
    }

    const review = await Review.create({
      product: productId,
      user: user._id,
      order: orderId,
      rating,
    });

    //update the product rating with atomic aggregation
    const reviews = await Review.find({ product: productId });
    const totalRatings = reviews.reduce((sum, rev) => sum + rev.rating, 0);
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        averageRating: totalRatings / reviews.length,
        totalReviews: reviews.length,
      },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      await Review.findByIdAndDelete(review._id);
      return res
        .status(404)
        .json({ error: "Product not found" });
    }

    res.status(201).json({ message: "Review created successfully", review });
  } catch (error) {
    console.error("Error in createReview controller:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function deleteReview(req, res) {
  try {
    const { reviewId } = req.params;
    const user = req.user;

    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }
    if (review.user.toString() !== user._id.toString()) {
      return res
        .status(403)
        .json({ error: "You are not authorized to delete this review" });
    }
    const productId = review.product;
    await Review.findByIdAndDelete(reviewId);

    const reviews = await Review.find({ product: productId });
    const totalRatings = reviews.reduce((sum, rev) => sum + rev.rating, 0);
    const product = await Product.findByIdAndUpdate(productId, {
      averageRating: reviews.length > 0 ? totalRatings / reviews.length : 0,
      totalReviews: reviews.length,
    });
    res.status(201).json({ message: "Review submitted successfully", review });
  } catch (error) {
    console.error("Error in deleteReview controller:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
