/**
 * lsq.ObjectUtils
 */

test("lsq.ObjectUtils.isObject", function() {
	ok(lsq.ObjectUtils.isObject(new Object()) == true, "lsq.ObjectUtils.isObject(new Object()) == true");
	ok(lsq.ObjectUtils.isObject({"a" : 3, "b" : "test"}) == true, "lsq.ObjectUtils.isObject({\"a\" : 3, \"b\" : \"test\"}) == true");
	ok(lsq.ObjectUtils.isObject(new Array()) == false, "lsq.ObjectUtils.isObject(new Array()) == false");
	ok(lsq.ObjectUtils.isObject([]) == false, "lsq.ObjectUtils.isObject([]) == false");
	ok(lsq.ObjectUtils.isObject([1, 2, 3]) == false, "lsq.ObjectUtils.isObject([1, 2, 3]) == false");
	ok(lsq.ObjectUtils.isObject(null) == false, "lsq.ObjectUtils.isObject(null) == false");
	ok(lsq.ObjectUtils.isObject() == false, "lsq.ObjectUtils.isObject() == false");
	ok(lsq.ObjectUtils.isObject("Show me the money") == false, "lsq.ObjectUtils.isObject(\"Show me the money\") == false");
	ok(lsq.ObjectUtils.isObject(true) == false, "lsq.ObjectUtils.isObject(true) == false");
	ok(lsq.ObjectUtils.isObject(1) == false, "lsq.ObjectUtils.isObject(1) == false");
});

test("lsq.ObjectUtils.isNull", function() {
	ok(lsq.ObjectUtils.isNull(new Object()) == false, "lsq.ObjectUtils.isNull(new Object()) == false");
	ok(lsq.ObjectUtils.isNull({"a" : 3, "b" : "test"}) == false, "lsq.ObjectUtils.isNull({\"a\" : 3, \"b\" : \"test\"}) == false");
	ok(lsq.ObjectUtils.isNull(new Array()) == false, "lsq.ObjectUtils.isNull(new Array()) == false");
	ok(lsq.ObjectUtils.isNull([]) == false, "lsq.ObjectUtils.isNull([]) == false");
	ok(lsq.ObjectUtils.isNull([1, 2, 3]) == false, "lsq.ObjectUtils.isNull([1, 2, 3]) == false");
	ok(lsq.ObjectUtils.isNull(null) == true, "lsq.ObjectUtils.isNull(null) == true");
	ok(lsq.ObjectUtils.isNull() == false, "lsq.ObjectUtils.isNull() == false");
	ok(lsq.ObjectUtils.isNull("Show me the money") == false, "lsq.ObjectUtils.isNull(\"Show me the money\") == false");
	ok(lsq.ObjectUtils.isNull(true) == false, "lsq.ObjectUtils.isNull(true) == false");
	ok(lsq.ObjectUtils.isNull(1) == false, "lsq.ObjectUtils.isNull(1) == false");
});

test("lsq.ObjectUtils.isUndefined", function() {
	ok(lsq.ObjectUtils.isUndefined(new Object()) == false, "lsq.ObjectUtils.isUndefined(new Object()) == false");
	ok(lsq.ObjectUtils.isUndefined({"a" : 3, "b" : "test"}) == false, "lsq.ObjectUtils.isUndefined({\"a\" : 3, \"b\" : \"test\"}) == false");
	ok(lsq.ObjectUtils.isUndefined(new Array()) == false, "lsq.ObjectUtils.isUndefined(new Array()) == false");
	ok(lsq.ObjectUtils.isUndefined([]) == false, "lsq.ObjectUtils.isUndefined([]) == false");
	ok(lsq.ObjectUtils.isUndefined([1, 2, 3]) == false, "lsq.ObjectUtils.isUndefined([1, 2, 3]) == false");
	ok(lsq.ObjectUtils.isUndefined(null) == false, "lsq.ObjectUtils.isUndefined(null) == false");
	ok(lsq.ObjectUtils.isUndefined() == true, "lsq.ObjectUtils.isUndefined() == true");
	ok(lsq.ObjectUtils.isUndefined("Show me the money") == false, "lsq.ObjectUtils.isUndefined(\"Show me the money\") == false");
	ok(lsq.ObjectUtils.isUndefined(true) == false, "lsq.ObjectUtils.isUndefined(true) == false");
	ok(lsq.ObjectUtils.isUndefined(1) == false, "lsq.ObjectUtils.isUndefined(1) == false");
});

