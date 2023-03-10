const { db, get_users } = require("./public/js/query.js");

const express = require("express"),
  app = express(),
  query_js = require(__dirname + "/public/js/query"),
  multer = require("multer");

const exphbs = require("express-handlebars");
const fileupload = require("express-fileupload");
const DIR = "./uploads";

// middleware
app.use(express.json());
app.use(express.urlencoded());
app.use(fileupload());
app.use(express.static("public"));

let storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, DIR);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

let upload = multer({ storage: storage });

// view engine setup
app.set("views", "views");
app.set("view engine", "ejs");

var registered_result = 0,
  result_login = 1;

// Return Codes
// 0 : Null
// 1 : Login Successfull
// 2 : Incorrect Credentials
// 3 : Not yet Authenticated
// 4 : Error

var return_codes = {
  1: { msg: "Success", flag: 0 },
  2: { msg: "Incorrect Credentials", code: 2, flag: 1 },
  3: { msg: "Not Yet Authenticated", code: 3, flag: 1 },
  4: { msg: "Error Occurred", code: 4, flag: 1 },
};

let json_params = {
  1: "Working",
  2: "Studying",
  3: "Entrepreneur",
  4: "Others",
};

var reg_no = 0,
  loggedin_flag = false;

// https://localhost:3000//{}

// index page
app.get("/", (req, res) => {
  // console.log(return_codes[result_login]);
  reg_no = 0;
  // console.log(registered_result);
  res.render("pages/index", {
    result: registered_result,
    result_login: return_codes[result_login],
  });
  registered_result = 0;
  result_login = 1;
});

// Register User
app.get("/register", (req, res) => {
  return res.render("pages/register");
});

// Login
app.post("/login", (req, res) => {
  // console.log("login route");

  let params = { email_id: req.body.email_id, password: req.body.password };

  query_js.login(params, (results) => {
    console.log(results);
    // Authentication
    if (results["invalid_user"]) {
      result_login = 2;
      return res.redirect("/");
    } else if (results["Authenticated"] == 0) {
      result_login = 3;
    } else if (results["Authenticated"] == 1 && results["status"]) {
      reg_no = results["register_number"];
      loggedin_flag = true;
      return results["isadmin"] == 0
        ? res.redirect("/announcement")
        : res.redirect("/admin");
    } else {
      return res.redirect("/");
    }
  });
});

// Register User
app.post("/register_user", (req, res) => {
  params = {
    admin: 0,
    register_number: req.body.regno,
    name: req.body.Name,
    mobile_no: req.body.mobile_no,
    email_id: req.body.email_id,
    title: req.body.gender == "Male" ? "Mr" : "Mrs",
    course: req.body.course,
    department: req.body.department,
    password: req.body.password,
    current_status: json_params[req.body.current_status],
    designation: req.body.designation_working || req.body.designation_ent,
    company_name: req.body.company_name_working || req.body.company_name_ent,
    work_domain: req.body.work_domain_working || req.body.work_domain_ent || "",
    company_address:
      req.body.company_address_working ||
      req.body.company_address_ent ||
      req.body.university_location_studying ||
      "",
    course_name: req.body.course_name_studying,
    university_name: req.body.university_name_studying,
    others: req.body.others,
    Image: " ",
    linked_in: req.body.linked_in,
    dob: req.body.DOB,
  };
  console.log(params);
  query_js.create_user(params, (results) => {
    console.log(results);
    registered_result = results.error_code;
    return res.redirect("/");
  });
});

let update_user_result = 0;

// User page
app.get("/user", (req, res) => {
  if (loggedin_flag) {
    query_js.fetch_user_details(reg_no, (results) => {
      if (!results) {
        return res.redirect("/");
      } else {
        // console.log(results);
        return res.render("pages/user/user", {
          update_result: update_user_result--,
          user_results: results,
        });
      }
    });
  } else {
    return res.redirect("/");
  }
});

