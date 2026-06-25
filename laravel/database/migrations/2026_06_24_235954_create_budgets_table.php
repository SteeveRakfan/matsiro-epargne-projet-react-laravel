<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('budgets', function (Blueprint $table) {
            $table->id();
            $table->string('period'); // Format "YYYY-MM" (ex: "2026-06")
            
            // Vos données d'entrée
            $table->decimal('initial_funds', 10, 2); // Le capital ou fond initial disponible
            $table->decimal('target_savings', 10, 2)->default(0.00); // L'objectif d'épargne à sécuriser
            
            // La part allouée à l'alimentation (calculée ou saisie)
            $table->decimal('food_budget_allocated', 8, 2); // Ex: 400.00 € pour le mois
            
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('budgets');
    }
};
