<?php

namespace App\Http\Controllers;

use App\Models\Data;
use App\Models\User;
use App\Models\Asset;
use App\Models\Course;
use App\Models\Article;
use App\Models\LongDeal;
use App\Models\ShortDeal;
use App\Models\Membership;
use App\Models\CousesVideo;
use Illuminate\Support\Str;
use GuzzleHttp\Psr7\Message;
use Illuminate\Http\Request;
use App\Models\CheckoutDetail;
use App\Models\CheckoutForCourse;
use App\Models\DiễnBiếnMua_bán;
use App\Models\DiễnBiếnMuabán;
use App\Models\LectureArticle;
use Illuminate\Support\Carbon;
use App\Models\MemberShipVedio;
use App\Models\MembershipsMonth;
use App\Models\Muabánròngtheomã;
use App\Models\TotalData;
use Illuminate\Support\Facades\Storage;
use SebastianBergmann\CodeCoverage\Report\Xml\Totals;

class DaseboardController extends Controller
{

    // all user
    public function all_user()
    {
        $allUser = User::whereHas('roles', function ($query) {
            $query->where('name', 'user');
        })->select('id', 'name', 'email', 'phone')->get();

        return response()->json([
            "message" => "authorize",
            "status" => 'success',
            "data" => $allUser
        ], 200);
    }
    // all Memberhsip User
    public function all_MembershipUser()
    {
        $allMembershipUser = CheckoutDetail::all();

        return response()->json([
            "message" => "authorize",
            "status" => 'success',
            "data" => $allMembershipUser
        ], 200);
    }
    //add unlock article
    public function addArticle(Request $req)
    {

        $req->validate([
            'article' => "required",
            'catagory' => "required",
            'percentage' => "min:0|max:100"
        ]);

        if (!Article::where('catagory', $req->catagory)->count()) {
            $article = new Article();
        } else {
            if (!Article::where([['status', true], ['catagory', $req->catagory]])->count()) {
                $article = new Article();
            } else {
                $article = Article::where([['status', true], ['catagory', $req->catagory]])->first();
            }
        }

        $article->article = $req->article;
        $article->catagory = $req->catagory;
        $article->percentage = $req->percentage;
        $article->status = true;
        $article->save();

        return response()->json([
            "message" => "authorize",
            "status" => 'success',
            "data" => $req->article
        ], 200);
    }

    // get lock article
    public function addLockArticle(Request $req)
    {
        $req->validate([
            'article' => "required",
            'catagory' => "required",
            'percentage' => "min:0|max:100"
        ]);


        if (!Article::where('catagory', $req->catagory)->count()) {
            $article = new Article();
        } else {
            if (!Article::where([['status', false], ['catagory', $req->catagory]])->count()) {
                $article = new Article();
            } else {
                $article = Article::where([['status', false], ['catagory', $req->catagory]])->first();
            }
        }

        $article->article = $req->article;
        $article->catagory = $req->catagory;
        $article->percentage = $req->percentage;
        $article->status = false;
        $article->save();

        return response()->json([
            "message" => "authorize",
            "status" => 'success',
            "data" => $req->article
        ], 200);
    }

    // get unlock article
    public function getArticle($catagory)
    {

        if (!Article::where([["status", true], ['catagory', $catagory]])->count()) {

            return response()->json([
                "message" => "authorize",
                "status" => 'success',
                "data" => ['article' => "no article"]
            ], 200);
        } else {
            $article = Article::where([["status", true], ['catagory', $catagory]])->first();
            return response()->json([
                "message" => "authorize",
                "status" => 'success',
                "data" => $article
            ], 200);
        }
    }

    // get lock article
    public function getLockArticle($catagory)
    {

        if (!Article::where([["status", false], ['catagory', $catagory]])->count()) {

            return response()->json([
                "message" => "authorize",
                "status" => 'success',
                "data" => ['article' => "no article"]
            ], 200);
        } else {
            $article = Article::where([["status", false], ['catagory', $catagory]])->first();
            return response()->json([
                "message" => "authorize",
                "status" => 'success',
                "data" => $article
            ], 200);
        }
    }


