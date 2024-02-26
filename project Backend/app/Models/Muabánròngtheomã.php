<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Muabánròngtheomã extends Model
{
    use HasFactory;

    public function datas(){
        return $this->belongsTo(Data::class);
    }
}
