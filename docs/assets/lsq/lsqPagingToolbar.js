var lsqGrid = function(id, gridSetting) {

	var target = $('#' + id)[0];

	var setting = {
		columns : null,
		cssTable : "lsqGrid",
		cssRowSelected : "select",
		useSelect : false,
		multiSelect : false,
		listener : {
			rowClick : function(rowIdx, record) {
			},
			selectChange : function(selectedRecords) {
			}
		}
	};

	$.extend(setting, gridSetting);

	var mainTable = null;
	var thead = null;
	var tbody = null;
	var rowData = null;

	/**
	 * Private Function
	 */
	function setRowSelect(row, boolean) {

		if (boolean == false) {
			row.removeClass(setting.cssRowSelected);
			row.find('td input:checkbox').attr('checked', false);
		} else {
			row.addClass(setting.cssRowSelected);
			row.find('td input:checkbox').attr('checked', true);
		}

	}

	function privateSelectChange() {

		var selectedTargets = $(tbody).find('tr.' + setting.cssRowSelected);

		var selectedRecords = new Array(selectedTargets.length);

		for ( var i = 0; i < selectedTargets.length; i++) {
			selectedRecords[i] = rowData[$(selectedTargets[i]).attr('rowIdx')];
		}

		setting.listener.selectChange(selectedRecords);

	}

	function privateRowClick() {

		selectChange = false;

		if (setting.useSelect == true) {

			if (setting.multiSelect == true) {

				// 멀티 셀렉트인 경우
				if ($(this).hasClass(setting.cssRowSelected) == true) {
					setRowSelect($(this), false);
				} else {
					setRowSelect($(this), true);
				}

				selectChange = true;

			} else {
				// 싱글 셀렉트인 경우
				if ($(this).hasClass(setting.cssRowSelected) != true) {
					// setRowSelect($(this), true);
					// } else {
					$(tbody).find('tr.' + setting.cssRowSelected).each(
							function() {
								setRowSelect($(this), false);
							});
					setRowSelect($(this), true);
					selectChange = true;
				}
			}
		}

		if (setting.listener.rowClick != null) {
			var rowIdx = $(this).attr("rowIdx");
			var record = rowData[rowIdx];

			setting.listener.rowClick(rowIdx, record);
		}

		if (selectChange == true) {
			privateSelectChange();
		}
	}

	var init = function(options) {

		mainTable = $('<table class=\"' + setting.cssTable + '\"></table>');
		thead = $('<thead></thead>');
		tbody = $('<tbody></tbody>');

		var thead_tr = $('<tr></tr>');
		// 테이블 클래스 적용

		if (setting.useSelect == true) {

			var th = $("<th style=\"width:30px; text-align: center;\"></th>");

			if (setting.multiSelect == true) {

				fnCheckBoxChange = function() {

					var checked = $(this).attr('checked') == true
							|| $(this).attr('checked') == 'checked' ? true
							: false;

					$(tbody).find('tr').each(function() {
						setRowSelect($(this), checked);
					});

					privateSelectChange();
				}

				checkBox = $('<input type=\"checkbox\">').change(
						fnCheckBoxChange);

				$(th).append(checkBox);
			}

			$(thead_tr).append(th);
		}

		// column_header 생성
		for ( var i = 0; i < setting.columns.length; i++) {

			if (setting.columns[i].hidden != true) {
				th = $('<th>' + setting.columns[i].header + '</th>').width(
						setting.columns[i].width);
				thead_tr.append(th);
			}

		}

		$(thead).append(thead_tr);
		$(mainTable).append(thead);
		$(mainTable).append(tbody);
		$(target).append(mainTable);

	};

	this.dataBind = function(data) {

		this.clear();

		rowData = data;
		// row 생성
		for ( var i = 0; i < rowData.length; i++) {

			var tr = document.createElement("tr");
			$(tr).attr('rowIdx', i);

			if (setting.useSelect == true) {
				var td = document.createElement("td");
				$(td).append("<input type=\"checkbox\"\">").css("text-align",
						"center");
				$(tr).append(td);
			}

			for ( var j = 0; j < setting.columns.length; j++) {

				if (setting.columns[j].hidden != true) {
					var td = document.createElement("td");

					if (setting.columns[j].render != null) {
						$(td).append(setting.columns[j].render(rowData[i]));
					} else {
						$(td).append(rowData[i][setting.columns[j].dataIndex]);
					}

					$(tr).append(td);
				}

				// 히든이면 아예 테이블에 나타내지 않도록 변경.
				// if (columns[j].hidden == true) {
				// $(td).css('display', 'none');
				// }
			}

			$(tr).click(privateRowClick);

			$(tbody).append(tr);
		}

	};

	this.clear = function() {
		rowData = null;
		$(mainTable).find('thead tr input:checkbox').attr('checked', false);
		$(tbody).children().remove();
	};

	this.getSelectedRecords = function() {

		var selectedTarget = $(tbody).find('tr.' + setting.cssRowSelected);

		var selectedRecord = new Array(selectedTarget.length);

		for ( var i = 0; i < selectedTarget.length; i++) {
			selectedRecord[i] = rowData[$(selectedTarget[i]).attr('rowIdx')];
		}

		return selectedRecord;
	};

	init(gridSetting);
};