    // add membership
    public function addMemeberShip(Request $req)
    {
        $req->validate([
            "catagory" => 'required',
            "membership_title" => 'required'
        ]);

        $newMemberShip = new Membership();
        $newMemberShip->catagory = $req->catagory;
        // slug generate
        $slug = Str::slug($req->membership_title);
        $found = Membership::where('slug', 'LIKE', "%" . $slug . "%")->count();
        if ($found) {
            $slug = $slug . "-" . $found;
        }
        $newMemberShip->slug = $slug;
        $newMemberShip->title = $req->membership_title;
        $newMemberShip->save();

        foreach ($req->months as $month) {
            if ($month != null) {
                $id = Membership::where('slug', $slug)->first();
                $newMemberShipMonth = new MembershipsMonth();
                $newMemberShipMonth->membership_id = $id->id;
                $newMemberShipMonth->month = $month["month"];
                $newMemberShipMonth->price = intval($month["price"]);
                $newMemberShipMonth->discount = intval($month["discount"]);
                $newMemberShipMonth->save();
            }
        }
        return response()->json([
            "message" => "added successfully",
            "status" => 'success',
            "data" => []
        ], 200);
    }
    // change active_membership_user_status 
    public function active_membership_user_status(Request $req)
    {
        $user = CheckoutDetail::Where('id', $req->id)->first();
        $user->active_membership_status = $user->active_membership_status ? false : true;
        $user->created_at = Carbon::now();
        $user->save();

        return response()->json([
            "message" => "status updated",
            "status" => "success",
            "data" => $user
        ], 200);
    }
    // change active_membership_status 
    public function active_membership_status(Request $req)
    {
        $membership = Membership::Where('id', $req->id)->first();
        $membership->active_membership_status = $membership->active_membership_status ? false : true;
        $membership->save();

        return response()->json([
            "message" => "status updated",
            "status" => "success",
            "data" => []
        ], 200);
    }
    // delete membership user
    public function delete_membership_user(Request $req)
    {
        $membership = CheckoutDetail::Where('id', $req->id)->first();
        $membership->delete();

        return response()->json([
            "message" => "status updated",
            "status" => "success",
            "data" => []
        ], 200);
    }
    // delete membership
    public function delete_membership(Request $req)
    {
        $membership = Membership::Where('id', $req->id)->first();
        $membership->delete();

        return response()->json([
            "message" => "status updated",
            "status" => "success",
            "data" => []
        ], 200);
    }
    // get membership
    public function getMemeberShip()
    {
        $memberships = Membership::with('membershipsmonth')->select('id', 'title', 'catagory', 'slug', 'active_membership_status')->get();

        return response()->json([
            "message" => "all memberships",
            "status" => "success",
            "data" => $memberships
        ], 200);
    }
    // get specific member
    public function get_specific_membership(Request $req)
    {
        $membership = Membership::with('membershipsmonth')->select('id', 'title', 'catagory', 'slug')->where('slug', $req->slug)->first();
        return response()->json([
            "message" => "all memberships",
            "status" => "success",
            "data" => $membership
        ], 200);
    }
    public function get_specific_course($slug)
    {
        $course = Course::where('slug', $slug)->first();
        return response()->json([
            "message" => "all memberships",
            "status" => "success",
            "data" => $course
        ], 200);
    }


    // add checkoutDetails
    public function addCheckoutDeatails(Request $req)
    {

        $req->validate([
            'phone_number' => "required|max:10",
            'email' => "required|email",
            'duration' => "required",
            'price' => 'required'
        ]);

        $NewCheckOutDetail = new CheckoutDetail();
        if ($req->name) $NewCheckOutDetail->name = $req->name;
        $NewCheckOutDetail->phone_number = $req->phone_number;
        $NewCheckOutDetail->email = $req->email;
        if ($req->promotional_code) $NewCheckOutDetail->promotional_code = $req->promotional_code;
        $NewCheckOutDetail->duration = $req->duration;
        $NewCheckOutDetail->price = $req->price;
        $NewCheckOutDetail->user_id = $req->user_id;
        $NewCheckOutDetail->membership_id = $req->membership_id;

        $NewCheckOutDetail->save();

        return response()->json([
            "message" => "all memberships",
            "status" => "success",
            "data" => []
        ], 200);
    }

