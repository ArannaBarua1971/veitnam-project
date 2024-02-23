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
        Schema::create('checkout_for_courses', function (Blueprint $table) {
            $table->id();
            $table->foreignId("user_id")->constrained()->onUpdate("cascade")->onDelete("cascade");
            $table->foreignId("course_id")->constrained()->onUpdate("cascade")->onDelete("cascade");
            $table->foreignId("status")->default(false);
            $table->longText("name");
            $table->longText("email");
            $table->longText("phone_number");
            $table->longText("promotional_code")->nullable();
            $table->integer("price");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('checkout_for_courses');
    }
};
