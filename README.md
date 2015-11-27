# url.js
parse and set url by url rules,根据url规则解析或设置url各部件
## API ##
在corajs项目中的测试代码的测试代码及结果：
## 测试代码 ##
```javascript
describe("Cora.url 测试获取url对象", function(){
    var urlarr = ['http://www.test.com/a/b/c?test=1&kk=2#hash/p1/p2/p3?htest=1&hh=2',
        'http://www.test.com/a/b/c/?test=1&kk=2#hash/p1/p2/p3',
        'http://www.test.com/a/b/c?test=1&kk=2#hash?htest=1&hh=2',
        'http://www.test.com/a/b/c/?test=1&kk=2#hash',
        'http://www.test.com/a/b/c',
        'http://www.test.com/#hash',
        'https://test.cn/#hash',
        'http://www.test.com/',
        'http://test.com/',
        'http://test.com/',
        '/a/b/c#hash/p1/p2/p3/?test=1&kk=2',
        '#hash/p1/p2/p3/?test=1&kk=2',
        '#test?test=1&kk=2',
        '?test=1&kk=2',
        '#hash',
        ''];

    it("测试打印内容", function(){
        for(var i=0 ; i<urlarr.length; i++){
            var item = urlarr[i];
            var urls = Cora.url.get(item);
            console.log(urls);
        }
        console.log('----------------------------');

        for(var j=0 ; j<urlarr.length; j++){
            var item = urlarr[j];
            console.log(Cora.url.get(item, true));
        }
        console.log('----------------------------');

        for(var k=0 ; k<urlarr.length; k++){
            var item = urlarr[k];
            console.log(Cora.url.getParams(item));
        }
        console.log('----------------------------');

        for (var k = 0; k < urlarr.length; k++) {
            var item = urlarr[k];
            console.log(Cora.url.set(item, {seturl1: 1, seturl2: 2}));
        }
        console.log('----------------------------');

        console.log(Cora.url.setParams({seturl1: 1, seturl2: 2}));
        console.log(Cora.url.setParams({seturl1: 1, seturl2: 2}, ':', ','));
    });
});
```
###测试结果
```
{protocal: 'http', domain: 'www.test.com', path: '/a/b/c', search: 'test=1&kk=2', hash: 'hash/p1/p2/p3?htest=1&hh=2', hashPath: 'hash/p1/p2/p3?htest=1&hh=2', hashsearch: 'htest=1&hh=2'}
{protocal: 'http', domain: 'www.test.com', path: '/a/b/c', search: 'test=1&kk=2', hash: 'hash/p1/p2/p3', hashPath: 'hash/p1/p2/p3', hashsearch: undefined}
{protocal: 'http', domain: 'www.test.com', path: '/a/b/c', search: 'test=1&kk=2', hash: 'hash?htest=1&hh=2', hashPath: 'hash?htest=1&hh=2', hashsearch: 'htest=1&hh=2'}
{protocal: 'http', domain: 'www.test.com', path: '/a/b/c', search: 'test=1&kk=2', hash: 'hash', hashPath: 'hash', hashsearch: undefined}
{protocal: 'http', domain: 'www.test.com', path: '/a/b/c', search: '', hash: undefined, hashPath: '', hashsearch: ''}
{protocal: 'http', domain: 'www.test.com', path: '', search: '', hash: 'hash', hashPath: 'hash', hashsearch: undefined}
{protocal: 'https', domain: 'test.cn', path: '', search: '', hash: 'hash', hashPath: 'hash', hashsearch: undefined}
{protocal: 'http', domain: 'www.test.com', path: '', search: '', hash: undefined, hashPath: '', hashsearch: ''}
{protocal: 'http', domain: 'test.com', path: '', search: '', hash: undefined, hashPath: '', hashsearch: ''}
{protocal: 'http', domain: 'test.com', path: '', search: '', hash: undefined, hashPath: '', hashsearch: ''}
{protocal: undefined, domain: undefined, path: '/a/b/c', search: '', hash: 'hash/p1/p2/p3/?test=1&kk=2', hashPath: 'hash/p1/p2/p3/?test=1&kk=2', hashsearch: 'test=1&kk=2'}
{protocal: undefined, domain: undefined, path: '', search: '', hash: 'hash/p1/p2/p3/?test=1&kk=2', hashPath: 'hash/p1/p2/p3/?test=1&kk=2', hashsearch: 'test=1&kk=2'}
{protocal: undefined, domain: undefined, path: '', search: '', hash: 'test?test=1&kk=2', hashPath: 'test?test=1&kk=2', hashsearch: 'test=1&kk=2'}
{protocal: undefined, domain: undefined, path: '', search: 'test=1&kk=2', hash: undefined, hashPath: '', hashsearch: ''}
{protocal: undefined, domain: undefined, path: '', search: '', hash: 'hash', hashPath: 'hash', hashsearch: undefined}
{protocal: undefined, domain: undefined, path: '', search: '', hash: undefined, hashPath: '', hashsearch: ''}
'----------------------------'
{protocal: 'http', domain: 'www.test.com', path: ['a', 'b', 'c'], search: {test: '1', kk: '2'}, hash: 'hash/p1/p2/p3?htest=1&hh=2', hashPath: ['hash', 'p1', 'p2', 'p3?htest=1&hh=2'], hashsearch: {htest: '1', hh: '2'}}
{protocal: 'http', domain: 'www.test.com', path: ['a', 'b', 'c'], search: {test: '1', kk: '2'}, hash: 'hash/p1/p2/p3', hashPath: ['hash', 'p1', 'p2', 'p3'], hashsearch: {}}
{protocal: 'http', domain: 'www.test.com', path: ['a', 'b', 'c'], search: {test: '1', kk: '2'}, hash: 'hash?htest=1&hh=2', hashPath: ['hash?htest=1&hh=2'], hashsearch: {htest: '1', hh: '2'}}
{protocal: 'http', domain: 'www.test.com', path: ['a', 'b', 'c'], search: {test: '1', kk: '2'}, hash: 'hash', hashPath: ['hash'], hashsearch: {}}
{protocal: 'http', domain: 'www.test.com', path: ['a', 'b', 'c'], search: {}, hash: undefined, hashPath: [], hashsearch: {}}
{protocal: 'http', domain: 'www.test.com', path: [''], search: {}, hash: 'hash', hashPath: ['hash'], hashsearch: {}}
{protocal: 'https', domain: 'test.cn', path: [''], search: {}, hash: 'hash', hashPath: ['hash'], hashsearch: {}}
{protocal: 'http', domain: 'www.test.com', path: [''], search: {}, hash: undefined, hashPath: [], hashsearch: {}}
{protocal: 'http', domain: 'test.com', path: [''], search: {}, hash: undefined, hashPath: [], hashsearch: {}}
{protocal: 'http', domain: 'test.com', path: [''], search: {}, hash: undefined, hashPath: [], hashsearch: {}}
{protocal: undefined, domain: undefined, path: ['a', 'b', 'c'], search: {}, hash: 'hash/p1/p2/p3/?test=1&kk=2', hashPath: ['hash', 'p1', 'p2', 'p3', '?test=1&kk=2'], hashsearch: {test: '1', kk: '2'}}
{protocal: undefined, domain: undefined, path: [''], search: {}, hash: 'hash/p1/p2/p3/?test=1&kk=2', hashPath: ['hash', 'p1', 'p2', 'p3', '?test=1&kk=2'], hashsearch: {test: '1', kk: '2'}}
{protocal: undefined, domain: undefined, path: [''], search: {}, hash: 'test?test=1&kk=2', hashPath: ['test?test=1&kk=2'], hashsearch: {test: '1', kk: '2'}}
{protocal: undefined, domain: undefined, path: [''], search: {test: '1', kk: '2'}, hash: undefined, hashPath: [], hashsearch: {}}
{protocal: undefined, domain: undefined, path: [''], search: {}, hash: 'hash', hashPath: ['hash'], hashsearch: {}}
{protocal: undefined, domain: undefined, path: [''], search: {}, hash: undefined, hashPath: [], hashsearch: {}}
'----------------------------'
{test: '1', kk: '2', htest: '1', hh: '2'}
{test: '1', kk: '2'}
{test: '1', kk: '2', htest: '1', hh: '2'}
{test: '1', kk: '2'}
{}
{}
{}
{}
{}
{}
{test: '1', kk: '2'}
{test: '1', kk: '2'}
{test: '1', kk: '2'}
{test: '1', kk: '2'}
{}
{}
'----------------------------'
'http://www.test.com/a/b/c?test=1&kk=2&seturl1=1&seturl2=2#hash/p1/p2/p3?htest=1&hh=2'
'http://www.test.com/a/b/c/?test=1&kk=2&seturl1=1&seturl2=2#hash/p1/p2/p3'
'http://www.test.com/a/b/c?test=1&kk=2&seturl1=1&seturl2=2#hash?htest=1&hh=2'
'http://www.test.com/a/b/c/?test=1&kk=2&seturl1=1&seturl2=2#hash'
'http://www.test.com/a/b/c?seturl1=1&seturl2=2'
'http://www.test.com/#hash?seturl1=1&seturl2=2'
'https://test.cn/#hash?seturl1=1&seturl2=2'
'http://www.test.com/?seturl1=1&seturl2=2'
'http://test.com/?seturl1=1&seturl2=2'
'http://test.com/?seturl1=1&seturl2=2'
'/a/b/c#hash/p1/p2/p3/?test=1&kk=2&seturl1=1&seturl2=2'
'#hash/p1/p2/p3/?test=1&kk=2&seturl1=1&seturl2=2'
'#test?test=1&kk=2&seturl1=1&seturl2=2'
'?test=1&kk=2&seturl1=1&seturl2=2'
'#hash?seturl1=1&seturl2=2'
'?seturl1=1&seturl2=2'
'----------------------------'
'seturl1=1&seturl2=2'
'seturl1:1,seturl2:2'
```
## Licence ##

The MIT License

Copyright (c) 2015 Joe github.com@ccjoe