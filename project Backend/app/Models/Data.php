<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Data extends Model
{
    use HasFactory;

    protected $fillable = [
        "Phânngành_ICB2",
        "Cá_nhân_trong_nước",
        "Tổ_chức_trong_nước",
        "Tự_doanh",
        "Nước_ngoài",
    ];

    public function muabánròngtheomãData(){
        return $this->hasMany(Muabánròngtheomã::class);
    }
}
