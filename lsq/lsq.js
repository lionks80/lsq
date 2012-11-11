var lsq = {};

lsq.stringUtils = {};
lsq.stringUtils.hasText = function(str) {
	return !(str == null || str.length == 0);
};

lsq.stringUtils.strFormating = function(str, arrayArguments) {

	// 인자가 배열타입이 아닌경우 그냥 문자열 리턴
	if (lsq.utils.isArray(arrayArguments) == false) {

		if (arrayArguments != null && console) {
			console.error('arrayArguments is not array.');
		}

		return str;
	}

	// // 인자배열이 없는 경우 그냥 문자열 리턴
	// if (arrayArguments.length < 1) {
	// return str;
	// }

	var tokenCount = arrayArguments.length;

	for ( var token = 0; token <= tokenCount; token++) {
		str = str.replace(new RegExp("\\{" + token + "\\}", "gi"),
				arrayArguments[token]);
	}

	return str;

};

lsq.formUtils = {

	init_select : function(elementId, dataArray, valueProperty, textProperty) {
		$('#' + elementId).find('option').remove().end();

		for ( var i = 0; i < dataArray.length; i++) {
			var op = document.createElement("option");
			op.value = dataArray[i][valueProperty];
			op.text = dataArray[i][textProperty];
			document.getElementById(elementId).add(op);
		}
	}

};

lsq.utils = {};
lsq.utils.isArray = function isArray(obj) {
	return Object.prototype.toString.call(obj) == '[object Array]';
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

lsq.utils.getElement = function(eId) {
	return document.getElementById(eId);
};

lsq.ajax = function ajax(method, requestUrl, params, contentType, async,
		beforeSend, complete) {

	var jsonResponse = null;

	ajaxSetting = {
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
	if (params != null) {
		ajaxSetting.data = params;
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

lsq.createRestfulManager = function(baseUrl, listUrl, getUrl, createUrl,
		updateUrl, deleteUrl) {

	var requestUrl_list = lsq.stringUtils.hasText(listUrl) ? listUrl : baseUrl;
	var requestUrl_get = lsq.stringUtils.hasText(getUrl) ? getUrl : baseUrl;
	var requestUrl_create = lsq.stringUtils.hasText(createUrl) ? createUrl
			: baseUrl;
	var requestUrl_update = lsq.stringUtils.hasText(updateUrl) ? updateUrl
			: baseUrl;
	var requestUrl_delete = lsq.stringUtils.hasText(deleteUrl) ? deleteUrl
			: baseUrl;

	this.list = function(params) {
		return lsq.ajax('GET', requestUrl_list, params);
	};

	this.get = function(key, params) {
		return lsq.ajax('GET', requestUrl_get + "/" + key, params);
	};

	this.create = function(data) {
		return lsq.ajax('POST', requestUrl_create + "/" + key, params,
				'application/json');
	};

	this.update = function(key, data) {
		return lsq.ajax('PUT', requestUrl_update + "/" + key, params,
				'application/json');

	};

	this.remove = function(key) {
		return lsq.ajax('DELETE', requestUrl_delete + "/" + key, params,
				'application/json');
	};

};

lsq.createSimpleRestfulManager = function(baseUrl, listUrl, getUrl,
		saveOrUpdateUrl, deleteUrl) {

	var requestUrl_list = lsq.stringUtils.hasText(listUrl) ? listUrl : baseUrl;
	var requestUrl_get = lsq.stringUtils.hasText(getUrl) ? getUrl : baseUrl;
	var requestUrl_saveOrUpdate = lsq.stringUtils.hasText(saveOrUpdateUrl) ? saveOrUpdateUrl
			: baseUrl;
	var requestUrl_delete = lsq.stringUtils.hasText(deleteUrl) ? deleteUrl
			: baseUrl;

	this.list = function(params) {
		return lsq.ajax('GET', requestUrl_list, params);
	};

	this.get = function(key, params) {
		return lsq.ajax('GET', requestUrl_get + "/" + key, params);
	};

	this.saveOrUpdate = function(data) {
		return lsq.ajax('POST', requestUrl_saveOrUpdate, params);
	};

	this.remove = function(key) {
		return lsq.ajax('DELETE', requestUrl_delete + "/" + key);
	};

};
