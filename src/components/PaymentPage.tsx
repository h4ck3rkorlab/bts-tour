import { useState, useEffect, useCallback } from "react";
import { QRCodeSVG } from "qrcode.react";
import { type Show } from "../data/tourData";

const USDT_ADDRESS = "TAeD9UfPwHjpaR7pSMv4LtJRWsdx8iy5Fx";

interface OrderInfo {
  show: Show;
  ticketType: "standard" | "vip";
  quantity: number;
  totalPrice: number;
  email: string;
  name: string;
}

function formatPrice(price: number) {
  return `$${price.toLocaleString()}`;
}

interface PaymentPageProps {
  orderInfo: OrderInfo;
  onBack: () => void;
  onConfirmed: () => void;
}

export function PaymentPage({ orderInfo, onBack, onConfirmed }: PaymentPageProps) {
  const [copied, setCopied] = useState(false);
  const [copiedAmount, setCopiedAmount] = useState(false);
  const [txHash, setTxHash] = useState("");
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes
  const [submitted, setSubmitted] = useState(false);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const copyAddress = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(USDT_ADDRESS);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for non-secure contexts
      const textArea = document.createElement("textarea");
      textArea.value = USDT_ADDRESS;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, []);

  const copyAmount = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(orderInfo.totalPrice.toString());
      setCopiedAmount(true);
      setTimeout(() => setCopiedAmount(false), 2000);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = orderInfo.totalPrice.toString();
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopiedAmount(true);
      setTimeout(() => setCopiedAmount(false), 2000);
    }
  }, [orderInfo.totalPrice]);

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      onConfirmed();
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="p-6 md:p-8 text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center animate-pulse">
            <svg className="w-8 h-8 text-purple-400 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          </div>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Verifying Payment...</h3>
        <p className="text-white/40 text-sm">Please wait while we process your order</p>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8">
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-white/40 hover:text-white/70 text-sm mb-4 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>

      {/* Header */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-1">
          <div className="text-xs text-purple-400 font-semibold tracking-widest uppercase">Payment</div>
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-bold ${
            timeLeft > 300 ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400 animate-pulse"
          }`}>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}
          </div>
        </div>
        <h2 className="text-2xl font-bold text-white">Send USDT (TRC-20)</h2>
        <p className="text-white/40 text-sm mt-1">Send the exact amount to the address below</p>
      </div>

      {/* Order summary mini */}
      <div className="p-3 rounded-lg bg-white/[0.03] border border-white/10 mb-5 flex items-center justify-between">
        <div>
          <div className="text-white text-sm font-medium">{orderInfo.show.venue}</div>
          <div className="text-white/40 text-xs">{orderInfo.show.date} · {orderInfo.ticketType === "vip" ? "VIP" : "Standard"} × {orderInfo.quantity}</div>
        </div>
        <div className="text-right">
          <div className="text-white font-bold">{formatPrice(orderInfo.totalPrice)}</div>
          <div className="text-white/30 text-xs">USDT</div>
        </div>
      </div>

      {/* Amount to send */}
      <div className="mb-5">
        <label className="text-white/40 text-xs font-semibold tracking-wider uppercase mb-2 block">Amount to Send</label>
        <div
          className="flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/10 cursor-pointer hover:border-purple-500/50 transition-all group"
          onClick={copyAmount}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
              <span className="text-green-400 font-bold text-sm">₮</span>
            </div>
            <div>
              <span className="text-white font-bold text-2xl">{orderInfo.totalPrice.toLocaleString()}</span>
              <span className="text-white/50 text-sm ml-2">USDT</span>
            </div>
          </div>
          <button className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white/60 hover:text-white text-xs font-medium transition-all flex items-center gap-1">
            {copiedAmount ? (
              <>
                <svg className="w-3 h-3 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-green-400">Copied!</span>
              </>
            ) : (
              <>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
                Copy
              </>
            )}
          </button>
        </div>
      </div>

      {/* QR Code */}
      <div className="flex justify-center mb-5">
        <div className="p-4 rounded-2xl bg-white">
          <QRCodeSVG
            value={USDT_ADDRESS}
            size={180}
            level="H"
            includeMargin={false}
          />
        </div>
      </div>

      {/* Wallet Address */}
      <div className="mb-5">
        <label className="text-white/40 text-xs font-semibold tracking-wider uppercase mb-2 block">
          USDT Wallet Address (TRC-20)
        </label>
        <div
          className="flex items-center gap-2 p-3 rounded-xl bg-white/[0.03] border border-white/10 cursor-pointer hover:border-purple-500/50 transition-all group"
          onClick={copyAddress}
        >
          <span className="text-white/80 font-mono text-xs md:text-sm flex-1 break-all select-all">
            {USDT_ADDRESS}
          </span>
          <button className="shrink-0 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white/60 hover:text-white text-xs font-medium transition-all flex items-center gap-1">
            {copied ? (
              <>
                <svg className="w-3 h-3 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-green-400">Copied!</span>
              </>
            ) : (
              <>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
                Copy
              </>
            )}
          </button>
        </div>
      </div>

      {/* Important notice */}
      <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 mb-5">
        <div className="flex gap-2">
          <span className="text-amber-400 text-sm shrink-0">⚠️</span>
          <div className="text-amber-400/80 text-xs leading-relaxed">
            <strong>Important:</strong> Send only USDT via <strong>TRON (TRC-20)</strong> network. Sending other tokens or using wrong network may result in permanent loss.
            Send the <strong>exact amount</strong> shown above.
          </div>
        </div>
      </div>

      {/* Transaction hash input */}
      <div className="mb-5">
        <label className="text-white/40 text-xs font-semibold tracking-wider uppercase mb-2 block">
          Transaction Hash (Optional)
        </label>
        <input
          type="text"
          value={txHash}
          onChange={(e) => setTxHash(e.target.value)}
          placeholder="Enter your TxID for faster verification"
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500/50 transition-all font-mono text-xs"
        />
      </div>

      {/* Steps */}
      <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 mb-6">
        <div className="text-white/30 text-xs font-semibold tracking-wider uppercase mb-3">How to Pay</div>
        <div className="space-y-3">
          {[
            "Open your crypto wallet (TronLink, Trust Wallet, etc.)",
            `Send exactly ${orderInfo.totalPrice.toLocaleString()} USDT to the address above`,
            "Make sure to select TRC-20 (TRON) network",
            'Click "I\'ve Sent Payment" below after sending',
          ].map((step, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-400 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                {i + 1}
              </div>
              <span className="text-white/50 text-xs leading-relaxed">{step}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Submit button */}
      <button
        onClick={handleSubmit}
        className="w-full py-4 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold text-base hover:from-green-500 hover:to-emerald-500 transition-all duration-300 hover:shadow-lg hover:shadow-green-600/30 active:scale-[0.98] flex items-center justify-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        I've Sent the Payment
      </button>

      <p className="text-center text-white/20 text-xs mt-3">
        Your ticket will be sent to {orderInfo.email} after verification
      </p>
    </div>
  );
}
