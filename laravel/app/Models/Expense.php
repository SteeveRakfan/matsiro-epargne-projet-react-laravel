<?php
// app/Models/Expense.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Expense extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'category_id',
        'title',
        'description',
        'amount',
        'date',
        'payment_method',
        'reference_number',
        'receipt_path',
        'is_recurring',
        'recurring_frequency',
        'recurring_end_date',
        'status',
    ];

    protected $casts = [
        'date' => 'date',
        'recurring_end_date' => 'date',
        'amount' => 'decimal:2',
        'is_recurring' => 'boolean',
    ];

    /**
     * Get the user that owns the expense.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the category that the expense belongs to.
     */
    public function category()
    {
        return $this->belongsTo(ExpenseCategory::class);
    }

    /**
     * Scope a query to only include expenses for a specific user.
     */
    public function scopeForUser($query, $userId)
    {
        return $query->where('user_id', $userId);
    }

    /**
     * Scope a query to only include expenses between two dates.
     */
    public function scopeBetweenDates($query, $startDate, $endDate)
    {
        return $query->whereBetween('date', [$startDate, $endDate]);
    }

    /**
     * Scope a query to only include expenses by status.
     */
    public function scopeByStatus($query, $status)
    {
        return $query->where('status', $status);
    }

    /**
     * Scope a query to only include expenses by category.
     */
    public function scopeByCategory($query, $categoryId)
    {
        return $query->where('category_id', $categoryId);
    }

    /**
     * Scope a query to only include recurring expenses.
     */
    public function scopeRecurring($query)
    {
        return $query->where('is_recurring', true);
    }
}