    // add short and long deal
    public function  add_long_deal(Request $req)
    {
        // $req->validate([
        //     'Mãcổphiếu'=>'required',
        //     'NgàyKN'=>'required',
        //     'Giámuakhuyếnnghị'=>'required',
        //     'NgưỡnggiáQtrr'=>'required',
        //     'Giáhiệntại'=>'required',
        //     'LãiLỗ'=>'required',
        //     'Kịchbảnhiệntại'=>'required',
        //     'popupTitle'=>'required',
        //     'popupText'=>'required',
        // ]);

        $longDeal = new LongDeal();

        $longDeal->Mãcổphiếu = $req->Mãcổphiếu;
        $longDeal->NgàyKN = $req->NgàyKN;
        $longDeal->Giámuakhuyếnnghị = $req->Giámuakhuyếnnghị;
        $longDeal->NgưỡnggiáQtrr = $req->NgưỡnggiáQtrr;
        $longDeal->Giáhiệntại = $req->Giáhiệntại;
        $longDeal->LãiLỗ = $req->LãiLỗ;
        $longDeal->Kịchbảnhiệntại = $req->Kịchbảnhiệntại;
        $longDeal->popupTitle = $req->popupTitle;
        $longDeal->popupText = $req->popupText;
        $longDeal->save();
        return response()->json([
            "message" => "add or update short deal",
            "status" => "success",
            "data" => []
        ], 200);
    }
    public function  add_asset(Request $req)
    {
        // $req->validate([
        //     'Mãcổphiếu'=>'required',
        //     'NgàyKN'=>'required',
        //     'Giámuakhuyếnnghị'=>'required',
        //     'NgưỡnggiáQtrr'=>'required',
        //     'Giáhiệntại'=>'required',
        //     'LãiLỗ'=>'required',
        //     'Kịchbảnhiệntại'=>'required',
        //     'popupTitle'=>'required',
        //     'popupText'=>'required',
        // ]);

        $asset = new Asset();

        $asset->Mãcổphiếu = $req->Mãcổphiếu;
        $asset->NgàyKN = $req->NgàyKN;
        $asset->Giámuakhuyếnnghị = $req->Giámuakhuyếnnghị;
        $asset->NgưỡnggiáQtrr = $req->NgưỡnggiáQtrr;
        $asset->Giáhiệntại = $req->Giáhiệntại;
        $asset->LãiLỗ = $req->LãiLỗ;
        $asset->Kịchbảnhiệntại = $req->Kịchbảnhiệntại;
        $asset->popupTitle = $req->popupTitle;
        $asset->popupText = $req->popupText;
        $asset->save();
        return response()->json([
            "message" => "add asset",
            "status" => "success",
            "data" => []
        ], 200);
    }
    public function add_short_deal(Request $req)
    {
        // $req->validate([
        //     'deal' => "required",
        // ]);

        $shortDeal = new  ShortDeal();
        $shortDeal->MãCP = $req->MãCP;
        $shortDeal->NgàyKN = $req->NgàyKN;
        $shortDeal->Giámuakhuyếnnghị = $req->Giámuakhuyếnnghị;
        $shortDeal->NgưỡnggiáQtrr = $req->NgưỡnggiáQtrr;
        $shortDeal->Giáhiệntại = $req->Giáhiệntại;
        $shortDeal->LãiLỗ = $req->LãiLỗ;
        $shortDeal->Kịchbảnhiệntại = $req->Kịchbảnhiệntại;
        $shortDeal->popupTitle = $req->popupTitle;
        $shortDeal->popupText = $req->popupText;

        $shortDeal->save();

        return response()->json([
            "message" => "add  short deal",
            "status" => "success",
            "data" => []
        ], 200);
    }

    // get short and long deal and asset
    public function get_long_deal()
    {
        $allLongDeal = LongDeal::select('id', 'status', 'Mãcổphiếu', 'NgàyKN', 'Giámuakhuyếnnghị', 'NgưỡnggiáQtrr', 'Giáhiệntại', 'LãiLỗ', 'Kịchbảnhiệntại', 'popupTitle', 'popupText')->get();

        return response()->json([
            "message" => "all short deal",
            "status" => "success",
            "data" => $allLongDeal
        ], 200);
    }
    public function get_asset()
    {
        $getAsset = Asset::select('id', 'Mãcổphiếu', 'status', 'NgàyKN', 'Giámuakhuyếnnghị', 'NgưỡnggiáQtrr', 'Giáhiệntại', 'LãiLỗ', 'Kịchbảnhiệntại', 'popupTitle', 'popupText')->get();

        return response()->json([
            "message" => "all asset deal",
            "status" => "success",
            "data" => $getAsset
        ], 200);
    }
    public function get_short_deal()
    {
        $allShortDeal = ShortDeal::select('id', 'MãCP', 'status', 'NgàyKN', 'Giámuakhuyếnnghị', 'NgưỡnggiáQtrr', 'Giáhiệntại', 'LãiLỗ', 'Kịchbảnhiệntại', 'popupTitle', 'popupText')->get();

        return response()->json([
            "message" => "all long deal",
            "status" => "success",
            "data" => $allShortDeal
        ], 200);
    }
    // delete short and long deal and asset
    public function delete_short_deal($id)
    {
        $shortDeal = ShortDeal::where('id', $id)->first();
        $shortDeal->delete();

        return response()->json([
            "message" => "all short deal",
            "status" => "success",
            "data" => []
        ], 200);
    }
    public function delete_long_deal($id)
    {
        $longDeal = LongDeal::where('id', $id)->first();
        $longDeal->delete();
        return response()->json([
            "message" => "all short deal",
            "status" => "success",
            "data" => []
        ], 200);
    }
    public function delete_asset($id)
    {
        $asset = Asset::where('id', $id)->first();
        $asset->delete();
        return response()->json([
            "message" => "all long deal",
            "status" => "success",
            "data" => []
        ], 200);
    }

