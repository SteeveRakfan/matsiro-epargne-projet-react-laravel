<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ExpenseCategoryController;
use App\Http\Controllers\Api\ExpenseController;
use Illuminate\Support\Facades\Route;

// 1. Routes PUBLIQUES (Accessibles sans être connecté)
Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);

// 2. Routes PRIVÉES (Accessibles uniquement si connecté via Sanctum)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'authUser']); 
    // Routes des catégories
    Route::get('/expense_categories', [ExpenseCategoryController::class, 'index']);
    Route::post('/expense_categories', [ExpenseCategoryController::class, 'store']);
    Route::delete('/expense_categories/{category}', [ExpenseCategoryController::class, 'destroy']);
    
    Route::get('/expenses/totals', [ExpenseController::class, 'totals']);
    Route::get('/expenses', [ExpenseController::class, 'index']);
    Route::post('/expenses', [ExpenseController::class, 'store']);
    Route::get('/expenses/{expense}', [ExpenseController::class, 'show']);
    Route::put('/expenses/{expense}', [ExpenseController::class, 'update']);
    Route::delete('/expenses/{expense}', [ExpenseController::class, 'destroy']);
    
});
