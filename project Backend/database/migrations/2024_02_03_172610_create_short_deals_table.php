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
        Schema::create('short_deals', function (Blueprint $table) {
            $table->id();
            $table->longText("MãCP");
            $table->longText("NgàyKN");
            $table->longText("Giámuakhuyếnnghị");
            $table->longText("NgưỡnggiáQtrr");
            $table->longText("Giáhiệntại");
            $table->longText("LãiLỗ");
            $table->longText("Kịchbảnhiệntại");
            $table->boolean("status")->default(true);
            $table->longText("popupTitle")->nullable();
            $table->longText("popupText")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('short_deals');
    }
};
