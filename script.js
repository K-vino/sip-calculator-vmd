// SIP Calculator and Investment Plan Maker
// All calculations and recommendations are for educational purposes only

// Utility functions
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(amount);
};

const validateNumber = (value, min, max, fieldName) => {
    const num = parseFloat(value);
    
    if (isNaN(num) || value.trim() === '') {
        return `${fieldName} is required`;
    }
    
    if (num < min) {
        return `${fieldName} must be at least ${min}`;
    }
    
    if (num > max) {
        return `${fieldName} must not exceed ${max}`;
    }
    
    return null;
};

const showError = (fieldId, message) => {
    const errorElement = document.getElementById(`${fieldId}Error`);
    const inputElement = document.getElementById(fieldId);
    
    if (message) {
        errorElement.textContent = message;
        inputElement.classList.add('error');
        return false;
    } else {
        errorElement.textContent = '';
        inputElement.classList.remove('error');
        return true;
    }
};

// SIP Calculator using the standard SIP formula
// Future Value = P × ((1 + r)^n - 1) / r) × (1 + r)
// Where P = monthly investment, r = monthly rate of return, n = number of months
const calculateSIP = (monthlyAmount, annualReturn, years) => {
    const monthlyRate = annualReturn / 12 / 100;
    const months = years * 12;
    
    // Standard SIP formula
    const futureValue = monthlyAmount * 
                       (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * 
                        (1 + monthlyRate));
    
    const totalInvestment = monthlyAmount * months;
    const estimatedReturns = futureValue - totalInvestment;
    
    return {
        totalInvestment: Math.round(totalInvestment),
        estimatedReturns: Math.round(estimatedReturns),
        totalValue: Math.round(futureValue)
    };
};

// Rule-based Investment Plan Idea Maker
const generateInvestmentPlan = (age, monthlyIncome, riskProfile, investmentGoal) => {
    const recommendations = [];
    
    // Calculate suggested investment amount (10-30% of income based on age and risk)
    let investmentPercentage;
    if (age < 30) {
        investmentPercentage = riskProfile === 'aggressive' ? 30 : riskProfile === 'moderate' ? 25 : 20;
    } else if (age < 45) {
        investmentPercentage = riskProfile === 'aggressive' ? 25 : riskProfile === 'moderate' ? 20 : 15;
    } else {
        investmentPercentage = riskProfile === 'aggressive' ? 20 : riskProfile === 'moderate' ? 15 : 10;
    }
    
    const suggestedAmount = Math.round((monthlyIncome * investmentPercentage) / 100);
    
    // Asset allocation based on age and risk profile
    let equityAllocation, debtAllocation;
    
    if (riskProfile === 'aggressive') {
        equityAllocation = Math.max(100 - age, 60);
        debtAllocation = 100 - equityAllocation;
    } else if (riskProfile === 'moderate') {
        equityAllocation = Math.max(100 - age, 40);
        debtAllocation = 100 - equityAllocation;
    } else {
        equityAllocation = Math.max(70 - age, 20);
        debtAllocation = 100 - equityAllocation;
    }
    
    // Investment horizon based on goal and age
    let investmentHorizon;
    let goalDescription;
    
    switch (investmentGoal) {
        case 'retirement':
            investmentHorizon = Math.max(60 - age, 5);
            goalDescription = 'building a retirement corpus';
            break;
        case 'wealth':
            investmentHorizon = 15;
            goalDescription = 'long-term wealth creation';
            break;
        case 'education':
            investmentHorizon = age < 40 ? 15 : 10;
            goalDescription = 'child\'s education planning';
            break;
        case 'house':
            investmentHorizon = 10;
            goalDescription = 'saving for a home purchase';
            break;
        case 'short-term':
            investmentHorizon = 3;
            goalDescription = 'achieving short-term financial goals';
            break;
        default:
            investmentHorizon = 10;
            goalDescription = 'general investment goals';
    }
    
    // Generate recommendations
    recommendations.push({
        title: 'Suggested Monthly Investment',
        content: `Based on your monthly income of ${formatCurrency(monthlyIncome)} and your ${riskProfile} risk profile, consider investing around ${formatCurrency(suggestedAmount)} per month (${investmentPercentage}% of income). This amount balances your current lifestyle needs with future financial goals.`
    });
    
    recommendations.push({
        title: 'Recommended Asset Allocation',
        content: `For ${goalDescription}, consider an asset allocation approach:`,
        list: [
            `Equity-oriented investments: ${equityAllocation}% (for growth potential)`,
            `Debt-oriented investments: ${debtAllocation}% (for stability and capital preservation)`,
            `This allocation aligns with your age (${age} years) and ${riskProfile} risk profile`
        ]
    });
    
    recommendations.push({
        title: 'Investment Horizon',
        content: `For your goal of ${goalDescription}, consider a time horizon of approximately ${investmentHorizon} years. Longer investment horizons generally allow for better wealth accumulation through the power of compounding.`
    });
    
    // Additional strategies based on risk profile
    let strategy = {
        title: 'Investment Strategy Ideas',
        list: []
    };
    
    if (riskProfile === 'aggressive') {
        strategy.list = [
            'Focus on equity mutual funds with diversified portfolios',
            'Consider a mix of large-cap, mid-cap, and small-cap exposure',
            'Stay invested for the long term to ride out market volatility',
            'Review and rebalance your portfolio annually'
        ];
    } else if (riskProfile === 'moderate') {
        strategy.list = [
            'Balance between equity and debt mutual funds',
            'Consider hybrid or balanced funds for diversification',
            'Maintain emergency fund in liquid instruments',
            'Gradually increase debt allocation as you near your goal'
        ];
    } else {
        strategy.list = [
            'Prioritize debt mutual funds and fixed-income instruments',
            'Consider equity exposure only for very long-term goals',
            'Focus on capital preservation and steady returns',
            'Keep sufficient liquidity for emergencies'
        ];
    }
    
    recommendations.push(strategy);
    
    // Tax-saving suggestion
    if (investmentGoal !== 'short-term') {
        recommendations.push({
            title: 'Tax Planning',
            content: 'Consider tax-saving investment options like ELSS (Equity Linked Savings Scheme) to optimize your tax liability under Section 80C, while also building wealth for your long-term goals.'
        });
    }
    
    // Important note
    recommendations.push({
        title: 'Review and Adjust',
        content: 'These are general ideas based on common investment principles. Your actual investment decisions should be made after consulting with a SEBI-registered investment advisor who can consider your complete financial situation, existing investments, and specific requirements.'
    });
    
    return recommendations;
};

