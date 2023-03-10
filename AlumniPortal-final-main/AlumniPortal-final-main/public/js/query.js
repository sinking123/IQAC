const { query } = require("express");

var mysql = require("mysql"),
  db_name = "alumni_db"; //change db name in production

// Connecting to db after creation
var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: db_name,
  multipleStatements: true,
});

db.connect((err) => {
  if (err) throw err;
});

// Login
function login(params, callback) {
  let query = "SELECT * from User where Email_Id = ?",
    response = {
      isadmin: 0,
      Authenticated: 0,
      status: false,
      invalid_user: true,
      register_number: 0,
    };

  db.query(query, params.email_id, (err, results, fields) => {
    if (!err && results.length != 0) {
      response.isadmin = results[0].Admin;
      response.Authenticated = results[0].Authenticated;
      response.status = true;
      (response.invalid_user =
        results[0].Password == params.password ? false : true),
        (response.register_number = results[0].Register_Number);
      return callback(response);
    } else {
      console.log(err);
      return callback(response);
    }
  });
}

// Authentication Check
function is_authenticated(params, callback) {
  let query =
    "SELECT * from Academic_Details where Register_Number = ? and DOB = ?";

  db.query(query, params, (err, results, fields) => {
    if (err) {
      console.log(err)
      throw err;
    } else {
      if (results.length != 0) {
        callback(true);
      } else {
        callback(false);
      }
    }
  });
}

// Delete Created User Details
function delete_user(reg_no, callback) {
  db.query(
    "DELETE from User where Register_Number = ?",
    [reg_no],
    (err, results, fields) => {
      console.log(err);
      db.query(
        "DELETE from About where Register_Number = ?",
        [reg_no],
        (err, results, fields) => {
          console.log(err);
          db.query(
            "DELETE from Current_Status where Register_Number = ?",
            [reg_no],
            (err, results, fields) => {
              console.log(err);
              db.query(
                "DELETE from testimonial where Register_Number = ?",
                [reg_no],
                (err, results, fields) => {
                  console.log(err);
                  callback(true);
                }
              );
            }
          );
        }
      );
    }
  );
}

function get_current_date() {
  var date_ob = new Date();
  var day = ("0" + date_ob.getDate()).slice(-2);
  var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  var year = date_ob.getFullYear();

  var date = year + "-" + month + "-" + day;
  return date;
}

function get_current_time() {
  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  return time;
}

// Create User
function create_user(params, callback) {
  let response = { status: false, error_code: 1 };

  console.log(params);

  is_authenticated([params.register_number, params.dob], (results) => {
    if (!results) {
      response.error_code = 3;
      return callback(response);
    }

    // console.log(Date.now());

    let query = "INSERT INTO User values (?,?,?,?,?,?,?,?)",
      user_details_lst = [
        params.register_number,
        params.email_id,
        params.password,
        params.admin,
        results,
        null,
        get_current_date(),
        get_current_time(),
      ],
      about_details_lst = [
        params.register_number,
        params.title,
        params.name,
        params.dob,
        params.email_id,
        params.company_address,
        params.mobile_no,
        params.linked_in,
      ],
      current_status_lst = [
        params.register_number,
        params.current_status,
        params.current_status,
        params.designation,
        params.company_name,
        params.work_domain,
        params.company_address,
        params.course_name,
        params.university_name,
        params.others,
      ];

    db.query(query, user_details_lst, (err, results, fields) => {
      if (err) {
        console.log(err);
        delete_user(user_details_lst[0], (results) => {
          response.error_code = 2;
          return callback(response);
        });
      } else {
        query = "INSERT INTO About values (?,?,?,?,?,?,?,?)";
        db.query(query, about_details_lst, (err, results, fields) => {
          if (err) {
            delete_user(user_details_lst[0], (results) => {
              response.error_code = 2;
              return callback(response);
            });
          } else {
            query = "INSERT INTO Current_Status values (?,?,?,?,?,?,?,?,?,?)";
            db.query(query, current_status_lst, (err, results, fields) => {
              if (err) {
                delete_user(user_details_lst[0], (results) => {
                  response.error_code = 2;
                  return callback(response);
                });
              } else {
                // console.log("Hello");
                query = "INSERT INTO testimonial values (?,?,?,?)";
                db.query(
                  query,
                  [user_details_lst[0], null, null, null, null],
                  (results) => {
                    if (err) {
                      delete_user(user_details_lst[0], (results) => {
                        response.err = 2;
                        return callback(response);
                      });
                    } else {
                      response.status = true;
                      callback(response);
                    }
                  }
                );
              }
            });
          }
        });
      }
    });
  });
}

// Create Announcement
function create_announcement(params, callback) {
  let query = "INSERT INTO Announcements values (?,?,?,?,?)";
  params[3] = get_current_date();

  db.query(query, params, (err, results, fields) => {
    if (err) {
      console.log(err);
      callback(false);
    }
    callback(true);
  });
  // console.log("create announcement");
}

