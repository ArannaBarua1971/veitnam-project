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
        Schema::create('long_deals', function (Blueprint $table) {
            $table->id();
            $table->longText("Mãcổphiếu");
            $table->date("NgàyKN")->nullable();
            $table->longText("Giámuakhuyếnnghị")->nullable();
            $table->longText("NgưỡnggiáQtrr")->nullable();
            $table->longText("Giáhiệntại")->nullable();
            $table->longText("LãiLỗ")->nullable();
            $table->longText("Kịchbảnhiệntại")->nullable();
            $table->longText("popupTitle")->nullable();
            $table->boolean("status")->default(true);
            $table->longText("popupText")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('long_deals');
    }
};
