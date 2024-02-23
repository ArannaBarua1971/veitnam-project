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
        Schema::create('memberships_months', function (Blueprint $table) {
            $table->id();
            $table->foreignId("membership_id")->constrained()->onUpdate('cascade')->onDelete('cascade');
            $table->string("month");
            $table->integer("price");
            $table->integer("discount")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('memberships_months');
    }
};
