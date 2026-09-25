import { Order, OrderStatus, CustomCurtainRequest, OwnerNotification, StoreSettings, Product } from '../types';
import { INITIAL_ORDERS, INITIAL_CUSTOM_REQUESTS, INITIAL_SETTINGS, INITIAL_PRODUCTS } from '../data/mockData';

const ORDERS_STORAGE_KEY = 'curtivo_orders_v1';
const REQUESTS_STORAGE_KEY = 'curtivo_custom_requests_v1';
const NOTIFICATIONS_STORAGE_KEY = 'curtivo_owner_notifications_v1';
const SETTINGS_STORAGE_KEY = 'curtivo_store_settings_v1';
const PRODUCTS_STORAGE_KEY = 'curtivo_products_v1';

// Web Audio API chime synthesizer for real-time owner order notification
export function playNotificationChime() {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const now = ctx.currentTime;
    
    // Luxury two-tone chime: C5 (523.25Hz) -> G5 (783.99Hz)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(523.25, now);
    gain1.gain.setValueAtTime(0.15, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.6);

    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(783.99, now + 0.15);
    gain2.gain.setValueAtTime(0.18, now + 0.15);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.9);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.15);
    osc2.stop(now + 0.9);
  } catch {
    // Audio context not allowed without interaction or not supported
  }
}

// Order ID generator: CURT-2026-00125
export function generateOrderId(): string {
  const year = new Date().getFullYear();
  const randomNum = Math.floor(100 + Math.random() * 900);
  return `CURT-${year}-00${randomNum}`;
}

export function formatWhatsAppMessage(order: Order): string {
  const item = order.items[0];
  const itemsText = order.items.map(i => `${i.productName} (Qty: ${i.quantity}, Size: ${i.size})`).join(', ');
  
  return encodeURIComponent(
    `*NEW CURTIVO ORDER*\n\n` +
    `*Order ID:* ${order.orderId}\n` +
    `*Customer:* ${order.customerName}\n` +
    `*Phone:* ${order.phone}\n` +
    `*Product:* ${item ? item.productName : 'Curtains'}\n` +
    `*Quantity:* ${order.items.reduce((acc, i) => acc + i.quantity, 0)}\n` +
    `*Items:* ${itemsText}\n` +
    `*Total:* ₹${order.total.toLocaleString()}\n` +
    `*Payment:* ${order.paymentMethod}\n` +
    `*Delivery Address:* ${order.address.address}, ${order.address.city}, ${order.address.state} - ${order.address.pinCode}\n\n` +
    `*VIEW ORDER:* ${window.location.origin}?track=${order.orderId}`
  );
}

// ----------------- ORDERS -----------------

export function getOrders(): Order[] {
  try {
    const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(INITIAL_ORDERS));
      return INITIAL_ORDERS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_ORDERS;
  }
}

export function getOrderById(orderId: string): Order | undefined {
  const orders = getOrders();
  const cleanId = orderId.trim().toUpperCase();
  return orders.find(o => o.orderId.toUpperCase() === cleanId);
}

export function createOrder(orderData: Omit<Order, 'orderId' | 'createdAt' | 'updatedAt' | 'orderStatus'>): Order {
  const orders = getOrders();
  const orderId = generateOrderId();
  const now = new Date().toISOString();

  const newOrder: Order = {
    ...orderData,
    orderId,
    orderStatus: 'NEW',
    createdAt: now,
    updatedAt: now,
    carrier: 'BlueDart Luxury Express',
    estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }),
  };

  const updatedOrders = [newOrder, ...orders];
  localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updatedOrders));

  // Trigger owner notification
  sendOrderNotification(newOrder);

  return newOrder;
}

export function updateOrderStatus(orderId: string, status: OrderStatus, trackingNumber?: string): Order | undefined {
  const orders = getOrders();
  const index = orders.findIndex(o => o.orderId === orderId);
  if (index === -1) return undefined;

  const updated: Order = {
    ...orders[index],
    orderStatus: status,
    updatedAt: new Date().toISOString(),
    ...(trackingNumber ? { trackingNumber } : {}),
  };

  orders[index] = updated;
  localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));

  // Record notification for order status change
  createInAppNotification({
    orderId: updated.orderId,
    type: 'ORDER_STATUS_CHANGE',
    title: `Order Status Updated: ${status}`,
    message: `Order #${updated.orderId} for ${updated.customerName} has been moved to ${status}.`,
    customerName: updated.customerName,
    customerPhone: updated.phone,
    amount: updated.total,
    itemsSummary: `${updated.items.length} items`,
    channel: 'In-App',
  });

  return updated;
}

// ----------------- NOTIFICATIONS -----------------

