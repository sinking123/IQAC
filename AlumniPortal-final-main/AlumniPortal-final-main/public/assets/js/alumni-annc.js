$(window).on("load", function () {
  var batches = [
    "2010 - 2014",
    "2011 - 2015",
    "2012 - 2016",
    "2013 - 2017",
    "2014 - 2018",
    "2015 - 2019",
    "2016 - 2020",
    "2017 - 2021",
    "2018 - 2022",
  ];
  var batch = document.getElementById("batch-chk-div");
  batch.innerHTML = "";
  var divans = batches.length / 3;
  var divmod = batches.length % 3;
  if (divmod != 0) {
    divans += 1;
  }
  for (var i = 1; i <= divans; i++) {
    var div = document.createElement("div");
    div.classList.add("row");
    div.id = "batch-chk".concat("-", i.toString());
    batch.appendChild(div);
  }
  var chk_div = document.createElement("div");
  chk_div.classList.add("form-check", "col-4");
  var chk = document.createElement("input");
  chk.id = "batch-all";
  chk.type = "checkbox";
  chk.value = "all";
  var lbl = document.createElement("label");
  lbl.setAttribute("for", "batch-all");
  lbl.classList.add("form-check-label", "pl-2");
  var allTextNode = document.createTextNode("All Batch");
  lbl.appendChild(allTextNode);
  chk_div.appendChild(chk);
  chk_div.appendChild(lbl);
  document.getElementById("batch-chk-1").appendChild(chk_div);

  for (var i in batches) {
    var chk_div = document.createElement("div");
    chk_div.classList.add("form-check", "col-4");
    var chk = document.createElement("input");
    chk.id = batches[i].slice(2, 4).concat("-", batches[i].slice(9));
    chk.type = "checkbox";
    chk.value = batches[i].slice(2, 4).concat("-", batches[i].slice(9));
    chk.classList.add("batch-chk");
    var lbl = document.createElement("label");
    lbl.setAttribute(
      "for",
      batches[i].slice(2, 4).concat("-", batches[i].slice(9))
    );
    lbl.classList.add("form-check-label", "pl-2");
    var allTextNode = document.createTextNode(batches[i]);
    lbl.appendChild(allTextNode);
    chk_div.appendChild(chk);
    chk_div.appendChild(lbl);
    document
      .getElementById(
        "batch-chk".concat(
          "-",
          (Math.floor((parseInt(i) + 1) / 3) + 1).toString()
        )
      )
      .appendChild(chk_div);
  }
  $("#batch-all").change(function () {
    console.log("Hiii");
    //"select all" change
    $(".batch-chk").prop("checked", $(this).prop("checked")); //change all ".checkbox" checked status
  });
  $(".batch-chk").change(function () {
    console.log("hiii");
    //uncheck "select all", if one of the listed checkbox item is unchecked
    if (false == $(this).prop("checked")) {
      //if this item is unchecked
      $("#batch-all").prop("checked", false); //change "select all" checked status to false
    }
    //check "select all" if all checkbox items are checked
    if ($(".batch-chk:checked").length == $(".batch-chk").length) {
      $("#batch-all").prop("checked", true);
    }
  });
  $("#dept-all").change(function () {
    //"select all" change
    $(".dept-chk").prop("checked", $(this).prop("checked")); //change all ".checkbox" checked status
  });

  //".checkbox" change
  $(".dept-chk").change(function () {
    //uncheck "select all", if one of the listed checkbox item is unchecked
    if (false == $(this).prop("checked")) {
      //if this item is unchecked
      $("#dept-all").prop("checked", false); //change "select all" checked status to false
    }
    //check "select all" if all checkbox items are checked
    if ($(".dept-chk:checked").length == $(".dept-chk").length) {
      $("#dept-all").prop("checked", true);
    }
  });
});
$("#annc-alumni").on("click", function (e) {
  e.preventDefault();
  var alu_btn = document.getElementById("annc-alumni");
  if (alu_btn.innerText == "ANNOUNCE ALUMNI") {
    alu_btn.disabled = true;
    alu_btn.innerHTML =
      '<div class="spinner"> <div class="double-bounce1"></div><div class="double-bounce2"></div></div>';
    setTimeout(() => {
      alu_btn.classList.add("success-btn");
      alu_btn.disabled = false;
    }, 3000);

    // setTimeout(() => {
    //   alu_btn.classList.add("error-btn");
    //   alu_btn.disabled = false;
    //   alu_btn.innerHTML = "ERROR";
    // }, 3000);
  } else if (alu_btn.innerText == "SUCCESS") {
    alu_btn.classList.remove("success-btn", "error-btn");
    alu_btn.innerHTML = "ANNOUNCE ALUMNI";
  } else if (alu_btn.innerText == "ERROR") {
    alu_btn.classList.remove("error-btn", "success-btn");
    alu_btn.innerHTML = "ANNOUNCE ALUMNI";
  } else {
  }
});