    // get specific short long asset
    public function get_specific_short_deal($id)
    {
        $shortDeal = ShortDeal::where('id', $id)->first();

        return response()->json([
            "message" => "all short deal",
            "status" => "success",
            "data" => $shortDeal
        ], 200);
    }
    public function get_specific_long_deal($id)
    {
        $longDeal = LongDeal::where('id', $id)->first();
        return response()->json([
            "message" => "all short deal",
            "status" => "success",
            "data" => $longDeal
        ], 200);
    }

    // edit specific short long asset
    public function edit_specific_short_deal(Request $req, $id)
    {
        $shortDeal = ShortDeal::where('id', $id)->first();
        $shortDeal->MãCP = $req->MãCP;
        $shortDeal->NgàyKN = $req->NgàyKN;
        $shortDeal->Giámuakhuyếnnghị = $req->Giámuakhuyếnnghị;
        $shortDeal->NgưỡnggiáQtrr = $req->NgưỡnggiáQtrr;
        $shortDeal->Giáhiệntại = $req->Giáhiệntại;
        $shortDeal->LãiLỗ = $req->LãiLỗ;
        $shortDeal->Kịchbảnhiệntại = $req->Kịchbảnhiệntại;
        $shortDeal->popupTitle = $req->popupTitle;
        $shortDeal->popupText = $req->popupText;

        $shortDeal->save();

        return response()->json([
            "message" => "eidited short deal",
            "status" => "success",
            "data" => []
        ], 200);
    }
    public function edit_specific_long_deal(Request $req, $id)
    {
        $longDeal = LongDeal::where('id', $id)->first();
        $longDeal->Mãcổphiếu = $req->Mãcổphiếu;
        $longDeal->NgàyKN = $req->NgàyKN;
        $longDeal->Giámuakhuyếnnghị = $req->Giámuakhuyếnnghị;
        $longDeal->NgưỡnggiáQtrr = $req->NgưỡnggiáQtrr;
        $longDeal->Giáhiệntại = $req->Giáhiệntại;
        $longDeal->LãiLỗ = $req->LãiLỗ;
        $longDeal->Kịchbảnhiệntại = $req->Kịchbảnhiệntại;
        $longDeal->popupTitle = $req->popupTitle;
        $longDeal->popupText = $req->popupText;
        $longDeal->save();
        return response()->json([
            "message" => "edited long deal",
            "status" => "success",
            "data" => []
        ], 200);
    }
    public function edit_specific_asset(Request $req, $id)
    {
        $asset = Asset::where('id', $id)->first();
        $asset->Mãcổphiếu = $req->Mãcổphiếu;
        $asset->NgàyKN = $req->NgàyKN;
        $asset->Giámuakhuyếnnghị = $req->Giámuakhuyếnnghị;
        $asset->NgưỡnggiáQtrr = $req->NgưỡnggiáQtrr;
        $asset->Giáhiệntại = $req->Giáhiệntại;
        $asset->LãiLỗ = $req->LãiLỗ;
        $asset->Kịchbảnhiệntại = $req->Kịchbảnhiệntại;
        $asset->popupTitle = $req->popupTitle;
        $asset->popupText = $req->popupText;
        $asset->save();
        return response()->json([
            "message" => "edited asset",
            "status" => "success",
            "data" => []
        ], 200);
    }
    // edit specific short long asset
    public function status_change_specific_short_deal($id)
    {
        $shortDeal = ShortDeal::where('id', $id)->first();
        $shortDeal->status = !$shortDeal->status;

        $shortDeal->save();

        return response()->json([
            "message" => "eidited short deal",
            "status" => "success",
            "data" => []
        ], 200);
    }
    public function status_change_specific_long_deal($id)
    {
        $longDeal = LongDeal::where('id', $id)->first();
        $longDeal->status = !$longDeal->status;
        $longDeal->save();
        return response()->json([
            "message" => "edited long deal",
            "status" => "success",
            "data" => []
        ], 200);
    }
    public function status_change_specific_asset($id)
    {
        $asset = Asset::where('id', $id)->first();
        $asset->status = !$asset->status;
        $asset->save();
        return response()->json([
            "message" => "all long deal",
            "status" => "success",
            "data" => []
        ], 200);
    }

