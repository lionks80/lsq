(function($) {

	function getCurrentPage(start, limit) {
		if (start < limit) {
			return 1;
		} else {
			return start / limit + 1;
		}
	}

	function getTotalPage(totalCount, limit) {
		var value = parseInt(totalCount / limit);

		if (totalCount % limit != 0) {
			value++;
		}

		// 기본적으로 페이지가 없을 경우에도 1로 고정함.
		if (value == 0) {
			return 1;
		}

		return value;
	}

	function getStartNum(displayCount, currentPage) {

		var leftCount = parseInt((displayCount - 1) / 2);
		// 왼쪽 시작 수
		var startNum = -1;
		startNum = currentPage - leftCount;
		if (startNum < 1) {
			startNum = 1;
		}

		return startNum;
	}

	function getEndNum(startNum, displayCount, totalPage) {
		var endNum = startNum + displayCount - 1;

		if (endNum >= totalPage) {
			endNum = totalPage;
		}

		return endNum;
	}

	var methods = {};
	methods.init = function(options) {

		return this
				.each(function() {

					var setting = {
						"start" : 0,
						"limit" : 15,
						"totalCount" : 0,
						"displayCount" : 9,
						"trigger" : null
					};

					$.extend(setting, options);

					setting.currentPage = getCurrentPage(setting.start,
							setting.limit);
					setting.totalPage = getTotalPage(setting.totalCount,
							setting.limit);

					$(this).children().remove();

					// 왼쪽 시작 수
					var startNum = getStartNum(setting.displayCount,
							setting.currentPage);
					// 오른쪽 표시 수
					var endNum = getEndNum(startNum, setting.displayCount,
							setting.totalPage);

					var ulTag = $('<ul></ul>');

					var startBtn = $('<li><a>«</a></li>');
					var preBtn = $('<li><a>pre</a></li>');
					var nextBtn = $('<li><a>next</a></li>');
					var endBtn = $('<li><a>»</a></li>');

					$(ulTag).append($(startBtn)).append($(preBtn));

					for ( var i = startNum; i <= endNum; i++) {

						var li = $('<li></li>');
						if (i == setting.currentPage) {
							$(li).addClass("active");
						} else {
							$(li).bind("click", function() {
								setting.trigger($(this).text());
							}).css("cursor", "pointer");
						}

						var a = $('<a></a>');
						$(a).id = "pgtb_num";
						$(ulTag).append($(li).append($(a).append(i)));

					}

					$(ulTag).append($(nextBtn)).append($(endBtn));

					$(this).append(ulTag);

					// 처음으로 이동 및 첫 페이지
					if (parseInt(setting.currentPage) < 2) {
						$(startBtn).addClass("disabled");
						$(preBtn).addClass("disabled");
					} else {

						$(startBtn).bind("click", function() {
							setting.trigger(1);
						}).css("cursor", "pointer");
						;

						$(preBtn).bind(
								"click",
								function() {
									previewPage = parseInt(setting.currentPage)
											- parseInt(1);
									setting.trigger(previewPage);
								}).css("cursor", "pointer");
					}

					// 다음으로 이동
					if (parseInt(setting.currentPage) >= parseInt(setting.totalPage)) {
						$(nextBtn).addClass("disabled");
						$(endBtn).addClass("disabled");
					} else {
						$(nextBtn);
						$(nextBtn).bind(
								"click",
								function() {
									nextPage = parseInt(setting.currentPage)
											+ parseInt(1);
									setting.trigger(nextPage);
								}).css("cursor", "pointer");

						$(endBtn).bind("click", function() {
							setting.trigger(setting.totalPage);
						}).css("cursor", "pointer");
					}

				})
	}

	$.fn.lsqPaging = function(method) {

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