export function getNotifications(): OwnerNotification[] {
  try {
    const raw = localStorage.getItem(NOTIFICATIONS_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function createInAppNotification(data: Omit<OwnerNotification, 'id' | 'createdAt' | 'read'>): OwnerNotification {
  const notifications = getNotifications();
  const newNotif: OwnerNotification = {
    ...data,
    id: `notif-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    createdAt: new Date().toISOString(),
    read: false,
  };

  const updated = [newNotif, ...notifications].slice(0, 50); // keep last 50
  localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(updated));
  return newNotif;
}

export function markNotificationsAsRead(): void {
  const notifs = getNotifications().map(n => ({ ...n, read: true }));
  localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(notifs));
}

export function sendOrderNotification(order: Order): OwnerNotification {
  const item = order.items[0];
  const itemsSummary = item 
    ? `${item.productName} (Qty: ${item.quantity})${order.items.length > 1 ? ` +${order.items.length - 1} more` : ''}`
    : 'Custom Curtains';

  // Play auditory alert chime
  playNotificationChime();

  // Try browser push notification if permitted
  if ('Notification' in window && Notification.permission === 'granted') {
    try {
      new Notification('NEW CURTIVO ORDER', {
        body: `Order ${order.orderId} from ${order.customerName} (₹${order.total.toLocaleString()})`,
        icon: '/favicon.ico',
      });
    } catch {
      // Ignored
    }
  }

  // Create In-App Notification entry
  return createInAppNotification({
    orderId: order.orderId,
    type: 'NEW_ORDER',
    title: 'NEW CURTIVO ORDER',
    message: `Order #${order.orderId} received from ${order.customerName}. Total: ₹${order.total.toLocaleString()} (${order.paymentMethod})`,
    customerName: order.customerName,
    customerPhone: order.phone,
    amount: order.total,
    itemsSummary,
    channel: 'In-App',
  });
}

// ----------------- CUSTOM REQUESTS -----------------

export function getCustomRequests(): CustomCurtainRequest[] {
  try {
    const raw = localStorage.getItem(REQUESTS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(REQUESTS_STORAGE_KEY, JSON.stringify(INITIAL_CUSTOM_REQUESTS));
      return INITIAL_CUSTOM_REQUESTS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_CUSTOM_REQUESTS;
  }
}

export function createCustomRequest(data: Omit<CustomCurtainRequest, 'id' | 'createdAt' | 'status'>): CustomCurtainRequest {
  const reqs = getCustomRequests();
  const id = `REQ-${Math.floor(1000 + Math.random() * 9000)}`;
  const newReq: CustomCurtainRequest = {
    ...data,
    id,
    createdAt: new Date().toISOString(),
    status: 'New',
  };

  const updated = [newReq, ...reqs];
  localStorage.setItem(REQUESTS_STORAGE_KEY, JSON.stringify(updated));

  playNotificationChime();

  createInAppNotification({
    orderId: id,
    type: 'CUSTOM_REQUEST',
    title: 'NEW CUSTOM CURTAIN REQUEST',
    message: `${data.name} requested custom sizing for ${data.roomType} (${data.windowWidth} × ${data.windowHeight}).`,
    customerName: data.name,
    customerPhone: data.phone,
    amount: 0,
    itemsSummary: `${data.preferredFabric} · ${data.preferredColor}`,
    channel: 'In-App',
  });

  return newReq;
}

export function updateCustomRequestStatus(id: string, status: CustomCurtainRequest['status'], notes?: string): CustomCurtainRequest | undefined {
  const reqs = getCustomRequests();
  const idx = reqs.findIndex(r => r.id === id);
  if (idx === -1) return undefined;

  const updated: CustomCurtainRequest = {
    ...reqs[idx],
    status,
    ...(notes ? { notes } : {}),
  };

  reqs[idx] = updated;
  localStorage.setItem(REQUESTS_STORAGE_KEY, JSON.stringify(reqs));
  return updated;
}

// ----------------- PRODUCTS -----------------

export function getProducts(): Product[] {
  try {
    const raw = localStorage.getItem(PRODUCTS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(INITIAL_PRODUCTS));
      return INITIAL_PRODUCTS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_PRODUCTS;
  }
}

export function saveProduct(product: Product): Product[] {
  const products = getProducts();
  const existingIdx = products.findIndex(p => p.id === product.id);
  let updated: Product[];
  if (existingIdx >= 0) {
    updated = [...products];
    updated[existingIdx] = product;
  } else {
    updated = [product, ...products];
  }
  localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(updated));
  return updated;
}

export function deleteProduct(productId: string): Product[] {
  const products = getProducts().filter(p => p.id !== productId);
  localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
  return products;
}

// ----------------- STORE SETTINGS -----------------

export function getStoreSettings(): StoreSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(INITIAL_SETTINGS));
      return INITIAL_SETTINGS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_SETTINGS;
  }
}

export function saveStoreSettings(settings: StoreSettings): StoreSettings {
  localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  return settings;
}
