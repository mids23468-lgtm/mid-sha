import React from 'react';
import { Bell, X, ShieldCheck, MessageSquare, ArrowRight, Sparkles } from 'lucide-react';
import { useCurtivo } from '../context/CurtivoContext';

export const OwnerNotificationToast: React.FC = () => {
  const { 
    latestToastNotification, 
    dismissToastNotification, 
    setIsAdminOpen,
    openTrackingWithId 
  } = useCurtivo();

  if (!latestToastNotification) return null;

  const notif = latestToastNotification;

  const handleViewOrder = () => {
    dismissToastNotification();
    setIsAdminOpen(true);
  };

  const whatsappMessage = encodeURIComponent(
    `*NEW CURTIVO ORDER*\n` +
    `Order ID: ${notif.orderId}\n` +
    `Customer: ${notif.customerName}\n` +
    `Phone: ${notif.customerPhone}\n` +
    `Product: ${notif.itemsSummary}\n` +
    `Total: ₹${notif.amount.toLocaleString()}\n` +
    `Status: Received`
  );

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-[#30251D] text-[#F5EFE6] shadow-2xl border-2 border-[#D8C7B2] p-5 animate-in slide-in-from-bottom-5 duration-300">
      
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-[#43352A] pb-3 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#B9A187] text-[#30251D] flex items-center justify-center animate-bounce">
            <Bell className="w-3.5 h-3.5 fill-current" />
          </div>
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#D8C7B2]">
            {notif.title}
          </span>
        </div>

        <button
          onClick={dismissToastNotification}
          className="text-[#D8C7B2] hover:text-white p-1 cursor-pointer"
          aria-label="Dismiss owner alert"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      <div className="space-y-1.5 text-xs font-light">
        <div className="flex justify-between">
          <span className="text-[#92785B]">Order ID:</span>
          <span className="font-mono font-bold text-[#F5EFE6]">{notif.orderId}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#92785B]">Customer:</span>
          <span className="text-white font-medium">{notif.customerName}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#92785B]">Phone:</span>
          <span className="text-[#D8C7B2]">{notif.customerPhone}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#92785B]">Product / Items:</span>
          <span className="text-white truncate max-w-[170px] text-right">{notif.itemsSummary}</span>
        </div>
        {notif.amount > 0 && (
          <div className="flex justify-between pt-1 border-t border-[#43352A]">
            <span className="text-[#92785B]">Total Amount:</span>
            <span className="font-semibold text-white">₹{notif.amount.toLocaleString()}</span>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="mt-4 pt-3 border-t border-[#43352A] flex items-center gap-2">
        <button
          onClick={handleViewOrder}
          className="flex-1 py-2 bg-[#D8C7B2] hover:bg-white text-[#30251D] text-[10px] uppercase tracking-widest font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <span>View Order</span>
          <ArrowRight className="w-3 h-3" />
        </button>

        <a
          href={`https://wa.me/?text=${whatsappMessage}`}
          target="_blank"
          rel="noreferrer"
          className="px-3 py-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-[10px] font-bold rounded-xs flex items-center justify-center transition-colors"
          title="Send to Owner WhatsApp"
        >
          <MessageSquare className="w-3.5 h-3.5 fill-current" />
        </a>
      </div>

    </div>
  );
};
