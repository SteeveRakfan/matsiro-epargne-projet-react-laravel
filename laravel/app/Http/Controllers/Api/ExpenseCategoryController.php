<?php
// app/Http/Controllers/ExpenseCategoryController.php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ExpenseCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ExpenseCategoryController extends Controller
{
    /**
     * Afficher la liste des catégories accessibles
     */
    public function index()
    {
        $categories = ExpenseCategory::accessibleByUser(auth()->id())
            ->orderBy('name')
            ->get();

        return response()->json([
            'success' => true,
            'expense_categories' => $categories
        ]);
    }

    /**
     * Créer une nouvelle catégorie personnalisée
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'icon' => 'nullable|string|max:50',
            'color' => 'nullable|string|max:7',
        ]);

        // Vérifier si la catégorie existe déjà pour cet utilisateur
        $exists = ExpenseCategory::where('user_id', auth()->id())
            ->where('name', $validated['name'])
            ->exists();

        if ($exists) {
            return response()->json([
                'success' => false,
                'message' => 'Cette catégorie existe déjà.'
            ], 422);
        }

        $category = ExpenseCategory::create([
            'name' => $validated['name'],
            'slug' => Str::slug($validated['name']),
            'description' => $validated['description'] ?? null,
            'icon' => $validated['icon'] ?? null,
            'color' => $validated['color'] ?? '#808080',
            'user_id' => auth()->id(),
            'is_default' => false,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Catégorie créée avec succès',
            'data' => $category
        ], 201);
    }

    /**
     * Supprimer une catégorie personnalisée
     */
    public function destroy(ExpenseCategory $category)
    {
        // Vérifier que la catégorie appartient à l'utilisateur
        if ($category->user_id !== auth()->id()) {
            return response()->json([
                'success' => false,
                'message' => 'Vous ne pouvez pas supprimer cette catégorie.'
            ], 403);
        }

        if ($category->is_default) {
            return response()->json([
                'success' => false,
                'message' => 'Vous ne pouvez pas supprimer une catégorie par défaut.'
            ], 403);
        }

        // Vérifier si la catégorie a des dépenses associées
        if ($category->expenses()->exists()) {
            return response()->json([
                'success' => false,
                'message' => 'Cette catégorie contient des dépenses. Supprimez-les d\'abord.'
            ], 422);
        }

        $category->delete();

        return response()->json([
            'success' => true,
            'message' => 'Catégorie supprimée avec succès'
        ]);
    }
}