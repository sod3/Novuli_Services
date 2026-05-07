'use client';
import React, { useState } from "react";
import { getToolById } from "@/data/tools";
import { FiDownload, FiPlus, FiX, FiDollarSign } from "react-icons/fi";
import { motion } from "framer-motion";


const faqs = [
  { question: "Is there a limit to how many invoices I can create?", answer: "Free users can create 5 invoices per month. Pro plan is unlimited." },
  { question: "Can I add my company logo?", answer: "Yes, Pro plan lets you add your logo and custom branding colors." },
  { question: "What currency is supported?", answer: "All major currencies are supported. Select from the dropdown." },
  { question: "Can clients pay online?", answer: "Pro plan integrates with Stripe and PayPal for online payment links." },
];

const steps = [
  { title: "Add Business Info", desc: "Enter your company and client details." },
  { title: "Add Line Items", desc: "Add services, quantities and rates." },
  { title: "Download PDF", desc: "Preview and download your professional invoice." },
];

export default function InvoiceGenerator() {
  const [from, setFrom] = useState({ name: "", email: "", address: "" });
  const [to, setTo] = useState({ name: "", email: "", address: "" });
  const [invoiceNo, setInvoiceNo] = useState("INV-001");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [due, setDue] = useState("");
  const [items, setItems] = useState([{ desc: "", qty: 1, rate: 0 }]);
  const [currency, setCurrency] = useState("USD");
  const [preview, setPreview] = useState(false);

  const addItem = () => setItems((p) => [...p, { desc: "", qty: 1, rate: 0 }]);
  const removeItem = (i) => setItems((p) => p.filter((_, idx) => idx !== i));
  const updateItem = (i, k, v) => setItems((p) => p.map((item, idx) => idx === i ? { ...item, [k]: v } : item));

  const subtotal = items.reduce((s, i) => s + i.qty * i.rate, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const currencies = ["USD", "EUR", "GBP", "PKR", "INR", "CAD", "AUD"];

  return (
    <>
      <div className="bg-surface-2 border border-surface-3 rounded-2xl p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-white font-heading font-bold text-xl">Invoice Generator</h2>
          <div className="flex gap-2">
            <button onClick={() => setPreview(false)}
              className={`text-xs px-3 py-1.5 rounded-lg transition-all ${!preview ? "bg-accent text-white" : "bg-surface-3 text-gray-soft hover:text-white"}`}>
              Edit
            </button>
            <button onClick={() => setPreview(true)}
              className={`text-xs px-3 py-1.5 rounded-lg transition-all ${preview ? "bg-accent text-white" : "bg-surface-3 text-gray-soft hover:text-white"}`}>
              Preview
            </button>
          </div>
        </div>

        {!preview ? (
          <div className="space-y-6">
            {/* Invoice Meta */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label className="text-gray-soft text-xs mb-1.5 block">Invoice #</label>
                <input value={invoiceNo} onChange={(e) => setInvoiceNo(e.target.value)} className="input-field text-sm" />
              </div>
              <div>
                <label className="text-gray-soft text-xs mb-1.5 block">Currency</label>
                <select value={currency} onChange={(e) => setCurrency(e.target.value)}
                  className="input-field text-sm appearance-none">
                  {currencies.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-gray-soft text-xs mb-1.5 block">Date</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="input-field text-sm" />
              </div>
              <div>
                <label className="text-gray-soft text-xs mb-1.5 block">Due Date</label>
                <input type="date" value={due} onChange={(e) => setDue(e.target.value)} className="input-field text-sm" />
              </div>
            </div>

            {/* From/To */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[["from", from, setFrom, "From (Your Info)"], ["to", to, setTo, "To (Client Info)"]].map(([key, val, setter, label]) => (
                <div key={key}>
                  <h4 className="text-white font-semibold text-sm mb-3">{label}</h4>
                  <div className="space-y-2">
                    <input placeholder="Name / Company" value={val.name} onChange={(e) => setter((p) => ({ ...p, name: e.target.value }))} className="input-field text-sm" />
                    <input placeholder="Email" value={val.email} onChange={(e) => setter((p) => ({ ...p, email: e.target.value }))} className="input-field text-sm" />
                    <textarea placeholder="Address" value={val.address} onChange={(e) => setter((p) => ({ ...p, address: e.target.value }))} rows={2} className="input-field text-sm resize-none" />
                  </div>
                </div>
              ))}
            </div>

            {/* Line Items */}
            <div>
              <h4 className="text-white font-semibold text-sm mb-3">Line Items</h4>
              <div className="space-y-2">
                <div className="grid grid-cols-12 gap-2 text-xs text-gray-soft px-2">
                  <span className="col-span-6">Description</span>
                  <span className="col-span-2 text-center">Qty</span>
                  <span className="col-span-3 text-center">Rate</span>
                </div>
                {items.map((item, i) => (
                  <div key={i} className="grid grid-cols-12 gap-2 items-center">
                    <input value={item.desc} onChange={(e) => updateItem(i, "desc", e.target.value)}
                      placeholder="Service description" className="input-field text-sm col-span-6" />
                    <input type="number" value={item.qty} onChange={(e) => updateItem(i, "qty", +e.target.value)}
                      min={1} className="input-field text-sm col-span-2 text-center" />
                    <input type="number" value={item.rate} onChange={(e) => updateItem(i, "rate", +e.target.value)}
                      min={0} className="input-field text-sm col-span-3" />
                    <button onClick={() => removeItem(i)} className="col-span-1 text-gray-soft hover:text-red-400 flex justify-center">
                      <FiX size={14} />
                    </button>
                  </div>
                ))}
                <button onClick={addItem} className="flex items-center gap-1.5 text-accent text-sm hover:underline">
                  <FiPlus size={14} /> Add Item
                </button>
              </div>
            </div>

            {/* Totals */}
            <div className="bg-surface-3 rounded-xl p-4 space-y-2 max-w-xs ml-auto">
              <div className="flex justify-between text-sm text-gray-soft">
                <span>Subtotal</span><span>{currency} {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-soft">
                <span>Tax (10%)</span><span>{currency} {tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-white font-bold border-t border-surface-3 pt-2">
                <span>Total</span><span>{currency} {total.toFixed(2)}</span>
              </div>
            </div>

            <button onClick={() => setPreview(true)} className="btn-primary w-full flex items-center gap-2 justify-center">
              <FiDollarSign /> Preview Invoice
            </button>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="bg-white text-gray-900 rounded-xl p-8 shadow-card">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h1 className="text-2xl font-bold text-blue-600">INVOICE</h1>
                <p className="text-gray-500 text-sm">#{invoiceNo}</p>
              </div>
              <div className="text-right text-sm text-gray-600">
                <p><strong>{from.name || "Your Company"}</strong></p>
                <p>{from.email}</p>
                <p className="text-xs">{from.address}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6 mb-6 text-sm">
              <div><p className="font-semibold text-gray-600 mb-1">Bill To:</p><p>{to.name || "Client Name"}</p><p className="text-gray-500">{to.email}</p></div>
              <div className="text-right"><p className="text-gray-500">Date: {date}</p>{due && <p className="text-gray-500">Due: {due}</p>}</div>
            </div>
            <table className="w-full text-sm mb-6">
              <thead className="bg-gray-50"><tr>
                <th className="text-left py-2 px-3 text-gray-600">Description</th>
                <th className="text-center py-2 px-3 text-gray-600">Qty</th>
                <th className="text-right py-2 px-3 text-gray-600">Rate</th>
                <th className="text-right py-2 px-3 text-gray-600">Amount</th>
              </tr></thead>
              <tbody>{items.map((item, i) => (
                <tr key={i} className="border-b border-gray-100">
                  <td className="py-2 px-3">{item.desc || "-"}</td>
                  <td className="py-2 px-3 text-center">{item.qty}</td>
                  <td className="py-2 px-3 text-right">{currency} {item.rate.toFixed(2)}</td>
                  <td className="py-2 px-3 text-right">{currency} {(item.qty * item.rate).toFixed(2)}</td>
                </tr>
              ))}</tbody>
            </table>
            <div className="flex justify-end">
              <div className="w-56 space-y-1 text-sm">
                <div className="flex justify-between text-gray-500"><span>Subtotal</span><span>{currency} {subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between text-gray-500"><span>Tax (10%)</span><span>{currency} {tax.toFixed(2)}</span></div>
                <div className="flex justify-between font-bold text-lg border-t pt-2"><span>Total</span><span>{currency} {total.toFixed(2)}</span></div>
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <button className="bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700">
                <FiDownload size={14} /> Download PDF
              </button>
              <button onClick={() => setPreview(false)} className="border border-gray-200 text-gray-600 text-sm font-semibold px-4 py-2 rounded-lg hover:bg-gray-50">
                Back to Edit
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
}

