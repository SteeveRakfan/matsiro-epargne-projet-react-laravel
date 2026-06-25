import { useContext, useEffect, useState } from "react";
import AuthNav from "../../../components/common/AuthNav";
import AuthContainer from "../../../components/common/AuthContainer";
import AuthTitle1 from "../../../components/common/AuthTitle1";
import AuthTitle2 from "../../../components/common/AuthTitle2";
import Button1 from "../../../components/common/Button1";
import Logo from "../../../components/common/Logo";
import Loading from "../../../components/common/Loading";
import ApiService from "../../../services/apiService";
// Vos nouvelles abstractions réutilisables
import DynamicFormModal from "../../../components/common/DynamicFormModal";
import { useFormManager } from "../../../hooks/useFormManager";
import { formatAmount, getTodayDateString } from "../../../services/utilities";
import {
  expenseFieldsConfig,
  initialExpenseForm,
} from "../../../config/expenseConfig/expenseConfig";
import UserContext from "../../../contexts/UserContext";
import { toast } from "react-toastify";
import Paginator from "../../../components/common/Paginator";
import Card from "../../../components/common/Card";
import OverviewCard from "../../../components/common/OverviewCard";
import { FaEllipsisVertical } from "react-icons/fa6";

export default function Expenses() {
  const { user } = useContext(UserContext);
  const [expenses, setExpenses] = useState([]);
  const [totalExpenseForm, setTotalExpenseForm] = useState({
    start_date: new Date(user?.created_at).toISOString().split("T")[0],
    end_date: new Date().toISOString().split("T")[0],
    category_id: null,
  });
  const [totalExpense, setTotalExpense] = useState(0);
  const [selectedExpense, setSelectedExpense] = useState({});
  const [perPage, setPerPage] = useState([]);
  const [currentPage, setCurrentPage] = useState([]);
  const [meta, setMeta] = useState([]);
  const [categories, setCategories] = useState([]);
  const [modalShown, setModalShown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updateMode, setUpdateMode] = useState(false);

  // Initialisation du gestionnaire de formulaire réutilisable
  const {
    form,
    fields,
    handleInputChange,
    updateFieldOptions,
    shouldRenderField,
    setForm,
  } = useFormManager(expenseFieldsConfig, {
    ...initialExpenseForm,
    user_id: user?.id,
  });

  const initData = async (page = 1) => {
    setLoading(true);
    const [expData, catData, totExpData] = await Promise.all([
      ApiService.getExpenses(page),
      ApiService.getExpenseCategories(),
      ApiService.getTotalExpense(totalExpenseForm),
    ]);
    setLoading(false);
    setExpenses(expData?.expenses?.data || []);
    setTotalExpense(totExpData?.data?.total);
    setPerPage(expData?.expenses?.per_page);
    setMeta(expData?.expenses);
    const categories = catData.expense_categories;
    setCategories(categories);
    updateFieldOptions("category_id", categories);
    setForm((prev) => ({
      ...prev,
      category_id: categories.length && categories[0].id,
    }));
  };
  useEffect(() => {
    initData();
  }, []);
  const resetForm = () => {
    setForm({
      ...initialExpenseForm,
      category_id: categories.length && categories[0].id,
    });
  };
  const deleteExpense = () => {
    setLoading(true);
    if (selectedExpense) ApiService.deleteExpense(selectedExpense.id);
    initData(currentPage);
    setModalShown(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let data = null;
      if (updateMode) {
        data = await ApiService.updateExpense(form, selectedExpense?.id);
        toast.success("Expense updated successfully !");
      } else {
        data = await ApiService.createExpense(form);
        toast.success("New expense added successfully !");
      }
      setExpenses((prev) => [data?.expense, ...prev].splice(0, perPage));
      resetForm();
      setModalShown(false);
    } catch (error) {
      toast.error("Something went wrong.");
      // throw new Error("Api error: ", error);
      if (error.response && error.response.status === 422) {
        // Cela affichera la liste exacte des champs qui posent problème
        console.error("Erreurs de validation :", error.response.data.errors);
      } else {
        console.error("Autre erreur :", error);
      }
    } finally {
      setLoading(false);
    }
  };
  //            7 000 000
  [].forEach;
  const thStyle =
    "px-3 py-4 font-semibold text-gray-400 uppercase text-[12px] tracking-wider";

  const tdStyle = "px-4 align-top text-gray-800";

  return (
    <div>
      <AuthNav />
      <AuthContainer>
        <div className="flex justify-between items-center mb-10">
          <AuthTitle1 title="Expenses" />
          <Button1 onClick={() => setModalShown(true)}>New expense +</Button1>
        </div>

        {loading ? (
          <Loading />
        ) : (
          <div className="flex flex-col gap-5">
            <section>
              <AuthTitle2 title="Overview" />
              <OverviewCard
                title="Total expense"
                value={`${formatAmount(parseInt(totalExpense), " ")} Ar`}
                label="Total expense on a specific range of date"
              >
                <button
                  className="absolute top-2 right-2 hover:scale-105 rounded-full p-px transition cursor-pointer"
                  title="Specify a range of date"
                >
                  <FaEllipsisVertical />
                </button>
              </OverviewCard>
            </section>
            <section>
              <AuthTitle2 title="Expense list" />
              <div className="overflow-x-auto shadow rounded-lg">
                {expenses?.length ? (
                  <div className="w-full overflow-x-auto rounded-lg border scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden border-slate-50 dark:border-slate-800 shadow-sm">
                    <table className="w-full min-w-[1000px] border-collapse text-[14px]table-auto align-top">
                      <thead className="bg-slate-50 dark:bg-slate-900 border-b border-gray-200 dark:border-gray-700">
                        <tr>
                          <th className={`${thStyle} p-4 whitespace-nowrap`}>
                            Title / Description
                          </th>
                          <th className={`${thStyle} p-4 whitespace-nowrap`}>
                            Amount
                          </th>
                          <th className={`${thStyle} p-4 whitespace-nowrap`}>
                            Date
                          </th>
                          <th className={`${thStyle} p-4 whitespace-nowrap`}>
                            Category
                          </th>
                          <th className={`${thStyle} p-4 whitespace-nowrap`}>
                            Payment
                          </th>
                          <th className={`${thStyle} p-4 whitespace-nowrap`}>
                            Reference
                          </th>
                          <th className={`${thStyle} p-4 whitespace-nowrap`}>
                            Status
                          </th>
                          <th className={`${thStyle} p-4 whitespace-nowrap`}>
                            Recurrence
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {expenses.map((item, index) => (
                          <tr
                            key={item.reference_number || index}
                            className="border-b border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-950 hover:bg-slate-50 dark:hover:bg-slate-700/10 transition-colors"
                            onClick={() => {
                              setModalShown(true);
                              setSelectedExpense(item);
                              setForm((prev) => {
                                return {
                                  ...prev,
                                  ...Object.fromEntries(
                                    Object.entries(item)
                                      .filter(
                                        (prop) =>
                                          prop[0] != "category" &&
                                          prop[0] != "created_at" &&
                                          prop[0] != "updated_at" &&
                                          prop[0] != "id",
                                      )
                                      .map((prop) =>
                                        prop[0].toLowerCase() == "date"
                                          ? [
                                              "date",
                                              getTodayDateString(prop[1]),
                                            ]
                                          : prop,
                                      ),
                                  ),
                                };
                              });
                              setUpdateMode(true);
                            }}
                          >
                            <td className={`${tdStyle} p-4 align-top`}>
                              <div className="font-bold text-slate-900 dark:text-white line-clamp-1">
                                {item.title || "Sans titre"}
                              </div>
                              <div className="text-[12px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2 max-w-[250px]">
                                {item.description || "-"}
                              </div>
                            </td>

                            <td
                              className={`${tdStyle} p-4 align-top font-bold text-gray-700 dark:text-slate-200 whitespace-nowrap`}
                            >
                              {formatAmount(
                                parseInt(item.amount ? `${item.amount}` : "0"),
                                " ",
                              )}
                              Ar
                            </td>

                            <td
                              className={`${tdStyle} p-4 align-top text-gray-600 dark:text-slate-400 min-w-[150px] whitespace-nowrap`}
                            >
                              {item.date ? (
                                new Date(item.date).toLocaleDateString(
                                  "en-US",
                                  {
                                    day: "2-digit",
                                    weekday: "long",
                                    month: "long",
                                    year: "numeric",
                                  },
                                )
                              ) : (
                                <span className="text-amber-600 dark:text-amber-500 font-medium">
                                  ⚠️ You should put a date here
                                </span>
                              )}
                            </td>

                            <td
                              className={`${tdStyle} p-4 align-top whitespace-nowrap`}
                            >
                              <span className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-2 py-1 rounded text-[12px]">
                                {item?.category?.name || "N/A"}
                              </span>
                            </td>

                            <td
                              className={`${tdStyle} p-4 align-top whitespace-nowrap text-slate-700 dark:text-slate-300`}
                            >
                              {item.payment_method}
                            </td>

                            <td
                              className={`${tdStyle} p-4 align-top text-gray-500 dark:text-slate-400 font-mono text-xs whitespace-nowrap`}
                            >
                              {item.reference_number || "-"}
                            </td>

                            <td
                              className={`${tdStyle} p-4 align-top whitespace-nowrap`}
                            >
                              <span
                                className={`px-2 py-1 rounded-full text-[12px] font-bold ${
                                  item.status === "paid"
                                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                    : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                                }`}
                              >
                                {item.status}
                              </span>
                            </td>

                            <td
                              className={`${tdStyle} p-4 align-top whitespace-nowrap`}
                            >
                              {item.is_recurring ? (
                                <div className="flex flex-col gap-0.5">
                                  <span className="text-blue-600 dark:text-blue-400 font-medium">
                                    🔄 {item.recurring_frequency}
                                  </span>
                                  {item.recurring_end_date && (
                                    <div className="text-[11px] text-slate-400 dark:text-slate-500">
                                      Fin: {item.recurring_end_date}
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <span className="text-slate-400 dark:text-slate-500">
                                  No recurrence
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <Paginator
                      paginationData={meta}
                      onPageChange={(page) => {
                        (initData(page), setCurrentPage(page));
                      }}
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center rounded-lg w-full py-16">
                    <Logo pale className="scale-[300%] mb-8" />
                    <p className="text-gray-500 dark:text-slate-400 font-medium mt-8 text-center">
                      No expenses yet
                    </p>
                    <p className="text-gray-500 dark:text-slate-400 font-medium text-center">
                      Click the <strong>"New expenses"</strong> button above to
                      create one.
                    </p>
                  </div>
                )}
              </div>
            </section>
          </div>
        )}
      </AuthContainer>

      {/* Formulaire totalement abstrait et réutilisable */}
      <DynamicFormModal
        isShown={modalShown}
        onClose={() => {
          setModalShown(false);
          resetForm();
          setSelectedExpense({});
          setUpdateMode(false);
        }}
        title="New Expense"
        fields={fields}
        form={form}
        onChange={handleInputChange}
        shouldRenderField={shouldRenderField}
        onSubmit={handleSubmit}
      >
        {updateMode ? (
          <button
            className="text-red-500 hover:underline text-left"
            onClick={() => {
              deleteExpense();
            }}
          >
            Drop this row ?
          </button>
        ) : (
          ""
        )}
      </DynamicFormModal>
    </div>
  );
}