    // add and get membershipVideo
    public function upload_video(Request $req)
    {
        $req->validate([
            "title" => "required",
            "video" => "required",
            "video_thumb" => "required|mimes:jpeg,png,jpg",
            "course_id" => "required"
        ]);

        $newVideo = new CousesVideo();
        $newVideo->title = $req->title;
        $newVideo->course_id = $req->course_id;

        // Generate slug
        $slug = Str::slug($req->title);
        $found = CousesVideo::where('slug', 'LIKE', "%" . $slug . "%")->count();
        if ($found) {
            $slug = $slug . "-" . $found;
        }
        $newVideo->slug = $slug;

        // Upload video thumb
        $videoThumbExt = $req->file('video_thumb')->getClientOriginalExtension();
        $newFileName = "memberShipVideoThumbs" . time() . '.' . $videoThumbExt;
        $req->file('video_thumb')->storeAs('public', $newFileName);
        $fileUrl = asset("storage/$newFileName");
        $newVideo->video_thumb_url = $fileUrl;
        $newVideo->video_thumb = $newFileName;

        $videoExt = $req->file('video')->getClientOriginalExtension();
        $newFileName = "memberShipVideos" . time() . '.' . $videoExt;
        $req->file('video')->storeAs('public', $newFileName);
        $fileUrl = asset("storage/$newFileName");
        $newVideo->video_url = $fileUrl;
        $newVideo->video = $newFileName;

        $newVideo->description = $req->description;


        // // // Save new video
        $newVideo->save();

        return response()->json([
            "message" => "Video uploaded successfully",
            "status" => "success",
            "data" => $req->all()
        ], 200);
    }
    public function edit_video(Request $req, $slug)
    {
        $req->validate([
            "title" => "required",
            "video" => "max:256000",
        ]);

        $newVideo = CousesVideo::where('slug', $slug)->first();
        $newVideo->title = $req->title;
        $newVideo->course_id = $req->course_id;

        // Generate slug
        $slug = Str::slug($req->title);
        $found = CousesVideo::where('slug', 'LIKE', "%" . $slug . "%")->count();
        if ($found) {
            $slug = $slug . "-" . $found;
        }
        $newVideo->slug = $slug;

        // // Upload video thumb
        if ($req->hasFile('video_thumb')) {
            $thumb_path = public_path('storage/' . $newVideo->video_thumb);
            if (file_exists($thumb_path)) {
                unlink($thumb_path);
            }
            $videoThumbExt = $req->file('video_thumb')->getClientOriginalExtension();
            $newFileName = "memberShipVideoThumbs" . time() . '.' . $videoThumbExt;
            $req->file('video_thumb')->storeAs('public', $newFileName);
            $fileUrl = asset("storage/$newFileName");
            $newVideo->video_thumb_url = $fileUrl;
            $newVideo->video_thumb = $newFileName;
        }


        if ($req->hasFile('video')) {
            $thumb_path = public_path('storage/' . $newVideo->video);
            if (file_exists($thumb_path)) {
                unlink($thumb_path);
            }
            $videoExt = $req->file('video')->getClientOriginalExtension();
            $newFileName = "memberShipVideos" . time() . '.' . $videoExt;
            $req->file('video')->storeAs('public', $newFileName);
            $fileUrl = asset("storage/$newFileName");
            $newVideo->video_url = $fileUrl;
            $newVideo->video = $newFileName;
        }
        $newVideo->description = $req->description;


        // // // Save new video
        $newVideo->save();

        return response()->json([
            "message" => "Video edited successfully",
            "status" => "success",
            "data" => []
        ], 200);
    }
    public function edit_course(Request $req, $slug)
    {
        $req->validate([
            "course_title" => "required",
            "price" => "required"
        ]);

        $course = Course::where('slug', $slug)->first();
        $course->course_title = $req->course_title;
        $course->course_description = $req->course_description;
        $course->price = $req->price;

        // Generate slug
        $slug = Str::slug($req->course_title);
        $found = CousesVideo::where('slug', 'LIKE', "%" . $slug . "%")->count();
        if ($found) {
            $slug = $slug . "-" . $found;
        }
        $course->slug = $slug;

        // // Upload video thumb
        if ($req->hasFile('course_thumb')) {
            $thumb_path = public_path('storage/' . $course->course_thumb);
            if (file_exists($thumb_path)) {
                unlink($thumb_path);
            }
            $videoThumbExt = $req->file('course_thumb')->getClientOriginalExtension();
            $newFileName = "courses" . time() . '.' . $videoThumbExt;
            $req->file('course_thumb')->storeAs('public', $newFileName);
            $fileUrl = asset("storage/$newFileName");
            $course->course_thumb_url = $fileUrl;
            $course->course_thumb = $newFileName;
        }


        // // // Save new video
        $course->save();

        return response()->json([
            "message" => "Course edited successfully",
            "status" => "success",
            "data" => []
        ], 200);
    }

