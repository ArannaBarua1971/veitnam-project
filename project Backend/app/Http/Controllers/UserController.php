<?php

namespace App\Http\Controllers;

use App\Models\Asset;
use App\Models\CheckoutDetail;
use App\Models\CheckoutForCourse;
use App\Models\Course;
use App\Models\CousesVideo;
use App\Models\Data;
use App\Models\DiễnBiếnMuabán;
use App\Models\LectureArticle;
use App\Models\LongDeal;
use App\Models\Membership;
use App\Models\MemberShipVedio;
use App\Models\Muabánròngtheomã;
use App\Models\ShortDeal;
use App\Models\TotalData;
use Exception;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\URL;

class UserController extends Controller
{
    // api response

    // user register
    public function register(Request $req)
    {

        $req->validate([
            "name" => "required",
            "email" => "required|email",
            "password" => "required|confirmed|min:8"
        ]);

        $newUser = new User();
        $newUser->name = $req->name;
        $newUser->email = $req->email;
        $newUser->password = Hash::make($req->password);
        $randomToken = Str::random(40);
        $newUser->remember_token = $randomToken;

        $newUser->save();
        $newUser->assignRole('user');

        // verify email
        $domain = "http://localhost:5173";
        $url = $domain . "/" . $randomToken;
        $data['email'] = $req->email;
        $data['title'] = "verify your email";
        $data['url'] = $url;
        Mail::send("mail.name", ['data' => $data], function ($message) use ($data) {
            $message->to($data['email'])->subject($data['title']);
        });

        return response()->json([
            "message" => "verify your email please",
            "status" => 'success',
            "data" => []
        ], 200);
    }

    // verify_email
    public function verifyEmail(Request $req)
    {
        $user = User::with('roles')->select('id', 'email', 'name')->where('remember_token', $req->token)->first();
        if ($user) {
            $user->remember_token = null;
            $user->is_verified = true;
            $user->save();

            return response()->json([
                "message" => "authorize",
                "status" => 'success',
                "data" => $user
            ], 200);
        } else {
            return response()->json([
                "message" => "not authorized",
                "status" => 'success',
                "data" => []
            ], 200);
        }
    }

    // user login
    public function login(Request $req)
    {

        $req->validate([
            "email" => "required|email",
            "password" => "required|min:8"
        ]);


        if (Auth::attempt(['email' => $req->email, 'password' => $req->password])) {
            // if(auth()->user()->status==0) return $this->failRsoponse('user is banned ',403,[]);
            $user = User::with('roles')->select("id", "name", "email")->where('email', $req->email)->first();
            $token = $user->createToken('token-name' . $user->name)->plainTextToken;

            $data = [
                "user" => $user,
                "user_token" => $token
            ];

            return response()->json([
                "message" => "authorize",
                "status" => 'success',
                "data" => $data
            ], 200);
        } else {
            return response()->json([
                "message" => "unauthorized",
                "status" => 'failed',
                "data" => []
            ], 401);
        }
    }

    // forget password

    public function forget_password(Request $req)
    {
        $req->validate([
            "email" => "required|email"
        ]);

        $count = User::where("email", $req->email)->count();
        $randomNumber = mt_rand(1000, 9999);

        if ($count) {
            $data['otp']=$randomNumber;
            $data['email']=$req->email;
            $data['title']="reset your password";

            
            Mail::send("mail.name", ['data' => $data], function ($message) use ($data) {
                $message->to($data['email'])->subject($data['title']);
            });
            return response()->json([
                "message" => "authorized ",
                "status" => 'success',
                "data" => $randomNumber
            ], 200);
        } else {
            return response()->json([
                "message" => "not authorize ",
                "status" => 'failed',
                "data" => []
            ], 402);
        }
    }

    // update profile
    public function update_profile(Request $req)
    {
        $req->validate([
            "email" => "required|email",
            "name" => "required",
            "phone" => "min:10|max:10"
        ]);


        $updateUserProfile = User::where("id", $req->id)->first();

        if ($updateUserProfile->email != $req->email) {
            $count = User::where("email", $req->email)->count();
            if ($count) {
                return response()->json([
                    "message" => "email alreay is existed",
                    "status" => "failed",
                    "data" => []
                ], 401);
            }
        }
        $updateUserProfile->email = $req->email;
        $updateUserProfile->name = $req->name;
        $updateUserProfile->phone = $req->phone;
        $updateUserProfile->address = $req->address;

        $updateUserProfile->save();

        return response()->json([
            "message" => "authorize",
            "status" => 'success',
            "data" => $updateUserProfile
        ], 200);
    }

