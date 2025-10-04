// controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Company = require('../models/companyModel');
const axios = require('axios'); // For fetching country/currency data
require('dotenv').config();

const JWT_SECRET = "vivek";

// --- Helper function to fetch currency code ---
async function getCurrencyCodeForCountry(countryName) {
    try {
        const response = await axios.get(`https://restcountries.com/v3.1/name/${countryName}?fields=currencies`);
        if (response.data && response.data.length > 0) {
            const country = response.data[0];
            if (country.currencies) {
                // Get the first currency code (e.g., USD, EUR)
                const currencyCode = Object.keys(country.currencies)[0];
                return currencyCode;
            }
        }
    } catch (error) {
        console.error(`Error fetching currency for ${countryName}:`, error.message);
    }
    return null; // Fallback if not found or error
}

// --- Signup Controller ---
exports.signup = async (req, res) => {
    const { name, email, password, company_name, country_selection } = req.body;
    console.log(req.body);
    if (!name || !email || !password || !company_name || !country_selection) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        // Check if user already exists
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.status(409).json({ message: 'User with this email already exists.' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Fetch currency code for the selected country
        const currencyCode = await getCurrencyCodeForCountry(country_selection);
        if (!currencyCode) {
            return res.status(400).json({ message: 'Could not determine currency for the selected country.' });
        }

        // Create new company
        const newCompany = await Company.create(company_name, currencyCode);

        // Create new user as Admin for this company
        const newUser = await User.create(
            newCompany.id,
            name.split(' ')[0], // Assuming first word is first name
            name.split(' ').slice(1).join(' ') || '', // Rest is last name
            email,
            hashedPassword,
            'admin' // First user is always admin
        );

        // Create a JWT token for the newly registered user (optional, but good for immediate login)
        const token = jwt.sign(
            { id: newUser.id, role: newUser.role, company_id: newUser.companyId },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(201).json({
            message: 'Admin user and company registered successfully!',
            token,
            user: { id: newUser.id, email: newUser.email, role: newUser.role },
            company: { id: newCompany.id, name: newCompany.name, currency_code: newCompany.currency_code },
            currency_code_info: { [newCompany.name]: newCompany.currency_code } // JSON file key-value requirement
        });

    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: 'Server error during registration.' });
    }
};

// --- Login Controller ---
exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    try {
        // Find user by email
        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user.id, role: user.role, company_id: user.company_id },
            JWT_SECRET,
            { expiresIn: '1h' } // Token expires in 1 hour
        );

        res.status(200).json({
            message: 'Logged in successfully!',
            token,
            user: {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                role: user.role,
                company_id: user.company_id
            },
            company_currency: user.currency_code // Include company currency for context
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error during login.' });
    }
};