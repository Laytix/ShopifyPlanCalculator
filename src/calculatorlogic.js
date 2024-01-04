const calculator = document.getElementById("calculator");
const calculateButton = document.getElementById("calculate-button");
const salesInput = document.getElementById("sales-input");
const resultDiv = document.getElementById("result");

const shopifyPlanArr = [
  {
    name: "basic",
    id: "shopify-basic",
    cost: 29,
    creditCardFee: 2.9,
    transactionFee: 2,
    centsPerTransaction: 30,
  },
  {
    name: "regular",
    id: "shopify-reg",
    cost: 79,
    creditCardFee: 2.6,
    transactionFee: 1,
    centsPerTransaction: 30,
  },
  {
    name: "advanced",
    id: "shopify-adv",
    cost: 299,
    creditCardFee: 2.4,
    transactionFee: 0.5,
    centsPerTransaction: 30,
  },
  {
    name: "plus",
    id: "shopify-plus",
    cost: 2000,
    creditCardFee: 2.15,
    transactionFee: 0.15,
    centsPerTransaction: 30,
  },
];

document
  .querySelector("#plan-comparison td:nth-child(2)")
  .classList.add("highlight");

const turnToDecimal = (num) => {
  return num / 100;
};

//Step 1 Code
const generateSalesObj = ({
  name,
  id,
  cost,
  creditCardFee,
  transactionFee,
  centsPerTransaction,
}) => {
  try {
    const monthlyRevenue = document.querySelector("#sales-input").value;
    const orders = document.querySelector("#orders").value;
    const paymentRadioOption = document.querySelector(
      "input[name = 'payment-option']:checked"
    );
    const usingShopifyPayments =
      paymentRadioOption.value === "shopify" ? true : false;

    const salesObj = {
      monthlyRevenue: parseInt(monthlyRevenue),
      creditCardFee: parseFloat(creditCardFee), // is a DOM Value if not using Shopify payments
      centsPerTransaction: parseInt(centsPerTransaction),
      ordersPerMonth: parseInt(orders), //DOM Value
      transactionFee: transactionFee, //could pontetially put a boolean here and get the percentage a different way
      usingShopifyPayments: usingShopifyPayments, // DOM Value
      planCost: cost,
    };

    if (!usingShopifyPayments) {
      //reset credit fee if not using shopify payments
      const uiCreditFee = document.querySelector("#feeper").value;
      const uiCentsPerTrans = document.querySelector("#feecent").value;

      salesObj.creditCardFee = parseFloat(uiCreditFee);
      salesObj.centsPerTransaction = parseInt(uiCentsPerTrans);
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

//This function will calculate the total money lost in 3rd party fees in a specific plan
const calculateTransactionFee = ({ monthlyRevenue, transactionFee }) => {
  try {
    return turnToDecimal(monthlyRevenue * transactionFee);
  } catch {
    console.log("Calculation Error: Could not do calculation properly");
  }
};

//Step 2 Code
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

//Step 3 Code
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

/*Pseudocode to make this work 

1. Calculate Total Fees based on monthly revenue [X]
  -if using Shopify Payments fees will just be cost of plan and credit card fees for Shopify Payments
  -if using 3rd party payment gateways, it needs to be credit card fees, cost of plan and transaction fees for 3rd party payments

2. Subtract total fees from step #1 from the monthly revenue to see how much money the person will keep on the current plan [X]

3. Do the calculations from step #1 and #2 for each plan

4. Return the plan that allows the person to keep the most money

5. Show the recommended plan in the UI

6. Figure out how a way to show person at which revenue numbers would it make sense to switch to another plan assuming they are using the same payment gateway

7. Figure out how to use javascript to generate a pdf report for the customer to send to them vie email

8. Figure out how to take the email submitted for the pdf report and add it to my ghost email list so they can be marketed to later
  -Maybe even apply a tag to that person so they can be marketed to with all of our most popular posts so far since they are new
  

//Sample format for Sales Object used throughout code
salesObj = {
  monthlyRevenue: 5000,
  princialPercentage: 2.5,
  centsPerTransaction: 30,
  ordersPerMonth: 1000,
  thirdPartyFeePercentage: 2%, //could pontetially put a boolean here and get the percentage a different way
  usingShopifyPayments: true, 
  selectedPlanName: regular,
  selectedPlanCost: 30
}

plansArr = [
  {
    name: "basic",
    id: "shopify-basic",
    cost: 29,
    creditFee: 2.9,
    transactionFee: 2,
    centsPerTransaction: 30
  },
  {
    name: "regular",
    id: "shopify-reg",
    cost: 79,
    creditFee: 2.6,
    transactionFee: 1,
    centsPerTransaction: 30
  },
  {
    name: "advanced",
    id: "shopify-adv",
    cost: 299,
    creditFee: 2.4,
    transactionFee: 0.5,
    centsPerTransaction: 30
  },
  {
    name: "plus",
    id: "shopify-plus",
    cost: 2000,
    creditFeePercentage: 2.15,
    transactionFee: 0.15,
    centsPerTransaction: 30
  }
]









*/

calculateButton.addEventListener("click", (evt) => {
  evt.preventDefault();
  initCalculation();
});