// Update Users Details
function update_details(params, callback) {
  // updating details in About table
  var query =
    "UPDATE About set Title=?,Name=?,Email_ID=?,Address=?,Mobile_Number=? where Register_Number = ?; UPDATE User set Email_Id = ?,Password=? where Register_Number = ?;UPDATE Current_Status set Current_Status = ?,Current_Position=?,Designation=?,Company_Name=?,Work_Domain=?,Company_Address=?,Course_Name=?,University_Name=?,Others=? where Register_Number = ?;UPDATE testimonial set title=?,description=?,Date=? where Register_Number=?";

  let params1 = [
    params.title,
    params.name,
    params.email_id,
    params.company_address,
    params.mobile_no,
    params.register_number,
    params.email_id,
    params.password,
    params.register_number,
    params.current_status,
    params.current_status,
    params.designation,
    params.company_name,
    params.work_domain,
    params.company_address,
    params.course_name,
    params.university_name,
    params.others,
    params.register_number,
    params.testimonial_title,
    params.testimonial_desc,
    get_current_date(),
    params.register_number,
  ];
  // console.log(params1);

  db.query(query, params1, (err, results, fields) => {
    if (err) {
      console.log(err);
      return callback(false);
    } else {
      // console.log(results);
      console.log("updated");
      return callback(true);
    }
  });

  // return callback(true);
}

// Get User Details
function get_users(callback) {
  let query =
    "SELECT * FROM `academic_details` INNER JOIN `user` on academic_details.Register_Number = user.Register_Number INNER JOIN current_status on user.Register_Number = current_status.Register_Number inner join About on User.Register_Number = About.Register_Number";

  db.query(query, (err, results, fields) => {
    if (err) {
      console.log(err);
      console.log("error in retrieving data");
    } else {
      // console.log(results);
      return callback(results);
    }
  });
}

// Get Current User Details
function fetch_user_details(reg_no, callback) {
  let query =
    "SELECT * from Academic_Details inner join User on Academic_Details.Register_Number = User.Register_Number inner join About on About.Register_Number = User.Register_Number inner join Current_Status on User.Register_Number = Current_Status.Register_Number inner join testimonial on testimonial.Register_Number = User.Register_Number where Academic_Details.Register_Number = ? ";
  db.query(query, [reg_no], (err, results, fields) => {
    if (err) {
      console.log(err);
      return callback(false);
    } else {
      return callback(results[0]);
    }
  });
}

// Get Business Current User Details
function fetch_user_business_details(callback) {
  let query =
    "SELECT * FROM `academic_details` INNER JOIN `user` on academic_details.Register_Number = user.Register_Number INNER JOIN current_status on user.Register_Number = current_status.Register_Number INNER JOIN about on user.Register_Number = about.Register_Number and Current_Status = 'Entrepreneur' ";

  db.query(query, (err, results, fields) => {
    if (err) {
      console.log("error in retrieving data");
    } else {
      console.log(results);
      return callback(results);
    }
  });
}

// Get current status of alumni
function fetch_stats(callback) {
  let response = {
    alumni: 0,
    registered: 0,
    unregistered: 0,
    alumni_details: [],
    recent_registrations: [],
  };
  let query =
    "SELECT count(*) as total_count from Academic_Details; SELECT count(*) as registered from User where Admin = 0;SELECT count(*) as unregistered from User where Admin = 0 and Authenticated = 1;SELECT * from User inner join Academic_Details on User.Register_Number = Academic_Details.Register_Number inner join About on User.Register_Number = About.Register_Number inner join Current_Status on User.Register_Number = Current_Status.Register_Number; SELECT * from User inner join About on User.Register_Number = About.Register_Number order by date_registered desc, time_registered desc limit 5;SELECT * from testimonial where  Description !='';";
  db.query(query, (err, results, fields) => {
    if (err) {
      console.log(err);
      return callback(response);
    } else {
      // console.log(results);
      response.alumni = results[0][0].total_count;
      response.registered = results[1][0].registered;
      response.unregistered = results[2][0].unregistered;
      response.alumni_details = results[3];
      response.recent_registrations = results[4];
      response.testimonial = results[5];
      // console.log(response);
      // console.log(response.testimonial);
      console.log(response.alumni_details[0]);
      return callback(response);
    }
  });
}

// Forgot Password Check
function forgot_password_check(params, callback) {
  let query = "SELECT * from User where Register_Number = ? and Email_Id = ?";
  db.query(
    query,
    [params.register_number, params.email_id],
    (err, results, fields) => {
      if (err) {
        console.log(err);
        return callback(3);
      }
      if (results.length != 0) {
        db.query(
          "UPDATE User set password=? where Register_Number=?",
          [params.password, params.register_number],
          (err, results, fields) => {
            if (err) {
              return callback(3);
            } else {
              return callback(1);
            }
          }
        );
      } else {
        return callback(2);
      }
    }
  );
}

// Module Exports
module.exports = {
  db,
  login,
  create_user,
  create_announcement,
  update_details,
  get_users,
  fetch_user_details,
  fetch_user_business_details,
  fetch_stats,
  forgot_password_check,
};