    // update password and reset
    public function update_password(Request $req)
    {

        $req->validate([
            "password" => "required|confirmed|min:8"
        ]);
        $user = User::where("id", $req->id)->first();

        $user->password = Hash::make($req->password);
        $user->save();
        return response()->json([
            "message" => "password changed",
            "status" => "success",
            "data" => $user
        ], 200);
    }
    public function reset_password(Request $req)
    {

        $req->validate([
            "password" => "required|min:8"
        ]);
        $user = User::where("email", $req->email)->first();

        $user->password = Hash::make($req->password);
        $user->save();
        return response()->json([
            "message" => "password changed",
            "status" => "success",
            "data" => []
        ], 200);
    }


    // login with third party
    public function loginWithThirdParty(Request $req)
    {

        if (Auth::attempt(["email" => $req->email, 'password' => $req->password])) {
            $user = User::select("id", "name", "email")->where('email', $req->email)->first();
            $token = $user->createToken('token-name' . $user->name)->plainTextToken;

            $data = [
                "user" => $user,
                "user_token" => $token
            ];

            return response()->json([
                "message" => "authorize",
                "status" => 'success',
                "data" => $data
            ], 200);
        } else {
            $newUser = new User();
            $newUser->name = $req->name;
            $newUser->email = $req->email;
            $newUser->password = Hash::make($req->password);

            $newUser->save();
            $user = User::select("id", "name", "email")->where('email', $req->email)->first();

            return response()->json([
                "message" => "authorize",
                "status" => 'success',
                "data" => $user
            ], 200);
        }
    }

    // get active membership
    public function get_active_membership()
    {
        $activeMemberships = Membership::with('membershipsmonth')->select('id', 'title', 'catagory', 'slug')->where('active_membership_status', true)->get();

        return response()->json([
            "message" => "all memberships",
            "status" => "success",
            "data" => $activeMemberships
        ], 200);
    }

    // verfiy membership user
    public function verifyMemberShipUser($email)
    {
        $verify = CheckoutDetail::select('id', 'active_membership_status')->where('email', $email)->first();

        return response()->json([
            "message" => "verify memberShip",
            "status" => "success",
            "data" => $verify
        ], 200);
    }
    // get_allActive_video
    public function get_allActive_video()
    {
        $allActiveVideo = CousesVideo::select('id', 'title', 'video_thumb_url', 'slug', 'status', 'description')->where('status', true)->get();
        return response()->json([
            "message" => "verify memberShip",
            "status" => "success",
            "data" => $allActiveVideo
        ], 200);
    }
    public function get_sepecific_video($slug)
    {
        $allActiveVideo = CousesVideo::select('id', 'course_id', 'title', 'video_thumb', 'video_thumb_url', 'video', 'video_url', 'slug', 'description')->where('slug', $slug)->first();
        return response()->json([
            "message" => "verify memberShip",
            "status" => "success",
            "data" => $allActiveVideo
        ], 200);
    }

    // getAll active short and long  and asset deal

    public function get_allActive_shortDeal()
    {
        $allActive = ShortDeal::where('status', true)->get();
        return response()->json([
            "message" => "verify memberShip",
            "status" => "success",
            "data" => $allActive
        ], 200);
    }
    public function get_allActive_longDeal()
    {
        $allActive = LongDeal::where('status', true)->get();
        return response()->json([
            "message" => "verify memberShip",
            "status" => "success",
            "data" => $allActive
        ], 200);
    }
    public function get_allActive_asset()
    {
        $allActive = Asset::where('status', true)->get();
        return response()->json([
            "message" => "verify memberShip",
            "status" => "success",
            "data" => $allActive
        ], 200);
    }

    // get All memberShip
    public function getAllMembership($email)
    {
        $allMembership = CheckoutDetail::with('membership')->where('email', $email)->get();
        return response()->json([
            "message" => "all memberShip",
            "status" => "success",
            "data" => $allMembership
        ], 200);
    }

    // get all active courses
    public function getAllActiveCourse()
    {
        $allActiveCourses = Course::where("status", true)->get();
        return response()->json([
            "message" => "all Course",
            "status" => "success",
            "data" => $allActiveCourses
        ], 200);
    }
    public function getSpecificCourseDetails($slug)
    {
        $course = Course::where("slug", $slug)->first();
        return response()->json([
            "message" => "Course",
            "status" => "success",
            "data" => $course
        ], 200);
    }

    // get active course video
    public function get_ActiveCourse_video($id)
    {
        $courseVideos = CousesVideo::where([["course_id", $id], ['status', true]])->get();
        return response()->json([
            "message" => "Course",
            "status" => "success",
            "data" => $courseVideos
        ], 200);
    }

