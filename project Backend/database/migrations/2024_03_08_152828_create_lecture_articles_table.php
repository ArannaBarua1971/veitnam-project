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
        Schema::create('lecture_articles', function (Blueprint $table) {
            $table->id();
            $table->longText("title");
            $table->longText("slug")->unique();
            $table->longText("thumb");
            $table->longText("thumb_url");
            $table->longText("description");
            $table->boolean("status")->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lecture_articles');
    }
};
