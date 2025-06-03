// import React from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// const PaymentModal = ({ isOpen, onClose }) => {
//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//         >
//           <motion.div
//             className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-2xl relative"
//             initial={{ scale: 0.8, y: -50 }}
//             animate={{ scale: 1, y: 0 }}
//             exit={{ scale: 0.8, y: -50 }}
//             transition={{ duration: 0.3 }}
//           >
//             <button
//               className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
//               onClick={onClose}
//             >
//               &times;
//             </button>

//             <motion.h2
//               className="text-2xl font-bold text-purple-600 mb-2 text-center"
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//             >
//               🔐 Premium Access Required
//             </motion.h2>

//             <motion.p
//               className="text-center text-gray-700 mb-6 text-lg"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.4, duration: 0.6 }}
//             >
//               If you want to access the full playlist, you have to purchase our subscription 💳.
//             </motion.p>

//             {/* Subscription Plans */}
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
//               {[
//                 { name: 'Basic', price: '$2.99/mo' },
//                 { name: 'Pro', price: '$5.99/mo' },
//                 { name: 'Ultimate', price: '$9.99/mo' },
//               ].map((plan, idx) => (
//                 <div key={idx} className="border rounded-lg p-4 text-center shadow hover:shadow-lg">
//                   <h3 className="text-xl font-semibold text-purple-700">{plan.name}</h3>
//                   <p className="text-lg text-gray-600">{plan.price}</p>
//                   <button className="mt-2 text-sm text-white bg-purple-600 px-3 py-1 rounded hover:bg-purple-700 transition">Select</button>
//                 </div>
//               ))}
//             </div>

//             {/* Payment Options */}
//            <div className="mb-4">
//   <label className="block font-semibold text-black mb-2">Payment Method</label>

//   <select
//     defaultValue=""
//     className="w-full border border-white bg-white text-gray-900 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-md"
//   >
//     <option value="" disabled hidden>
//       Select Payment Method
//     </option>
//     <option>Credit/Debit Card</option>
//     <option>UPI</option>
//     <option>PayPal</option>
//   </select>
// </div>




//             {/* Card Details */}
// <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//   <input
//     type="text"
//     placeholder="Card Number"
//     className="border border-gray-700 bg-gray-100 text-gray-900 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
//   />
//   <input
//     type="text"
//     placeholder="Card Holder Name"
//     className="border border-gray-700 bg-gray-100 text-gray-900 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
//   />
//   <input
//     type="text"
//     placeholder="Expiry MM/YY"
//     className="border border-gray-700 bg-gray-100 text-gray-900 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
//   />
//   <input
//     type="text"
//     placeholder="CVV"
//     className="border border-gray-700 bg-gray-100 text-gray-900 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
//   />
// </div>


//             <button className="w-full bg-green-600 text-white py-2 rounded-lg font-bold hover:bg-green-700 transition">
//               Proceed to Pay
//             </button>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default PaymentModal;



import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PaymentModal = ({ isOpen, onClose }) => {
  const [form, setForm] = useState({
    cardNumber: '',
    cardHolder: '',
    expiry: '',
    cvv: '',
    paymentMethod: '',
  });

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const { cardNumber, cardHolder, expiry, cvv, paymentMethod } = form;
    setIsFormValid(
      cardNumber.trim() &&
      cardHolder.trim() &&
      expiry.trim() &&
      cvv.trim() &&
      paymentMethod.trim()
    );
  }, [form]);

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-2xl relative"
            initial={{ scale: 0.8, y: -50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: -50 }}
            transition={{ duration: 0.3 }}
          >
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
              onClick={onClose}
            >
              &times;
            </button>

            <motion.h2
              className="text-2xl font-bold text-purple-600 mb-2 text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              🔐 Premium Access Required
            </motion.h2>

            <motion.p
              className="text-center text-gray-700 mb-6 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              If you want to access the full playlist, you have to purchase our subscription 💳.
            </motion.p>

            {/* Subscription Plans */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {[
                { name: 'Basic', price: '$2.99/mo' },
                { name: 'Pro', price: '$5.99/mo' },
                { name: 'Ultimate', price: '$9.99/mo' },
              ].map((plan, idx) => (
                <div key={idx} className="border rounded-lg p-4 text-center shadow hover:shadow-lg">
                  <h3 className="text-xl font-semibold text-purple-700">{plan.name}</h3>
                  <p className="text-lg text-gray-600">{plan.price}</p>
                  <button className="mt-2 text-sm text-white bg-purple-600 px-3 py-1 rounded hover:bg-purple-700 transition">Select</button>
                </div>
              ))}
            </div>

            {/* Payment Method */}
            <div className="mb-4">
              <label className="block font-semibold text-black mb-2">Payment Method</label>
              <select
                value={form.paymentMethod}
                onChange={handleChange('paymentMethod')}
                className="w-full border border-white bg-white text-gray-900 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-md"
              >
                <option value="" disabled hidden>
                  Select Payment Method
                </option>
                <option>Credit/Debit Card</option>
                <option>UPI</option>
                <option>PayPal</option>
              </select>
            </div>

            {/* Card Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <input
                type="text"
                placeholder="Card Number"
                value={form.cardNumber}
                onChange={handleChange('cardNumber')}
                className="border border-gray-700 bg-gray-100 text-gray-900 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
              />
              <input
                type="text"
                placeholder="Card Holder Name"
                value={form.cardHolder}
                onChange={handleChange('cardHolder')}
                className="border border-gray-700 bg-gray-100 text-gray-900 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
              />
              <input
                type="text"
                placeholder="Expiry MM/YY"
                value={form.expiry}
                onChange={handleChange('expiry')}
                className="border border-gray-700 bg-gray-100 text-gray-900 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
              />
              <input
                type="text"
                placeholder="CVV"
                value={form.cvv}
                onChange={handleChange('cvv')}
                className="border border-gray-700 bg-gray-100 text-gray-900 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
              />
            </div>

            <button
              disabled={!isFormValid}
              className={`w-full py-2 rounded-lg font-bold transition ${
                isFormValid
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Proceed to Pay
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PaymentModal;
