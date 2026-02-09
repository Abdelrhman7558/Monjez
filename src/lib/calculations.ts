export type FinancialData = {
    revenue: number;
    expenses: number;
    adSpend: number;
    leads: number;
    conversions: number;
};

export const calculateKPIs = (data: FinancialData) => {
    const profit = data.revenue - data.expenses;
    const margin = (profit / data.revenue) * 100;
    const roas = data.revenue / data.adSpend;
    const cpa = data.adSpend / data.conversions;

    return {
        profit,
        margin: margin.toFixed(2),
        roas: roas.toFixed(2),
        cpa: cpa.toFixed(2)
    };
};

export const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);
};
