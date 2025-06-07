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



// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// const PaymentModal = ({ isOpen, onClose }) => {
//   const [form, setForm] = useState({
//     cardNumber: '',
//     cardHolder: '',
//     expiry: '',
//     cvv: '',
//     paymentMethod: '',
//   });

//   const [isFormValid, setIsFormValid] = useState(false);

//   useEffect(() => {
//     const { cardNumber, cardHolder, expiry, cvv, paymentMethod } = form;
//     setIsFormValid(
//       cardNumber.trim() &&
//       cardHolder.trim() &&
//       expiry.trim() &&
//       cvv.trim() &&
//       paymentMethod.trim()
//     );
//   }, [form]);

//   const handleChange = (field) => (e) => {
//     setForm({ ...form, [field]: e.target.value });
//   };

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

//             {/* Payment Method */}
//             <div className="mb-4">
//               <label className="block font-semibold text-black mb-2">Payment Method</label>
//               <select
//                 value={form.paymentMethod}
//                 onChange={handleChange('paymentMethod')}
//                 className="w-full border border-white bg-white text-gray-900 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-md"
//               >
//                 <option value="" disabled hidden>
//                   Select Payment Method
//                 </option>
//                 <option>Credit/Debit Card</option>
//                 <option>UPI</option>
//                 <option>PayPal</option>
//               </select>
//             </div>

//             {/* Card Details */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//               <input
//                 type="text"
//                 placeholder="Card Number"
//                 value={form.cardNumber}
//                 onChange={handleChange('cardNumber')}
//                 className="border border-gray-700 bg-gray-100 text-gray-900 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
//               />
//               <input
//                 type="text"
//                 placeholder="Card Holder Name"
//                 value={form.cardHolder}
//                 onChange={handleChange('cardHolder')}
//                 className="border border-gray-700 bg-gray-100 text-gray-900 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
//               />
//               <input
//                 type="text"
//                 placeholder="Expiry MM/YY"
//                 value={form.expiry}
//                 onChange={handleChange('expiry')}
//                 className="border border-gray-700 bg-gray-100 text-gray-900 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
//               />
//               <input
//                 type="text"
//                 placeholder="CVV"
//                 value={form.cvv}
//                 onChange={handleChange('cvv')}
//                 className="border border-gray-700 bg-gray-100 text-gray-900 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
//               />
//             </div>

//             <button
//               disabled={!isFormValid}
//               className={`w-full py-2 rounded-lg font-bold transition ${
//                 isFormValid
//                   ? 'bg-green-600 text-white hover:bg-green-700'
//                   : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//               }`}
//             >
//               Proceed to Pay
//             </button>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default PaymentModal;



import React, { useState, useRef } from 'react';
// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// const PaymentModal = ({ isOpen, onClose }) => {
//   const [form, setForm] = useState({
//     cardNumber: '',
//     cardHolder: '',
//     expiry: '',
//     cvv: '',
//     paymentMethod: '',
//   });

//   const [isFormValid, setIsFormValid] = useState(false);

//   useEffect(() => {
//     const { cardNumber, cardHolder, expiry, cvv, paymentMethod } = form;
//     setIsFormValid(
//       cardNumber.trim() &&
//       cardHolder.trim() &&
//       expiry.trim() &&
//       cvv.trim() &&
//       paymentMethod.trim()
//     );
//   }, [form]);

//   const handleChange = (field) => (e) => {
//     setForm({ ...form, [field]: e.target.value });
//   };

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

//             {/* Payment Method */}
//             <div className="mb-4">
//               <label className="block font-semibold text-black mb-2">Payment Method</label>
//               <select
//                 value={form.paymentMethod}
//                 onChange={handleChange('paymentMethod')}
//                 className="w-full border border-white bg-white text-gray-900 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-md"
//               >
//                 <option value="" disabled hidden>
//                   Select Payment Method
//                 </option>
//                 <option>Credit/Debit Card</option>
//                 <option>UPI</option>
//                 <option>PayPal</option>
//               </select>
//             </div>