    public function get_all_video()
    {
        $allVideo = CousesVideo::select('id', 'slug', 'title', 'video_thumb_url', 'status', 'description')->get();

        return response()->json([
            "message" => "Video uploaded successfully",
            "status" => "success",
            "data" => $allVideo
        ], 200);
    }
    public function Delete_sepecific_video($id)
    {
        $video = CousesVideo::where('id', $id)->first();
        $thumb_path = public_path('storage/' . $video->video_thumb);
        if (file_exists($thumb_path)) {
            unlink($thumb_path);
        }
        $video_path = public_path('storage/' . $video->video);
        if (file_exists($video_path)) {
            unlink($video_path);
        }
        $video->delete();
        return response()->json([
            "message" => "Video deleted successfully",
            "status" => "success",
            "data" => []
        ], 200);
    }
    public function Delete_sepecific_course($id)
    {
        $course = Course::where('id', $id)->first();
        $thumb_path = public_path('storage/' . $course->course_thumb);
        if (file_exists($thumb_path)) {
            unlink($thumb_path);
        }
        $course->delete();
        return response()->json([
            "message" => "course deleted successfully",
            "status" => "success",
            "data" => []
        ], 200);
    }
    public function status_change_video($id)
    {
        $video = CousesVideo::where('id', $id)->first();
        $video->status = !$video->status;
        $video->save();
        return response()->json([
            "message" => "Video status change successfully",
            "status" => "success",
            "data" => []
        ], 200);
    }
    public function status_change_course($id)
    {
        $video = Course::where('id', $id)->first();
        $video->status = !$video->status;
        $video->save();
        return response()->json([
            "message" => "course status change successfully",
            "status" => "success",
            "data" => []
        ], 200);
    }

