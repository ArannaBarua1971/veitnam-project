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
        Schema::create('couses_videos', function (Blueprint $table) {
            $table->id();
            $table->string("title");
            $table->foreignId("course_id")->constrained()->onUpdate("cascade")->onDelete("cascade");
            $table->longText("slug")->unique();
            $table->boolean('status')->default(true);
            $table->longText("video_thumb");
            $table->longText("video_thumb_url");
            $table->string("video");
            $table->string("video_url");
            $table->longText("description")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('couses_videos');
    }
};