// SIP Form Handler
document.getElementById('sipForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const monthlyAmount = document.getElementById('monthlyAmount').value;
    const annualReturn = document.getElementById('annualReturn').value;
    const years = document.getElementById('years').value;
    
    // Validate inputs
    let isValid = true;
    
    const monthlyAmountError = validateNumber(monthlyAmount, 500, 10000000, 'Monthly amount');
    isValid = showError('monthlyAmount', monthlyAmountError) && isValid;
    
    const annualReturnError = validateNumber(annualReturn, 1, 30, 'Annual return');
    isValid = showError('annualReturn', annualReturnError) && isValid;
    
    const yearsError = validateNumber(years, 1, 40, 'Investment period');
    isValid = showError('years', yearsError) && isValid;
    
    if (!isValid) {
        return;
    }
    
    // Calculate SIP
    const results = calculateSIP(
        parseFloat(monthlyAmount),
        parseFloat(annualReturn),
        parseFloat(years)
    );
    
    // Display results
    document.getElementById('totalInvestment').textContent = formatCurrency(results.totalInvestment);
    document.getElementById('estimatedReturns').textContent = formatCurrency(results.estimatedReturns);
    document.getElementById('totalValue').textContent = formatCurrency(results.totalValue);
    
    // Show results section
    document.getElementById('sipResults').classList.remove('hidden');
    
    // Smooth scroll to results
    document.getElementById('sipResults').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

// Investment Plan Form Handler
document.getElementById('planForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const age = document.getElementById('age').value;
    const monthlyIncome = document.getElementById('monthlyIncome').value;
    const riskProfile = document.getElementById('riskProfile').value;
    const investmentGoal = document.getElementById('investmentGoal').value;
    
    // Validate inputs
    let isValid = true;
    
    const ageError = validateNumber(age, 18, 100, 'Age');
    isValid = showError('age', ageError) && isValid;
    
    const incomeError = validateNumber(monthlyIncome, 10000, 100000000, 'Monthly income');
    isValid = showError('monthlyIncome', incomeError) && isValid;
    
    if (!riskProfile) {
        showError('riskProfile', 'Please select a risk profile');
        isValid = false;
    } else {
        showError('riskProfile', null);
    }
    
    if (!investmentGoal) {
        showError('investmentGoal', 'Please select an investment goal');
        isValid = false;
    } else {
        showError('investmentGoal', null);
    }
    
    if (!isValid) {
        return;
    }
    
    // Generate investment plan
    const recommendations = generateInvestmentPlan(
        parseInt(age),
        parseFloat(monthlyIncome),
        riskProfile,
        investmentGoal
    );
    
    // Display recommendations
    const planContent = document.getElementById('planContent');
    planContent.innerHTML = '';
    
    recommendations.forEach(rec => {
        const recDiv = document.createElement('div');
        recDiv.className = 'plan-recommendation';
        
        let html = `<h4>${rec.title}</h4>`;
        
        if (rec.content) {
            html += `<p>${rec.content}</p>`;
        }
        
        if (rec.list) {
            html += '<ul>';
            rec.list.forEach(item => {
                html += `<li>${item}</li>`;
            });
            html += '</ul>';
        }
        
        recDiv.innerHTML = html;
        planContent.appendChild(recDiv);
    });
    
    // Show results section
    document.getElementById('planResults').classList.remove('hidden');
    
    // Smooth scroll to results
    document.getElementById('planResults').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

// Clear errors on input
document.querySelectorAll('input, select').forEach(element => {
    element.addEventListener('input', function() {
        showError(this.id, null);
    });
});

// Initialize - add any startup logic here
console.log('SIP Calculator initialized - For educational purposes only');
