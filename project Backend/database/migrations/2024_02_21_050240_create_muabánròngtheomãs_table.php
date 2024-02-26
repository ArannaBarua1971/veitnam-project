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
        Schema::create('muabánròngtheomãs', function (Blueprint $table) {
            $table->id();
            $table->longText("Mã")->nullable();
            $table->foreignId("data_id")->constrained()->onUpdate("cascade")->onDelete("cascade");
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
        Schema::dropIfExists('muabánròngtheomãs');
    }
};
