const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

// ✅ Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://kart982006_db_user:Cxccc796rWenOLWZ@buyingcluster.tijsfxz.mongodb.net/optionproject')
  .then(() => console.log("✅ MongoDB Atlas Connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// ✅ Define schema
const formSchema = new mongoose.Schema({
  phone: String,
  email: String,
  tradingExp: String,
  capital: Number,
  incomeDepend: String,
  tradingType: String,
});

// ✅ Create model
const Form = mongoose.model('Form', formSchema);

// ✅ Middleware
app.use(express.static('public'));
app.use(express.json());

// ✅ Handle contact form submission
app.post('/api/contact', async (req, res) => {
  const { phone, email, tradingExp, capital, incomeDepend, tradingType } = req.body;

  try {
    const formData = new Form({ phone, email, tradingExp, capital, incomeDepend, tradingType });
    await formData.save(); // Save into MongoDB
    res.json({ message: 'We have received your details!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save data' });
  }
});

// ✅ Route to fetch all submissions
app.get('/api/submissions', async (req, res) => {
  try {
    const submissions = await Form.find();
    res.json(submissions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch submissions' });
  }
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
