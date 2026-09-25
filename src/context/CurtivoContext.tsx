import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { 
  Product, 
  CartItem, 
  Order, 
  OrderStatus, 
  CustomCurtainRequest, 
  OwnerNotification, 
  StoreSettings 
} from '../types';
import { 
  getProducts, 
  saveProduct, 
  deleteProduct, 
  getOrders, 
  createOrder as apiCreateOrder, 
  updateOrderStatus as apiUpdateOrderStatus,
  getCustomRequests,
  createCustomRequest as apiCreateCustomRequest,
  updateCustomRequestStatus as apiUpdateCustomRequestStatus,
  getNotifications,
  getStoreSettings,
  saveStoreSettings as apiSaveStoreSettings,
  markNotificationsAsRead
} from '../services/orderService';

interface CurtivoContextType {
  // Products
  products: Product[];
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  activeProductModal: Product | null;
  setActiveProductModal: (prod: Product | null) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (prod: Product | null) => void;
  handleSaveProduct: (product: Product) => void;
  handleDeleteProduct: (id: string) => void;

  // Cart
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, qty: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;

  // Checkout & Confirmation
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  confirmedOrder: Order | null;
  setConfirmedOrder: (order: Order | null) => void;
  placeOrder: (orderData: Omit<Order, 'orderId' | 'createdAt' | 'updatedAt' | 'orderStatus'>) => Order;

  // Order Tracking
  isTrackingOpen: boolean;
  setIsTrackingOpen: (open: boolean) => void;
  trackingOrderId: string;
  setTrackingOrderId: (id: string) => void;
  openTrackingWithId: (id: string) => void;

  // Orders (Admin & Customer)
  orders: Order[];
  updateOrderStatus: (orderId: string, status: OrderStatus, trackingNo?: string) => void;

  // Custom Sizing Requests
  customRequests: CustomCurtainRequest[];
  submitCustomRequest: (data: Omit<CustomCurtainRequest, 'id' | 'createdAt' | 'status'>) => CustomCurtainRequest;
  updateCustomRequestStatus: (id: string, status: CustomCurtainRequest['status'], notes?: string) => void;

  // Owner Notifications
  notifications: OwnerNotification[];
  latestToastNotification: OwnerNotification | null;
  dismissToastNotification: () => void;
  unreadNotificationsCount: number;
  clearAllNotifications: () => void;

  // Admin Dashboard
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;

  // Store Settings
  storeSettings: StoreSettings;
  updateStoreSettings: (settings: StoreSettings) => void;

  // Search & Navigation
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  scrollToSection: (sectionId: string) => void;

  // Direct Customizer trigger
  openCustomizerStudio: () => void;
}

const CurtivoContext = createContext<CurtivoContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'curtivo_cart_v1';
const WISHLIST_STORAGE_KEY = 'curtivo_wishlist_v1';

