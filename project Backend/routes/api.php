<?php

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DaseboardController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});



// user related Route
Route::controller(UserController::class)->name("user")->group(function () {

    // authInfo
    Route::get("/authInfo/{id}", function ($id) {

        $user = User::select("id", "name", "email", "phone", "address")->where('id', $id)->first();
        return response()->json([
            "message" => "user data",
            "status" => "success",
            "data" => $user
        ], 200);
    })->name(".authInfo");

    // user register
    Route::post("/user_registration", "register")->name('.register');
    Route::post("/user_login", "login")->name('.login');
    Route::post("/forget_password", "forget_password")->name('.forget_password');

    // update profile
    Route::post("/update_profile", "update_profile")->name(".update_profile");
    Route::post("/update_password", "update_password")->name(".update_password");
    Route::post("/reset_password","reset_password")->name(".reset_password");


    // get active membership
    Route::get("/get-active-membership","get_active_membership")->name(".get_active_membership");


    // login with Thirdparty
    Route::post("/loginWithThirdParty", "loginWithThirdParty")->name("loginWithThirdParty");

    // verify_user
    Route::post('/verifyMail','verifyEmail')->name('.verifyEmail');

    // verify membershipUser
    Route::get("/verifyMemberShipUser/{email}","verifyMemberShipUser")->name('.verifyMemberShipUser');
    // get_allActive_video
    Route::get("/get_allActive_video","get_allActive_video")->name(".get_allActive_video");
    Route::get("/get_allActive_shortDeal","get_allActive_shortDeal")->name(".get_allActive_shortDeal");
    Route::get("/get_allActive_longDeal","get_allActive_LongDeal")->name(".get_allActive_LongDeal");
    Route::get("/get_allActive_asset","get_allActive_asset")->name(".get_allActive_asset");
    Route::get("/get_sepecific_video/{slug}","get_sepecific_video")->name(".get_sepecific_video");
    Route::get("/getAllMembership/{email}",'getAllMembership')->name(".getAllMembership");
    Route::get("/getAllActiveCourse",'getAllActiveCourse')->name(".getAllActiveCourse");
    Route::get("/getAllActiveLectureArticle",'getAllActiveLectureArticle')->name(".getAllActiveLectureArticle");
    Route::get("/getSpecificCourseDetails/{slug}",'getSpecificCourseDetails')->name(".getSpecificCourseDetails");
    Route::get("/get_sepecific_article/{slug}",'get_sepecific_article')->name(".get_sepecific_article");
    Route::get("/get_ActiveCourse_video/{id}","get_ActiveCourse_video")->name(".get_ActiveCourse_video");
    Route::post("/addCheckoutForCourse","addCheckoutForCourse")->name(".addCheckoutForCourse");
    Route::get("/courseBuyVerify/{id}/{course_id}","courseBuyVerify")->name(".courseBuyVerify");

    // according to date  to get data   
    Route::get("/data_fromStart/{date}","data_fromStart")->name(".data_fromStart");
    Route::get("/data_fromEnd/{date}","data_fromEnd")->name(".data_fromEnd");
    Route::get("/data_fromBoth/{start_date}/{end_date}","data_fromBoth")->name(".data_fromBoth");
    Route::get("/get_Muabánròngtheomã_dataById/{id}","get_Muabánròngtheomã_dataById")->name(".get_Muabánròngtheomã_dataById");
    Route::get("/get_dataById/{id}","get_dataById")->name(".get_dataById");
    Route::get("/get_total_data","get_total_data")->name(".get_total_data");
    Route::get("/getDataBycatagroy/{catagory}","getDataBycatagroy")->name(".getDataBycatagroy");
    Route::get("/getStock","getStock")->name(".getStock");
});

