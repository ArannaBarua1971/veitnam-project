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
        Schema::create('total_data', function (Blueprint $table) {
            $table->id();
            $table->float("Cá_nhân_trong_nước")->default(0);
            $table->float("Tổ_chức_trong_nước")->default(0);
            $table->float("Tự_doanh")->default(0);
            $table->float("Nước_ngoài")->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('total_data');
    }
};