export const CurtivoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State initialization
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProductModal, setActiveProductModal] = useState<Product | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<Order[]>([]);
  const [customRequests, setCustomRequests] = useState<CustomCurtainRequest[]>([]);
  const [notifications, setNotifications] = useState<OwnerNotification[]>([]);
  const [latestToastNotification, setLatestToastNotification] = useState<OwnerNotification | null>(null);
  const [storeSettings, setStoreSettings] = useState<StoreSettings>(getStoreSettings());

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [trackingOrderId, setTrackingOrderId] = useState('');

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Initial load
  useEffect(() => {
    setProducts(getProducts());
    setOrders(getOrders());
    setCustomRequests(getCustomRequests());
    setNotifications(getNotifications());
    setStoreSettings(getStoreSettings());

    // Check URL parameters for tracking or admin
    const params = new URLSearchParams(window.location.search);
    const trackParam = params.get('track');
    if (trackParam) {
      setTrackingOrderId(trackParam);
      setIsTrackingOpen(true);
    }
    const adminParam = params.get('admin');
    if (adminParam === 'true') {
      setIsAdminOpen(true);
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  // Save wishlist to localStorage
  useEffect(() => {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
  }, [wishlist]);

  // Cart operations
  const addToCart = useCallback((item: Omit<CartItem, 'id'>) => {
    setCart(prev => {
      const uniqueId = `${item.productId}-${item.color}-${item.size}-${item.curtainType}-${item.isCustomSize ? 'custom' : 'std'}`;
      const existing = prev.find(i => i.id === uniqueId);
      if (existing) {
        return prev.map(i => i.id === uniqueId ? { ...i, quantity: i.quantity + item.quantity } : i);
      }
      return [...prev, { ...item, id: uniqueId }];
    });
    setIsCartOpen(true);
  }, []);

  const removeFromCart = useCallback((cartItemId: string) => {
    setCart(prev => prev.filter(i => i.id !== cartItemId));
  }, []);

  const updateCartQuantity = useCallback((cartItemId: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev => prev.map(i => i.id === cartItemId ? { ...i, quantity: qty } : i));
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const cartCount = useMemo(() => cart.reduce((acc, item) => acc + item.quantity, 0), [cart]);
  const cartSubtotal = useMemo(() => cart.reduce((acc, item) => acc + (item.price * item.quantity), 0), [cart]);

  // Wishlist operations
  const toggleWishlist = useCallback((productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  }, []);

  const isWishlisted = useCallback((productId: string) => {
    return wishlist.includes(productId);
  }, [wishlist]);

  // Order Placement
  const placeOrder = useCallback((orderData: Omit<Order, 'orderId' | 'createdAt' | 'updatedAt' | 'orderStatus'>) => {
    const created = apiCreateOrder(orderData);
    setOrders(getOrders());
    const latestNotifs = getNotifications();
    setNotifications(latestNotifs);
    
    // Set active toast notification for owner preview
    if (latestNotifs.length > 0) {
      setLatestToastNotification(latestNotifs[0]);
    }
    
    clearCart();
    setIsCheckoutOpen(false);
    setConfirmedOrder(created);
    return created;
  }, [clearCart]);

  const updateOrderStatus = useCallback((orderId: string, status: OrderStatus, trackingNo?: string) => {
    apiUpdateOrderStatus(orderId, status, trackingNo);
    setOrders(getOrders());
    setNotifications(getNotifications());
  }, []);

  // Custom Requests
  const submitCustomRequest = useCallback((data: Omit<CustomCurtainRequest, 'id' | 'createdAt' | 'status'>) => {
    const created = apiCreateCustomRequest(data);
    setCustomRequests(getCustomRequests());
    const latestNotifs = getNotifications();
    setNotifications(latestNotifs);
    if (latestNotifs.length > 0) {
      setLatestToastNotification(latestNotifs[0]);
    }
    return created;
  }, []);

  const updateCustomRequestStatus = useCallback((id: string, status: CustomCurtainRequest['status'], notes?: string) => {
    apiUpdateCustomRequestStatus(id, status, notes);
    setCustomRequests(getCustomRequests());
  }, []);

  // Products
  const handleSaveProduct = useCallback((product: Product) => {
    const updated = saveProduct(product);
    setProducts(updated);
  }, []);

  const handleDeleteProduct = useCallback((id: string) => {
    const updated = deleteProduct(id);
    setProducts(updated);
  }, []);

  // Settings
  const updateStoreSettings = useCallback((settings: StoreSettings) => {
    const saved = apiSaveStoreSettings(settings);
    setStoreSettings(saved);
  }, []);

  // Notifications
  const dismissToastNotification = useCallback(() => {
    setLatestToastNotification(null);
  }, []);

  const clearAllNotifications = useCallback(() => {
    markNotificationsAsRead();
    setNotifications(getNotifications());
  }, []);

  const unreadNotificationsCount = useMemo(() => {
    return notifications.filter(n => !n.read).length;
  }, [notifications]);

  // Order Tracking modal open with specific ID
  const openTrackingWithId = useCallback((id: string) => {
    setTrackingOrderId(id);
    setIsTrackingOpen(true);
  }, []);

  // Customizer scroll helper
  const openCustomizerStudio = useCallback(() => {
    const el = document.getElementById('customizer-studio');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Smooth scroll
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -80; // header height
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, []);

  return (
    <CurtivoContext.Provider value={{
      products,
      selectedCategory,
      setSelectedCategory,
      activeProductModal,
      setActiveProductModal,
      quickViewProduct,
      setQuickViewProduct,
      handleSaveProduct,
      handleDeleteProduct,
      cart,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      cartCount,
      cartSubtotal,
      isCartOpen,
      setIsCartOpen,
      wishlist,
      toggleWishlist,
      isWishlisted,
      isCheckoutOpen,
      setIsCheckoutOpen,
      confirmedOrder,
      setConfirmedOrder,
      placeOrder,
      isTrackingOpen,
      setIsTrackingOpen,
      trackingOrderId,
      setTrackingOrderId,
      openTrackingWithId,
      orders,
      updateOrderStatus,
      customRequests,
      submitCustomRequest,
      updateCustomRequestStatus,
      notifications,
      latestToastNotification,
      dismissToastNotification,
      unreadNotificationsCount,
      clearAllNotifications,
      isAdminOpen,
      setIsAdminOpen,
      storeSettings,
      updateStoreSettings,
      searchQuery,
      setSearchQuery,
      isSearchOpen,
      setIsSearchOpen,
      scrollToSection,
      openCustomizerStudio,
    }}>
      {children}
    </CurtivoContext.Provider>
  );
};

export const useCurtivo = () => {
  const context = useContext(CurtivoContext);
  if (!context) {
    throw new Error('useCurtivo must be used within a CurtivoProvider');
  }
  return context;
};
