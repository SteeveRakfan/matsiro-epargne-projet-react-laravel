<?php
// app/Http/Controllers/ExpenseController.php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Expense;
use App\Models\ExpenseCategory;
use Illuminate\Http\Request;

class ExpenseController extends Controller
{
    /**
     * Afficher la liste des dépenses
     */
    public function index(Request $request)
    {
        $query = Expense::with('category')
            ->forUser(auth()->id());

        // Filtre par catégorie
        if ($request->has('category_id')) {
            $query->byCategory($request->category_id);
        }

        // Filtre par statut
        if ($request->has('status')) {
            $query->byStatus($request->status);
        }

        // Filtre par période
        if ($request->has('start_date') && $request->has('end_date')) {
            $query->betweenDates($request->start_date, $request->end_date);
        }

        // Filtre par date
        if ($request->has('date')) {
            $query->whereDate('date', $request->date);
        }

        $expenses = $query->orderBy('date', 'desc')
            ->paginate($request->per_page ?? 5);

        return response()->json([
            'success' => true,
            'expenses' => $expenses
        ]);
    }

    /**
     * Créer une nouvelle dépense
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:expense_categories,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'amount' => 'required|numeric|min:0.01',
            'date' => 'required|date',
            'payment_method' => 'required|in:cash,bank_transfer,credit_card,mobile_money,check,other',
            'reference_number' => 'nullable|string|max:100',
            'status' => 'sometimes|in:pending,paid,cancelled,refunded',
            'is_recurring' => 'sometimes|boolean',
            'recurring_frequency' => 'nullable|in:daily,weekly,monthly,yearly',
            'recurring_end_date' => 'nullable|date|after:date',
        ]);

        // Vérifier que l'utilisateur a accès à cette catégorie
        $category = ExpenseCategory::accessibleByUser(auth()->id())
            ->find($validated['category_id']);

        if (!$category) {
            return response()->json([
                'success' => false,
                'message' => 'Catégorie non trouvée ou non accessible.'
            ], 404);
        }

        $expense = Expense::create([
            'user_id' => auth()->id(),
            'category_id' => $validated['category_id'],
            'title' => $validated['title'],
            'description' => $validated['description'] ?? null,
            'amount' => $validated['amount'],
            'date' => $validated['date'],
            'payment_method' => $validated['payment_method'],
            'reference_number' => $validated['reference_number'] ?? null,
            'status' => $validated['status'] ?? 'paid',
            'is_recurring' => $validated['is_recurring'] ?? false,
            'recurring_frequency' => $validated['recurring_frequency'] ?? null,
            'recurring_end_date' => $validated['recurring_end_date'] ?? null,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Dépense créée avec succès',
            'expense' => $expense->load('category')
        ], 201);
    }

    /**
     * Afficher une dépense spécifique
     */
    public function show(Expense $expense)
    {
        // Vérifier que la dépense appartient à l'utilisateur
        if ($expense->user_id !== auth()->id()) {
            return response()->json([
                'success' => false,
                'message' => 'Vous n\'avez pas accès à cette dépense.'
            ], 403);
        }

        return response()->json([
            'success' => true,
            'data' => $expense->load('category')
        ]);
    }

    /**
     * Mettre à jour une dépense
     */
    public function update(Request $request, Expense $expense)
    {
        // Vérifier que la dépense appartient à l'utilisateur
        if ($expense->user_id !== auth()->id()) {
            return response()->json([
                'success' => false,
                'message' => 'Vous ne pouvez pas modifier cette dépense.'
            ], 403);
        }

        $validated = $request->validate([
            'category_id' => 'sometimes|exists:expense_categories,id',
            'title' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'amount' => 'sometimes|numeric|min:0.01',
            'date' => 'sometimes|date',
            'payment_method' => 'sometimes|in:cash,bank_transfer,credit_card,mobile_money,check,other',
            'reference_number' => 'nullable|string|max:100',
            'status' => 'sometimes|in:pending,paid,cancelled,refunded',
            'is_recurring' => 'sometimes|boolean',
            'recurring_frequency' => 'nullable|in:daily,weekly,monthly,yearly',
            'recurring_end_date' => 'nullable|date|after:date',
        ]);

        // Si la catégorie est modifiée, vérifier l'accès
        if (isset($validated['category_id'])) {
            $category = ExpenseCategory::accessibleByUser(auth()->id())
                ->find($validated['category_id']);

            if (!$category) {
                return response()->json([
                    'success' => false,
                    'message' => 'Catégorie non trouvée ou non accessible.'
                ], 404);
            }
        }

        $expense->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Dépense mise à jour avec succès',
            'expense' => $expense->fresh()->load('category')
        ]);
    }

    /**
     * Supprimer une dépense
     */
    public function destroy(Expense $expense)
    {
        if ($expense->user_id !== auth()->id()) {
            return response()->json([
                'success' => false,
                'message' => 'Vous ne pouvez pas supprimer cette dépense.'
            ], 403);
        }

        $expense->delete();

        return response()->json([
            'success' => true,
            'message' => 'Dépense supprimée avec succès'
        ]);
    }

    /**
     * Récupérer le total des dépenses pour une période
     */
    public function totals(Request $request)
    {
        $request->validate([
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'category_id' => 'nullable|exists:expense_categories,id',
        ]);

        $query = Expense::forUser(auth()->id())
            ->betweenDates($request->start_date, $request->end_date);

        if ($request->has('category_id')) {
            $query->byCategory($request->category_id);
        }

        $total = $query->sum('amount');

        // Détail par catégorie
        $byCategory = Expense::forUser(auth()->id())
            ->betweenDates($request->start_date, $request->end_date)
            ->with('category')
            ->selectRaw('category_id, SUM(amount) as total')
            ->groupBy('category_id')
            ->get();

        return response()->json([
            'success' => true,
            'data' => [
                'total' => $total,
                'period' => [
                    'start' => $request->start_date,
                    'end' => $request->end_date
                ],
                'by_category' => $byCategory
            ]
        ]);
    }
}