$(function() {

	var lsqGrid_basic = new lsqGrid('lsqGrid_basic', {
		columns : [ {
			header : '이름',
			dataIndex : 'name'
		}, {
			header : '나이',
			dataIndex : 'age'
		}, {
			header : '성별',
			render : function(record) {
				return "!! " + record.sex + " !!";
			}
		} ],
		cssTable : "table table-bordered table-striped table-hover",
		cssRowSelected : "select",
		listener : {
			'rowClick' : function(index, record) {
			}
		},
		useSelect : false,
		multiSelect : false
	});

	var lsqGrid_userSelect = new lsqGrid('lsqGrid_userSelect', {
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

	var lsqGrid_multiSelect = new lsqGrid('lsqGrid_multiSelect', {
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
			}
		},
		useSelect : true,
		multiSelect : true
	});

	gridData1 = [ {
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
	} ];

	lsqGrid_basic.dataBind(gridData1);
	lsqGrid_userSelect.dataBind(gridData1);
	lsqGrid_multiSelect.dataBind(gridData1);

});