// Updating User Details
app.post("/update_user", upload.single("profile_image"), (req, res) => {
  update_user_result = 0;

  // imageFile = req.body.profile_image;

  // name of the input is sampleFile
  // sampleFile = req.files.profile_image;
  // console.log("FILE", req);
  // uploadPath = __dirname + "/upload/" + sampleFile.name;

  // console.log(sampleFile);

  // let uploadPath = __dirname + "/public/images/faces" + imageFile;
  // console.log("IMAGE", req.body.profile_image);
  // console.log(uploadPath);

  // console.log(req.files);
  // sampleFile = req.files.profile_image;
  // uploadPath = __dirname + "/upload/" + profile_image.name;
  // console.log("VALUE:", req.body.email_visible);

  // console.log(sampleFile);

  query_js.fetch_user_details(reg_no, (results) => {
    // console.log("CURRENT", results.Current_Status);
    params = {
      register_number: reg_no,
      name: req.body.Name,
      mobile_no: req.body.mobile_no,
      email_id: req.body.email_id,
      title: req.body.gender == "Male" ? "Mr" : "Mrs",
      course: req.body.course,
      department: req.body.department,
      year_of_entry: req.body.year_of_entry,
      year_passed: req.body.year_passed,
      current_status: json_params[req.body.current_status] || " ",
      designation:
        req.body.designation_working || req.body.designation_ent || " ",
      company_name:
        req.body.company_name_working || req.body.company_name_ent || " ",
      work_domain:
        req.body.workdomain_working ||
        req.body.workdomain_ent ||
        results.Work_Domain ||
        " ",
      company_address:
        req.body.company_address_working ||
        req.body.company_address_ent ||
        req.body.university_location_studying ||
        "",
      course_name: req.body.course_name_studying,
      university_name: req.body.university_name_studying,
      others: req.body.others,
      email_visible: req.body.email_visible || 0,
      mobile_visible: req.body.mobile_visible || 0,
      Image: "",
      password: req.body.password,
      testimonial_title: req.body.testimonial_title,
      testimonial_desc: req.body.testimonial_desc,
    };

    // console.log(params);

    query_js.update_details(params, (result) => {
      update_user_result = result ? 1 : 2;
      // console.log(update_user_result);
      return res.redirect("/user");
    });
  });
});

// Announcement - User
app.get("/announcement", (req, res) => {
  query_js.db.query("SELECT * from Announcements", (err, results, fields) => {
    if (err) {
      console.log(err);
    } else {
      // console.log("Date", results[0].Date.toDateString());

      return res.render("pages/user/announcement", {
        results: results,
      });
    }
  });
});

// Update Details
app.post("/update_details", (req, res) => {
  // console.log("update details");
  return res.redirect("/user");
});

let announcement_result = 0;

// Announcements
app.get("/announcement_admin", (req, res) => {
  return res.render("pages/admin/announcement", {
    result: announcement_result,
  });
});

// View Users Route
app.get("/view_users", (req, res) => {
  try {
    query_js.get_users((results) => {
      return res.render("pages/user/users", { user_details: results });
    });
  } catch (error) {
    return res.redirect("/error");
  }
});

// Business Users Route
app.get("/user_business", (req, res) => {
  try {
    query_js.fetch_user_business_details((results) => {
      // console.log(results);
      return res.render("pages/user/business", { user_details: results });
    });
  } catch (error) {
    return redirect("/error");
  }
});

// ADMIN ROUTE

// Admin page
app.get("/admin", (req, res) => {
  if (loggedin_flag) {
    try {
      query_js.fetch_stats((results) => {
        // console.log(results.alumni_details.length);
        res.render("pages/admin/admin", {
          stats: results,
          result: announcement_result,
        });
        announcement_result = 0;
      });
    } catch (error) {
      return res.redirect("/error");
    }
  }
});

// Create Announcements
app.post("/create_announcement", (req, res) => {
  if (loggedin_flag) {
    try {
      announcement_result = 0;
      let params = [null, req.body.title, req.body.description, "", ""];

      query_js.create_announcement(params, (result) => {
        if (result) {
          announcement_result = 1;
        } else {
          announcement_result = 2;
        }
        return res.redirect("/admin");
      });
    } catch (error) {
      return res.redirect("/error");
    }
  } else {
    return res.redirect("/");
  }
});

var forgot_update = 0;

// Forgot Password
app.get("/forgot_password", (req, res) => {
  try {
    console.log(forgot_update);
    res.render("pages/forgot_password", { result: forgot_update });
    forgot_update = 0;
  } catch (error) {
    return res.redirect("/error");
  }
});

// Codes
// 0 : None
// 1 : Success
// 2 : Invalid Credentials
// 3 : Server Error

// Forgot Password Submit Route
app.post("/forgot_password_submit", (req, res) => {
  try {
    let params = {
      register_number: req.body.register_number,
      email_id: req.body.email_id,
      password: req.body.password,
    };
    // console.log(params);
    query_js.forgot_password_check(params, (results) => {
      forgot_update = results;
      // console.log(forgot_update);
      return res.redirect("/forgot_password");
    });
  } catch (error) {
    console.log(error);
    return res.redirect("/error");
  }
});

// Error Page
app.get("/error", (req, res) => {
  return res.redirect("/");
});

// Logout
app.get("/logout", (req, res) => {
  loggedin_flag = false;
  return res.redirect("/");
});

// Change Port Number in Integration
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("http://localhost:3000");
});

//db-Generate Route
require("./public/js/db.js");
//console.log(__dirname);
