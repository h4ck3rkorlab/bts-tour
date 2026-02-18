import { useState } from "react";
import { type Show } from "../data/tourData";
import { PaymentPage } from "./PaymentPage";

function formatPrice(price: number) {
  return `$${price.toLocaleString()}`;
}

interface CheckoutModalProps {
  show: Show;
  onClose: () => void;
  hapticNotification?: (type?: 'success' | 'error' | 'warning') => void;
}

type TicketType = "standard" | "vip";

export interface OrderInfo {
  show: Show;
  ticketType: TicketType;
  quantity: number;
  totalPrice: number;
  email: string;
  name: string;
}

export function CheckoutModal({ show, onClose, hapticNotification }: CheckoutModalProps) {
  const [step, setStep] = useState<"select" | "info" | "payment" | "confirmed">("select");
  const [ticketType, setTicketType] = useState<TicketType>("vip");
  const [quantity, setQuantity] = useState(1);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [orderInfo, setOrderInfo] = useState<OrderInfo | null>(null);

  const standardAvailable = show.standardSeats > 0;
  const vipAvailable = show.vipSeats > 0;
  const maxQuantity = ticketType === "vip" ? Math.min(show.vipSeats, 10) : Math.min(show.standardSeats, 10);

  const price = ticketType === "standard" ? show.standard : show.vip;
  const totalPrice = price * quantity;

  const handleProceedToInfo = () => {
    setStep("info");
  };

  const handleProceedToPayment = () => {
    if (!email.trim() || !name.trim()) return;
    const order: OrderInfo = {
      show,
      ticketType,
      quantity,
      totalPrice,
      email: email.trim(),
      name: name.trim(),
    };
    setOrderInfo(order);
    setStep("payment");
  };

  const handleConfirmed = () => {
    hapticNotification?.('success');
    setStep("confirmed");
  };

  // Adjust quantity if it exceeds max when switching types
  const handleTypeChange = (type: TicketType) => {
    setTicketType(type);
    const newMax = type === "vip" ? Math.min(show.vipSeats, 10) : Math.min(show.standardSeats, 10);
    if (quantity > newMax) {
      setQuantity(Math.max(1, newMax));
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-[#0d0d0d] border border-white/10 rounded-2xl shadow-2xl shadow-purple-900/30"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white/60 hover:text-white transition-all"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Step: Select Ticket */}
        {step === "select" && (
          <div className="p-6 md:p-8">
            <div className="mb-6">
              <div className="text-xs text-purple-400 font-semibold tracking-widest uppercase mb-1">Select Tickets</div>
              <h2 className="text-2xl font-bold text-white mb-1">{show.venue}</h2>
              <p className="text-white/50 text-sm">{show.city} · {show.date} · {show.day}</p>
              <p className="text-white/30 text-xs mt-1">{show.address}</p>
            </div>

            <div className="space-y-3 mb-6">
              {/* Standard Option - Sold Out */}
              <div
                className={`w-full p-4 rounded-xl border transition-all duration-200 text-left ${
                  standardAvailable
                    ? ticketType === "standard"
                      ? "border-purple-500 bg-purple-500/10 shadow-lg shadow-purple-900/20 cursor-pointer"
                      : "border-white/10 bg-white/[0.02] hover:border-white/20 cursor-pointer"
                    : "border-white/5 bg-white/[0.01] opacity-50 cursor-not-allowed"
                }`}
                onClick={() => {
                  if (standardAvailable) handleTypeChange("standard");
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-semibold text-base">Standard</span>
                      {!standardAvailable && (
                        <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 text-[10px] font-bold tracking-wider uppercase">
                          Sold Out
                        </span>
                      )}
                    </div>
                    <div className="text-white/40 text-xs mt-0.5">General admission seating</div>
                  </div>
                  <div className="text-right">
                    <div className={`font-bold text-lg ${standardAvailable ? "text-white" : "text-white/30 line-through"}`}>
                      {formatPrice(show.standard)}
                    </div>
                    <div className="text-white/30 text-xs">per ticket</div>
                  </div>
                </div>
              </div>

              {/* VIP Option */}
              <div
                className={`w-full p-4 rounded-xl border transition-all duration-200 text-left ${
                  vipAvailable
                    ? ticketType === "vip"
                      ? "border-amber-500 bg-amber-500/10 shadow-lg shadow-amber-900/20 cursor-pointer"
                      : "border-white/10 bg-white/[0.02] hover:border-white/20 cursor-pointer"
                    : "border-white/5 bg-white/[0.01] opacity-50 cursor-not-allowed"
                }`}
                onClick={() => {
                  if (vipAvailable) handleTypeChange("vip");
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-semibold text-base">VIP</span>
                      <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-bold tracking-wider uppercase">Premium</span>
                      {vipAvailable && (
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          show.vipSeats <= 15 ? "bg-red-500/15 text-red-400 animate-pulse" : "bg-amber-500/15 text-amber-400"
                        }`}>
                          {show.vipSeats} left
                        </span>
                      )}
                    </div>
                    <div className="text-white/40 text-xs mt-0.5">Front section + VIP lounge access + merch pack</div>
                  </div>
                  <div className="text-right">
                    <div className="text-amber-400 font-bold text-lg">{formatPrice(show.vip)}</div>
                    <div className="text-white/30 text-xs">per ticket</div>
                  </div>
                </div>
                {ticketType === "vip" && vipAvailable && (
                  <div className="mt-2 flex items-center gap-1.5">
                    <div className="w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center">
                      <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-amber-400 text-xs font-medium">Selected</span>
                  </div>
                )}
              </div>
            </div>

            <div className="mb-6">
              <label className="text-white/50 text-xs font-semibold tracking-wider uppercase mb-2 block">
                Quantity {maxQuantity > 0 && <span className="text-white/30">(max {maxQuantity})</span>}
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold flex items-center justify-center transition-all active:scale-90"
                >
                  −
                </button>
                <span className="text-white font-bold text-xl w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(maxQuantity, quantity + 1))}
                  className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold flex items-center justify-center transition-all active:scale-90"
                >
                  +
                </button>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/50 text-sm">
                  {ticketType === "vip" ? "VIP" : "Standard"} × {quantity}
                </span>
                <span className="text-white/50 text-sm">{formatPrice(totalPrice)}</span>
              </div>
              <div className="border-t border-white/10 pt-2 flex items-center justify-between">
                <span className="text-white font-semibold">Total (USDT)</span>
                <span className="text-white font-bold text-xl">{formatPrice(totalPrice)}</span>
              </div>
            </div>

            <button
              onClick={handleProceedToInfo}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-base hover:from-purple-500 hover:to-pink-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-600/30 active:scale-[0.98]"
            >
              Continue — {formatPrice(totalPrice)} USDT
            </button>

            <p className="text-center text-white/20 text-xs mt-3">
              Payment via USDT (TRC-20) only
            </p>
          </div>
        )}

        {/* Step: Contact Info */}
        {step === "info" && (
          <div className="p-6 md:p-8">
            <button
              onClick={() => setStep("select")}
              className="flex items-center gap-1 text-white/40 hover:text-white/70 text-sm mb-4 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>

            <div className="mb-6">
              <div className="text-xs text-purple-400 font-semibold tracking-widest uppercase mb-1">Step 2</div>
              <h2 className="text-2xl font-bold text-white">Your Information</h2>
              <p className="text-white/40 text-sm mt-1">We'll send your ticket confirmation to this email</p>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="text-white/50 text-xs font-semibold tracking-wider uppercase mb-2 block">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500/50 transition-all"
                />
              </div>
              <div>
                <label className="text-white/50 text-xs font-semibold tracking-wider uppercase mb-2 block">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500/50 transition-all"
                />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 mb-6">
              <div className="text-white/50 text-xs mb-2">{show.venue} · {show.date} · {show.day}</div>
              <div className="flex items-center justify-between">
                <span className="text-white/70 text-sm">{ticketType === "vip" ? "VIP" : "Standard"} × {quantity}</span>
                <span className="text-white font-bold text-lg">{formatPrice(totalPrice)} USDT</span>
              </div>
            </div>

            <button
              onClick={handleProceedToPayment}
              disabled={!email.trim() || !name.trim()}
              className={`w-full py-4 rounded-xl font-bold text-base transition-all duration-300 active:scale-[0.98] ${
                email.trim() && name.trim()
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-500 hover:to-pink-500 hover:shadow-lg hover:shadow-purple-600/30"
                  : "bg-white/10 text-white/30 cursor-not-allowed"
              }`}
            >
              Proceed to Payment
            </button>
          </div>
        )}

        {/* Step: Payment */}
        {step === "payment" && orderInfo && (
          <PaymentPage orderInfo={orderInfo} onBack={() => setStep("info")} onConfirmed={handleConfirmed} />
        )}

        {/* Step: Confirmed */}
        {step === "confirmed" && orderInfo && (
          <div className="p-6 md:p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Payment Submitted!</h2>
            <p className="text-white/50 text-sm mb-6 max-w-sm mx-auto">
              Your order has been received. We will verify your transaction and send a confirmation to <span className="text-purple-400">{orderInfo.email}</span> within 30 minutes.
            </p>

            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 mb-6 text-left">
              <div className="text-white/30 text-xs font-semibold tracking-wider uppercase mb-3">Order Summary</div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/50">Event</span>
                  <span className="text-white">{orderInfo.show.venue}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">Date</span>
                  <span className="text-white">{orderInfo.show.date} ({orderInfo.show.day})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">Ticket</span>
                  <span className="text-white">{orderInfo.ticketType === "vip" ? "VIP" : "Standard"} × {orderInfo.quantity}</span>
                </div>
                <div className="flex justify-between border-t border-white/10 pt-2">
                  <span className="text-white font-semibold">Total Paid</span>
                  <span className="text-green-400 font-bold">{formatPrice(orderInfo.totalPrice)} USDT</span>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 mb-6">
              <p className="text-amber-400 text-xs">
                ⚠️ If payment is not confirmed within 2 hours, please contact support with your transaction hash.
              </p>
            </div>

            <button
              onClick={onClose}
              className="w-full py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-all active:scale-[0.98]"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
