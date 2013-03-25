function lsq() {
}

/**
 * lsq.utils
 */
lsq.utils = {};
lsq.utils.isArray = function(obj) {
	return Object.prototype.toString.call(obj) == '[object Array]';
};
lsq.utils.isNumber = function(obj) {
	obj += ''; // 문자열로 변환
	obj = obj.replace(/^\s*|\s*$/g, ''); // 좌우 공백 제거
	if (obj == '' || isNaN(obj))
		return false;
	return true;

};

lsq.string = {};
lsq.string.hasText = function(str) {
	return !(str == null || str.length == 0);
};

lsq.form = {};
lsq.form.select = {};

lsq.form.select.clear = function(elementId) {
	$('#' + elementId).find('option').remove().end();
};

lsq.form.select.addOption = function(elementId, value, text) {

	var op = document.createElement("option");
	op.value = dataArray[i][valueProperty];
	op.text = dataArray[i][textProperty];
	document.getElementById(elementId).add(op);
};

lsq.form.select.bindOptions = function(elementId, dataArray, valueProperty,
		textProperty) {

	for ( var i = 0; i < dataArray.length; i++) {
		var op = document.createElement("option");
		op.value = dataArray[i][valueProperty];
		op.text = dataArray[i][textProperty];
		document.getElementById(elementId).add(op);
	}
};

/**
 * QueryString으로 부터 파라미터의 값을 가지고 옴
 * 
 * @param name
 *            파라미터 명
 */
lsq.utils.getParameterByName = function(name) {
	name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
	var regexS = "[\\?&]" + name + "=([^&#]*)";
	var regex = new RegExp(regexS);
	var results = regex.exec(window.location.search);
	if (results == null)
		return "";
	else
		return decodeURIComponent(results[1].replace(/\+/g, " "));
};

lsq.ajax = function(method, requestUrl, data, contentType, async, beforeSend,
		complete) {

	var jsonResponse = null;

	var ajaxSetting = {
		traditional : true,
		dataType : 'json',
		async : false,
		success : function(data, textStatus, jqXHR) {
			jsonResponse = data;
		},
		error : function(jqXHR, textStatus, errorThrown) {
			jsonResponse = {
				'success' : false,
				'message' : 'status: ' + jqXHR.status + ', error : '
						+ textStatus
			};
		}

	};

	if (method != null) {
		ajaxSetting.type = method;
	}
	if (requestUrl != null) {
		ajaxSetting.url = requestUrl;
	}
	if (async == true) {
		ajaxSetting.async = async;
	}
	if (data != null) {
		ajaxSetting.data = data;
	}
	if (contentType != null) {
		ajaxSetting.contentType = contentType;
	}
	if (beforeSend != null) {
		ajaxSetting.beforeSend = beforeSend;
	}
	if (complete != null) {
		ajaxSetting.complete = complete;
	}

	$.ajax(ajaxSetting);

	return jsonResponse;
};

lsq.cm = {};

lsq.cm.createRestCM = function(baseUrl, listUrl, getUrl, createUrl, updateUrl,
		deleteUrl) {

	var requestUrl_list = lsq.string.hasText(listUrl) ? listUrl : baseUrl;
	var requestUrl_get = lsq.string.hasText(getUrl) ? getUrl : baseUrl;
	var requestUrl_create = lsq.string.hasText(createUrl) ? createUrl : baseUrl;
	var requestUrl_update = lsq.string.hasText(updateUrl) ? updateUrl : baseUrl;
	var requestUrl_delete = lsq.string.hasText(deleteUrl) ? deleteUrl : baseUrl;

	this.list = function(data) {
		return lsq.ajax('GET', requestUrl_list, data);
	};

	this.get = function(key, data) {
		return lsq.ajax('GET', requestUrl_get + "/" + key, data);
	};

	this.create = function(data) {
		return lsq.ajax('POST', requestUrl_create, data, 'application/json');
	};

	this.update = function(key, data) {
		return lsq.ajax('PUT', requestUrl_update + "/" + key, data,
				'application/json');

	};

	this.del = function(key) {
		return lsq.ajax('DELETE', requestUrl_delete + "/" + key);
	};

};