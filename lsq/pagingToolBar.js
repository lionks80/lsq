(function($) {

	var methods = {
		init : function(options) {

			return this.each(function() {

				$(this).children().remove();
				var $this = $(this);

				// 왼쪽에 표시될 갯수
				var leftCount = parseInt((options.displayCount - 1) / 2);
				// 왼쪽 시작 수
				var startNum = -1;
				startNum = options.page - leftCount;
				if (startNum < 1) {
					startNum = 1;
				}
				// 오른쪽 표시 수
				var endNum = startNum + options.displayCount - 1;

				if (endNum >= options.totalPage) {
					endNum = options.totalPage;
				}

				var ulTag = document.createElement("ul");

				var startBtn = document.createElement("li");
				$(startBtn).append("<a>«</a>");
				var preBtn = document.createElement("li");
				$(preBtn).append("<a>pre</a>");
				var nextBtn = document.createElement("li");
				$(nextBtn).append("<a>next</a>");
				var endBtn = document.createElement("li");
				$(endBtn).append("<a>»</a>");

				$(ulTag).append($(startBtn)).append($(preBtn));

				for ( var i = startNum; i <= endNum; i++) {

					var li = document.createElement("li");
					if (i == options.page) {
						$(li).addClass("active");
					} else {
						$(li).bind("click", function() {
							options.trigger($(this).text());
						}).css("cursor", "pointer");
					}

					var a = document.createElement("a");
					$(a).id = "pgtb_num";
					$(ulTag).append($(li).append($(a).append(i)));

				}

				$(ulTag).append($(nextBtn)).append($(endBtn));

				$this.append(ulTag);

				// 처음으로 이동 및 첫 페이지
				if (parseInt(options.page) < 2) {
					$(startBtn).addClass("disabled");
					$(preBtn).addClass("disabled");
				} else {

					$(startBtn).bind("click", function() {
						options.trigger(1);
					}).css("cursor", "pointer");
					;

					$(preBtn).bind("click", function() {
						previewPage = parseInt(options.page) - parseInt(1);
						options.trigger(previewPage);
					}).css("cursor", "pointer");
				}

				// 다음으로 이동
				if (parseInt(options.page) >= parseInt(options.totalPage)) {
					$(nextBtn).addClass("disabled");
					$(endBtn).addClass("disabled");
				} else {
					$(nextBtn);
					$(nextBtn).bind("click", function() {
						nextPage = parseInt(options.page) + parseInt(1);
						options.trigger(nextPage);
					}).css("cursor", "pointer");

					$(endBtn).bind("click", function() {
						options.trigger(options.totalPage);
					}).css("cursor", "pointer");
				}

			});
		}
	};

	$.fn.pagingToolBar = function(method) {

		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(
					arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' + method
					+ ' does not exist on jQuery.pagingToolBar');
		}

	};

})(jQuery);