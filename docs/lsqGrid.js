var indexNo = 100;
function makeRowNo() {
	var temp = indexNo;
	indexNo++;
	return temp;
}

$(function() {

	$('#lsqGrid_basic').lsqGrid({
		columns : [ {
			header : '#',
			render : function() {
				return makeRowNo();
			}
		}, {
			header : '이름',
			dataIndex : 'name',
			width : '20%'
		}, {
			header : '나이',
			dataIndex : 'age',
			width : '40%'
		}, {
			header : '성별',
			width : '40%',
			render : function(record) {
				return "!! " + record.sex + " !!";
			}
		} ],
		cssTable : "table table-bordered table-striped table-hover",
		cssRowSelected : "select",
		useSelect : false,
		multiSelect : false
	});

	$('#lsqGrid_userSelect').lsqGrid({
		columns : [ {
			header : '이름',
			dataIndex : 'name'
		}, {
			header : '나이',
			dataIndex : 'age'
		}, {
			header : '성별',
			dataIndex : 'sex'
		} ],
		listener : {
			'rowClick' : function(index, record) {
			}
		},
		useSelect : true,
		multiSelect : false
	});

	$('#lsqGrid_multiSelect').lsqGrid({
		columns : [ {
			header : '이름',
			dataIndex : 'name'
		}, {
			header : '나이',
			dataIndex : 'age'
		}, {
			header : '성별',
			render : function(record) {
				return record.sex == 'M' ? 'MALE' : 'FEMALE';
			}
		} ],
		listener : {
			'rowClick' : function(index, record) {
			},
			'selectChange' : function(selectedRecords) {
				var text = "";

				if (selectedRecords != null && selectedRecords.length > 0) {
					for ( var i = 0; i < selectedRecords.length; i++) {
						text += '[' + selectedRecords[i].name + ']';
					}
				}

				$('#lsqGrid_multiSelect_console').text(text);
			}
		},
		useSelect : true,
		multiSelect : true
	});

	$('#test_getSelectedRecords').click(
			function() {

				selectedRecords = $('#lsqGrid_multiSelect').lsqGrid(
						'getSelectedRecords');

				var text = "";

				if (selectedRecords != null && selectedRecords.length > 0) {
					for ( var i = 0; i < selectedRecords.length; i++) {
						text += '[' + selectedRecords[i].name + ']';
					}
				}

				alert(text);
			});

	gridData1 = {
		"success" : true,
		"data" : {
			"start" : "0",
			"limit" : "6",
			"totalCount" : "100",
			"page" : "2",
			"totalPage" : "50",
			"displayCount" : 9,
			"rows" : [ {
				"name" : "철수",
				"age" : 16,
				"sex" : "M"
			}, {
				"name" : "광철",
				"age" : 23,
				"sex" : "M"
			}, {
				"name" : "영희",
				"age" : 18,
				"sex" : "F"
			}, {
				"name" : "순희",
				"age" : 16,
				"sex" : "F"
			}, {
				"name" : "길동",
				"age" : 20,
				"sex" : "M"
			}, {
				"name" : "철호",
				"age" : 11,
				"sex" : "M"
			} ]
		}

	};

	$('#lsqGrid_basic').lsqGrid('dataBind', gridData1.data.rows);
	$('#lsqGrid_userSelect').lsqGrid('dataBind', gridData1.data.rows);
	$('#lsqGrid_multiSelect').lsqGrid('dataBind', gridData1.data.rows);

	$('#lsqGrid_basic_pg').pagingToolBar({
		"start" : "0",
		"limit" : "6",
		"totalCount" : "100",
		"displayCount" : 9,
		"trigger" : function(page) {
			alert('1' + page);
		}
	});

	$('#lsqGrid_userSelect_pg').pagingToolBar({
		"start" : "0",
		"limit" : "6",
		"totalCount" : "100",
		"displayCount" : 7,
		"trigger" : function(page) {
			alert('2' + page);
		}
	});

	$('#lsqGrid_multiSelect_pg').pagingToolBar({
		"start" : "0",
		"limit" : "6",
		"totalCount" : "100",
		"displayCount" : 4,
		"trigger" : function(page) {
			alert('3' + page);
		}
	});

});