// daseboard related Route
Route::controller(DaseboardController::class)->name("daseboard")->group(function () {

    // all user
    Route::get("/all-user","all_user")->name(".all_user");
    // all membership user nad active membership
    Route::get("/all-membership-user","all_MembershipUser")->name(".all_MembershipUser");
    Route::post("/delete_membership_user","delete_membership_user")->name(".delete_membership_user");
    Route::post("/active_membership_user_status","active_membership_user_status")->name(".active_membership_user_status");
    Route::post("/active_membership_status","active_membership_status")->name(".active_membership_status");
    Route::post("/delete_membership","delete_membership")->name(".delete_membership");

    // add short and long deal and asset
    Route::post("/add_short_deal","add_short_deal")->name(".add_short_deal");
    Route::post("/add_long_deal","add_long_deal")->name(".add_long_deal");
    Route::post("/add_asset","add_asset")->name(".add_asset");
    // get short and long deal and asset
    Route::get("/get_short_deal","get_short_deal")->name(".get_short_deal");
    Route::get("/get_long_deal","get_long_deal")->name(".get_long_deal");
    Route::get("/get_asset","get_asset")->name(".get_asset");
    // delete short and long deal and asset
    Route::post("/delete_short_deal/{id}","delete_short_deal")->name(".delete_short_deal");
    Route::post("/delete_long_deal/{id}","delete_long_deal")->name(".delete_long_deal");
    Route::post("/delete_asset/{id}","delete_asset")->name(".delete_asset");
    // get specific short and long deal and asset
    Route::get("/get_specific_short_deal/{id}","get_specific_short_deal")->name(".get_specific_short_deal");
    Route::get("/get_specific_long_deal/{id}","get_specific_long_deal")->name(".get_specific_long_deal");
    Route::get("/get_specific_asset/{id}","get_specific_asset")->name(".get_specific_asset");
    // edit specific short and long deal and asset
    Route::post("/edit_specific_short_deal/{id}","edit_specific_short_deal")->name(".edit_specific_short_deal");
    Route::post("/edit_specific_long_deal/{id}","edit_specific_long_deal")->name(".edit_specific_long_deal");
    Route::post("/edit_specific_asset/{id}","edit_specific_asset")->name(".edit_specific_asset");
    // staus change  short and long deal and asset
    Route::post("/status_change_specific_short_deal/{id}","status_change_specific_short_deal")->name(".status_change_specific_short_deal");
    Route::post("/status_change_specific_long_deal/{id}","status_change_specific_long_deal")->name(".status_change_specific_long_deal");
    Route::post("/status_change_specific_asset/{id}","status_change_specific_asset")->name(".status_change_specific_asset");


    // add and get and edit video for membership
    Route::post("/upload_video","upload_video")->name(".upload_video");
    Route::get("/get_all_video","get_all_video")->name(".get_all_video");
    Route::post("/Delete_sepecific_video/{id}","Delete_sepecific_video")->name(".Delete_sepecific_video");
    Route::post("/status_change_video/{id}","status_change_video")->name(".status_change_video");
    Route::post("/edit_video/{slug}","edit_video")->name(".edit_video");

    // add and get  unlock Article
    Route::post("/add-article","addArticle")->name(".addArticle");
    Route::get('/getArticle/{catagory}',"getArticle")->name(".getArticle");

    // add and get Lock article
    Route::post("/add-lock-article","addLockArticle")->name(".addLockArticle");
    Route::get('/getLockArticle/{catagory}',"getLockArticle")->name(".getLockArticle");
    Route::post("/addLectureArticle","addLectureArticle")->name(".addLectureArticle");
    Route::get("/getAllLectureArticle","getAllLectureArticle")->name(".getAllLectureArticle");
    Route::post("/deleteLectureArticle/{slug}","deleteLectureArticle")->name(".deleteLectureArticle");
    Route::post("/status_change_LectureArticle/{id}","status_change_LectureArticle")->name(".status_change_LectureArticle");
    Route::post("/edit_LectureArticle/{slug}","edit_LectureArticle")->name(".edit_LectureArticle");
    Route::get("/get_specificLectureArticle/{slug}","get_specificLectureArticle")->name(".get_specificLectureArticle");


    // add and get Memberships
    Route::post("/add-membership","addMemeberShip")->name(".addMemeberShip");
    Route::get("/get-membership","getMemeberShip")->name(".getMemeberShip");
    // get specific membershipt
    Route::get('/get_specific_membership/{slug}','get_specific_membership')->name('.get_specific_membership');

    // add  checkout details
    Route::post('/add-checkoutDetails','addCheckoutDeatails')->name('.addCheckoutDeatails');

    // upload img
    Route::post('/upload_image', 'upload_image')->name(".upload_image");
    // upload Data
    Route::post('/upload_Data', 'upload_Data')->name(".upload_Data");
    Route::get('/get_Data', 'get_Data')->name(".get_Data");
    Route::post("/upload_totalData","upload_totalData")->name(".upload_totalData");
    Route::post('/upload_Muabánròngtheomã_data', 'upload_Muabánròngtheomã_data')->name(".upload_Muabánròngtheomã_data");
    Route::get('/get_Muabánròngtheomã_data', 'get_Muabánròngtheomã_data')->name(".get_Muabánròngtheomã_data");

    // add course and get all Course
    Route::post("/add_course","add_course")->name(".add_course");
    Route::get("/getAll_course","getAll_course")->name(".getAll_course");
    Route::post("/Delete_sepecific_course/{id}","Delete_sepecific_course")->name(".Delete_sepecific_course");
    Route::post("/status_change_course/{id}","status_change_course")->name(".status_change_course");
    Route::post("/edit_course/{slug}","edit_course")->name(".edit_course");
    Route::get('/get_specific_course/{slug}','get_specific_course')->name('.get_specific_course');

    // all course user activity
    Route::get("/all_CourseUser","all_CourseUser")->name(".all_CourseUser");
    Route::post("/delete_course_user","delete_course_user")->name(".delete_course_user");
    Route::post("/active_course_user_status","active_course_user_status")->name(".active_course_user_status");
    Route::get("/get_data_byDate","get_data_byDate")->name(".get_data_byDate");
    Route::post("/delete_data_byDate/{date}","delete_data_byDate")->name(".delete_data_byDate");

});
