# vk-node 

VK API for Node.js

## Installation

```sh
npm install vk-node --save
```



## Dependencies

- [request](https://github.com/request/request): Simplified HTTP request client.

## Dev Dependencies


None

## Examples
```js
var api = require('vk-api');
var vk = new api("access_token");

vk.method('database.getCities', {"country_id": 1}, (err, res) => {
	console.log(res);
});
```
```sh
{ count: 19,
  items:
   [ { id: 1, title: 'Москва', importa
     { id: 2, title: 'Санкт-Петербург'
     { id: 10, title: 'Волгоград' },
     { id: 37, title: 'Владивосток' },
     { id: 153, title: 'Хабаровск' },
     { id: 49, title: 'Екатеринбург' }
     { id: 60, title: 'Казань' },
     { id: 61, title: 'Калининград' },
     { id: 72, title: 'Краснодар' },
     { id: 73, title: 'Красноярск' },
     { id: 95, title: 'Нижний Новгород
     { id: 99, title: 'Новосибирск' },
     { id: 104, title: 'Омск' },
     { id: 110, title: 'Пермь' },
     { id: 119, title: 'Ростов-на-Дону
     { id: 123, title: 'Самара' },
     { id: 151, title: 'Уфа' },
     { id: 158, title: 'Челябинск' },
     { id: 42, title: 'Воронеж' } ] }
```
```js
var api = require('vk-api');
var vk = new api("access_token");

vk.method('wall.get', {}, (err, res) => {
	console.log(res);
});
```
[All methods](https://vk.com/dev/methods)


## License

ISC
