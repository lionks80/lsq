(function($) {

	/**
	 * Private Methods
	 */
	var privateMethods = {};

	privateMethods.eventBind = function(mainObject) {

		var gridData = mainObject.data('gridData');
		var setting = mainObject.data('gridSetting');

		mainObject.find('tbody tr').each(function() {

			var rowIdx = $(this).attr("rowIdx");
			var record = gridData[rowIdx];

			$(this).click(function() {
				
				var setRowSelect = function(row, cssClassRowSelected, boolean) {

					if (boolean == false) {
						$(row).removeClass(cssClassRowSelected);
						$(row).find('td input:checkbox').attr('checked', false);
					} else {
						$(row).addClass(cssClassRowSelected);
						$(row).find('td input:checkbox').attr('checked', true);
					}

				}

				if (setting.useSelect == true) {

					if (setting.multiSelect == true) {

						// 멀티 셀렉트인 경우
						if ($(this).hasClass(setting.cssClassRowSelected) == true) {
							setRowSelect($(this), setting.cssClassRowSelected, false);
						} else {
							setRowSelect($(this), setting.cssClassRowSelected, true);
						}

						selectChange = true;

					} else {
						// 싱글 셀렉트인 경우
						if ($(this).hasClass(setting.cssClassRowSelected) != true) {

							mainObject.find('tbody').find( 'tr.' + setting.cssClassRowSelected).each(
									function() {
										setRowSelect($(this), setting.cssClassRowSelected, false);
									});
							setRowSelect($(this), setting.cssClassRowSelected, true);
							
							selectChange = true;
						}
					}
				}

				if (setting.listener.rowClick) {
					var rowIdx = $(this).attr("rowIdx");
					setting.listener.rowClick(rowIdx, record);
				}

				if (selectChange == true) {
					privateMethods.selectChange(mainObject);
				}
				
			});

		});
	};

	privateMethods.getDefaultSetting = function() {
		return {
			columns : null,
			cssClassTable : ["lsqGrid"],
			cssClassRowSelected : "selected",
			useSelect : false,
			multiSelect : false,
			listener : {
				rowClick : function(rowIdx, record) {
				},
				selectChange : function(selectedRecords) {
				}
			}
		};
	}

	privateMethods.clear = function(mainObject) {
		if (mainObject.data('gridSetting').multiSelect) {
			mainObject.find('thead tr input:checkbox').attr('checked', false);
		}
		mainObject.find('tbody').children().remove();
		mainObject.data('gridData', null);
	}

	privateMethods.selectChange = function(mainObject) {

		var setting = mainObject.data('gridSetting');
		var gridData = mainObject.data('gridData');
		var selectedTargets = mainObject.find('tbody tr.'
				+ setting.cssClassRowSelected);

		var selectedRecords = new Array(selectedTargets.length);

		for ( var i = 0; i < selectedTargets.length; i++) {
			selectedRecords[i] = gridData[$(selectedTargets[i]).attr('rowIdx')];
		}

		if (setting.listener.selectChange) {
			setting.listener.selectChange(selectedRecords);
		}

	}

	/**
	 * Public Methods
	 */
	var publicMethods = {};

	publicMethods.init = function(options) {

		return this
				.each(function() {

					// 메인 오브젝트를 재정의
					var $mainObject = $(this);
					// 기본 그리드 설정값 로드
					var setting = privateMethods.getDefaultSetting();
					// 기본 그리드 설정값에 추가 설정값 로드
					$.extend(setting, options);
					// 메인 오브젝트에 세팅값 저장
					$mainObject.data('gridSetting', setting);

					// 테이블 생성 적용
					
					var cssClassTable = setting.cssClassTable.join(" ");
					$mainObject
							.append($('<table class=\"'
									+ cssClassTable
									+ '\"><thead><tr></tr></thead><tbody></tbody></table>'));

					if (setting.useSelect == true) {

						var th = $("<th style=\"width:30px; text-align: center;\"></th>");

						if (setting.multiSelect == true) {

							var checkBoxHeaderChange = function() {
								var checked = $(this).attr('checked') == true
										|| $(this).attr('checked') == 'checked' ? true
										: false;

								$mainObject.find('tbody tr').each(function() {
									
									if (checked == false) {
										$(this).removeClass(setting.cssClassRowSelected);
										$(this).find('td input:checkbox').attr('checked', false);
									} else {
										$(this).addClass(setting.cssClassRowSelected);
										$(this).find('td input:checkbox').attr('checked', true);
									}
								});

								privateMethods.selectChange($mainObject);
							}
							var checkBox = $('<input type=\"checkbox\">')
									.change(checkBoxHeaderChange);

							$(th).append(checkBox);
						}

						$mainObject.find('thead tr').append(th);
					}

					// column_header 생성
					for ( var i = 0; i < setting.columns.length; i++) {

						var th = $('<th>' + setting.columns[i].header + '</th>');
						
						if (setting.columns[i].width) {
							th.width(setting.columns[i].width);
						}
						
						if (setting.columns[i].headerAlign) {
							th.css("text-align", setting.columns[i].headerAlign);
						}

						$mainObject.find('thead tr').append(th);

					}
				})
	}

	publicMethods.dataBind = function(data) {

		return this.each(function() {

			// 메인 오브젝트를 재정의
			var $mainObject = $(this);
			// 그리드 로우 및 데이터 초기화
			privateMethods.clear($mainObject);

			$(this).data('gridData', data);

			var gridData = $mainObject.data('gridData');
			var setting = $mainObject.data('gridSetting');

			// row 생성
			for ( var i = 0; i < gridData.length; i++) {

				var tr = $('<tr></tr>').attr('rowIdx', i);

				if (setting.useSelect == true) {
					$(tr).append(
							$('<td></td>')
									.append("<input type=\"checkbox\"\">").css(
											"text-align", "center"));
				}

				for ( var j = 0; j < setting.columns.length; j++) {

					if (setting.columns[j].hidden != true) {
						var td = $('<td></td>');
						if (setting.columns[j].render != null) {
							td
									.append(
											setting.columns[j]
													.render(gridData[i], i));
						} else {
							td.append(
									gridData[i][setting.columns[j].dataIndex]);
						}
						
						if (setting.columns[j].dataAlign) {
							td.css("text-align", setting.columns[j].dataAlign);
						}

						$(tr).append(td);
					}
				}

				$mainObject.find('tbody').append(tr);
			}

			privateMethods.eventBind($mainObject);
		})
	}

	publicMethods.clear = function() {

		return this.each(function() {

			var $mainObject = $(this);
			privateMethods.clear($mainObject);
		});

	};

	publicMethods.getSelectedRecords = function() {
		
		var gridData = $(this).data('gridData');
		var setting = $(this).data('gridSetting');

		var selectedTarget = $(this).find('tbody tr.' + setting.cssClassRowSelected);

		var selectedRecord = new Array(selectedTarget.length);

		for ( var i = 0; i < selectedTarget.length; i++) {
			selectedRecord[i] = gridData[$(selectedTarget[i]).attr('rowIdx')];
		}

		return selectedRecord;

	}

	$.fn.lsqGrid = function(methodName) {

		if (publicMethods[methodName]) {
			return publicMethods[methodName].apply(this, Array.prototype.slice
					.call(arguments, 1));
		} else if (typeof methodName === 'object' || !methodName) {
			return publicMethods.init.apply(this, arguments);
		} else {
			$.error('Method ' + methodName
					+ ' does not exist on jQuery.pagingToolBar');
		}

	};

})(jQuery);
