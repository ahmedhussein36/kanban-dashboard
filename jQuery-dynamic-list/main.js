$(document).ready(function () {
    // Add item
    $("#addBtn").click(function () {
        const item = $("#itemInput").val().trim();

        if (item === "") {
            $(".error").fadeIn(200).delay(2000).fadeOut(400);
        } else {
            $("#itemList").append(`
        <li>
          ${item}
          <button class="delete-btn">Delete</button>
        </li>
      `);
            $("#itemInput").val("");
        }
    });

    $("#itemInput").keypress(function (e) {
        if (e.which === 13) {
            $("#addBtn").click();
        }
    });

    $(document).on("click", ".delete-btn", function () {
        $(this)
            .parent()
            .fadeOut(400, function () {
                $(this).remove();
            });
    });
});
