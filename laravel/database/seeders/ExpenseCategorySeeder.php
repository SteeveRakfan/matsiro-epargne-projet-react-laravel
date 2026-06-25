<?php

namespace Database\Seeders;

use App\Models\ExpenseCategory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ExpenseCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $defaultCategories = [
            [
                'name' => 'Food',
                'description' => 'Grocery shopping, restaurants, Food delivery',
                'icon' => '🍽️',
                'color' => '#FF6B6B',
            ],
            [
                'name' => 'Transport',
                'description' => 'Fuel, public transport, repair, assurance',
                'icon' => '🚗',
                'color' => '#4ECDC4',
            ],
            [
                'name' => 'Lodging',
                'description' => 'Rent, electricity, water, internet, telephone',
                'icon' => '🏠',
                'color' => '#45B7D1',
            ],
            [
                'name' => 'Health',
                'description' => 'Doctor, Medicines, teeth care, health assurance',
                'icon' => '🏥',
                'color' => '#FFA07A',
            ],
            [
                'name' => 'Education',
                'description' => 'School fees, books, formations, online courses',
                'icon' => '📚',
                'color' => '#98D8C8',
            ],
            [
                'name' => 'Divertisement',
                'description' => 'Cinema, hang-out, games, streaming subscription',
                'icon' => '🎬',
                'color' => '#DDA0DD',
            ],
            [
                'name' => 'Shopping',
                'description' => 'Clothes, devices, presents, decorations',
                'icon' => '🛍️',
                'color' => '#FFB6C1',
            ],
            [
                'name' => 'Services',
                'description' => 'Assurances, tax, professional services',
                'icon' => '💼',
                'color' => '#87CEEB',
            ],
            [
                'name' => 'Travel',
                'description' => 'Plane tickets, hotel, tourism...',
                'icon' => '✈️',
                'color' => '#F0E68C',
            ],
            [
                'name' => 'Others',
                'description' => 'Other non-classified expenses',
                'icon' => '📌',
                'color' => '#D3D3D3',
            ],
        ];

        foreach ($defaultCategories as $category) {
            ExpenseCategory::create([
                'name' => $category['name'],
                'slug' => Str::slug($category['name']),
                'description' => $category['description'],
                'icon' => $category['icon'],
                'color' => $category['color'],
                'user_id' => null, // null signifie que c'est une catégorie par défaut
                'is_default' => true,
            ]);
        }
    }
}
