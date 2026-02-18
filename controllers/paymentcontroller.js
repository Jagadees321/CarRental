import paymentservice from '../services/paymentservice.js';

export const createPayment = async (req, res) => {
    try {
        const payment = req.body;
        const result = await paymentservice.createPayment(payment);
        return res.status(201).json({ message: 'Payment initiated successfully', result });
    } catch (error) {
        return res.status(500).json({ message: 'Error creating payment', error: error.message });
    }
};

export const getPaymentByPaymentId = async (req, res) => {
    try {
        const { paymentid } = req.params;
        const result = await paymentservice.getPaymentByPaymentId(paymentid);
        if (!result) return res.status(404).json({ message: 'Payment not found' });
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const getPaymentByBookingId = async (req, res) => {
    try {
        const { bookingid } = req.params;
        const result = await paymentservice.getPaymentByBookingId(bookingid);
        if (!result) return res.status(404).json({ message: 'No payment found for this booking' });
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const getPaymentsByUserId = async (req, res) => {
    try {
        const { userid } = req.params;
        const result = await paymentservice.getPaymentsByUserId(userid);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const getAllPayments = async (req, res) => {
    try {
        const result = await paymentservice.getAllPayments();
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const updatePaymentStatus = async (req, res) => {
    try {
        const { paymentid, status, transaction_id } = req.body;
        const result = await paymentservice.updatePaymentStatus(paymentid, status, transaction_id);
        return res.status(200).json({ message: 'Payment status updated successfully', result });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const dummyPayment = async (req, res) => {
    try {
        const { bookingid, userid, amount, payment_method } = req.body;
        const payment = { bookingid, userid, amount: amount || 0, payment_method: payment_method || 'dummy', transaction_id: `DUMMY_${Date.now()}`, status: 'completed' };
        const createResult = await paymentservice.createPayment(payment);
        const paymentid = createResult?.insertId;
        if (paymentid) await paymentservice.updatePaymentStatus(paymentid, 'completed', payment.transaction_id);
        return res.status(201).json({ message: 'Payment completed (dummy)', paymentid, transaction_id: payment.transaction_id });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
