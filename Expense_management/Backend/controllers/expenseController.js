
const Expense = require('../models/expenseModel');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const { GoogleGenerativeAI } = require("@google/generative-ai");

const GEMINI_API_KEY = process.env.GEMINI_API;

if (!GEMINI_API_KEY) {
  console.error("CRITICAL ERROR: GEMINI_API_KEY is not loaded. Check your .env file.");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// --- Utility: Convert image to base64 ---
const imageToBase64 = (filePath) => {
  return fs.readFileSync(filePath, { encoding: 'base64' });
};

// --- Robust AI extraction function ---
async function extractBillDetails(imageBuffer, model) {
  try {
    const imageBase64 = imageBuffer.toString("base64");

    const prompt = `Extract the following details from the bill image:
      - Bill Title (e.g., Electricity Bill, Grocery Bill, Water Bill, Gas Bill, etc.)
      - Bill Category (e.g., Electricity, Water, Gas, Internet, etc.)
      - Bill Amount (numeric value only; remove extra zeros if any)
      - Bill Date (in YYYY-MM-DD format)

      Return only valid JSON like this:
      {
        "bill_title": "Electricity Bill",
        "bill_category": "Electricity",
        "bill_amount": "1200",
        "bill_date": "2025-03-15"
      }
      Do not include extra text or code blocks.`;

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            { text: prompt },
            {
              inlineData: {
                mimeType: "image/jpeg",
                data: imageBase64,
              },
            },
          ],
        },
      ],
    });

    if (!result?.response) {
      throw new Error("AI Model did not return a response");
    }

    let responseText = result.response.text?.() || "";

    // --- Extract JSON safely ---
    const jsonMatch = responseText.match(/\{[\s\S]*\}/); // pick first {...} block
    if (!jsonMatch) {
      throw new Error("No JSON found in AI response");
    }

    const parsed = JSON.parse(jsonMatch[0]);

    // --- Clean bill_amount ---
    if (parsed.bill_amount) {
      parsed.bill_amount = parsed.bill_amount.replace(/[^\d.]/g, "");
    }

    return parsed;

  } catch (error) {
    console.error("Error during bill extraction:", error);
    throw new Error("Failed to extract bill details");
  }
}

const expenseController = {
      addManualExpenseEntry: async (req, res) => {
    try {
      const {
        user_id,
        company_id,
        category_name,
        description,
        amount,
        currency_code,
        expense_date
      } = req.body;

      // Basic validation
      if (!user_id || !company_id || !amount || !currency_code || !expense_date) {
        return res.status(400).json({ message: 'Missing required expense fields.' });
      }

      const billImagePath = req.file ? `/billsImage/${req.file.filename}` : null;

      const newExpenseId = await Expense.create({
        user_id,
        company_id,
        category_name,
        description,
        amount: parseFloat(amount),
        currency_code,
        expense_date,
        converted_amount: null,
        status: 'submitted'
      });

      res.status(201).json({
        message: 'Manual expense entry added successfully!',
        expenseId: newExpenseId,
        billImagePath: billImagePath
      });
    } catch (error) {
      console.error('Error adding manual expense entry:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  },
  addOcrExpenseEntry: async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file uploaded for OCR.' });
    }

    const imageFilePath = path.join(__dirname, '..', 'billsImage', req.file.filename);
    const billImagePathForDB = `/billsImage/${req.file.filename}`;

    try {
      // --- Initialize Vision Model ---
      const visionModel = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      // --- Extract bill data using robust function ---
      const imageBuffer = fs.readFileSync(imageFilePath);
      const parsedOcrData = await extractBillDetails(imageBuffer, visionModel);

      console.log('Parsed OCR Data:', parsedOcrData);

      const { user_id, company_id } = req.body;
      if (!user_id || !company_id) {
        return res.status(400).json({ message: 'User ID and Company ID are required.' });
      }

      const expenseDataToSave = {
        user_id,
        company_id,
        category_name: parsedOcrData.bill_category || 'Miscellaneous',
        description: parsedOcrData.bill_title || 'OCR expense',
        amount: parseFloat(parsedOcrData.bill_amount),
        currency_code: parsedOcrData.currency_code || 'INR',
        expense_date: parsedOcrData.bill_date,
        converted_amount: null,
        status: 'draft'
      };

      if (isNaN(expenseDataToSave.amount) || !expenseDataToSave.expense_date) {
        return res.status(400).json({
          message: 'OCR failed to extract valid amount or date.',
          extractedData: parsedOcrData
        });
      }

      const newExpenseId = await Expense.create(expenseDataToSave);

      res.status(201).json({
        message: 'OCR expense entry added successfully!',
        expenseId: newExpenseId,
        ocrData: parsedOcrData,
        billImagePath: billImagePathForDB,
        status: 'draft - awaiting review'
      });

    } catch (error) {
      console.error('Error adding OCR expense entry:', error.message);
      res.status(500).json({ message: 'Failed to process OCR expense.' });
    }
  }
};

module.exports = expenseController;
