import mongoose, { Document, Schema, Model, Types } from "mongoose";
import { IUser } from "./user.model"; // Assuming you have a User model
import { IProduct } from "./product.model"; // Assuming you have a Product model

// =============================================
// ENHANCED INTERFACE DEFINITIONS
// =============================================
export interface IOrderItem {
  product: Types.ObjectId | IProduct;
  quantity: number;
  price: number;
  name: string;
  image?: string;
  sku?: string;
  variant?: string;
  taxRate: number;
  discount: number;
  totalPrice: number;
}

export interface IShippingAddress {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
  email?: string;
  isBillingSame: boolean;
  billingAddress?: Omit<IShippingAddress, 'isBillingSame' | 'billingAddress'>;
}

export interface IPaymentDetails {
  method: "credit_card" | "paypal" | "bank_transfer" | "cash_on_delivery";
  transactionId?: string;
  paymentGateway?: string;
  cardLast4?: string;
  paymentDate?: Date;
}

export interface IOrder extends Document {
  user: Types.ObjectId | IUser;
  orderNumber: string;
  items: IOrderItem[];
  subtotal: number;
  shippingCost: number;
  taxAmount: number;
  discountAmount: number;
  totalAmount: number;
  shippingAddress: IShippingAddress;
  payment: IPaymentDetails;
  paymentStatus: "pending" | "paid" | "failed" | "refunded" | "partially_refunded";
  orderStatus: "pending" | "processing" | "shipped" | "delivered" | "cancelled" | "returned";
  trackingNumber?: string;
  carrier?: string;
  estimatedDelivery?: Date;
  notes?: string;
  customerNotes?: string;
  refundReason?: string;
  couponCode?: string;
  createdAt: Date;
  updatedAt: Date;
  cancelledAt?: Date;
  deliveredAt?: Date;
}

// =============================================
// SCHEMA DEFINITIONS WITH ENHANCED VALIDATION
// =============================================
const OrderItemSchema = new Schema<IOrderItem>({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: [true, "Product reference is required"],
  },
  quantity: {
    type: Number,
    required: [true, "Quantity is required"],
    min: [1, "Minimum quantity is 1"],
    max: [100, "Maximum quantity per item is 100"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [0, "Price cannot be negative"],
  },
  name: {
    type: String,
    required: [true, "Product name is required"],
    trim: true,
  },
  image: {
    type: String,
    validate: {
      validator: (v: string) => /\.(jpg|jpeg|png|webp)$/i.test(v),
      message: "Invalid image format",
    },
  },
  sku: {
    type: String,
    trim: true,
  },
  variant: {
    type: String,
    trim: true,
  },
  taxRate: {
    type: Number,
    default: 0,
    min: [0, "Tax rate cannot be negative"],
    max: [100, "Tax rate cannot exceed 100%"],
  },
  discount: {
    type: Number,
    default: 0,
    min: [0, "Discount cannot be negative"],
  },
  totalPrice: {
    type: Number,
    required: true,
    min: [0, "Total price cannot be negative"],
  },
}, { _id: false });

