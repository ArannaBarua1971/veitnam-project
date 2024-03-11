<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
</head>

<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333;">

    <div
        style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">

        <h2 style="color: #007BFF;">{{ $data['title'] }}</h2>

        @if (isset($data['otp']))
            <p>Here is your otp to reset your password</p>
            <p
                style="display: inline-block; padding: 10px 20px; background-color: #007BFF; color: #fff; text-decoration: none; border-radius: 4px;">
                {{ $data['otp'] }}
            </p>
        @else
            <p>Thank you for registering with our website. To complete your registration, please click the button below
                to verify your email address:</p>
            <a href="{{ $data['url'] }}"
                style="display: inline-block; padding: 10px 20px; background-color: #007BFF; color: #fff; text-decoration: none; border-radius: 4px;">
                Verify Email
            </a>
        @endif
        <p>If you did not create an account, no further action is required.</p>

        <p>Thanks,<br>{{ config('app.name') }}</p>

    </div>

</body>

</html>
