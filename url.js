/******************************** URL parse ***********************************/
/**
 * Url处理
 * @author Joe Liu
 * @email icareu.joe@gmail.com
 */
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);            // AMD. Register as an anonymous module.
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory(require());     // Node. Does not work with strict CommonJS, but only CommonJS-like environments that support module.exports, like Node.
    } else {
        root.returnExports = factory(root); // Browser globals (root is window)
    }
}(this, function () {
    var re = {
        url: /((http|https):\/\/)?((\w+\.)+\w+)?(:\d+)?((\/\w+)+)?\/?\??((\w+=\w+&?)+)?#?(.+)?/g,
        kv: /(\w+)=([^&#]+)/g,
        search: /([^\?]+)?\??((\w+=\w+&?)+)?/,     //[^\?]+ 除?外所有
        path: /.+((\/\w+)+)?/,
        history: /[^\?]?\?((\w+)+(\/\w+)*)/        //获取html history url风格的search path
    };
    /**
     * 处理键值对字符串为对象,获取url里所有键值对返回
     * @method url.getHTML5Hash
     * @param {string} url  html5 history url 类似 tets.com?hash/path/to&abc
     * @return {string} 返回like=>  hash/path/to
     */
    var getHTML5Hash = function(url){
        var execRes = re.history.exec(url);
        return execRes ? re.history.exec(url)[1] : '';
    };
    
    var getParams = function (kvp) {
        if (!kvp) return {};
        var okvp = {}, kvpi; //object key val pairs;
        var kvpArr = encodeURI(kvp).match(re.kv);
        if (!kvpArr || !kvpArr.length) return {};
        kvpArr.forEach(function (i) {
            re.kv.lastIndex = 0;
            kvpi = re.kv.exec(i);
            okvp[kvpi[1]] = decodeURI(kvpi[2]);
        });
        return okvp;
    };

    var getParams = function (kvp) {
        if (!kvp) return {};
        var okvp = {}, kvpi; //object key val pairs;
        var kvpArr = encodeURI(kvp).match(re.kv);
        if (!kvpArr || !kvpArr.length) return {};
        kvpArr.forEach(function (i) {
            re.kv.lastIndex = 0;
            kvpi = re.kv.exec(i);
            okvp[kvpi[1]] = decodeURI(kvpi[2]);
        });
        return okvp;
    };

    var getHashSearch = function (hash, isParse) {
        if (!hash) return isParse ? {} : '';
        var hashSchStr = re.search.exec(hash)[2];
        return isParse ? getParams(hashSchStr) : hashSchStr;
    };


    var getHashPath = function (hash, isParse) {
        if (!hash) return isParse ? [] : '';
        var hashPathStr = re.path.exec(hash)[0];
        return isParse ? hashPathStr.split('/') : hashPathStr;
    };

    var getUrl  = function (url, isParse){
        re.url.lastIndex = 0;
        var uri = re.url.exec(url);
        var hashfull = uri[10], path = uri[6] || '', search = uri[8] || '';
        //console.log(uri, 'uri');
        return {
            protocal: uri[2],
            domain: uri[3],
            port: uri[5],
            path: isParse ? path.substring(1).split('/') : path,
            search: isParse ? getParams(search) : search,
            hash: hashfull,
            hashPath: getHashPath(hashfull, isParse) ,
            hashsearch: getHashSearch(hashfull, isParse)
        };
    };

    var setParams = function (obj, equalStr, joinStr) {
        var paramstr = '', equalStr = equalStr || '=';
        joinStr = joinStr || '&';

        for (var i in obj) {
            paramstr += i + equalStr + obj[i] + joinStr;
        }
        return paramstr.remove('right');
    };

    var setUrl = function (url, kvpOrk, value) {
        var kvpair = (typeof kvpOrk === 'object') ? setParams(kvpOrk) : (kvpOrk + '=' + value);
        return url.replace(re.search, function (str, $0, $1) {
            return ($0 ? $0 : '') + '?' + ($1 ? $1 + '&' : '') + kvpair;
        });
    };
    /**
     * url
     * @namespace url
     */

    return {
        /**
         * 处理url 相关部件解析与 生成
         * @method url.get
         * @param {string} url 传入url
         * @param {boolean} isParse parse为true时返回的各部件为序列化对象，否则为string,同上面的isParse
         * @return {object} 返回url各部件
         * @example  http://domain.com:8080/pathto/urlpath/123?search=1&param=11/#hash/hashpath/123?hashsearch=test;
         * return value like {
                protocal: {string},   协议 http
                port: {string}        端口 :8080
                domain: {string},     域名 domain.com
                path: {string},       路径 /pathto/urlpath/123
                search: {object},     参数 search=1&param=11
                hash: {string},       Hash，#后所有 hash/hashpath/123?hashsearch=test;
                hashsearch: {object}  Hash里参数 hashsearch=test
                hashPath: {array}     Hash里路径 hash/hashpath/123
            };
         */
        get: getUrl,
        /**
         * 将object 为url设置新增serach
         * @method url.set
         * @param {string} url 被操作的url
         * @param {string} key value pair object or key string
         * @param {string} value  value
         * @return {object} 设置search的url
         */
        set: setUrl,
        /**
         * 处理键值对字符串为对象,获取url里所有键值对返回
         * @method url.getParams
         * @param {string} kvp key-value-pairs-string
         * @return {object} 返回键值对对象
         * @example  hashsearch=test; => {hashsearch: test}
         */
        getParams: getParams,
        /**
         * 将object 处理为url 相关部件search
         * @method url.setParam
         * @param {object} obj 将object对象转化为url参数字符串
         * @param {string} equalStr key与value间的相等字符, 默认为 '='
         * @param {string} joinStr key-value key-value间的连接符 默认为 '&'
         * @return {object} search
         */
        setParams: setParams,
        /**
         * 处理hash里 search部分键值对对象
         * @method url.getHashSearch
         * @param {string} url  string
         * @param {boolean} isParse  为ture时返回的是对象
         * @return {object} 返回hash里的search部分键值对对象
         * @example  #hash/hashpath/123?hashsearch=test; =>hashsearch=test isParse为ture时返回的是对象{hashsearch: test}
         */
        getHashSearch: getHashSearch,
        /**
         * 处理hash或search里的类path部分
         * @method url.getHashPath
         * @param {string} hash hash部分字符串
         * @param {boolean} isParse  为ture时返回的是对象
         * @return {array} 返回hash里的path部分数组
         * @example  #hash/hashpath/123/?hashsearch=test; =>hashpath/123 isParse为ture时返回的是对象[hashpath,123]
         */
        getHashPath: getHashPath,
        /**
         * 处理键值对字符串为对象,获取url里所有键值对返回
         * @method url.getHTML5Hash
         * @param {string} url  html5 history url 类似 tets.com?hash/path/to
         * @return {string} 返回like=>  hash/path/to
         */
        getHTML5Hash: getHTML5Hash
    };
}));
