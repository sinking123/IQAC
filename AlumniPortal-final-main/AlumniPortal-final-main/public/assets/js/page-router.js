$("#dash-btn").click(function () {
  $("#dash-btn").parent().addClass("active");
  $("#alu-dtl-btn").parent().removeClass("active");
  $("#alu-annc-btn").parent().removeClass("active");
  $("#grievance-btn").parent().removeClass("active");

  $("#alumni-details").addClass("d-none");
  $("#grievance").addClass("d-none");
  $("#alumni-announcements").addClass("d-none");
  $("#dashboard").removeClass("d-none");
});
$("#alu-dtl-btn, #alu-det-lk").click(function () {
  $("#dash-btn").parent().removeClass("active");
  $("#alu-dtl-btn").parent().addClass("active");
  $("#alu-annc-btn").parent().removeClass("active");
  $("#grievance-btn").parent().removeClass("active");

  $("#dashboard").addClass("d-none");
  $("#grievance").addClass("d-none");
  $("#alumni-announcements").addClass("d-none");
  $("#alumni-details").removeClass("d-none");
});
$("#alu-annc-btn, #alu-annc-lk").click(function () {
  $("#dash-btn").parent().removeClass("active");
  $("#alu-dtl-btn").parent().removeClass("active");
  $("#alu-annc-btn").parent().addClass("active");
  $("#grievance-btn").parent().removeClass("active");

  $("#dashboard").addClass("d-none");
  $("#grievance").addClass("d-none");
  $("#alumni-details").addClass("d-none");
  $("#alumni-announcements").removeClass("d-none");
});
$("#grievance-btn, #grievance-lk").click(function () {
  $("#dash-btn").parent().removeClass("active");
  $("#alu-dtl-btn").parent().removeClass("active");
  $("#alu-annc-btn").parent().removeClass("active");
  $("#grievance-btn").parent().addClass("active");

  $("#dashboard").addClass("d-none");
  $("#alumni-details").addClass("d-none");
  $("#alumni-announcements").addClass("d-none");
  $("#grievance").removeClass("d-none");
});
