import { User } from '../models/user.models.js';
import { ApiError } from '../utils/apiError.js';
import { ApiRespone } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { uploadOnClodinary } from '../utils/cloudinary.js';

const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  // validation -
  // check user already exist - email or username
  // check images, avtar
  // upload to clodinary
  // create user in DB object
  // remove password and refresh token from the response
  // check for user is created or not
  // return response

  const { fullName, username, email, password } = req.body;

  if ([fullName, username, email, password].some((field) => !field || field?.trim() === '')) {
    throw new ApiError(400, 'All filds are required !');
  }

  const existedUser = User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, 'User with user and email already exists');
  }

  const avatarLocal = req.files?.avatar[0]?.path;
  const coverImageLocal = req.files?.coverImage[0]?.path;

  if (!avatarLocal) {
    throw new ApiError(400, 'Avatar field is required !');
  }
  const avatar = await uploadOnClodinary(avatarLocal);
  const coverImage = await uploadOnClodinary(coverImageLocal);

  if (!avatar) {
    throw new ApiError(400, 'Avatar field is required');
  }

  const user = await User.create({
    fullName,
    username: username.toLowerCase(),
    email,
    password,
    avatar: avatar.url,
    coverImg: coverImage?.url || '',
  });

  const createdUser = await User.findById(user._id).select('-password -refreshToken');

  if (!createdUser) {
    throw new ApiError(500, 'Something went wrong while registering the user');
  }

  return res.status(201).json(ApiRespone(200), createdUser, 'User Registered successfully');
});

export { registerUser };