    // add checkout details for course
    public function addCheckoutForCourse(Request $req)
    {


        $req->validate([
            'phone_number' => "required|max:10",
            'email' => "required|email",
            'price' => 'required'
        ]);

        $NewCheckOutDetail = new CheckoutForCourse();
        $NewCheckOutDetail->user_id = $req->user_id;
        $NewCheckOutDetail->course_id = $req->course_id;

        $NewCheckOutDetail->name = $req->name;
        $NewCheckOutDetail->phone_number = $req->phone_number;
        $NewCheckOutDetail->email = $req->email;

        if ($req->promotional_code) $NewCheckOutDetail->promotional_code = $req->promotional_code;
        $NewCheckOutDetail->price = $req->price;

        $NewCheckOutDetail->save();

        return response()->json([
            "message" => "all memberships",
            "status" => "success",
            "data" => []
        ], 200);
    }

    // courseBuyVerify

    public function courseBuyVerify($id, $course_id)
    {
        $course_active = CheckoutForCourse::where([["user_id", $id], ["course_id", $course_id], ["status", true]])->first();

        if ($course_active) {
            return response()->json([
                "message" => "course buyed",
                "status" => "success",
                "data" => true
            ], 200);
        } else {
            return response()->json([
                "message" => "course not buyed",
                "status" => "success",
                "data" => false
            ], 200);
        }
    }

    public function data_fromStart($date)
    {
        $Data1 = Data::where('created_at', '>=', $date)->get();
        $Data2 = Muabánròngtheomã::where('created_at', '>=', $date)->get();

        $getData = [
            $Data1, $Data2
        ];
        return response()->json([
            "message" => "data ",
            "status" => "success",
            "data" => $getData
        ], 200);
    }
    public function data_fromEnd($date)
    {
        $Data1 = Data::where('created_at', '<=', $date)->get();
        $Data2 = Muabánròngtheomã::where('created_at', '<=', $date)->get();

        $getData = [
            $Data1, $Data2
        ];
        return response()->json([
            "message" => "data",
            "status" => "success",
            "data" => $getData
        ], 200);
    }
    public function data_fromBoth($start_date, $end_date)
    {
        $Data1 = Data::where('created_at', '>=', $start_date)
            ->where('created_at', '<=', $end_date)->get();

        $Data2 = Muabánròngtheomã::where('created_at', '>=', $start_date)
            ->where('created_at', '<=', $end_date)->get();
        $getData = [
            $Data1, $Data2
        ];
        return response()->json([
            "message" => "data",
            "status" => "success",
            "data" => $getData
        ], 200);
    }
    public function get_Muabánròngtheomã_dataById($id)
    {
        $Data1 = Muabánròngtheomã::where("data_id", $id)->get();
        $Data2 = Data::where("id", $id)->get();
        $getData = [
            $Data1, $Data2
        ];
        return response()->json([
            "message" => "data",
            "status" => "success",
            "data" => $getData
        ], 200);
    }
    public function get_dataById($id)
    {
        $Data1 = Data::with('muabánròngtheomãData')->where("id", $id)->get();
        $Data2 = Data::where("id", $id)->get();
        $getData = [
            $Data1, $Data2
        ];
        return response()->json([
            "message" => "data",
            "status" => "success",
            "data" => $getData
        ], 200);
    }
    public function get_total_data()
    {
        $getData = TotalData::orderBy('created_at', 'desc')->take(5)->get();

        return response()->json([
            "message" => "data",
            "status" => "success",
            "data" => $getData
        ], 200);
    }
    public function getStock()
    {
        $getData =  Muabánròngtheomã::select('Mã')->distinct()->get();

        return response()->json([
            "message" => "data",
            "status" => "success",
            "data" => $getData
        ], 200);
    }
    public function getDataBycatagroy($catagory)
    {
        $Data1 = Muabánròngtheomã::where("Mã", $catagory)->distinct("Mã")->get();
        $data_ids = new Collection();
        foreach ($Data1 as $data) {
            $data_ids->push($data->data_id);
        }
        $Data2 = Data::whereIn("id", $data_ids)->get();

        $getData = [
            $Data1, $Data2
        ];
        return response()->json([
            "message" => "data",
            "status" => "success",
            "data" => $getData
        ], 200);
    }

    // getAllActiveLectureArticle

    public function getAllActiveLectureArticle(){

        $getAllActiveLectureArticle=LectureArticle::where('status',true)->get();
        return response()->json([
            "message" => "article",
            "status" => "success",
            "data" => $getAllActiveLectureArticle
        ], 200);
    }
    public function get_sepecific_article($slug){

        $getArticle=LectureArticle::where('slug',$slug)->orderBy('created_at', 'desc')->first();
        return response()->json([
            "message" => "article",
            "status" => "success",
            "data" => $getArticle
        ], 200);
    }
}
