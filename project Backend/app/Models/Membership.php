<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Membership extends Model
{
    use HasFactory;

    public function membershipsmonth() {
        return $this->hasMany(MembershipsMonth::class);
    }
    public function checkoutDetails() {
        return $this->hasMany(CheckoutDetail::class);
    }
}
