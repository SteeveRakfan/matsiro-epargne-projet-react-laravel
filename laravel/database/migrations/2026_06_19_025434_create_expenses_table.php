<?php
// database/migrations/xxxx_xx_xx_create_expenses_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('expenses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('category_id')->constrained('expense_categories')->onDelete('cascade');
            $table->string('title');
            $table->text('description')->nullable();
            $table->decimal('amount', 15, 2);
            $table->date('date');
            $table->enum('payment_method', ['cash', 'bank_transfer', 'credit_card', 'mobile_money', 'check', 'other'])
                ->default('cash');
            $table->string('reference_number')->nullable();
            $table->string('receipt_path')->nullable();
            $table->boolean('is_recurring')->default(false);
            $table->string('recurring_frequency')->nullable(); // daily, weekly, monthly, yearly
            $table->date('recurring_end_date')->nullable();
            $table->enum('status', ['pending', 'paid', 'cancelled', 'refunded'])->default('paid');
            $table->timestamps();
            
            // Index pour améliorer les performances
            $table->index(['date', 'user_id']);
            $table->index(['category_id', 'user_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('expenses');
    }
};