const ShippingAddressSchema = new Schema<IShippingAddress>({
  street: {
    type: String,
    required: [true, "Street address is required"],
    trim: true,
  },
  city: {
    type: String,
    required: [true, "City is required"],
    trim: true,
  },
  state: {
    type: String,
    required: [true, "State is required"],
    trim: true,
  },
  postalCode: {
    type: String,
    required: [true, "Postal code is required"],
    trim: true,
  },
  country: {
    type: String,
    required: [true, "Country is required"],
    trim: true,
  },
  phone: {
    type: String,
    trim: true,
    validate: {
      validator: (v: string) => /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/.test(v),
      message: "Invalid phone number format",
    },
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    validate: {
      validator: (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
      message: "Invalid email format",
    },
  },
  isBillingSame: {
    type: Boolean,
    default: true,
  },
  billingAddress: {
    type: new Schema({
      street: String,
      city: String,
      state: String,
      postalCode: String,
      country: String,
      phone: String,
    }),
    required: function(this: IShippingAddress) {
      return !this.isBillingSame;
    },
  },
}, { _id: false });

const PaymentDetailsSchema = new Schema<IPaymentDetails>({
  method: {
    type: String,
    required: true,
    enum: ["credit_card", "paypal", "bank_transfer", "cash_on_delivery"],
  },
  transactionId: {
    type: String,
    trim: true,
  },
  paymentGateway: {
    type: String,
    trim: true,
  },
  cardLast4: {
    type: String,
    validate: {
      validator: (v: string) => /^\d{4}$/.test(v),
      message: "Last 4 digits must be 4 numbers",
    },
  },
  paymentDate: {
    type: Date,
  },
}, { _id: false });

const orderSchema = new Schema<IOrder>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required"],
      index: true,
    },
    orderNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
      default: function() {
        return `ORD-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
      },
    },
    items: {
      type: [OrderItemSchema],
      required: [true, "Order items are required"],
      validate: {
        validator: (items: IOrderItem[]) => items.length > 0 && items.length <= 50,
        message: "Order must contain 1-50 items",
      },
    },
    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },
    shippingCost: {
      type: Number,
      required: true,
      min: 0,
    },
    taxAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    discountAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    totalAmount: {
      type: Number,
      required: [true, "Total amount is required"],
      min: [0, "Total amount cannot be negative"],
    },
    shippingAddress: {
      type: ShippingAddressSchema,
      required: [true, "Shipping address is required"],
    },
    payment: {
      type: PaymentDetailsSchema,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded", "partially_refunded"],
      default: "pending",
    },
    orderStatus: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled", "returned"],
      default: "pending",
    },
    trackingNumber: {
      type: String,
      trim: true,
    },
    carrier: {
      type: String,
      trim: true,
      enum: ["fedex", "ups", "usps", "dhl", "other"],
    },
    estimatedDelivery: {
      type: Date,
      validate: {
        validator: function(this: IOrder, v: Date) {
          return !this.createdAt || v > this.createdAt;
        },
        message: "Delivery date must be after order date",
      },
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [500, "Notes cannot exceed 500 characters"],
    },
    customerNotes: {
      type: String,
      trim: true,
      maxlength: [500, "Customer notes cannot exceed 500 characters"],
    },
    refundReason: {
      type: String,
      trim: true,
      maxlength: [500, "Refund reason cannot exceed 500 characters"],
    },
    couponCode: {
      type: String,
      trim: true,
      uppercase: true,
    },
    cancelledAt: {
      type: Date,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
    toObject: {
      virtuals: true,
    },
  }
);

// =============================================
// INDEXES FOR PERFORMANCE OPTIMIZATION
// =============================================
orderSchema.index({ orderNumber: 1 }); // For quick order lookup
orderSchema.index({ user: 1, createdAt: -1 }); // For user order history
orderSchema.index({ orderStatus: 1, paymentStatus: 1 }); // For admin filtering
orderSchema.index({ createdAt: -1 }); // For recent orders
orderSchema.index({ "payment.method": 1 }); // For payment method analysis
orderSchema.index({ totalAmount: 1 }); // For financial reporting

// =============================================
// VIRTUAL FIELDS
// =============================================
orderSchema.virtual("statusHistory").get(function(this: IOrder) {
  return {
    pending: this.createdAt,
    processing: this.orderStatus === "processing" ? this.updatedAt : undefined,
    shipped: this.orderStatus === "shipped" ? this.updatedAt : undefined,
    delivered: this.deliveredAt,
    cancelled: this.cancelledAt,
  };
});

orderSchema.virtual("isPaid").get(function(this: IOrder) {
  return this.paymentStatus === "paid";
});

orderSchema.virtual("isDelivered").get(function(this: IOrder) {
  return this.orderStatus === "delivered";
});

orderSchema.virtual("isCancelled").get(function(this: IOrder) {
  return this.orderStatus === "cancelled";
});

// =============================================
// PRE-SAVE MIDDLEWARE
// =============================================
orderSchema.pre<IOrder>("save", function(next) {
  // Calculate totals if items have changed
  if (this.isModified("items")) {
    this.subtotal = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    this.totalAmount = this.subtotal + this.shippingCost + this.taxAmount - this.discountAmount;
  }
  
  // Set timestamps for status changes
  if (this.isModified("orderStatus")) {
    if (this.orderStatus === "delivered" && !this.deliveredAt) {
      this.deliveredAt = new Date();
    }
    if (this.orderStatus === "cancelled" && !this.cancelledAt) {
      this.cancelledAt = new Date();
    }
  }
  
  next();
});

// =============================================
// CUSTOM METHODS
// =============================================

// Add item to order (before payment)
orderSchema.methods.addItem = function(item: Omit<IOrderItem, "totalPrice">) {
  if (this.paymentStatus !== "pending") {
    throw new Error("Cannot add items to a paid order");
  }
  
  const existingItem = this.items.find((i) => 
    i.product.equals(item.product) && 
    i.variant === item.variant
  );
  
  if (existingItem) {
    existingItem.quantity += item.quantity;
  } else {
    const totalPrice = (item.price * item.quantity) * (1 - (item.discount / 100));
    this.items.push({ ...item, totalPrice });
  }
  
  this.markModified("items");
};

// Update order status with validation
orderSchema.methods.updateStatus = function(newStatus: IOrder["orderStatus"]) {
  const validTransitions: Record<string, string[]> = {
    pending: ["processing", "cancelled"],
    processing: ["shipped", "cancelled"],
    shipped: ["delivered", "returned"],
    delivered: ["returned"],
    cancelled: [],
    returned: [],
  };
  
  if (!validTransitions[this.orderStatus].includes(newStatus)) {
    throw new Error(`Invalid status transition from ${this.orderStatus} to ${newStatus}`);
  }
  
  this.orderStatus = newStatus;
};

// Process refund
orderSchema.methods.processRefund = function(amount: number, reason: string) {
  if (this.paymentStatus !== "paid") {
    throw new Error("Only paid orders can be refunded");
  }
  
  if (amount <= 0) {
    throw new Error("Refund amount must be positive");
  }
  
  if (amount > this.totalAmount) {
    throw new Error("Refund amount cannot exceed order total");
  }
  
  this.refundReason = reason;
  
  if (amount === this.totalAmount) {
    this.paymentStatus = "refunded";
  } else {
    this.paymentStatus = "partially_refunded";
  }
  
  // In a real app, you would integrate with payment gateway here
};

// =============================================
// STATIC METHODS
// =============================================

// Get orders by user with pagination
orderSchema.statics.findByUser = function(
  userId: Types.ObjectId,
  page: number = 1,
  limit: number = 10
) {
  return this.find({ user: userId })
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .populate("user", "name email")
    .populate("items.product", "name images");
};

// Get recent orders for dashboard
orderSchema.statics.getRecentOrders = function(limit: number = 5) {
  return this.find()
    .sort({ createdAt: -1 })
    .limit(limit)
    .populate("user", "name")
    .select("orderNumber totalAmount orderStatus createdAt");
};

// Get sales statistics
orderSchema.statics.getSalesStats = function(startDate: Date, endDate: Date) {
  return this.aggregate([
    {
      $match: {
        createdAt: { $gte: startDate, $lte: endDate },
        paymentStatus: "paid",
      },
    },
    {
      $group: {
        _id: null,
        totalSales: { $sum: "$totalAmount" },
        averageOrder: { $avg: "$totalAmount" },
        count: { $sum: 1 },
      },
    },
  ]);
};

// =============================================
// MODEL EXPORT WITH STRONG TYPING
// =============================================
interface IOrderModel extends Model<IOrder> {
  findByUser(
    userId: Types.ObjectId,
    page?: number,
    limit?: number
  ): Promise<IOrder[]>;
  getRecentOrders(limit?: number): Promise<IOrder[]>;
  getSalesStats(startDate: Date, endDate: Date): Promise<any>;
}

export const Order: IOrderModel = mongoose.model<IOrder, IOrderModel>(
  "Order",
  orderSchema
);

export default Order;