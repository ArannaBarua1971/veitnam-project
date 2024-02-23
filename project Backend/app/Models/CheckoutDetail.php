<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CheckoutDetail extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'phone_number',
        'email',
        'promotional_code',
        'duration',
        'price'
    ];

    public function membership(){
        return $this->belongsTo(Membership::class);
    }
}
