// config/expenseConfig.js
import { getTodayDateString } from "../../services/utilities";
export const initialExpenseForm = {
  title: "",
  description: "",
  amount: "",
  date: getTodayDateString(),
  category_id: "",
  payment_method: "cash",
  reference_number: "",
  status: "paid",
  is_recurring: false,
  recurring_frequency: "",
  recurring_end_date: "",
};

export const expenseFieldsConfig = [
  { name: "title", label: "Title" },
  { name: "description", label: "Description", textarea: true },
  { name: "amount", label: "Amount", number: true },
  { name: "date", label: "Date", date: true },
  { name: "category_id", label: "Category", select: true, options: [] },
  {
    name: "payment_method",
    label: "Payment method",
    select: true,
    options: [
      { name: "Cash", value: "cash" },
      { name: "Bank transfer", value: "bank_transfer" },
      { name: "credit card", value: "credit_card" },
      { name: "Mobile money", value: "mobile_money" },
      { name: "Check", value: "check" },
      { name: "Other", value: "other" },
    ],
  },
  { name: "reference_number", label: "Reference number", notRequired: true },
  {
    name: "status",
    label: "Status",
    select: true,
    options: [
      { name: "Paid", value: "paid" },
      { name: "Pending", value: "pending" },
      { name: "Cancelled", value: "cancelled" },
      { name: "Refunded", value: "refunded" },
    ],
  },
  {
    name: "is_recurring",
    label: "Is it a regular expense? (daily, weekly, monthly, yearly)",
    checkbox: true,
    groupLeader: true,
    group: "recurrence",
    notRequired: true,
  },
  {
    name: "recurring_frequency",
    label: "Recurring frequency",
    group: "recurrence",
  },
  {
    name: "recurring_end_date",
    label: "Recurring end date",
    group: "recurrence",
    date: true,
    notRequired: true,
  },
  // ... Mettez le reste de vos champs ici
];
