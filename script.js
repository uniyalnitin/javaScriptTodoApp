const form = document.querySelector("form");
const allTasks = document.querySelector("#allTasks");
const completedTasks = document.querySelector("#completedTasks");
const uncompletedTasks = document.querySelector("#uncompletedTasks");

refresh();

form.addEventListener("submit", (event) => {
  event.preventDefault();
  // actual logic, e.g. validate the form
  let value = document.querySelector("form input[type=text]").value;
  if (value && value.length > 3) {
    appendTask(value);
  } else {
    form.style.borderColor = "red";
  }
});

function appendTask(data) {
  let element = `<div class="task newTask">
  <div class="taskHeader">
    <div class="image-container">
      <img src="./greyBullet.png" alt="" />
    </div>
    <div class="taskText">${data}</div>
  </div>
  <div class="cross">
    <i class="far fa-times-circle"></i>
  </div>
</div>`;
  $(allTasks).append($(element));
  $(uncompletedTasks).append($(element));
  refresh();
}

$(".tabLinks > button").click(function () {
  toggleTabs(this);
});

function toggleTabs(that) {
  let tab = $(that).attr("data-target");
  $(".tabContent.tab-active").removeClass("tab-active");
  $(".tabLinkButton.active").removeClass("active");
  $(tab).addClass("tab-active");
  $(that).addClass("active");
}
$("body").delegate(".task", "mouseover", function () {
  showCross(this);
});
$("body").delegate(".task", "mouseout", function () {
  hideCross(this);
});
$("body").delegate(".cross", "click", function () {
  removeTask(this);
});

function showCross(that) {
  console.log(that);
  console.log($(that).position().top);
  $("div.cross", that).css({
    display: "inline-block",
  });
}

function hideCross(that) {
  $("div.cross", that).css({
    display: "none",
  });
}

function removeTask(that) {
  $(that).closest(".task").remove();
  refresh();
}

$("#clear-completed").click(function () {
  $(completedTasks).empty();
  refresh();
});

$("#completeAllTask").click(function () {
  let children = $(uncompletedTasks).children().clone();
  $("img", $(children)).attr("src", "./bullet.png");
  $(completedTasks).append($(children));
  $(uncompletedTasks).empty();
  refresh();
});

function refresh() {
  $(allTasks).empty();
  let children = $(uncompletedTasks).children().clone();
  $(allTasks).append($(children));

  let moreChildren = $(completedTasks).children().clone();
  $(allTasks).append($(moreChildren));
  $("#remainingTaskCount").html(totalUncompletedTasks());
}

$("body").delegate("#uncompletedTasks .image-container", "click", function () {
  moveToCompleted(this);
  refresh();
});

function moveToCompleted(that) {
  let task = $(that).closest(".task").clone();
  $("img", $(task)).attr("src", "./bullet.png");
  $(completedTasks).append($(task));
  $(that).closest(".task").remove();
}

function totalUncompletedTasks() {
  return $(".task", uncompletedTasks).length;
}