    // upload-img
    public function uploadImage(Request $req)
    {
        // if ($req->hasFile('media')) {
        //     $videoThumbExt = $req->file('media')->getClientOriginalExtension();
        //     $newFileName = "upload" . time() . '.' . $videoThumbExt;
        //     $req->file('media')->storeAs('public', $newFileName);
        //     $fileUrl = asset("storage/$newFileName");
        //     $medio__url = $fileUrl;
        //     $data = [
        //         'media_url'=>$medio__url
        //     ];
        // }

        return response()->json([
            'message' => 'Image upload failed', "status" => "success",
            "data" => []
        ], 200);
    }
    // upload data
    public function upload_totalData(Request $req)
    {
        $req->validate([
            'csv_file' => 'required|file|mimes:csv',
        ]);

        $data = array_map("str_getcsv", file($req->file('csv_file')));
        $Cá_nhân_trong_nước = 0;
        $Tổ_chức_trong_nước = 0;
        $Tự_doanh = 0;
        $Nước_ngoài = 0;

        foreach ($data as $key => $row) {
            if ($key == count($data) - 1) {
                $Cá_nhân_trong_nước = $row[1];
                $Tổ_chức_trong_nước = $row[2];
                $Tự_doanh = $row[3];
                $Nước_ngoài = $row[4];
            }
        }
        $newTotal = new TotalData();
        $newTotal->Cá_nhân_trong_nước = $Cá_nhân_trong_nước;
        $newTotal->Tổ_chức_trong_nước = $Tổ_chức_trong_nước;
        $newTotal->Tự_doanh = $Tự_doanh;
        $newTotal->Nước_ngoài = $Nước_ngoài;
        $newTotal->save();


        return response()->json([
            'message' => 'file uploaded',
            "status" => "success",
            "data" => $data
        ], 200);
    }
    public function upload_Data(Request $req)
    {
        $req->validate([
            'csv_file' => 'required|file|mimes:csv',
        ]);

        $data = array_map("str_getcsv", file($req->file('csv_file')));


        foreach ($data as $key => $row) {
            if ($key != 0) {
                Data::create([
                    "Phânngành_ICB2" => $row[0],
                    "Cá_nhân_trong_nước" => $row[1],
                    "Tổ_chức_trong_nước" => $row[2],
                    "Tự_doanh" => $row[3],
                    "Nước_ngoài" => $row[4],
                ]);
            }
        }


        return response()->json([
            'message' => 'file uploaded',
            "status" => "success",
            "data" => $data
        ], 200);
    }
    public function upload_Muabánròngtheomã_data(Request $req)
    {
        $req->validate([
            'csv_file' => 'required|file|mimes:csv',
        ]);

        $data = array_map("str_getcsv", file($req->file('csv_file')));

        foreach ($data as $key => $row) {
            if ($key != 0) {
                $newData = new Muabánròngtheomã();
                $newData->data_id = $req->data_id;
                $newData->Mã = $row[0];
                $newData->Cá_nhân_trong_nước = $row[1];
                $newData->Tổ_chức_trong_nước = $row[2];
                $newData->Tự_doanh = $row[3];
                $newData->Nước_ngoài = $row[4];
                $newData->save();
            }
        }


        return response()->json([
            'message' => 'file uploaded',
            "status" => "success",
            "data" => []
        ], 200);
    }

    public function get_Data()
    {
        $getData = Data::get();

        return response()->json([
            'message' => 'file uploaded',
            "status" => "success",
            "data" => $getData
        ], 200);
    }
    public function get_Muabánròngtheomã_data()
    {
        $data = Muabánròngtheomã::get();


        return response()->json([
            'message' => 'file uploaded',
            "status" => "success",
            "data" => $data
        ], 200);
    }
    // add course and get course
    public function add_course(Request $req)
    {
        $req->validate([
            "course_title" => "required",
            "course_thumb" => "required|mimes:png,jpeg,jpg",
            "price" => "required"
        ]);

        $newCourse = new Course();
        $newCourse->course_title = $req->course_title;
        $newCourse->course_description = $req->course_description;
        // slug generate
        $slug = Str::slug($req->course_title);
        $found = Course::where('slug', 'LIKE', "%" . $slug . "%")->count();
        if ($found) {
            $slug = $slug . "-" . $found;
        }
        $newCourse->slug = $slug;
        $videoThumbExt = $req->file('course_thumb')->getClientOriginalExtension();
        $newFileName = "courses" . time() . '.' . $videoThumbExt;
        $req->file('course_thumb')->storeAs('public', $newFileName);
        $fileUrl = asset("storage/$newFileName");

        $newCourse->course_thumb_url = $fileUrl;
        $newCourse->course_thumb = $newFileName;
        $newCourse->price = $req->price;
        $newCourse->save();

        return response()->json([
            'message' => 'course added',
            "status" => "success",
            "data" => []
        ], 200);
    }
    public function getAll_course()
    {
        $allcourses = Course::get();
        return response()->json([
            'message' => 'course added',
            "status" => "success",
            "data" => $allcourses
        ], 200);
    }


    // all course user activity
    public function all_CourseUser()
    {
        $allcoursesUser = CheckoutForCourse::get();
        return response()->json([
            'message' => 'all course user',
            "status" => "success",
            "data" => $allcoursesUser
        ], 200);
    }
    public function active_course_user_status(Request $req)
    {
        $coursesUser = CheckoutForCourse::where("id", $req->id)->first();
        $coursesUser->status = !$coursesUser->status;
        $coursesUser->save();
        return response()->json([
            'message' => 'course user status updated',
            "status" => "success",
            "data" => []
        ], 200);
    }
    public function delete_course_user(Request $req)
    {
        $coursesUser = CheckoutForCourse::where("id", $req->id)->first();
        $coursesUser->delete();
        return response()->json([
            'message' => 'course user detail deleted',
            "status" => "success",
            "data" => []
        ], 200);
    }
    public function get_data_byDate()
    {
        $data = Data::select('created_at')->distinct()->get();
        return response()->json([
            'message' => 'all data',
            "status" => "success",
            "data" => $data
        ], 200);
    }
    public function delete_data_byDate($date)
    {
        // Convert $date to an array if it's not already
        if (!is_array($date)) {
            $date = [$date];
        }

        // Delete records from Data table
        Data::whereIn('created_at', $date)->delete();

        // Delete records from Muabánròngtheomã table
        Muabánròngtheomã::whereIn('created_at', $date)->delete();

        // Delete records from TotalData table
        TotalData::whereIn('created_at', $date)->delete();

        return response()->json([
            'message' => 'Data deleted',
            'status' => 'success',
            'date' => $date
        ], 200);
    }