//             {/* Card Details */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//               <input
//                 type="text"
//                 placeholder="Card Number"
//                 value={form.cardNumber}
//                 onChange={handleChange('cardNumber')}
//                 className="border border-gray-700 bg-gray-100 text-gray-900 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
//               />
//               <input
//                 type="text"
//                 placeholder="Card Holder Name"
//                 value={form.cardHolder}
//                 onChange={handleChange('cardHolder')}
//                 className="border border-gray-700 bg-gray-100 text-gray-900 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
//               />
//               <input
//                 type="text"
//                 placeholder="Expiry MM/YY"
//                 value={form.expiry}
//                 onChange={handleChange('expiry')}
//                 className="border border-gray-700 bg-gray-100 text-gray-900 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
//               />
//               <input
//                 type="text"
//                 placeholder="CVV"
//                 value={form.cvv}
//                 onChange={handleChange('cvv')}
//                 className="border border-gray-700 bg-gray-100 text-gray-900 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
//               />
//             </div>

//             <button
//               disabled={!isFormValid}
//               className={`w-full py-2 rounded-lg font-bold transition ${
//                 isFormValid
//                   ? 'bg-green-600 text-white hover:bg-green-700'
//                   : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//               }`}
//             >
//               Proceed to Pay
//             </button>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default PaymentModal;




import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios'; // ✅ Make sure axios is installed
import axios from 'axios';

