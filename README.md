# SIP Calculator & Investment Plan Maker

A production-ready, SEBI-compliant web application for calculating Systematic Investment Plan (SIP) returns and generating personalized investment plan ideas. Built with pure HTML, CSS, and Vanilla JavaScript - no external dependencies required.

## Features

### 📊 SIP Calculator
- **Standard SIP Formula**: Uses the mathematically accurate compound interest formula
  ```
  FV = P × [((1 + r)^n - 1) / r] × (1 + r)
  ```
- **Flexible Inputs**: Monthly investment (₹500 - ₹1 crore), Annual return (1% - 30%), Period (1 - 40 years)
- **Real-time Validation**: Comprehensive input validation with helpful error messages
- **Clear Results**: Displays Total Investment, Estimated Returns, and Total Future Value

### 💡 Investment Plan Idea Maker
- **Rule-Based Recommendations**: Non-advisory, educational investment ideas
- **Personalized Approach**: Based on age, monthly income, risk profile, and investment goals
- **Asset Allocation**: Age-appropriate equity/debt split recommendations
- **Investment Strategies**: Tailored suggestions for conservative, moderate, and aggressive profiles
- **Tax Planning**: General guidance on tax-saving instruments like ELSS

### ✅ SEBI Compliance
- Clear disclaimer stating educational and informational purposes only
- No investment advice, recommendations, or guarantees provided
- No specific mutual fund, security, or product names mentioned
- Emphasis on consulting SEBI-registered investment advisors
- Regulatory compliance notice for user due diligence

### 🎨 Modern UI/UX
- **Clean Fintech Design**: Professional gradient-based theme with card layouts
- **Fully Responsive**: Optimized for mobile (375px), tablet (768px), and desktop (1920px+)
- **Smooth Animations**: Fade-in effects for results display
- **Accessible**: Proper form labels, error messages, and keyboard navigation
- **Indian Locale**: Currency formatted in Indian Rupee (₹) with proper thousands separators

## Quick Start

### Option 1: Direct File Opening
Simply open `index.html` in any modern web browser.

### Option 2: Local HTTP Server
```bash
# Using Python 3
python3 -m http.server 8080

# Using Node.js (if http-server is installed)
npx http-server -p 8080

# Then open http://localhost:8080 in your browser
```

## File Structure

```
sip-calculator-vmd/
├── index.html    # Main HTML structure with forms and sections
├── style.css     # Complete styling with responsive design
├── script.js     # SIP calculations and investment plan logic
├── README.md     # This documentation
└── LICENSE       # MIT License
```

## Usage Examples

### SIP Calculation
1. Enter monthly investment amount (e.g., ₹5,000)
2. Set expected annual return (default: 12%)
3. Choose investment period in years (e.g., 10)
4. Click "Calculate" to see projected returns

**Example Result:**
- Monthly Investment: ₹5,000
- Period: 10 years
- Annual Return: 12%
- **Total Investment**: ₹6,00,000
- **Estimated Returns**: ₹5,61,695
- **Total Value**: ₹11,61,695

### Investment Plan Ideas
1. Enter your age (e.g., 30)
2. Enter monthly income (e.g., ₹80,000)
3. Select risk profile (Conservative/Moderate/Aggressive)
4. Choose investment goal (Retirement/Wealth/Education/House/Short-term)
5. Click "Get Plan Ideas" for personalized recommendations

## Technical Details

### SIP Formula Implementation
The calculator uses the standard compound interest formula for SIP:
- `P` = Monthly investment amount
- `r` = Monthly rate of return (annual rate / 12 / 100)
- `n` = Number of months (years × 12)
- `FV` = Future Value

### Rule-Based Investment Logic
- **Investment Percentage**: 10-30% of income based on age and risk profile
- **Asset Allocation**: 
  - Aggressive: max(100 - age, 60)% equity
  - Moderate: max(100 - age, 40)% equity
  - Conservative: max(70 - age, 20)% equity
- **Investment Horizon**: Calculated based on goal and current age

### Validation Rules
- Monthly amount: ₹500 minimum, ₹1 crore maximum
- Annual return: 1% minimum, 30% maximum
- Investment period: 1 year minimum, 40 years maximum
- Age: 18 minimum, 100 maximum
- Monthly income: ₹10,000 minimum

## Browser Compatibility

Works on all modern browsers:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Opera 76+

## Screenshots

### Desktop View
![Initial Page](https://github.com/user-attachments/assets/54f08a30-c97a-44ff-a684-68b672d90e89)

### SIP Calculator Results
![SIP Results](https://github.com/user-attachments/assets/75ce1e66-be01-4031-b9dc-e72e305ff8f1)

### Investment Plan Ideas
![Investment Plan](https://github.com/user-attachments/assets/676fe9b4-c261-4ba8-82d0-fd50b75a99d1)

### Mobile Responsive
![Mobile View](https://github.com/user-attachments/assets/545e6af7-b78b-4487-a3bd-84beca211d11)

## Important Disclaimer

⚠️ **SEBI Compliance Notice**: This calculator and plan idea maker are for informational and educational purposes only. The calculations shown are based on assumed rates of return and mathematical formulas. Past performance is not indicative of future results.

This tool does NOT provide investment advice, recommendations, or guarantees of returns. No specific mutual funds, securities, or investment products are recommended. The investment ideas presented are general in nature and based on rule-based logic.

Before making any investment decisions, please consult with a qualified financial advisor and read all scheme-related documents carefully. Mutual fund investments are subject to market risks.

## License

MIT License - See [LICENSE](LICENSE) file for details

## Contributing

This is an educational project. Feel free to fork and modify for your own learning purposes.

## Author

Built for educational purposes to demonstrate clean, production-ready web development practices. 
