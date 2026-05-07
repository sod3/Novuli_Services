'use client';
import React, { useState } from "react";
import { getToolById } from "@/data/tools";
import { FiPlus, FiTrash2, FiSettings, FiEye, FiCode, FiZap } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function FormBuilder() {
    const [fields, setFields] = useState([
    { id: 1, type: "text", label: "Full Name", placeholder: "e.g. John Doe" },
    { id: 2, type: "email", label: "Email Address", placeholder: "john@example.com" }
  ]);

  const addField = () => {
    const newField = { 
      id: Date.now(), 
      type: "text", 
      label: "New Question", 
      placeholder: "Your answer here..." 
    };
    setFields([...fields, newField]);
  };

  const removeField = (id) => {
    setFields(fields.filter(f => f.id !== id));
  };

  return (
    <>
      <div className="max-w-5xl mx-auto py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
           
           {/* Editor */}
           <div className="lg:col-span-12">
              <div className="bg-white border-2 border-border-light rounded-[2.5rem] overflow-hidden shadow-2xl shadow-blue-900/[0.05]">
                 <div className="bg-bg-gray px-8 py-4 border-b border-border-light flex justify-between items-center">
                    <div className="flex items-center gap-2">
                       <span className="w-3 h-3 rounded-full bg-red-400"></span>
                       <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                       <span className="w-3 h-3 rounded-full bg-green-400"></span>
                       <h3 className="text-xs font-bold text-secondary uppercase tracking-widest ml-4">Untitled Lead Form</h3>
                    </div>
                    <div className="flex gap-4">
                       <button className="text-xs font-bold text-accent flex items-center gap-2 hover:underline">
                          <FiEye /> Preview
                       </button>
                       <button className="text-xs font-bold text-primary flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-border-light">
                          <FiCode /> Export Code
                       </button>
                    </div>
                 </div>

                 <div className="p-8 md:p-12">
                    <div className="max-w-xl mx-auto space-y-8">
                       <AnimatePresence>
                          {fields.map((field, i) => (
                             <motion.div 
                                key={field.id} 
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="group relative bg-white"
                             >
                                <div className="flex flex-col gap-2">
                                   <div className="flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity absolute -left-12 top-0 h-full flex-col justify-center gap-2">
                                      <button className="p-2 text-secondary hover:text-accent transition-colors"><FiSettings size={14} /></button>
                                      <button onClick={() => removeField(field.id)} className="p-2 text-secondary hover:text-red-500 transition-colors"><FiTrash2 size={14} /></button>
                                   </div>
                                   <input 
                                      value={field.label}
                                      onChange={(e) => {
                                        const newFields = [...fields];
                                        newFields[i].label = e.target.value;
                                        setFields(newFields);
                                      }}
                                      className="text-lg font-bold text-primary border-none p-0 focus:ring-0 focus:outline-none mb-1 cursor-text"
                                   />
                                   <input 
                                      disabled
                                      placeholder={field.placeholder}
                                      className="w-full bg-bg-gray border border-border-light rounded-xl px-4 py-3 placeholder-gray-400 opacity-60"
                                   />
                                </div>
                             </motion.div>
                          ))}
                       </AnimatePresence>

                       <button 
                          onClick={addField}
                          className="w-full py-4 border-2 border-dashed border-gray-100 rounded-2xl text-secondary hover:text-accent hover:border-accent hover:bg-blue-50 transition-all font-bold flex items-center justify-center gap-2"
                       >
                          <FiPlus /> Add New Field
                       </button>

                       <div className="pt-12 border-t border-border-light text-center">
                          <button className="bg-accent text-white px-12 py-4 rounded-2xl font-display font-bold text-lg hover:bg-blue-600 shadow-xl shadow-blue-200 transition-all flex items-center justify-center gap-3 mx-auto">
                             Publish Form <FiZap />
                          </button>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </>
  );
}

