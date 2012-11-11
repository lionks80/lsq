var lsqGrid = function(id, gridSetting) {

	var target = $('#' + id)[0];
	var setting = {
		columns : null,
		cssClass : {
			table : [],
			row : {
				mouseover : "over",
				selected : "select"
			},
			header : "grid-header"
		},
		useSelect : false,
		multiSelect : false,
		listener : {
			rowClick : function(rowIdx, record) {
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
			row.removeClass(setting.cssClass.row.selected);
			row.find('td input:checkbox').attr('checked', false);
		} else {
			row.addClass(setting.cssClass.row.selected);
			row.find('td input:checkbox').attr('checked', true);
		}

	}

	function privateRowClick() {

		if (setting.useSelect == true) {

			if (setting.multiSelect == true) {
				if ($(this).hasClass(setting.cssClass.row.selected) == true) {
					setRowSelect($(this), false);
				} else {
					setRowSelect($(this), true);
				}

			} else {
				if ($(this).hasClass(setting.cssClass.row.selected) == true) {
					setRowSelect($(this), true);
				} else {
					$(tbody).find('tr.' + setting.cssClass.row.selected).each(
							function() {
								setRowSelect($(this), false);
							});
					setRowSelect($(this), true);
				}
			}
		}

		if (setting.listener.rowClick != null) {
			var rowIdx = $(this).attr("rowIdx");
			var record = rowData[rowIdx];

			setting.listener.rowClick(rowIdx, record);
		}
	}

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
					$(td).append(rowData[i][setting.columns[j].dataIndex]);
					$(tr).append(td);
				}

				// 히든이면 아예 테이블에 나타내지 않도록 변경.
				// if (columns[j].hidden == true) {
				// $(td).css('display', 'none');
				// }
			}

			$(tr).mouseover(function() {
				$(this).addClass(setting.cssClass.row.mouseover);
			});
			$(tr).mouseout(function() {
				$(this).removeClass(setting.cssClass.row.mouseover);
			});
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

		var selectedTarget = $(tbody).find(
				'tr.' + setting.cssClass.row.selected);

		var selectedRecord = new Array(selectedTarget.length);

		for ( var i = 0; i < selectedTarget.length; i++) {
			selectedRecord[i] = rowData[$(selectedTarget[i]).attr('rowIdx')];
		}

		return selectedRecord;

		$(tbody).find('tr.' + setting.cssClass.row.selected);
	};

	var init = function(options) {

		// 테이블 클래스 초기화
		tableClass = '';

		for ( var i = 0; i < setting.cssClass.table.length; i++) {
			tableClass = tableClass + ' ' + setting.cssClass.table[i]
		}

		mainTable = $('<table class=\"' + tableClass + '\"></table>');
		thead = $('<thead></thead>');
		tbody = $('<tbody></tbody>');

		var thead_tr = $('<tr></tr>');
		// 테이블 클래스 적용

		if (setting.useSelect == true) {

			var th = $("<th style=\"width:30px; text-align: center;\"></th>");

			if (setting.multiSelect == true) {

				checkBox = $(
						'<input type=\"checkbox\">')
						.change(
								function() {
									var checked = $(this).attr('checked') == true
											|| $(this).attr('checked') == 'checked' ? true
											: false;

									$(tbody).find('tr').each(function() {
										setRowSelect($(this), checked);
									});
								});

				$(th).append(checkBox);
			}

			$(thead_tr).append(th);
		}

		ths = [];

		// column_header 생성
		for ( var i = 0; i < setting.columns.length; i++) {

			if (setting.columns[i].hidden != true) {

				ths[i] = '<th>' + setting.columns[i].header + '</th>';
				$(ths[i]).width(setting.columns[i].width);
			}

		}

		thead_tr.append(ths.join(''));

		$(thead).append(thead_tr).addClass(setting.cssClass.header);
		$(mainTable).append(thead);
		$(mainTable).append(tbody);
		$(target).append(mainTable);

	};

	init(gridSetting);
};
