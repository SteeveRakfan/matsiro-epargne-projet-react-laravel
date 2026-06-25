<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

#[Fillable(['name', 'email', 'password'])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable, HasApiTokens;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected $fillable= [
        'last_name',
        'first_name',
        'email',
        'password',
        'role',
    ];
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            ];
    }
    public function profile(){
        return $this->hasOne(Profile::class);
    }
    public function scopeSearch(Builder $query, ?string $search){
        if(empty($search)){
            return $query;
        }
        return $query->where(function(Builder $q) use ($search){
            $q->where('last_name', 'like', "%{$search}%")
            ->orWhere('first_name', 'like', "%{$search}%")
            ->orWhere('email', 'like', "%{$search}%");
        });
    }
    public function categories(){
        return $this->hasMany(ExpenseCategory::class);
    }

    public function expenses(){
        return $this->hasMany(Expense::class);
    }
}
