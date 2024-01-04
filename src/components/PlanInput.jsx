import { useState } from "react";
import "./PlanInput.css";
import NumberInput from "./NumberInput";
import RadioInput from "./RadioInput";

function Planinput({ shopifyPlanArr }) {
  const [revenue, setRevenue] = useState(0);
  const [orders, setOrders] = useState(0);
  const [shopifyPayments, setShopifyPayments] = useState(true);
  const [feeper, setFeeper] = useState(2.9);
  const [feeCent, setFeeCent] = useState();

  const handleRevenueChange = (event) => setRevenue(event.target.value);
  const handleOrderChange = (event) => setOrders(event.target.value);
  const handleShopifyPaymentChange = (value) => setShopifyPayments(value);
  const handleFeeperChange = (event) => setFeeper(event.target.value);
  const handleFeeCentChange = (event) => setFeeCent(event.target.value);

  const turnToDecimal = (num) => {
    return num / 100;
  };

  const generateSalesObj = ({
    name,
    id,
    cost,
    creditCardFee,
    transactionFee,
    centsPerTransaction,
  }) => {
    try {
      const salesObj = {
        monthlyRevenue: parseInt(revenue),
        creditCardFee: parseFloat(creditCardFee),
        centsPerTransaction: parseInt(centsPerTransaction),
        ordersPerMonth: parseInt(orders),
        transactionFee: transactionFee,
        usingShopifyPayments: shopifyPayments,
        planCost: cost,
      };

      if (shopifyPayments === false) {
        salesObj.creditCardFee = parseFloat(feeper);
        salesObj.centsPerTransaction = parseInt(feeCent);
      }

      return salesObj;
    } catch {
      console.log("There was an error in creating the sales object");
    }
  };

  const calculateCreditFee = ({
    monthlyRevenue,
    ordersPerMonth,
    creditCardFee,
    centsPerTransaction,
  }) => {
    try {
      console.log("monthlyRevenue", monthlyRevenue);
      console.log("ordersPerMonth", ordersPerMonth);
      console.log("creditCardFee", creditCardFee);
      console.log("centsPerTransaction", centsPerTransaction);
      return turnToDecimal(
        monthlyRevenue * creditCardFee + centsPerTransaction * ordersPerMonth
      );
    } catch (err) {
      console.log("Calculation Error: Could not do calculation properly");
    }
  };

  const calculateTransactionFee = ({ monthlyRevenue, transactionFee }) => {
    try {
      return turnToDecimal(monthlyRevenue * transactionFee);
    } catch {
      console.log("Calculation Error: Could not do calculation properly");
    }
  };

  const monkeyKept = (salesObj) => {
    const { usingShopifyPayments, planCost, monthlyRevenue } = salesObj;
    if (!usingShopifyPayments) {
      const creditCardFee = calculateCreditFee(salesObj);
      const transactionFee = calculateTransactionFee(salesObj);
      const totalFees = creditCardFee + transactionFee + planCost;

      return monthlyRevenue - totalFees;
    }

    const creditCardFee = calculateCreditFee(salesObj);
    const totalFees = creditCardFee + planCost;
    return monthlyRevenue - totalFees;
  };

  const bestDeal = (planArr) => {
    let bestDeal;
    let currentPlan;

    if (!Array.isArray(planArr)) return null;

    planArr.forEach((plan) => {
      const salesObj = generateSalesObj(plan);
      const moneyKept = monkeyKept(salesObj);
      console.log("money kept so far", moneyKept);

      if (!bestDeal || bestDeal < moneyKept) {
        bestDeal = moneyKept;
        currentPlan = plan;
      }
    });

    return {
      profit: bestDeal,
      recommendedPlan: currentPlan,
    };
  };

  const initCalculation = () => {
    const { profit, recommendedPlan } = bestDeal(shopifyPlanArr);
    console.log("Plan to recommend for customer", recommendedPlan);
    console.log("profit made", profit);
  };

  const testing = () => {
    shopifyPlanArr.forEach((plan) => {
      const salesObj = generateSalesObj(plan);
      console.log(salesObj);
    });
  };
  return (
    <div className="input-data">
      <NumberInput
        text="Enter your estimated monthly revenue to see which plan is right for you:"
        placeholder="Monthly Sales"
        handler={handleRevenueChange}
      />

      <NumberInput
        text="Enter your number of orders per month?"
        placeholder="100"
        handler={handleOrderChange}
      />

      <RadioInput
        text="Are you using Shopify Platforms?"
        name="shopifypayments"
        value1={true}
        handler={handleShopifyPaymentChange}
        label1="Yes, I use Shopify Payments"
        value2={false}
        label2="No, I use 3rd-party payments"
        valuestate={shopifyPayments}
      />

      <div>
        <p>External payment gateway fees</p>
        <div>
          <input type="number" value="2.9" onChange={handleFeeperChange} />% +{" "}
          <input
            type="number"
            placeholder="0"
            value="30"
            onChange={handleFeeCentChange}
          />
          ¢
        </div>
      </div>

      <button onClick={testing}>Test SalesObj</button>
      <button onClick={initCalculation}>Calculate</button>
    </div>
  );
}

export default Planinput;
