<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Query\Expression;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->unique()->constrained()->onDelete('cascade');
            $table->string('picture_path', 255)->nullable();
            $table->date('date_of_birth')->nullable();
            $table->string('address', 255)->nullable();
            $table->string('phone_number', 30)->nullable();   // Optimisé à 30 caractères
            $table->string('phone_number_2', 30)->nullable(); // Optimisé à 30 caractères
            $table->string('nationality', 100)->nullable();
            $table->string('flag', 50)->nullable();           // Souvent un code ISO ou une classe d'icône
            $table->text('bio')->nullable();                  // Changé en TEXT pour éviter la limite des 255 caractères
            $table->string('feeling_emoji', 20)->nullable();  // Limité car un emoji prend peu de place
            $table->text('description')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profiles');
    }
};
