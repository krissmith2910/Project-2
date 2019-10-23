$(".reqSelect").click(function(e) {
  e.preventDefault();
  console.log($(this).attr("data-id"));
  let reqId = $(this).attr("data-id");
  console.log(reqId);
  window.location = "/desk/reqDetail?id=" + reqId;
});