const User = require("../models/UserModel");
const Role = require("../models/RoleModel");
const bcrypt = require("bcrypt");
const { generateToken } = require("./JwtService");
const {
  CONFIG_MESSAGE_ERRORS,
  CONFIG_PERMISSIONS,
  CONFIG_USER_TYPE,
} = require("../configs");
const EmailService = require("../services/EmailService");
const dotenv = require("dotenv");
const { addToBlacklist, isAdminPermission } = require("../utils");
dotenv.config();
const moment = require("moment/moment");

const registerUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const { email, password } = newUser;
    try {
      const existedUser = await User.findOne({
        email: email,
      });
      if (existedUser !== null) {
        resolve({
          status: CONFIG_MESSAGE_ERRORS.ALREADY_EXIST.status,
          message: "The email of user is existed",
          typeError: CONFIG_MESSAGE_ERRORS.ALREADY_EXIST.type,
          data: null,
          statusMessage: "Error",
        });
      }
      // <-- 2. TÌM ROLE "BASIC" CÓ SẴN TRONG DATABASE
      const defaultRole = await Role.findOne({ name: "Basic" });

      const hash = bcrypt.hashSync(password, 10);
      const createdUser = await User.create({
        email,
        password: hash,
        role: defaultRole ? defaultRole._id : undefined,
        status: 1,
        userType: CONFIG_USER_TYPE.DEFAULT,
      });
      if (createdUser) {
        resolve({
          status: CONFIG_MESSAGE_ERRORS.ACTION_SUCCESS.status,
          message: "Register user success",
          typeError: "",
          data: createdUser,
          statusMessage: "Success",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

// try { ... }: Khối code bên trong chứa các lệnh có nguy cơ xảy ra lỗi (ví dụ: kết nối cơ sở dữ liệu MongoDB bị rớt, truy vấn User.findOne bị lỗi mạng, hoặc lỗi ghi dữ liệu User.create).

// catch (e) { ... }: Nếu bất kỳ câu lệnh nào bên trong khối try bị lỗi (ném ra ngoại lệ), chương trình sẽ ngay lập tức nhảy vào khối catch này. Biến e chính là đối tượng chứa thông tin chi tiết về lỗi đó.

// reject(e): Vì hàm registerUser của bạn được bọc trong một new Promise, nên khi có lỗi xảy ra, hàm sẽ gọi reject(e) để báo hiệu cho nơi gọi hàm (controller hoặc router) biết rằng tiến trình đăng ký đã thất bại và truyền đối tượng lỗi e ra ngoài để xử lý tiếp (ví dụ: trả về status 500 cho client).


const loginUser = (userLogin) => {
  return new Promise(async (resolve, reject) => {
    const { email, password, deviceToken } = userLogin;
    try {
      const checkUser = await User.findOne({
        email: email,
        userType: CONFIG_USER_TYPE.DEFAULT,
      }).populate({
        path: "role",
        select: "name permissions",
      });

      const hash = bcrypt.hashSync("123456789Kh@", 10);

      if (checkUser === null) {
        resolve({
          status: CONFIG_MESSAGE_ERRORS.INVALID.status,
          message: "The username or password is wrong",
          typeError: CONFIG_MESSAGE_ERRORS.INVALID.type,
          data: null,
          statusMessage: "Error",
        });
      }
      const comparePassword = bcrypt.compareSync(password, checkUser.password);

      if (!comparePassword) {
        resolve({
          status: CONFIG_MESSAGE_ERRORS.INVALID.status,
          message: "The username or password is wrong",
          typeError: CONFIG_MESSAGE_ERRORS.INVALID.type,
          data: null,
          statusMessage: "Error",
        });
      }

      if (deviceToken && !checkUser?.deviceTokens?.includes(deviceToken)) {
        checkUser?.deviceTokens?.push(deviceToken);
        await checkUser.save();
      }

      const access_token = await generateToken(
        {
          id: checkUser.id,
          permissions: checkUser?.role?.permissions,
        },
        process.env.ACCESS_TOKEN_SECRET,
        process.env.ACCESS_TOKEN_EXPIRE
      );

      const refresh_token = await generateToken(
        {
          id: checkUser.id,
          permissions: checkUser?.role?.permissions,
        },
        process.env.REFRESH_TOKEN_SECRET,
        process.env.REFRESH_TOKEN_EXPIRE
      );

      resolve({
        status: CONFIG_MESSAGE_ERRORS.ACTION_SUCCESS.status,
        message: "Login Success",
        typeError: "",
        statusMessage: "Success",
        data: checkUser,
        access_token,
        refresh_token,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const logoutUser = (res, accessToken) => {
  return new Promise(async (resolve, reject) => {
    try {
      // addToBlacklist(accessToken);
      resolve({
        status: CONFIG_MESSAGE_ERRORS.ACTION_SUCCESS.status,
        message: "logout Success",
        typeError: "",
        statusMessage: "Success",
        data: null,
      });
    } catch (e) {
      reject(e);
    }
  });
};


const updateAuthMe = (id, data, file, isPermission) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({
        _id: id,
      });

      if (!checkUser) {
        return resolve({
          status: CONFIG_MESSAGE_ERRORS.INVALID.status,
          message: "The user is not existed",
          typeError: CONFIG_MESSAGE_ERRORS.INVALID.type,
          data: null,
          statusMessage: "Error",
        });
      }

      if (data.email && data.email !== checkUser.email) {
        const existedName = await User.findOne({
          email: data.email,
          _id: { $ne: id },
        });

        if (existedName !== null) {
          return resolve({
            status: CONFIG_MESSAGE_ERRORS.ALREADY_EXIST.status,
            message: "The email of user is existed",
            typeError: CONFIG_MESSAGE_ERRORS.ALREADY_EXIST.type,
            data: null,
            statusMessage: "Error",
          });
        }
      }

      if (
        isAdminPermission(checkUser.permissions) &&
        (data.status !== checkUser.status || data.email !== checkUser.email)
      ) {
        return resolve({
          status: CONFIG_MESSAGE_ERRORS.UNAUTHORIZED.status,
          message: "You can't change admin's email or status",
          typeError: CONFIG_MESSAGE_ERRORS.UNAUTHORIZED.type,
          data: null,
          statusMessage: "Error",
        });
      }

      if (data.addresses) {
        const defaultAddresses = data.addresses.filter(
          (address) => address.isDefault
        );
        if (defaultAddresses.length > 1) {
          return resolve({
            status: CONFIG_MESSAGE_ERRORS.INVALID.status,
            message: "Only one default address is allowed",
            typeError: CONFIG_MESSAGE_ERRORS.INVALID.type,
            data: null,
            statusMessage: "Error",
          });
        }
      }

      // Xử lý file ảnh từ Cloudinary (nếu có upload file mới)
      if (file && file.path) {
        checkUser.avatar = file.path;
      } else if (data.avatar !== undefined) {
        checkUser.avatar = data.avatar;
      }

      // Cập nhật các trường thông tin cơ bản
      if (data.firstName !== undefined) checkUser.firstName = data.firstName;
      if (data.lastName !== undefined) checkUser.lastName = data.lastName;
      if (data.middleName !== undefined) checkUser.middleName = data.middleName;
      if (data.phoneNumber !== undefined) checkUser.phoneNumber = data.phoneNumber;
      if (data.address !== undefined) checkUser.address = data.address;
      
      if (data.email) checkUser.email = data.email;
      if (data.city) checkUser.city = data.city;
      if (data.role) checkUser.role = data.role;
      if (data.addresses) checkUser.addresses = data.addresses;

      // Xử lý ép kiểu và gán status trực tiếp tại Service để đảm bảo nhận dạng chuẩn số (0 hoặc 1)
      if (data.status !== undefined) {
        checkUser.status = 
          data.status === 1 || data.status === '1' || data.status === true || data.status === 'true' ? 1 : 0;
      }

      await checkUser.save();
      await checkUser.populate('role'); // Populate luôn role để trả về frontend hiển thị tên role chuẩn

      return resolve({
        status: CONFIG_MESSAGE_ERRORS.ACTION_SUCCESS.status,
        message: "Updated user success",
        typeError: "",
        data: checkUser,
        statusMessage: "Success",
      });
    } catch (e) {
      return reject(e);
    }
  });
};

const changePasswordService = async (userId, currentPassword, newPassword) => {
    // 1. Tìm user theo ID (đã được middleware AuthPermission gán vào req.user hoặc req.userId)
    const user = await User.findById(userId);
    if (!user) {
        throw new Error('Người dùng không tồn tại');
    }

    // 2. Kiểm tra mật khẩu hiện tại có chính xác không
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
        throw new Error('Mật khẩu hiện tại không chính xác');
    }

    // 3. Hash mật khẩu mới
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // 4. Cập nhật mật khẩu mới vào database
    user.password = hashedPassword;
    await user.save();

    return { message: 'Đổi mật khẩu thành công' };
};

const updateDeviceToken = (id, data, isPermission) => {
  return new Promise(async (resolve, reject) => {
    try {
    const {  deviceToken } = data;
      const checkUser = await User.findOne({
        _id: id,
      })

      if (!checkUser) {
        resolve({
          status: CONFIG_MESSAGE_ERRORS.INVALID.status,
          message: "The user is not existed",
          typeError: CONFIG_MESSAGE_ERRORS.INVALID.type,
          data: null,
          statusMessage: "Error",
        });
        return;
      }

      if (deviceToken && !checkUser?.deviceTokens?.includes(deviceToken)) {
        checkUser?.deviceTokens?.push(deviceToken);
        await checkUser.save();
      }
      resolve({
        status: CONFIG_MESSAGE_ERRORS.ACTION_SUCCESS.status,
        message: "Updated user success",
        typeError: "",
        data: checkUser,
        statusMessage: "Success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const changePasswordMe = (userId, data, res, accessToken) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({
        _id: userId,
      });
      const { newPassword, currentPassword } = data;
      const comparePassword = bcrypt.compareSync(
        newPassword,
        checkUser.password
      );
      const compareCurrentPassword = bcrypt.compareSync(
        currentPassword,
        checkUser.password
      );

      if (checkUser === null) {
        resolve({
          status: CONFIG_MESSAGE_ERRORS.INVALID.status,
          message: "The user is not existed",
          typeError: CONFIG_MESSAGE_ERRORS.INVALID.type,
          data: null,
          statusMessage: "Error",
        });
      }
      if (!compareCurrentPassword) {
        resolve({
          status: CONFIG_MESSAGE_ERRORS.ALREADY_EXIST.status,
          message: "The  currentPassword is wrong",
          typeError: CONFIG_MESSAGE_ERRORS.ALREADY_EXIST.type,
          data: null,
          statusMessage: "Error",
        });
      }

      if (comparePassword) {
        resolve({
          status: CONFIG_MESSAGE_ERRORS.ALREADY_EXIST.status,
          message: "The new password isn't not duplicate current password",
          typeError: CONFIG_MESSAGE_ERRORS.ALREADY_EXIST.type,
          data: null,
          statusMessage: "Error",
        });
      }
      const hash = bcrypt.hashSync(newPassword, 10);

      checkUser.password = hash;
      await checkUser.save();
      resolve({
        status: CONFIG_MESSAGE_ERRORS.ACTION_SUCCESS.status,
        message: "ChangePassword user success",
        typeError: "",
        data: null,
        statusMessage: "Success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const forgotPasswordMe = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({
        email,
        userType: CONFIG_USER_TYPE.DEFAULT,
      }).select("-password");

      if (checkUser === null) {
        resolve({
          status: CONFIG_MESSAGE_ERRORS.INVALID.status,
          message: "The email is not existed",
          typeError: CONFIG_MESSAGE_ERRORS.INVALID.type,
          data: null,
          statusMessage: "Error",
        });
        return;
      }

      const resetToken =
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);

      const addedTime = moment().add(
        process.env.TIME_EXPIRE_PASSWORD,
        "seconds"
      );

      checkUser.resetToken = resetToken;
      checkUser.resetTokenExpiration = addedTime.format(
        "YYYY-MM-DDTHH:mm:ss.SSSZ"
      ); // Hết hạn sau 1 giờ

      const resetLink = `${process.env.URL_RESET_PASSWORD}?secretKey=${resetToken}`;
      await checkUser.save();
      await EmailService.sendEmailForgotPassword(
        email,
        resetLink,
        process.env.TIME_EXPIRE_PASSWORD
      );
      resolve({
        status: CONFIG_MESSAGE_ERRORS.ACTION_SUCCESS.status,
        message: "Forgot password success",
        typeError: "",
        data: checkUser,
        statusMessage: "Success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const resetPasswordMe = (secretKey, newPassword) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({
        resetToken: secretKey,
        resetTokenExpiration: { $gt: Date.now() },
      });

      if (!user) {
        resolve({
          status: CONFIG_MESSAGE_ERRORS.INVALID.status,
          message: "Invalid or expired token",
          typeError: CONFIG_MESSAGE_ERRORS.INVALID.type,
          data: null,
          statusMessage: "Error",
        });
        return;
      }

      const comparePassword = bcrypt.compareSync(newPassword, user.password);

      if (comparePassword) {
        resolve({
          status: CONFIG_MESSAGE_ERRORS.ALREADY_EXIST.status,
          message: "The new password isn't not duplicate current password",
          typeError: CONFIG_MESSAGE_ERRORS.ALREADY_EXIST.type,
          data: null,
          statusMessage: "Error",
        });
      }

      const hash = bcrypt.hashSync(newPassword, 10);

      user.password = hash;
      user.resetToken = null;
      user.resetTokenExpiration = null;
      await user.save();

      resolve({
        status: CONFIG_MESSAGE_ERRORS.ACTION_SUCCESS.status,
        message: "Password reset successfully",
        typeError: "",
        data: user,
        statusMessage: "Success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const verifyGoogleIdToken = async (idToken) => {
  try {
    // const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
    // const client = new OAuth2Client(CLIENT_ID);
    // const ticket = await client.verifyIdToken({
    //   idToken,
    //   audience: CLIENT_ID,
    // });
    // const payload = ticket.getPayload();
    // return payload;

    const response = await fetch(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      }
    );
    const data = await response.json();

    return data;
  } catch (error) {
    return null;
  }
};

const verifyFacebookIdToken = async (idToken) => {
  try {
    const response = await fetch(
      `https://graph.facebook.com/me?access_token=${idToken}&fields=picture,email,first_name,last_name`,
      {
        method: "GET",
      }
    );
    const data = await response.json();

    return data;
  } catch (error) {
    return null;
  }
};

const registerGoogle = (idToken) => {
  return new Promise(async (resolve, reject) => {
    try {
      const payload = await verifyGoogleIdToken(idToken);
      if (!payload) {
        resolve({
          status: CONFIG_MESSAGE_ERRORS.INVALID.status,
          message: "Validate user is error",
          typeError: CONFIG_MESSAGE_ERRORS.INVALID.type,
          data: null,
          statusMessage: "Error",
        });
      }

      const { email, family_name, given_name, picture } = payload;

      let checkUser = await User.findOne({ email: email });
      if (checkUser) {
        resolve({
          status: CONFIG_MESSAGE_ERRORS.ALREADY_EXIST.status,
          message: "The user is existed",
          typeError: CONFIG_MESSAGE_ERRORS.ALREADY_EXIST.type,
          data: null,
          statusMessage: "Error",
        });
      }
      const newUser = await User.create({
        email,
        firstName: given_name,
        avatar: picture,
        lastName: family_name,
        userType: CONFIG_USER_TYPE.GOOGLE,
      });
      if (newUser) {
        resolve({
          status: CONFIG_MESSAGE_ERRORS.ACTION_SUCCESS.status,
          message: "Register user success",
          typeError: "",
          data: newUser,
          statusMessage: "Success",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const loginGoogle = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { idToken, deviceToken = "" } =data;
      const payload = await verifyGoogleIdToken(idToken);
      if (!payload) {
        resolve({
          status: CONFIG_MESSAGE_ERRORS.INVALID.status,
          message: "Validate user is error",
          typeError: CONFIG_MESSAGE_ERRORS.INVALID.type,
          data: null,
          statusMessage: "Error",
        });
      }
      const { email } = payload;

      const checkUser = await User.findOne({
        email: email,
        userType: CONFIG_USER_TYPE.GOOGLE,
      }).populate({
        path: "role",
        select: "name permissions",
      });

      if (!checkUser) {
        resolve({
          status: CONFIG_MESSAGE_ERRORS.INVALID.status,
          message: "The user is not existed",
          typeError: CONFIG_MESSAGE_ERRORS.INVALID.type,
          data: null,
          statusMessage: "Error",
        });
        return;
      }

      if (deviceToken && !checkUser.deviceTokens.includes(deviceToken)) {
        checkUser.deviceTokens.push(deviceToken);
        await checkUser.save();
      }

      const access_token = await generateToken(
        {
          id: checkUser.id,
          permissions: checkUser?.role?.permissions,
        },
        process.env.ACCESS_TOKEN_SECRET,
        process.env.ACCESS_TOKEN_EXPIRE
      );

      const refresh_token = await generateToken(
        {
          id: checkUser.id,
          permissions: checkUser?.role?.permissions,
        },
        process.env.REFRESH_TOKEN_SECRET,
        process.env.REFRESH_TOKEN_EXPIRE
      );

      resolve({
        status: CONFIG_MESSAGE_ERRORS.ACTION_SUCCESS.status,
        message: "Login Success",
        typeError: "",
        statusMessage: "Success",
        data: checkUser,
        access_token,
        refresh_token,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const registerFacebook = (idToken) => {
  return new Promise(async (resolve, reject) => {
    try {
      const payload = await verifyFacebookIdToken(idToken);
      if (!payload) {
        resolve({
          status: CONFIG_MESSAGE_ERRORS.INVALID.status,
          message: "Validate user is error",
          typeError: CONFIG_MESSAGE_ERRORS.INVALID.type,
          data: null,
          statusMessage: "Error",
        });
        return;
      }
      const { email, first_name, last_name, picture } = payload;
      const avatar = picture?.data?.url;

      let checkUser = await User.findOne({ email: email });
      if (checkUser) {
        resolve({
          status: CONFIG_MESSAGE_ERRORS.ALREADY_EXIST.status,
          message: "The user is existed",
          typeError: CONFIG_MESSAGE_ERRORS.ALREADY_EXIST.type,
          data: null,
          statusMessage: "Error",
        });
      }
      const newUser = await User.create({
        email,
        firstName: first_name,
        avatar,
        lastName: last_name,
        userType: CONFIG_USER_TYPE.FACEBOOK,
      });
      if (newUser) {
        resolve({
          status: CONFIG_MESSAGE_ERRORS.ACTION_SUCCESS.status,
          message: "Register user success",
          typeError: "",
          data: newUser,
          statusMessage: "Success",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const loginFacebook = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { idToken, deviceToken = "" } = data;

      const payload = await verifyFacebookIdToken(idToken);
      if (!payload) {
        resolve({
          status: CONFIG_MESSAGE_ERRORS.INVALID.status,
          message: "Validate user is error",
          typeError: CONFIG_MESSAGE_ERRORS.INVALID.type,
          data: null,
          statusMessage: "Error",
        });
      }

      const { email } = payload;

      let checkUser = await User.findOne({
        email: email,
        userType: CONFIG_USER_TYPE.FACEBOOK,
      }).populate({
        path: "role",
        select: "name permissions",
      });

      if (!checkUser) {
        resolve({
          status: CONFIG_MESSAGE_ERRORS.INVALID.status,
          message: "The user is not existed",
          typeError: CONFIG_MESSAGE_ERRORS.INVALID.type,
          data: null,
          statusMessage: "Error",
        });
        return;
      }

      if (deviceToken && !checkUser.deviceTokens.includes(deviceToken)) {
        checkUser.deviceTokens.push(deviceToken);
        await checkUser.save();
      }

      const access_token = await generateToken(
        {
          id: checkUser.id,
          permissions: checkUser?.role?.permissions,
        },
        process.env.ACCESS_TOKEN_SECRET,
        process.env.ACCESS_TOKEN_EXPIRE
      );

      const refresh_token = await generateToken(
        {
          id: checkUser.id,
          permissions: checkUser?.role?.permissions,
        },
        process.env.REFRESH_TOKEN_SECRET,
        process.env.REFRESH_TOKEN_EXPIRE
      );

      resolve({
        status: CONFIG_MESSAGE_ERRORS.ACTION_SUCCESS.status,
        message: "Login Success",
        typeError: "",
        statusMessage: "Success",
        data: checkUser,
        access_token,
        refresh_token,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  loginUser,
  logoutUser,
  updateAuthMe,
  changePasswordMe,
  forgotPasswordMe,
  resetPasswordMe,
  registerGoogle,
  registerFacebook,
  loginFacebook,
  loginGoogle,
  registerUser,
  updateDeviceToken,
  changePasswordService,
};
