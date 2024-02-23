<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MembershipsMonth extends Model
{
    use HasFactory;

    protected $fillabel=['membership_id','month','price','discount'];

    public function membership(){
        return $this->belongsTo(Membership::class);
    }
}
