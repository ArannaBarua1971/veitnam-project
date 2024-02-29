<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CousesVideo extends Model
{
    use HasFactory;

    protected $fillable = [
        "title",
        "course_id",
        "slug",
        "status",
        "video_thumb",
        "video_thumb_url",
        "video",
        "video_url",
        "description"
    ];
}
