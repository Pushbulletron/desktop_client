# Pushbulletron Desktop Client

This is App is built to separate Pushbullet messages to separate devices.

![Pushbulletron Lofi Prototype](http://i.imgur.com/mDTJS5i.png)

Added Feature:
- Message Query Based on: time range (2 timeframe), keyword, devices, etc.
- Export as CSV / other formats

### Coding conventions
**Class declarations**
Do not use the ```function``` keyword to declare classes as follows; instead use the ```class``` keyword throughout:
```
class ClassCar {
	drive () {
		console.log('Vroom!');
	}
}

const car1 = new ClassCar();
console.log(car1.drive());
```

**Variable declarations:**

- ```enums``` and ```const```: ```FOO_BAR```
- ```var``` and ```function```: ```foo_bar```
- ```class```: ```CamelCase```

### Documentation convention

```
/**
 * @param {number} timestamp - this is the timestamp in UNIX time
 * @return {Array<Object>} pushes - array of Object as described by 
 * Pushbullet Push documentation: https://docs.pushbullet.com/#push
 */
get_pushes(timestamp){

}
```

Read more: https://esdoc.org/
