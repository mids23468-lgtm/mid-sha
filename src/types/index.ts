export type CurtainType = 
  | 'Eyelet'
  | 'Rod Pocket'
  | 'Pinch Pleat'
  | 'Wave Fold'
  | 'Ring Type';

export type FabricType = 
  | 'Linen'
  | 'Cotton'
  | 'Polyester'
  | 'Velvet'
  | 'Sheer'
  | 'Blackout Linen';

export type CurtainColor = 
  | 'Ivory'
  | 'Beige'
  | 'Sand'
  | 'Taupe'
  | 'Mocha'
  | 'Warm White'
  | 'Charcoal Brown';

export interface ProductColorOption {
  name: string;
  hex: string;
  image?: string;
}

export interface ProductSizeOption {
  label: string;
  width: number; // in feet or inches
  height: number;
  priceModifier: number; // multiplier or delta
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  price: number; // in INR / standard currency unit (e.g. ₹2,499)
  originalPrice?: number;
  category: 'Sheer Curtains' | 'Blackout Curtains' | 'Living Room Curtains' | 'Bedroom Curtains' | 'Luxury Collection';
  rating: number;
  reviewCount: number;
  description: string;
  longDescription: string;
  fabric: FabricType;
  fabricDetails: string;
  opacity: 'Sheer (10-20%)' | 'Light Filtering (50-60%)' | 'Semi-Opaque (75%)' | 'Total Blackout (100%)';
  colors: ProductColorOption[];
  sizes: ProductSizeOption[];
  curtainTypes: CurtainType[];
  images: string[];
  inStock: boolean;
  featured?: boolean;
  bestseller?: boolean;
  careInstructions: string[];
}

export interface CollectionItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  categoryKey: Product['category'];
  itemCount: number;
}

export interface CartItem {
  id: string; // unique cart item id (e.g. prodId-color-size-type)
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  color: string;
  colorHex: string;
  size: string;
  width: string | number;
  height: string | number;
  curtainType: CurtainType;
  fabric: FabricType;
  image: string;
  isCustomSize?: boolean;
}

export type OrderStatus = 
  | 'NEW'
  | 'CONFIRMED'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED';

export type PaymentMethod = 
  | 'Cash on Delivery'
  | 'Online Payment'
  | 'UPI'
  | 'Card';

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  color: string;
  size: string;
  curtainType: string;
  fabric: string;
  image: string;
  isCustomSize?: boolean;
  customDimensions?: { width: string; height: string };
}

export interface OrderAddress {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pinCode: string;
  country: string;
}

export interface Order {
  orderId: string;
  customerId: string;
  customerName: string;
  phone: string;
  email: string;
  address: OrderAddress;
  items: OrderItem[];
  customizationNotes?: string;
  subtotal: number;
  deliveryFee: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: 'Pending' | 'Paid' | 'Cash on Delivery';
  orderStatus: OrderStatus;
  createdAt: string;
  updatedAt: string;
  trackingNumber?: string;
  carrier?: string;
  estimatedDelivery?: string;
}

export interface CustomCurtainRequest {
  id: string;
  name: string;
  phone: string;
  email: string;
  roomType: string;
  windowWidth: string;
  windowHeight: string;
  preferredFabric: string;
  preferredColor: string;
  additionalRequirements?: string;
  quantity: number;
  status: 'New' | 'Under Review' | 'Quoted' | 'In Production' | 'Completed';
  createdAt: string;
  notes?: string;
}

export interface OwnerNotification {
  id: string;
  orderId: string;
  type: 'NEW_ORDER' | 'CUSTOM_REQUEST' | 'ORDER_STATUS_CHANGE';
  title: string;
  message: string;
  customerName: string;
  customerPhone: string;
  amount: number;
  itemsSummary: string;
  createdAt: string;
  read: boolean;
  channel: 'In-App' | 'WhatsApp' | 'Email';
}

export interface StoreSettings {
  storeName: string;
  tagline: string;
  ownerWhatsApp: string;
  ownerEmail: string;
  phone: string;
  address: string;
  currencySymbol: string;
  freeShippingThreshold: number;
  standardShippingFee: number;
  soundNotificationsEnabled: boolean;
  autoConfirmOrders: boolean;
}
