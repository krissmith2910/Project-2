$("#submitUpdate").click(function(e) {
  e.preventDefault();
  //console.log($(this).attr("data-id"));
  let requestId = $("#requestId").val();
  let requestClass = $("#requestClass").val();
  let operator = $("#operator").val();
  let status = $("#status").val();
  let diaryText = $("#diaryUpdate").val();

  updateDetail = {
    requestId: requestId,
    requestClass: requestClass,
    operator: operator,
    status: status,
    diaryText: diaryText
  };
  console.log(updateDetail);
  $.ajax({
    type: "POST",
    url: "/desk/diary",
    data: updateDetail,
    dataType: "application/json,charset=utf-8",
    success: function(response) {
      console.log(response);
    }
  });
});
