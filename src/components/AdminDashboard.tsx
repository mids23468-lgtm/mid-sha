import React, { useState } from 'react';
import { 
  X, 
  LayoutDashboard, 
  ShoppingBag, 
  Layers, 
  Users, 
  Scissors, 
  CreditCard, 
  Boxes, 
  Bell, 
  Settings, 
  TrendingUp, 
  DollarSign, 
  Clock, 
  CheckCircle, 
  Truck, 
  AlertCircle,
  Plus,
  Trash2,
  Edit,
  ExternalLink,
  MessageSquare,
  Search,
  Check,
  ChevronDown
} from 'lucide-react';
import { Order, OrderStatus, Product, CustomCurtainRequest, StoreSettings } from '../types';
import { useCurtivo } from '../context/CurtivoContext';
import { formatWhatsAppMessage } from '../services/orderService';

type AdminTab = 
  | 'overview' 
  | 'orders' 
  | 'products' 
  | 'custom_requests' 
  | 'notifications' 
  | 'settings';

export const AdminDashboard: React.FC = () => {
  const { 
    isAdminOpen, 
    setIsAdminOpen, 
    orders, 
    updateOrderStatus, 
    products, 
    handleSaveProduct, 
    handleDeleteProduct,
    customRequests,
    updateCustomRequestStatus,
    notifications,
    storeSettings,
    updateStoreSettings,
    clearAllNotifications 
  } = useCurtivo();

  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('ALL');
  const [orderSearch, setOrderSearch] = useState<string>('');
  const [selectedOrderDetails, setSelectedOrderDetails] = useState<Order | null>(null);

  // New product form state
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [newProductForm, setNewProductForm] = useState<Partial<Product>>({
    name: '',
    tagline: '',
    price: 3499,
    category: 'Living Room Curtains',
    fabric: 'Linen',
    opacity: 'Light Filtering (50-60%)',
    inStock: true,
  });

  // Settings form state
  const [settingsForm, setSettingsForm] = useState<StoreSettings>({ ...storeSettings });
  const [settingsSaved, setSettingsSaved] = useState(false);

  if (!isAdminOpen) return null;

  // Overview metrics
  const totalOrdersCount = orders.length;
  const newOrdersCount = orders.filter(o => o.orderStatus === 'NEW').length;
  const processingOrdersCount = orders.filter(o => o.orderStatus === 'PROCESSING' || o.orderStatus === 'CONFIRMED').length;
  const completedOrdersCount = orders.filter(o => o.orderStatus === 'DELIVERED').length;
  const totalRevenue = orders.reduce((acc, o) => acc + o.total, 0);
  const totalCustomRequests = customRequests.length;

  // Filtered orders
  const filteredOrders = orders.filter(o => {
    const matchesStatus = orderStatusFilter === 'ALL' || o.orderStatus === orderStatusFilter;
    const matchesQuery = !orderSearch || 
      o.orderId.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customerName.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.phone.includes(orderSearch);
    return matchesStatus && matchesQuery;
  });

  const handleUpdateStatus = (orderId: string, newStatus: OrderStatus) => {
    updateOrderStatus(orderId, newStatus);
    if (selectedOrderDetails && selectedOrderDetails.orderId === orderId) {
      setSelectedOrderDetails({ ...selectedOrderDetails, orderStatus: newStatus });
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateStoreSettings(settingsForm);
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 3000);
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProductForm.name) return;

    const created: Product = {
      id: `prod-${Date.now()}`,
      name: newProductForm.name || 'Artisanal Curtain',
      tagline: newProductForm.tagline || 'Custom tailored drapery',
      price: Number(newProductForm.price) || 3499,
      category: (newProductForm.category as Product['category']) || 'Living Room Curtains',
      rating: 5.0,
      reviewCount: 1,
      description: 'Handcrafted master curtain made with luxury natural fibers.',
      longDescription: 'Bespoke interior drape designed for architectural spaces.',
      fabric: (newProductForm.fabric as Product['fabric']) || 'Linen',
      fabricDetails: '100% Belgian linen weave.',
      opacity: (newProductForm.opacity as Product['opacity']) || 'Light Filtering (50-60%)',
      colors: [
        { name: 'Warm Ivory', hex: '#F5EFE6' },
        { name: 'Soft Beige', hex: '#D8C7B2' },
      ],
      sizes: [
        { label: '5 ft × 7 ft (Window)', width: 5, height: 7, priceModifier: 1.0 },
        { label: '6 ft × 9 ft (High Ceiling)', width: 6, height: 9, priceModifier: 1.45 },
      ],
      curtainTypes: ['Wave Fold', 'Pinch Pleat', 'Eyelet'],
      images: [
        'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      ],
      inStock: newProductForm.inStock ?? true,
      careInstructions: ['Dry clean or delicate cold wash'],
    };

    handleSaveProduct(created);
    setIsAddProductOpen(false);
    setNewProductForm({
      name: '',
      tagline: '',
      price: 3499,
      category: 'Living Room Curtains',
      fabric: 'Linen',
      opacity: 'Light Filtering (50-60%)',
      inStock: true,
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-xs flex animate-in fade-in duration-200">
      
      {/* Sidebar Navigation */}
      <div className="w-64 bg-[#30251D] text-[#F5EFE6] h-full flex flex-col justify-between shrink-0 border-r border-[#43352A]">
        <div>
          {/* Logo Header */}
          <div className="p-6 border-b border-[#43352A]">
            <span className="font-heading text-2xl tracking-[0.2em] font-medium block">
              CURTIVO
            </span>
            <span className="text-[9px] uppercase tracking-widest text-[#B9A187] block mt-0.5">
              Owner Management Portal
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5 text-xs">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xs transition-colors cursor-pointer ${
                activeTab === 'overview' ? 'bg-[#43352A] text-white font-medium' : 'text-[#D8C7B2] hover:bg-[#43352A]/50'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-[#B9A187]" />
              <span>Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xs transition-colors cursor-pointer ${
                activeTab === 'orders' ? 'bg-[#43352A] text-white font-medium' : 'text-[#D8C7B2] hover:bg-[#43352A]/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-4 h-4 text-[#B9A187]" />
                <span>Orders</span>
              </div>
              {newOrdersCount > 0 && (
                <span className="bg-[#B9A187] text-[#30251D] font-bold text-[10px] px-1.5 py-0.5 rounded-full">
                  {newOrdersCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('products')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xs transition-colors cursor-pointer ${
                activeTab === 'products' ? 'bg-[#43352A] text-white font-medium' : 'text-[#D8C7B2] hover:bg-[#43352A]/50'
              }`}
            >
              <Layers className="w-4 h-4 text-[#B9A187]" />
              <span>Products & Stock</span>
            </button>

            <button
              onClick={() => setActiveTab('custom_requests')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xs transition-colors cursor-pointer ${
                activeTab === 'custom_requests' ? 'bg-[#43352A] text-white font-medium' : 'text-[#D8C7B2] hover:bg-[#43352A]/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <Scissors className="w-4 h-4 text-[#B9A187]" />
                <span>Custom Requests</span>
              </div>
              {customRequests.filter(r => r.status === 'New').length > 0 && (
                <span className="bg-amber-600 text-white font-bold text-[10px] px-1.5 py-0.5 rounded-full">
                  {customRequests.filter(r => r.status === 'New').length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('notifications')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xs transition-colors cursor-pointer ${
                activeTab === 'notifications' ? 'bg-[#43352A] text-white font-medium' : 'text-[#D8C7B2] hover:bg-[#43352A]/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <Bell className="w-4 h-4 text-[#B9A187]" />
                <span>Notifications Log</span>
              </div>
              {notifications.length > 0 && (
                <span className="text-[10px] text-[#92785B]">{notifications.length}</span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xs transition-colors cursor-pointer ${
                activeTab === 'settings' ? 'bg-[#43352A] text-white font-medium' : 'text-[#D8C7B2] hover:bg-[#43352A]/50'
              }`}
            >
              <Settings className="w-4 h-4 text-[#B9A187]" />
              <span>Website Settings</span>
            </button>
          </nav>
        </div>

        {/* Footer info & close */}
        <div className="p-4 border-t border-[#43352A] text-[11px] text-[#92785B] space-y-3">
          <div>
            <div className="font-semibold text-[#D8C7B2]">Owner Hotline:</div>
            <div>{storeSettings.ownerWhatsApp}</div>
          </div>
          <button
            onClick={() => setIsAdminOpen(false)}
            className="w-full py-2 bg-[#43352A] hover:bg-[#574436] text-white text-xs uppercase tracking-wider rounded-xs transition-colors cursor-pointer text-center"
          >
            Exit to Storefront
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-[#F5EFE6] text-[#30251D] flex flex-col h-full overflow-hidden">
        
        {/* Top Header */}
        <div className="p-6 bg-white border-b border-[#D8C7B2]/60 flex items-center justify-between">
          <div>
            <h1 className="font-heading text-2xl sm:text-3xl text-[#30251D] font-normal capitalize">
              {activeTab === 'overview' && 'Executive Overview'}
              {activeTab === 'orders' && 'Order Management & Fulfillment'}
              {activeTab === 'products' && 'Curtain Catalog & Inventory'}
              {activeTab === 'custom_requests' && 'Bespoke Custom Requests Inbox'}
              {activeTab === 'notifications' && 'Owner Notification Streams'}
              {activeTab === 'settings' && 'Store & Dispatch Configurations'}
            </h1>
            <p className="text-xs text-[#92785B] mt-0.5">
              Live updates active · Real-time customer orders synchronized
            </p>
          </div>

          <button
            onClick={() => setIsAdminOpen(false)}
            className="w-9 h-9 rounded-full bg-[#F5EFE6] hover:bg-[#D8C7B2]/40 flex items-center justify-center text-[#30251D] transition-colors cursor-pointer"
            aria-label="Close admin"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dynamic Body Content */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-8">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              
              {/* Overview Metric Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                
                <div className="bg-white p-5 border border-[#D8C7B2]/60 shadow-2xs">
                  <div className="flex items-center justify-between text-xs text-[#92785B] uppercase tracking-wider mb-2 font-medium">
                    <span>Total Revenue</span>
                    <DollarSign className="w-4 h-4 text-[#30251D]" />
                  </div>
                  <div className="font-heading text-3xl font-medium text-[#30251D]">
                    ₹{totalRevenue.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-emerald-700 mt-1 font-medium">
                    ↑ 18.4% this quarter
                  </div>
                </div>

                <div className="bg-white p-5 border border-[#D8C7B2]/60 shadow-2xs">
                  <div className="flex items-center justify-between text-xs text-[#92785B] uppercase tracking-wider mb-2 font-medium">
                    <span>Total Orders</span>
                    <ShoppingBag className="w-4 h-4 text-[#30251D]" />
                  </div>
                  <div className="font-heading text-3xl font-medium text-[#30251D]">
                    {totalOrdersCount}
                  </div>
                  <div className="text-[11px] text-[#92785B] mt-1 font-light">
                    {newOrdersCount} awaiting review
                  </div>
                </div>

                <div className="bg-white p-5 border border-[#D8C7B2]/60 shadow-2xs">
                  <div className="flex items-center justify-between text-xs text-[#92785B] uppercase tracking-wider mb-2 font-medium">
                    <span>In Tailoring</span>
                    <Clock className="w-4 h-4 text-[#30251D]" />
                  </div>
                  <div className="font-heading text-3xl font-medium text-[#30251D]">
                    {processingOrdersCount}
                  </div>
                  <div className="text-[11px] text-[#92785B] mt-1 font-light">
                    Processing in atelier
                  </div>
                </div>

                <div className="bg-white p-5 border border-[#D8C7B2]/60 shadow-2xs">
                  <div className="flex items-center justify-between text-xs text-[#92785B] uppercase tracking-wider mb-2 font-medium">
                    <span>Custom Inquiries</span>
                    <Scissors className="w-4 h-4 text-[#30251D]" />
                  </div>
                  <div className="font-heading text-3xl font-medium text-[#30251D]">
                    {totalCustomRequests}
                  </div>
                  <div className="text-[11px] text-[#92785B] mt-1 font-light">
                    Bespoke quotes
                  </div>
                </div>

              </div>

              {/* Analytical Charts & Performance */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Visual Order Trend Chart */}
                <div className="lg:col-span-8 bg-white p-6 border border-[#D8C7B2]/60 shadow-2xs">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="font-heading text-xl text-[#30251D] font-normal">
                        Order & Revenue Trajectory
                      </h3>
                      <p className="text-xs text-[#92785B]">Daily volume over the current cycle</p>
                    </div>
                    <span className="text-xs font-semibold text-[#30251D] bg-[#F5EFE6] px-3 py-1">
                      2026 Atelier Performance
                    </span>
                  </div>

                  <div className="h-52 flex items-end gap-3 sm:gap-6 pt-6 border-b border-[#D8C7B2]/50 pb-2">
                    {[
                      { day: 'Mon', count: 4, height: '40%' },
                      { day: 'Tue', count: 6, height: '60%' },
                      { day: 'Wed', count: 5, height: '52%' },
                      { day: 'Thu', count: 9, height: '85%' },
                      { day: 'Fri', count: 7, height: '70%' },
                      { day: 'Sat', count: 11, height: '95%' },
                      { day: 'Sun', count: 8, height: '78%' },
                    ].map((bar) => (
                      <div key={bar.day} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                        <span className="text-[10px] font-semibold text-[#30251D]">{bar.count}</span>
                        <div 
                          className="w-full bg-[#30251D] hover:bg-[#92785B] transition-all rounded-xs"
                          style={{ height: bar.height }}
                        />
                        <span className="text-[10px] text-[#92785B]">{bar.day}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 text-xs text-[#92785B]">
                    <span>Average Order Value: <strong className="text-[#30251D]">₹11,480</strong></span>
                    <span>Conversion Rate: <strong className="text-[#30251D]">4.2%</strong></span>
                  </div>
                </div>

                {/* Best Selling Fabrics & Categories */}
                <div className="lg:col-span-4 bg-white p-6 border border-[#D8C7B2]/60 shadow-2xs space-y-4">
                  <h3 className="font-heading text-xl text-[#30251D] font-normal">
                    Best-Selling Collections
                  </h3>

                  <div className="space-y-3 text-xs">
                    <div>
                      <div className="flex justify-between font-medium mb-1">
                        <span>Sheer & Voile Curtains</span>
                        <span>38%</span>
                      </div>
                      <div className="w-full h-2 bg-[#F5EFE6] rounded-full overflow-hidden">
                        <div className="w-[38%] h-full bg-[#30251D]" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between font-medium mb-1">
                        <span>Blackout Triple-Weave</span>
                        <span>32%</span>
                      </div>
                      <div className="w-full h-2 bg-[#F5EFE6] rounded-full overflow-hidden">
                        <div className="w-[32%] h-full bg-[#92785B]" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between font-medium mb-1">
                        <span>Belgian Linen Drapery</span>
                        <span>22%</span>
                      </div>
                      <div className="w-full h-2 bg-[#F5EFE6] rounded-full overflow-hidden">
                        <div className="w-[22%] h-full bg-[#B9A187]" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between font-medium mb-1">
                        <span>Matte Velvet & Acoustic</span>
                        <span>8%</span>
                      </div>
                      <div className="w-full h-2 bg-[#F5EFE6] rounded-full overflow-hidden">
                        <div className="w-[8%] h-full bg-[#D8C7B2]" />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#D8C7B2]/40">
                    <button
                      onClick={() => setActiveTab('orders')}
                      className="w-full py-2 bg-[#F5EFE6] hover:bg-[#D8C7B2] text-[#30251D] text-xs uppercase tracking-wider font-semibold transition-colors text-center cursor-pointer"
                    >
                      View All Customer Orders
                    </button>
                  </div>
                </div>

              </div>

              {/* Recent Orders Quick Preview */}
              <div className="bg-white p-6 border border-[#D8C7B2]/60 shadow-2xs">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-heading text-xl text-[#30251D] font-normal">
                    Latest Commissioned Orders
                  </h3>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-xs uppercase tracking-wider text-[#92785B] hover:text-[#30251D] font-semibold"
                  >
                    View All →
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-[#D8C7B2]/50 text-[#92785B] uppercase text-[10px] tracking-wider">
                        <th className="py-2.5">Order ID</th>
                        <th className="py-2.5">Customer</th>
                        <th className="py-2.5">Items</th>
                        <th className="py-2.5">Total</th>
                        <th className="py-2.5">Payment</th>
                        <th className="py-2.5">Status</th>
                        <th className="py-2.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#D8C7B2]/30">
                      {orders.slice(0, 5).map((ord) => (
                        <tr key={ord.orderId} className="hover:bg-[#F5EFE6]/50">
                          <td className="py-3 font-mono font-semibold text-[#30251D]">{ord.orderId}</td>
                          <td className="py-3 font-medium text-[#30251D]">{ord.customerName}</td>
                          <td className="py-3 text-[#92785B]">{ord.items.length} panels</td>
                          <td className="py-3 font-semibold text-[#30251D]">₹{ord.total.toLocaleString()}</td>
                          <td className="py-3 text-[#92785B]">{ord.paymentMethod}</td>
                          <td className="py-3">
                            <span className={`inline-block px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                              ord.orderStatus === 'NEW' ? 'bg-amber-100 text-amber-900 border border-amber-300' :
                              ord.orderStatus === 'PROCESSING' ? 'bg-blue-100 text-blue-900 border border-blue-300' :
                              ord.orderStatus === 'SHIPPED' ? 'bg-purple-100 text-purple-900 border border-purple-300' :
                              ord.orderStatus === 'DELIVERED' ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' :
                              'bg-stone-100 text-stone-800'
                            }`}>
                              {ord.orderStatus}
                            </span>
                          </td>
                          <td className="py-3 text-right">
                            <button
                              onClick={() => {
                                setSelectedOrderDetails(ord);
                                setActiveTab('orders');
                              }}
                              className="text-[11px] font-semibold text-[#30251D] hover:underline"
                            >
                              Manage
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: ORDERS MANAGEMENT */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              
              {/* Filter Tabs & Search Bar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 border border-[#D8C7B2]/60">
                
                {/* Status Segmented Tabs */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none text-xs">
                  {(['ALL', 'NEW', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => setOrderStatusFilter(st)}
                      className={`px-3 py-1.5 font-medium rounded-xs transition-colors shrink-0 cursor-pointer ${
                        orderStatusFilter === st 
                          ? 'bg-[#30251D] text-[#F5EFE6]' 
                          : 'text-[#30251D]/70 hover:bg-[#F5EFE6]'
                      }`}
                    >
                      {st} {st !== 'ALL' && `(${orders.filter(o => o.orderStatus === st).length})`}
                    </button>
                  ))}
                </div>

                {/* Search */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by ID, name, phone..."
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                    className="p-2 pl-8 border border-[#D8C7B2] text-xs w-full sm:w-64 focus:outline-none focus:border-[#30251D]"
                  />
                  <Search className="w-3.5 h-3.5 text-[#92785B] absolute left-2.5 top-2.5" />
                </div>
              </div>

              {/* Order Cards List */}
              <div className="space-y-4">
                {filteredOrders.length === 0 ? (
                  <div className="bg-white p-12 text-center border border-[#D8C7B2]/50">
                    <p className="text-sm text-[#92785B]">No orders found for the selected status.</p>
                  </div>
                ) : (
                  filteredOrders.map((ord) => (
                    <div 
                      key={ord.orderId}
                      className="bg-white border border-[#D8C7B2]/60 p-6 shadow-2xs hover:border-[#92785B] transition-all space-y-4"
                    >
                      {/* Top Row: ID, Date, Status */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D8C7B2]/40 pb-3">
                        <div className="flex items-center gap-3">
                          <span className="font-mono font-bold text-sm text-[#30251D] bg-[#F5EFE6] px-2.5 py-1 border border-[#D8C7B2]">
                            {ord.orderId}
                          </span>
                          <span className="text-xs text-[#92785B]">
                            {new Date(ord.createdAt).toLocaleString()}
                          </span>
                        </div>

                        {/* Status Switcher Dropdown */}
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] uppercase tracking-wider text-[#92785B] font-medium">Status:</span>
                          <select
                            value={ord.orderStatus}
                            onChange={(e) => handleUpdateStatus(ord.orderId, e.target.value as OrderStatus)}
                            className="bg-[#F5EFE6] border border-[#D8C7B2] text-xs font-semibold px-2 py-1 focus:ring-0 cursor-pointer"
                          >
                            <option value="NEW">NEW</option>
                            <option value="CONFIRMED">CONFIRMED</option>
                            <option value="PROCESSING">PROCESSING</option>
                            <option value="SHIPPED">SHIPPED</option>
                            <option value="DELIVERED">DELIVERED</option>
                            <option value="CANCELLED">CANCELLED</option>
                          </select>
                        </div>
                      </div>

                      {/* Middle Grid: Customer, Delivery, Products */}
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 text-xs">
                        
                        {/* Customer Info (4 cols) */}
                        <div className="md:col-span-4 space-y-1">
                          <span className="text-[10px] uppercase tracking-wider text-[#92785B] font-semibold block mb-1">
                            Customer & Delivery:
                          </span>
                          <div className="font-semibold text-sm text-[#30251D]">{ord.customerName}</div>
                          <div className="text-[#30251D]/80">Phone: {ord.phone}</div>
                          <div className="text-[#30251D]/80">Email: {ord.email}</div>
                          <div className="text-[#30251D]/70 pt-1">
                            {ord.address.address}, {ord.address.city}, {ord.address.state} - {ord.address.pinCode}
                          </div>
                          {ord.customizationNotes && (
                            <div className="p-2 bg-[#F5EFE6] text-[11px] text-[#92785B] mt-2 border border-[#D8C7B2]/40">
                              <strong>Notes:</strong> {ord.customizationNotes}
                            </div>
                          )}
                        </div>

                        {/* Product Items (5 cols) */}
                        <div className="md:col-span-5 space-y-2">
                          <span className="text-[10px] uppercase tracking-wider text-[#92785B] font-semibold block mb-1">
                            Curtains Ordered:
                          </span>
                          <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                            {ord.items.map((item, idx) => (
                              <div key={idx} className="flex gap-3 items-center bg-[#F5EFE6]/40 p-2 border border-[#D8C7B2]/30">
                                <img src={item.image} alt={item.productName} className="w-10 h-12 object-cover border border-[#D8C7B2]" />
                                <div className="flex-1">
                                  <div className="font-medium text-[#30251D]">{item.productName}</div>
                                  <div className="text-[10px] text-[#92785B]">
                                    {item.color} · {item.curtainType} · Qty: {item.quantity}
                                  </div>
                                  <div className="text-[10px] text-[#92785B]">{item.size}</div>
                                </div>
                                <div className="font-semibold text-[#30251D]">
                                  ₹{(item.price * item.quantity).toLocaleString()}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Payment & Actions (3 cols) */}
                        <div className="md:col-span-3 space-y-2 flex flex-col justify-between">
                          <div>
                            <span className="text-[10px] uppercase tracking-wider text-[#92785B] font-semibold block mb-1">
                              Payment Summary:
                            </span>
                            <div className="text-base font-bold text-[#30251D]">
                              ₹{ord.total.toLocaleString()}
                            </div>
                            <div className="text-[11px] text-[#92785B] mt-0.5">
                              {ord.paymentMethod} ({ord.paymentStatus})
                            </div>
                          </div>

                          <div className="space-y-2 pt-2">
                            {/* WhatsApp Direct message to customer or owner */}
                            <a
                              href={`https://wa.me/?text=${formatWhatsAppMessage(ord)}`}
                              target="_blank"
                              rel="noreferrer"
                              className="w-full py-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-[11px] font-semibold rounded-xs flex items-center justify-center gap-1.5 transition-colors"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                              <span>Copy WhatsApp Alert</span>
                            </a>
                          </div>
                        </div>

                      </div>

                    </div>
                  ))
                )}
              </div>

            </div>
          )}

          {/* TAB 3: PRODUCTS & STOCK */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              
              <div className="flex items-center justify-between bg-white p-4 border border-[#D8C7B2]/60">
                <div>
                  <h3 className="font-heading text-xl text-[#30251D]">Product Catalog ({products.length})</h3>
                  <p className="text-xs text-[#92785B]">Manage master drapery pricing, stock availability and details</p>
                </div>

                <button
                  onClick={() => setIsAddProductOpen(!isAddProductOpen)}
                  className="px-4 py-2 bg-[#30251D] text-[#F5EFE6] text-xs uppercase tracking-wider font-semibold flex items-center gap-1.5 hover:bg-[#201812] cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add New Product</span>
                </button>
              </div>

              {/* Add Product Collapsible Form */}
              {isAddProductOpen && (
                <form onSubmit={handleCreateProduct} className="bg-white p-6 border border-[#30251D] space-y-4">
                  <h4 className="font-heading text-lg text-[#30251D] border-b border-[#D8C7B2]/40 pb-2">
                    Create New Curtain Collection Entry
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-[#92785B] mb-1 font-medium">Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Saffron Linen Drapery"
                        value={newProductForm.name}
                        onChange={(e) => setNewProductForm({ ...newProductForm, name: e.target.value })}
                        className="w-full p-2 border border-[#D8C7B2]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-[#92785B] mb-1 font-medium">Tagline</label>
                      <input
                        type="text"
                        placeholder="e.g. Pure French flax with graceful drape"
                        value={newProductForm.tagline}
                        onChange={(e) => setNewProductForm({ ...newProductForm, tagline: e.target.value })}
                        className="w-full p-2 border border-[#D8C7B2]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-[#92785B] mb-1 font-medium">Base Price (₹)</label>
                      <input
                        type="number"
                        required
                        value={newProductForm.price}
                        onChange={(e) => setNewProductForm({ ...newProductForm, price: Number(e.target.value) })}
                        className="w-full p-2 border border-[#D8C7B2]"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 justify-end pt-2">
                    <button
                      type="button"
                      onClick={() => setIsAddProductOpen(false)}
                      className="px-4 py-2 border border-[#D8C7B2] text-xs font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-[#30251D] text-[#F5EFE6] text-xs uppercase tracking-wider font-semibold"
                    >
                      Save Product
                    </button>
                  </div>
                </form>
              )}

              {/* Products Table */}
              <div className="bg-white border border-[#D8C7B2]/60 overflow-x-auto shadow-2xs">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#D8C7B2]/50 text-[#92785B] uppercase text-[10px] tracking-wider bg-[#F5EFE6]/50">
                      <th className="p-3">Product</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Fabric</th>
                      <th className="p-3">Price</th>
                      <th className="p-3">Stock Status</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#D8C7B2]/30">
                    {products.map((prod) => (
                      <tr key={prod.id} className="hover:bg-[#F5EFE6]/40">
                        <td className="p-3 flex items-center gap-3">
                          <img src={prod.images[0]} alt={prod.name} className="w-10 h-12 object-cover border border-[#D8C7B2]" />
                          <div>
                            <div className="font-semibold text-[#30251D]">{prod.name}</div>
                            <div className="text-[10px] text-[#92785B]">{prod.colors.length} colorways</div>
                          </div>
                        </td>
                        <td className="p-3 text-[#30251D]">{prod.category}</td>
                        <td className="p-3 text-[#92785B]">{prod.fabric}</td>
                        <td className="p-3 font-semibold text-[#30251D]">₹{prod.price.toLocaleString()}</td>
                        <td className="p-3">
                          <button
                            onClick={() => handleSaveProduct({ ...prod, inStock: !prod.inStock })}
                            className={`px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-xs cursor-pointer ${
                              prod.inStock ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {prod.inStock ? 'In Stock' : 'Out of Stock'}
                          </button>
                        </td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => handleDeleteProduct(prod.id)}
                            className="text-rose-700 hover:text-rose-900 p-1 cursor-pointer"
                            title="Delete product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* TAB 4: CUSTOM REQUESTS */}
          {activeTab === 'custom_requests' && (
            <div className="space-y-6">
              
              <div className="bg-white p-4 border border-[#D8C7B2]/60">
                <h3 className="font-heading text-xl text-[#30251D]">
                  Bespoke Sizing & Consultation Inquiries ({customRequests.length})
                </h3>
                <p className="text-xs text-[#92785B]">
                  Direct client inquiries submitted through the custom curtain form.
                </p>
              </div>

              <div className="space-y-4">
                {customRequests.map((req) => (
                  <div key={req.id} className="bg-white border border-[#D8C7B2]/60 p-6 space-y-4 shadow-2xs">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#D8C7B2]/40 pb-3 gap-2">
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-xs bg-[#F5EFE6] px-2 py-1 border border-[#D8C7B2]">
                          {req.id}
                        </span>
                        <span className="font-semibold text-sm text-[#30251D]">{req.name}</span>
                        <span className="text-xs text-[#92785B]">{req.roomType}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs text-[#92785B]">Status:</span>
                        <select
                          value={req.status}
                          onChange={(e) => updateCustomRequestStatus(req.id, e.target.value as CustomCurtainRequest['status'])}
                          className="bg-[#F5EFE6] border border-[#D8C7B2] text-xs font-semibold px-2 py-1"
                        >
                          <option value="New">New</option>
                          <option value="Under Review">Under Review</option>
                          <option value="Quoted">Quoted</option>
                          <option value="In Production">In Production</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                      <div>
                        <span className="text-[10px] uppercase text-[#92785B] block font-semibold">Dimensions:</span>
                        <div className="text-sm font-semibold text-[#30251D]">{req.windowWidth} × {req.windowHeight}</div>
                        <div className="text-[#92785B]">Quantity: {req.quantity} panels</div>
                      </div>

                      <div>
                        <span className="text-[10px] uppercase text-[#92785B] block font-semibold">Fabric & Hue:</span>
                        <div className="font-medium text-[#30251D]">{req.preferredFabric}</div>
                        <div className="text-[#92785B]">{req.preferredColor}</div>
                      </div>

                      <div>
                        <span className="text-[10px] uppercase text-[#92785B] block font-semibold">Client Contact:</span>
                        <div className="font-medium text-[#30251D]">{req.phone}</div>
                        <div className="text-[#92785B]">{req.email}</div>
                      </div>
                    </div>

                    {req.additionalRequirements && (
                      <div className="p-3 bg-[#F5EFE6]/60 border border-[#D8C7B2]/40 text-xs text-[#30251D]">
                        <strong>Requirements:</strong> {req.additionalRequirements}
                      </div>
                    )}
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* TAB 5: NOTIFICATIONS LOG */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              
              <div className="bg-white p-4 border border-[#D8C7B2]/60 flex items-center justify-between">
                <div>
                  <h3 className="font-heading text-xl text-[#30251D]">Owner Notification Stream</h3>
                  <p className="text-xs text-[#92785B]">
                    Real-time log of order alarms, SMS/WhatsApp triggers, and status updates.
                  </p>
                </div>

                <button
                  onClick={clearAllNotifications}
                  className="px-3 py-1.5 text-xs text-[#92785B] hover:text-[#30251D] border border-[#D8C7B2] cursor-pointer"
                >
                  Mark All as Read
                </button>
              </div>

              <div className="space-y-3">
                {notifications.length === 0 ? (
                  <div className="bg-white p-8 text-center text-xs text-[#92785B] border border-[#D8C7B2]/50">
                    No notifications logged yet. Place an order to see live triggers.
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <div key={notif.id} className="bg-white p-4 border border-[#D8C7B2]/60 flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-[#30251D] text-[#F5EFE6] flex items-center justify-center shrink-0">
                        <Bell className="w-4 h-4" />
                      </div>
                      <div className="flex-1 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-sm text-[#30251D]">{notif.title}</span>
                          <span className="text-[10px] text-[#92785B]">
                            {new Date(notif.createdAt).toLocaleTimeString()}
                          </span>
                        </div>
                        <p className="text-[#30251D]/80 mt-1">{notif.message}</p>
                        <div className="text-[10px] text-[#92785B] mt-1 font-mono">
                          Customer: {notif.customerName} ({notif.customerPhone}) · {notif.itemsSummary}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

            </div>
          )}

          {/* TAB 6: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="max-w-2xl bg-white p-6 sm:p-8 border border-[#D8C7B2]/60 shadow-2xs space-y-6">
              <div>
                <h3 className="font-heading text-2xl text-[#30251D]">Store & Notification Settings</h3>
                <p className="text-xs text-[#92785B]">
                  Configure recipient WhatsApp phone numbers, emails, and shipping thresholds.
                </p>
              </div>

              <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
                
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#92785B] mb-1 font-medium">
                    Store / Brand Name
                  </label>
                  <input
                    type="text"
                    value={settingsForm.storeName}
                    onChange={(e) => setSettingsForm({ ...settingsForm, storeName: e.target.value })}
                    className="w-full p-2.5 border border-[#D8C7B2]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#92785B] mb-1 font-medium">
                    Owner WhatsApp Notification Number
                  </label>
                  <input
                    type="text"
                    value={settingsForm.ownerWhatsApp}
                    onChange={(e) => setSettingsForm({ ...settingsForm, ownerWhatsApp: e.target.value })}
                    className="w-full p-2.5 border border-[#D8C7B2]"
                  />
                  <p className="text-[10px] text-[#92785B] mt-1">All new orders are formatted for this WhatsApp endpoint.</p>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#92785B] mb-1 font-medium">
                    Owner Email Notification Address
                  </label>
                  <input
                    type="email"
                    value={settingsForm.ownerEmail}
                    onChange={(e) => setSettingsForm({ ...settingsForm, ownerEmail: e.target.value })}
                    className="w-full p-2.5 border border-[#D8C7B2]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#92785B] mb-1 font-medium">
                      Free Shipping Threshold (₹)
                    </label>
                    <input
                      type="number"
                      value={settingsForm.freeShippingThreshold}
                      onChange={(e) => setSettingsForm({ ...settingsForm, freeShippingThreshold: Number(e.target.value) })}
                      className="w-full p-2.5 border border-[#D8C7B2]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#92785B] mb-1 font-medium">
                      Standard Shipping Fee (₹)
                    </label>
                    <input
                      type="number"
                      value={settingsForm.standardShippingFee}
                      onChange={(e) => setSettingsForm({ ...settingsForm, standardShippingFee: Number(e.target.value) })}
                      className="w-full p-2.5 border border-[#D8C7B2]"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-[#D8C7B2]/40">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#30251D] text-[#F5EFE6] text-xs uppercase tracking-widest font-semibold hover:bg-[#201812] transition-colors cursor-pointer"
                  >
                    Save Store Settings
                  </button>
                  {settingsSaved && (
                    <span className="text-emerald-700 ml-3 font-medium">✓ Configurations saved!</span>
                  )}
                </div>

              </form>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