const PaymentModal = ({ isOpen, onClose }) => {
  const [method, setMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvv: '', name: '' });
  const [upiId, setUpiId] = useState('');

  const expiryRef = useRef(null);
  const cvvRef = useRef(null);
  const nameRef = useRef(null);

  const formatCardNumber = (value) => {
    return value.replace(/[^\d]/g, '').replace(/(.{4})/g, '$1 ').trim();
  };

  const formatExpiry = (value) => {
    const clean = value.replace(/[^\d]/g, '').slice(0, 4);
    if (clean.length > 2) {
      return clean.slice(0, 2) + '/' + clean.slice(2);
    }
    return clean;
  };

  const baseInputClass =
    'w-full px-3 py-2 bg-gray-50 text-gray-800 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400 transition';

  const renderCardForm = () => (
    <div className="space-y-3">
      <input
        type="text"
        placeholder="1234 5678 9012 3456"
        value={cardDetails.number}
        onChange={(e) => {
          const formatted = formatCardNumber(e.target.value);
          setCardDetails({ ...cardDetails, number: formatted });
          if (formatted.replace(/ /g, '').length >= 16) expiryRef.current.focus();
        }}
        className={baseInputClass}
        maxLength={19}
      />
      <div className="grid grid-cols-2 gap-3">
        <input
          ref={expiryRef}
          type="text"
          placeholder="MM/YY"
          value={cardDetails.expiry}
          onChange={(e) => {
            const formatted = formatExpiry(e.target.value);
            setCardDetails({ ...cardDetails, expiry: formatted });
            if (formatted.length === 5) cvvRef.current.focus();
          }}
          className={baseInputClass}
          maxLength={5}
        />
        <input
          ref={cvvRef}
          type="password"
          placeholder="CVV"
          value={cardDetails.cvv}
          onChange={(e) => {
            setCardDetails({ ...cardDetails, cvv: e.target.value });
            if (e.target.value.length === 3) nameRef.current.focus();
          }}
          className={baseInputClass}
          maxLength={3}
        />
      </div>
      <input
        ref={nameRef}
        type="text"
        placeholder="John Doe"
        value={cardDetails.name}
        onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
        className={baseInputClass}
      />
    </div>
  );

  const renderUpiForm = () => (
    <div className="space-y-2">
      <input
        type="text"
        placeholder="you@upi"
        value={upiId}
        onChange={(e) => setUpiId(e.target.value)}
        className={baseInputClass}
      />
      <p className="text-sm text-gray-600">Requesting ₹500 to your UPI ID</p>
    </div>
  );
  const [method, setMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvv: '', name: '' });
  const [upiId, setUpiId] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [playlistLink, setPlaylistLink] = useState('');

  const expiryRef = useRef(null);
  const cvvRef = useRef(null);
  const nameRef = useRef(null);

  const formatCardNumber = (value) => {
    return value.replace(/[^\d]/g, '').replace(/(.{4})/g, '$1 ').trim();
  };

  const formatExpiry = (value) => {
    const clean = value.replace(/[^\d]/g, '').slice(0, 4);
    if (clean.length > 2) {
      return clean.slice(0, 2) + '/' + clean.slice(2);
    }
    return clean;
  };

  const baseInputClass =
    'w-full px-3 py-2 bg-gray-50 text-gray-800 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400 transition';

  const renderCardForm = () => (
    <div className="space-y-3">
      <input
        type="text"
        placeholder="1234 5678 9012 3456"
        value={cardDetails.number}
        onChange={(e) => {
          const formatted = formatCardNumber(e.target.value);
          setCardDetails({ ...cardDetails, number: formatted });
          if (formatted.replace(/ /g, '').length >= 16) expiryRef.current.focus();
        }}
        className={baseInputClass}
        maxLength={19}
      />
      <div className="grid grid-cols-2 gap-3">
        <input
          ref={expiryRef}
          type="text"
          placeholder="MM/YY"
          value={cardDetails.expiry}
          onChange={(e) => {
            const formatted = formatExpiry(e.target.value);
            setCardDetails({ ...cardDetails, expiry: formatted });
            if (formatted.length === 5) cvvRef.current.focus();
          }}
          className={baseInputClass}
          maxLength={5}
        />
        <input
          ref={cvvRef}
          type="password"
          placeholder="CVV"
          value={cardDetails.cvv}
          onChange={(e) => {
            setCardDetails({ ...cardDetails, cvv: e.target.value });
            if (e.target.value.length === 3) nameRef.current.focus();
          }}
          className={baseInputClass}
          maxLength={3}
        />
      </div>
      <input
        ref={nameRef}
        type="text"
        placeholder="John Doe"
        value={cardDetails.name}
        onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
        className={baseInputClass}
      />
    </div>
  );

  const renderUpiForm = () => (
    <div className="space-y-2">
      <input
        type="text"
        placeholder="you@upi"
        value={upiId}
        onChange={(e) => setUpiId(e.target.value)}
        className={baseInputClass}
      />
      <p className="text-sm text-gray-600">Requesting ₹500 to your UPI ID</p>
    </div>
  );

  const isCardValid =
    cardDetails.number.replace(/ /g, '').length === 16 &&
    cardDetails.expiry.length === 5 &&
    cardDetails.cvv.length === 3 &&
    cardDetails.name.trim();

  const isUpiValid = upiId.includes('@');

  const handlePayment = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/last-playlist-link');
      const { playlist_link } = response.data;
      if (playlist_link) {
        window.open(playlist_link, '_blank'); // ✅ Opens playlist link in new tab
      } else {
        alert('No playlist found.');
      }
    } catch (error) {
      console.error('Failed to fetch playlist link:', error);
      alert('Failed to fetch playlist link');
    }
  const isCardValid =
    cardDetails.number.replace(/ /g, '').length === 16 &&
    cardDetails.expiry.length === 5 &&
    cardDetails.cvv.length === 3 &&
    cardDetails.name.trim();

  const isUpiValid = upiId.includes('@');

  const handlePayment = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/last-playlist-link');
      const { playlist_link } = response.data;
      if (playlist_link) {
        setPlaylistLink(playlist_link);
        setPaymentSuccess(true); // Show success screen
      } else {
        alert('No playlist found.');
      }
    } catch (error) {
      console.error('Failed to fetch playlist link:', error);
      alert('Failed to fetch playlist link');
    }
  };

  const handleExplore = () => {
    if (playlistLink) {
      window.open(playlistLink, '_blank');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center px-4"
          className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl w-full max-w-md shadow-2xl p-6 relative border border-pink-300"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className="bg-white rounded-2xl w-full max-w-md shadow-2xl p-6 relative border border-pink-300"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <button
              className="absolute top-2 right-2 text-xl font-bold text-white bg-pink-500 rounded-full w-7 h-7 flex items-center justify-center hover:bg-pink-600"
              className="absolute top-2 right-2 text-xl font-bold text-white bg-pink-500 rounded-full w-7 h-7 flex items-center justify-center hover:bg-pink-600"
              onClick={onClose}
            >
              &times;
            </button>

            <h2 className="text-center text-xl font-bold mb-2 text-gray-800">Pay Securely</h2>
            <p className="text-center text-sm text-gray-600 mb-4">Amount Payable: <strong>₹500</strong></p>

            <div className="flex justify-center mb-4 space-x-2">
              {['card', 'upi'].map((type) => (
                <button
                  key={type}
                  onClick={() => setMethod(type)}
                  className={`px-4 py-1 text-sm font-semibold rounded-full border transition ${
                    method === type
                      ? 'bg-pink-500 text-white border-pink-600 shadow-md'
                      : 'bg-gray-100 text-gray-600 border-gray-300 hover:bg-pink-100'
                  }`}
                >
                  {type === 'card' ? 'Credit/Debit Card' : 'UPI'}
                </button>
              ))}
            </div>
            {paymentSuccess ? (
              <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-green-600 mb-4">🎉 Payment Successful!</h2>
                <p className="text-gray-700 mb-6">Thank you for your payment. You're all set to explore your playlist.</p>
                <button
                  onClick={handleExplore}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md font-semibold transition"
                >
                  Explore Playlist
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-center text-xl font-bold mb-2 text-gray-800">Pay Securely</h2>
                <p className="text-center text-sm text-gray-600 mb-4">Amount Payable: <strong>₹500</strong></p>

                <div className="flex justify-center mb-4 space-x-2">
                  {['card', 'upi'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setMethod(type)}
                      className={`px-4 py-1 text-sm font-semibold rounded-full border transition ${
                        method === type
                          ? 'bg-pink-500 text-white border-pink-600 shadow-md'
                          : 'bg-gray-100 text-gray-600 border-gray-300 hover:bg-pink-100'
                      }`}
                    >
                      {type === 'card' ? 'Credit/Debit Card' : 'UPI'}
                    </button>
                  ))}
                </div>

            <div className="mb-6">{method === 'card' ? renderCardForm() : renderUpiForm()}</div>
                <div className="mb-6">{method === 'card' ? renderCardForm() : renderUpiForm()}</div>

            <button
              onClick={handlePayment}
              disabled={method === 'card' ? !isCardValid : !isUpiValid}
              className={`w-full py-2 rounded-md font-medium text-white text-sm transition duration-200 ${
                (method === 'card' && isCardValid) || (method === 'upi' && isUpiValid)
                  ? 'bg-blue-600 hover:bg-blue-700 shadow-lg'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              Pay Now
            </button>

            <p className="text-xs text-center text-gray-400 mt-3">
              Powered by <span className="font-semibold text-blue-600">Razorpay</span>
            </p>
                <button
                  onClick={handlePayment}
                  disabled={method === 'card' ? !isCardValid : !isUpiValid}
                  className={`w-full py-2 rounded-md font-medium text-white text-sm transition duration-200 ${
                    (method === 'card' && isCardValid) || (method === 'upi' && isUpiValid)
                      ? 'bg-blue-600 hover:bg-blue-700 shadow-lg'
                      : 'bg-gray-300 cursor-not-allowed'
                  }`}
                >
                  Pay Now
                </button>

                <p className="text-xs text-center text-gray-400 mt-3">
                  Powered by <span className="font-semibold text-blue-600">Razorpay</span>
                </p>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PaymentModal;
