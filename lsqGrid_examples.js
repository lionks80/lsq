$(function() {

	// Sample Data
	var people = [ { 'id' : 1, 'name' : '이철수', 'age' : 21 },
	               { 'id' : 2, 'name' : '김영희', 'age' : 33 }, 
	               { 'id' : 3, 'name' : '장동민', 'age' : 24 }, 
	               { 'id' : 4, 'name' : '홍길동', 'age' : 40 }, 
	               { 'id' : 5, 'name' : '이순신', 'age' : 30 }, 
	               { 'id' : 6, 'name' : '조악필', 'age' : 20 } ];

	/** DEMO1 **/
	// Create Grid
	$('#lsqGrid_demo1').lsqGrid({
	    columns : [ {
	        header : 'ID',
	        dataIndex : 'id',
	        headerAlign : 'right',
	        dataAlign : 'right',
	        width : 50
	    }, {
	        header : 'Name',
	        dataIndex : 'name'
	    }, {
	        header : 'Age',
	        dataIndex : 'age'
	    } ],
	    listener : {
			rowClick : function(rowIdx, record) {
				alert('rowIdx: ' + rowIdx + ', name: ' + record.name);
			}
	    }
	});
	
	// Data Bind
	$('#lsqGrid_demo1').lsqGrid('dataBind', people);
	$('#btn_demo1_clear').click(function() {
		$('#lsqGrid_demo1').lsqGrid('clear');
	});
	$('#btn_demo1_dataBind').click(function() {
		$('#lsqGrid_demo1').lsqGrid('dataBind', people);
	});
	
	
	/** DEMO2 **/
	var num = 100;
	var ASC = true;
	// Create Grid
	$('#lsqGrid_demo2').lsqGrid({
	    columns : [ {
	    	header : '#',
	    	headerAlign : 'center',
	    	dataAlign : 'center',
	    	width : 50,
	    	render : function(record, rowIdx) {
	    		
	    		if (ASC) {
	    			return num - rowIdx;
	    		} else {
	    			return num + rowIdx;
	    		}
	    		
	    	}
	    },{
	        header : 'ID',
	        dataIndex : 'id'
	    }, {
	        header : 'Name',
	        dataIndex : 'name'
	    }, {
	        header : 'Age',
	       render : function(record, rowIdx) {
	    	   return record.age + ' 세';
	       }
	    } ],
	    useSelect : true,
	    multiSelect : false,
	    listener : {
			selectChange : function(selectedRecords) {
				$('#lsqGrid_demo2_selectChange').text('selected: ' + selectedRecords[0].name);
			}
	    }
	});
	
	// Data Bind
	$('#lsqGrid_demo2').lsqGrid('dataBind', people);
	
	/** DEMO3 **/
	// Create Grid
	$('#lsqGrid_demo3').lsqGrid({
	    columns : [ {
	        header : 'ID',
	        dataIndex : 'id'
	    }, {
	        header : 'Name',
	        dataIndex : 'name'
	    }, {
	        header : 'Age',
	       render : function(record, rowIdx) {
	    	   return record.age + ' 세';
	       }
	    } ],
		cssClassTable : ["table", "table-bordered"],
		cssClassRowSelected : "selected",
	    useSelect : true,
	    multiSelect : true
	});
	
	// Data Bind
	$('#lsqGrid_demo3').lsqGrid('dataBind', people);
	$('#btn_demo3_getSelectedRecords').click(function() {
		var names = '';
		
		var selectedRecords = $('#lsqGrid_demo3').lsqGrid('getSelectedRecords');
		
		for (var i = 0 ; i < selectedRecords.length ; i++ ) {
			names += '[' + selectedRecords[i].name + ']';
		}
		
		alert(names);
	});
	
});