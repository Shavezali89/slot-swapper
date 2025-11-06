import React from "react";
import { motion } from "framer-motion";

export default function Dashboard({ user, token, onLogout }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-sky-500 to-cyan-400 text-gray-800 font-poppins">
      {/* Navbar */}
      <motion.header
        className="flex justify-between items-center px-8 py-4 bg-white/10 backdrop-blur-lg shadow-md sticky top-0"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-white">
          Slot<span className="text-yellow-300">Swapper</span>
        </h1>
        <button
          onClick={onLogout}
          className="bg-white text-indigo-600 font-semibold px-5 py-2 rounded-xl hover:bg-indigo-600 hover:text-white transition-all duration-300 shadow-md"
        >
          Logout
        </button>
      </motion.header>

      {/* Main Grid */}
      <div className="grid md:grid-cols-2 gap-8 p-8">
        {/* My Events */}
        <motion.section
          className="bg-white/90 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-2xl font-semibold text-indigo-600 mb-4 flex items-center gap-2">
            📅 My Events
          </h2>

          <div className="flex flex-col gap-3">
            <input
              placeholder="Title"
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            <input
              placeholder="Start Time (ISO)"
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            <input
              placeholder="End Time (ISO)"
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-indigo-500 to-cyan-400 text-white font-semibold py-2 rounded-lg mt-2 shadow-md hover:shadow-lg transition"
            >
              Create Event
            </motion.button>
          </div>

          {!token && (
            <p className="text-red-600 text-sm text-center mt-3">
              ⚠ No Token (Login Again)
            </p>
          )}
        </motion.section>

        {/* Marketplace */}
        <motion.section
          className="bg-white/90 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          <h2 className="text-2xl font-semibold text-indigo-600 mb-4 flex items-center gap-2">
            🌐 Marketplace
          </h2>

          <div className="bg-white rounded-xl p-4 shadow-inner space-y-3">
            <div className="p-3 border border-gray-200 rounded-md hover:bg-gray-50 transition">
              <p className="font-medium">Incoming Requests</p>
            </div>
            <div className="p-3 border border-gray-200 rounded-md hover:bg-gray-50 transition">
              <p className="font-medium">Outgoing Requests</p>
            </div>
          </div>

          {!token && (
            <p className="text-red-600 text-sm text-center mt-3">
              ⚠ No Token (Login Again)
            </p>
          )}
        </motion.section>
      </div>

      {/* Footer */}
      <footer className="text-center text-white/70 py-4 text-sm">
        © {new Date().getFullYear()} SlotSwapper — Made with ❤ by Vaisnavi
      </footer>
    </div>
  );
}
