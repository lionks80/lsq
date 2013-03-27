$(function() {

	$("#selectboxEx1_btnBind").click(function() {

		var optionSize = $("#selectboxEx1").find("option").size();

		if (optionSize < 1) {

			lsq.FormUtils.SelectBox.bind("selectboxEx1", [ {
				"id" : 0,
				"name" : "유관순"
			}, {
				"id" : 1,
				"name" : "홍길동"
			}, {
				"id" : 2,
				"name" : "이순신"
			} ], "id", "name");

		} else {
			alert("이미 바인딩 되어있습니다.");
		}

	});

	$("#selectboxEx1_add").click(
			function() {
				var optionSize = $("#selectboxEx1").find("option").size();

				lsq.FormUtils.SelectBox.add("selectboxEx1", optionSize, "변사또"
						+ optionSize);
			});

	$("#selectboxEx1_clear").click(function() {
		lsq.FormUtils.SelectBox.clear("selectboxEx1");
	});

});