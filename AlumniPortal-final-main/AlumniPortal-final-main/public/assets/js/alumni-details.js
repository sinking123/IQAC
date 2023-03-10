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
  ];
  var batch = document.getElementById("batch-det");
  batch.innerHTML = "";
  batch.classList.add("disabledDiv");
  var option = document.createElement("option");
  var optionall = document.createElement("option");
  var selTextNode = document.createTextNode("Select Batch");
  option.disabled = "true";
  option.selected = "true";
  option.appendChild(selTextNode);
  var allTextNode = document.createTextNode("All Batch");
  optionall.value = "all";
  optionall.appendChild(allTextNode);
  batch.appendChild(option);
  batch.appendChild(optionall);

  for (var i in batches) {
    var option = document.createElement("option");
    var crit = batches[i];
    var criTextNode = document.createTextNode(crit);
    option.value = batches[i].slice(2, 4).concat("-", batches[i].slice(9));
    option.appendChild(criTextNode);
    batch.appendChild(option);
  }
  batch.classList.remove("disabledDiv");
});

$("#view-alumni").on("click", function (e) {
  e.preventDefault();
  document.getElementById("alu-det-table").classList.add("d-none");
  var alu_btn = document.getElementById("view-alumni");
  if (alu_btn.innerText == "VIEW ALUMNI") {
    alu_btn.disabled = true;
    alu_btn.innerHTML =
      '<div class="spinner"> <div class="double-bounce1"></div><div class="double-bounce2"></div></div>';
    setTimeout(() => {
      // alu_btn.classList.add("success-btn");
      alu_btn.disabled = false;
      alu_btn.innerHTML = "VIEW ALUMNI";
      document.getElementById("alu-det-table").classList.remove("d-none");
    }, 3000);

    // setTimeout(() => {
    //   alu_btn.classList.add("error-btn");
    //   alu_btn.disabled = false;
    //   alu_btn.innerHTML = "ERROR";
    // }, 3000);
  } else if (alu_btn.innerText == "SUCCESS") {
    alu_btn.classList.remove("success-btn", "error-btn");
    alu_btn.innerHTML = "VIEW ALUMNI";
  } else if (alu_btn.innerText == "ERROR") {
    alu_btn.classList.remove("error-btn", "success-btn");
    alu_btn.innerHTML = "VIEW ALUMNI";
  } else {
  }
});
