//import { json } from "body-parser";

$(".reqSelect").click(function(e) {
  e.preventDefault();
  console.log($(this).attr("data-id"));
  let reqId = $(this).attr("data-id");
  console.log(reqId);
  window.location = "/desk/reqDetail?id=" + reqId;
});

$(".diarySelect").click(function(e) {
  e.preventDefault;
  let reqId = $(this).attr("data-id");
  console.log(reqId);
  $.ajax({
    type: "GET",
    url: "/desk/diary",
    data: { id: reqId }
  }).then(function(dataset) {
    let diaryBody = "";
    for (let i = 0; i < dataset.length; i++) {
      diaryBody +=
      `<div class="row"> 
          <div class="col">${dataset[i].time}:</div>
        </div>
        <div class="row">
          <div class="col ml-3">${dataset[i].diaryText}</div>
      </div>`;
    
    }
    $("#modalBody").html(diaryBody);

  });
});
