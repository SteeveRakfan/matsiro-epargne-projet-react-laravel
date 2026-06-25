<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    /** @use HasFactory<\Database\Factories\ProfileFactory> */
    use HasFactory;
    protected $fillable = [
        'user_id',
        'picture_path',
        'date_of_birth',
        'address',
        'phone_number',
        'phone_number_2',
        'nationality',
        'flag',
        'bio',
        'feeling_emoji',
        'description',
    ];
    
    public function user(){
        return $this->belongsTo(User::class);
    }
    
    public function getPicturePathAttribute($value){
        if(!$value){
            return null;
        }
        return asset('storage/'.$value);
    }
}