test("lsq.ObjectUtils.isArray", function() {
	ok(lsq.ObjectUtils.isArray(new Object()) == false, "lsq.ObjectUtils.isArray(new Object()) == false");
	ok(lsq.ObjectUtils.isArray({"a" : 3, "b" : "test"}) == false, "lsq.ObjectUtils.isArray({\"a\" : 3, \"b\" : \"test\"}) == false");
	ok(lsq.ObjectUtils.isArray(new Array()) == true, "lsq.ObjectUtils.isArray(new Array()) == true");
	ok(lsq.ObjectUtils.isArray([]) == true, "lsq.ObjectUtils.isArray([]) == true");
	ok(lsq.ObjectUtils.isArray([1, 2, 3]) == true, "lsq.ObjectUtils.isArray([1, 2, 3]) == true");
	ok(lsq.ObjectUtils.isArray(null) == false, "lsq.ObjectUtils.isArray(null) == false");
	ok(lsq.ObjectUtils.isArray() == false, "lsq.ObjectUtils.isArray() == false");
	ok(lsq.ObjectUtils.isArray("Show me the money") == false, "lsq.ObjectUtils.isArray(\"Show me the money\") == false");
	ok(lsq.ObjectUtils.isArray(true) == false, "lsq.ObjectUtils.isArray(true) == false");
	ok(lsq.ObjectUtils.isArray(1) == false, "lsq.ObjectUtils.isArray(1) == false");
});



test("lsq.ObjectUtils.isString", function() {
	ok(lsq.ObjectUtils.isString(new Object()) == false, "lsq.ObjectUtils.isString(new Object()) == false");
	ok(lsq.ObjectUtils.isString({"a" : 3, "b" : "test"}) == false, "lsq.ObjectUtils.isString({\"a\" : 3, \"b\" : \"test\"}) == false");
	ok(lsq.ObjectUtils.isString(new Array()) == false, "lsq.ObjectUtils.isString(new Array()) == false");
	ok(lsq.ObjectUtils.isString([]) == false, "lsq.ObjectUtils.isString([]) == false");
	ok(lsq.ObjectUtils.isString([1, 2, 3]) == false, "lsq.ObjectUtils.isString([1, 2, 3]) == false");
	ok(lsq.ObjectUtils.isString(null) == false, "lsq.ObjectUtils.isString(null) == false");
	ok(lsq.ObjectUtils.isString() == false, "lsq.ObjectUtils.isString() == false");
	ok(lsq.ObjectUtils.isString("Show me the money") == true, "lsq.ObjectUtils.isString(\"Show me the money\") == true");
	ok(lsq.ObjectUtils.isString(true) == false, "lsq.ObjectUtils.isString(true) == false");
	ok(lsq.ObjectUtils.isString(1) == false, "lsq.ObjectUtils.isString(1) == false");
});
test("lsq.ObjectUtils.isBoolean", function() {
	ok(lsq.ObjectUtils.isBoolean(new Object()) == false, "lsq.ObjectUtils.isBoolean(new Object()) == false");
	ok(lsq.ObjectUtils.isBoolean({"a" : 3, "b" : "test"}) == false, "lsq.ObjectUtils.isBoolean({\"a\" : 3, \"b\" : \"test\"}) == false");
	ok(lsq.ObjectUtils.isBoolean(new Array()) == false, "lsq.ObjectUtils.isBoolean(new Array()) == false");
	ok(lsq.ObjectUtils.isBoolean([]) == false, "lsq.ObjectUtils.isBoolean([]) == false");
	ok(lsq.ObjectUtils.isBoolean([1, 2, 3]) == false, "lsq.ObjectUtils.isBoolean([1, 2, 3]) == false");
	ok(lsq.ObjectUtils.isBoolean(null) == false, "lsq.ObjectUtils.isBoolean(null) == false");
	ok(lsq.ObjectUtils.isBoolean() == false, "lsq.ObjectUtils.isBoolean() == false");
	ok(lsq.ObjectUtils.isBoolean("Show me the money") == false, "lsq.ObjectUtils.isBoolean(\"Show me the money\") == false");
	ok(lsq.ObjectUtils.isBoolean(true) == true, "lsq.ObjectUtils.isBoolean(true) == true");
	ok(lsq.ObjectUtils.isBoolean(1) == false, "lsq.ObjectUtils.isBoolean(1) == false");
});
test("lsq.ObjectUtils.isNumber", function() {
	ok(lsq.ObjectUtils.isNumber(new Object()) == false, "lsq.ObjectUtils.isNumber(new Object()) == false");
	ok(lsq.ObjectUtils.isNumber({"a" : 3, "b" : "test"}) == false, "lsq.ObjectUtils.isNumber({\"a\" : 3, \"b\" : \"test\"}) == false");
	ok(lsq.ObjectUtils.isNumber(new Array()) == false, "lsq.ObjectUtils.isNumber(new Array()) == false");
	ok(lsq.ObjectUtils.isNumber([]) == false, "lsq.ObjectUtils.isNumber([]) == false");
	ok(lsq.ObjectUtils.isNumber([1, 2, 3]) == false, "lsq.ObjectUtils.isNumber([1, 2, 3]) == false");
	ok(lsq.ObjectUtils.isNumber(null) == false, "lsq.ObjectUtils.isNumber(null) == false");
	ok(lsq.ObjectUtils.isNumber() == false, "lsq.ObjectUtils.isNumber() == false");
	ok(lsq.ObjectUtils.isNumber("Show me the money") == false, "lsq.ObjectUtils.isNumber(\"Show me the money\") == false");
	ok(lsq.ObjectUtils.isNumber(true) == false, "lsq.ObjectUtils.isNumber(true) == false");
	ok(lsq.ObjectUtils.isNumber("11.2") == true, "lsq.ObjectUtils.isNumber(\"11.2\") == true");
	ok(lsq.ObjectUtils.isNumber(1) == true, "lsq.ObjectUtils.isNumber(1) == true");
});


