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
        Schema::create('data', function (Blueprint $table) {
            $table->id();
            $table->longText("Phânngành_ICB2")->nullable();
            $table->float("Cá_nhân_trong_nước")->nullable();
            $table->float("Tổ_chức_trong_nước")->nullable();
            $table->float("Tự_doanh")->nullable();
            $table->float("Nước_ngoài")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('data');
    }
};
