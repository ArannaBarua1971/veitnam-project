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
        Schema::create('checkout_details', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->foreignId("user_id")->constrained()->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId("membership_id")->constrained()->onUpdate('cascade')->onDelete('cascade');
            $table->integer('phone_number');
            $table->longText('email');
            $table->longText('promotional_code')->nullable();
            $table->string('duration');
            $table->integer('price');
            $table->boolean("active_membership_status")->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('checkout_details');
    }
};