    // add ,get and all lecture article
    public function addLectureArticle(Request $req)
    {
        $req->validate([
            "title" => "required",
            "thumb" => "required|mimes:jpeg,png,jpg",
            "description" => "required"
        ]);

        $newLectureArticle = new LectureArticle();
        $newLectureArticle->title = $req->title;
        $newLectureArticle->description = $req->description;

        // Generate slug
        $slug = Str::slug($req->title);
        $found = LectureArticle::where('slug', 'LIKE', "%" . $slug . "%")->count();
        if ($found) {
            $slug = $slug . "-" . $found;
        }
        $newLectureArticle->slug = $slug;

        // Upload Lecture thumb
        $thumbExt = $req->file('thumb')->getClientOriginalExtension();
        $newFileName = "LectureThumbs" . time() . '.' . $thumbExt;
        $req->file('thumb')->storeAs('public', $newFileName);
        $fileUrl = asset("storage/$newFileName");
        $newLectureArticle->thumb_url = $fileUrl;
        $newLectureArticle->thumb = $newFileName;

        $newLectureArticle->save();

        return response()->json([
            'message' => 'Lecture added',
            'status' => 'success',
            'date' => $req->all()
        ], 200);
    }
    public function getAllLectureArticle()
    {
        $allArticle = LectureArticle::get();

        return response()->json([
            'message' => 'all Lecture',
            'status' => 'success',
            'data' => $allArticle
        ], 200);
    }

    public function deleteLectureArticle($slug)
    {
        $delete = LectureArticle::where("slug", $slug)->first();

        $thumb_path = public_path('storage/' . $delete->thumb);
        if (file_exists($thumb_path)) {
            unlink($thumb_path);
        }
        $delete->delete();
        
        return response()->json([
            'message' => 'Lecture is deleted',
            'status' => 'success',
            'data' => []
        ], 200);
    }

    public function status_change_LectureArticle($id)
    {
        $article = LectureArticle::where("id", $id)->first();
        $article->status = !$article->status;
        $article->save();
        return response()->json([
            'message' => 'Lecture status changed',
            'status' => 'success',
            'data' => []
        ], 200);
    }

    public function edit_LectureArticle(Request $req, $slug)
    {
        $req->validate([
            "title" => "required",
            "description" => "required"
        ]);

        $article = LectureArticle::where('slug', $slug)->first();
        $article->title = $req->title;
        $article->description = $req->description;

        // Generate slug
        $slug = Str::slug($req->title);
        $found = LectureArticle::where('slug', 'LIKE', "%" . $slug . "%")->count();
        if ($found) {
            $slug = $slug . "-" . $found;
        }
        $article->slug = $slug;

        // // Upload video thumb
        if ($req->hasFile('thumb')) {
            $thumb_path = public_path('storage/' . $article->thumb);
            if (file_exists($thumb_path)) {
                unlink($thumb_path);
            }
            $videoThumbExt = $req->file('thumb')->getClientOriginalExtension();
            $newFileName = "LectureThumbs" . time() . '.' . $videoThumbExt;
            $req->file('thumb')->storeAs('public', $newFileName);
            $fileUrl = asset("storage/$newFileName");
            $article->thumb_url = $fileUrl;
            $article->thumb = $newFileName;
        }


        // // // Save new video
        $article->save();

        return response()->json([
            "message" => "article edited successfully",
            "status" => "success",
            "data" => []
        ], 200);
    }

    public function get_specificLectureArticle($slug)
    {
        $article = LectureArticle::where("slug", $slug)->first();

        return response()->json([
            "message" => "article",
            "status" => "success",
            "data" => $article
        ], 200);
    }
}