/**
 * StringUtils
 */

test("lsq.StringUtils.hasText", function() {

	ok(lsq.StringUtils.hasText(new Object()) == false, "lsq.StringUtils.hasText(new Object()) == false");
	ok(lsq.StringUtils.hasText({"a" : 3, "b" : "test"}) == false, "lsq.StringUtils.hasText({\"a\" : 3, \"b\" : \"test\"}) == false");
	ok(lsq.StringUtils.hasText(new Array()) == false, "lsq.StringUtils.hasText(new Array()) == false");
	ok(lsq.StringUtils.hasText([]) == false, "lsq.StringUtils.hasText([]) == false");
	ok(lsq.StringUtils.hasText([1, 2, 3]) == false, "lsq.StringUtils.hasText([1, 2, 3]) == false");
	ok(lsq.StringUtils.hasText(null) == false, "lsq.StringUtils.hasText(null) == false");
	ok(lsq.StringUtils.hasText() == false, "lsq.StringUtils.hasText() == false");
	ok(lsq.StringUtils.hasText("") == false, "lsq.StringUtils.hasText(\"\") == false");
	ok(lsq.StringUtils.hasText("Show me the money") == true, "lsq.StringUtils.hasText(\"Show me the money\") == true");
	ok(lsq.StringUtils.hasText(true) == true, "lsq.StringUtils.hasText(true) == true");
	ok(lsq.StringUtils.hasText("11.2") == true, "lsq.StringUtils.hasText(\"11.2\") == true");
	ok(lsq.StringUtils.hasText(1) == true, "lsq.StringUtils.hasText(1) == true");
});



//test( "equal test", function() {
//	  equal( 0, 0, "Zero; equal succeeds" );
//	  equal( "", 0, "Empty, Zero; equal succeeds" );
//	  equal( "", "", "Empty, Empty; equal succeeds" );
//	  equal( 0, 0, "Zero, Zero; equal succeeds" );
//	 
//	  equal( "three", 3, "Three, 3; equal fails" );
//	  equal( null, false, "null, false; equal fails" );
//	});