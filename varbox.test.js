var assert = require('assert');
var ok = assert.ok;
var Varbox;

ok((function () {
  Varbox = require('./varbox');

  ok('createBox' in Varbox);
  ok('function' === typeof Varbox.createBox);
  ok(1 === Varbox.createBox.length);

  ok('getBox' in Varbox);
  ok('function' === typeof Varbox.getBox);
  ok(1 === Varbox.getBox.length);
  return true;
})(), 'require("varbox")');

var box;
var updateTestingKey = 'testUpdate';

ok((function() {
  box = Varbox.createBox('firstBox');

  ok('get' in box);
  ok('function' === typeof box.get);
  ok(1 === box.get.length);

  ok('set' in box);
  ok('function' === typeof box.set);
  ok(2 === box.set.length);

  ok('update' in box);
  ok('function' === typeof box.update);
  ok(2 === box.update.length);

  ok('merge' in box);
  ok('function' === typeof box.merge);
  ok(2 === box.merge.length);

  ok('has' in box);
  ok('function' === typeof box.has);
  ok(1 === box.has.length);

  ok('delete' in box);
  ok('function' === typeof box.delete);
  ok(1 === box.delete.length);

  ok('destory' in box);
  ok('function' === typeof box.destory);
  ok(1 === box.destory.length);

  ok('watch' in box);
  ok('function' === typeof box.watch);
  ok(1 === box.watch.length);

  ok('watchPath' in box);
  ok('function' === typeof box.watchPath);
  ok(3 === box.watchPath.length);

  ok('watchVariable' in box);
  ok('function' === typeof box.watchVariable);
  ok(2 === box.watchVariable.length);

  ok('nodeMap' in box);
  ok('function' === typeof box.nodeMap);
  ok(2 === box.nodeMap.length);

  ok('nodeBackMap' in box);
  ok('function' === typeof box.nodeBackMap);
  ok(2 === box.nodeBackMap.length);

  ok('everyNode' in box);
  ok('function' === typeof box.everyNode);
  ok(2 === box.everyNode.length);

  return true;
})(), 'Varbox.createBox()');

ok((function() {
  var box = Varbox.createBox('firstBox');
  var boxGetAgain1 = Varbox.createBox('firstBox');

  var boxGetAgain2 = Varbox.createBox({
    BOX_NAME: 'firstBox',
  });

  for (var k in box) {
    ok(box[k] === boxGetAgain1[k]);
    ok(box[k] === boxGetAgain2[k]);

    ok(boxGetAgain1[k] === box[k]);
    ok(boxGetAgain1[k] === boxGetAgain2[k]);

    ok(boxGetAgain2[k] === box[k]);
    ok(boxGetAgain2[k] === boxGetAgain1[k]);
  }
  return true;
})(), 'Varbox.createBox() with the same box name: firstBox');

ok((function() {
  var box = Varbox.createBox('firstBox');

  var otherBox1 = Varbox.createBox('secondBox');
  var otherBox2 = Varbox.createBox({
    BOX_NAME: 'secondBoxWithJSONConfiguration',
  });
  var otherBox3 = Varbox.createBox('');
  var otherBox4 = Varbox.createBox();

  for (var k in box) {
    ok(box[k] !== otherBox1[k]);
    ok(box[k] !== otherBox2[k]);
    ok(box[k] !== otherBox3[k]);
    ok(box[k] !== otherBox4[k]);

    ok(otherBox1[k] !== box[k]);
    ok(otherBox1[k] !== otherBox2[k]);
    ok(otherBox1[k] !== otherBox3[k]);
    ok(otherBox1[k] !== otherBox4[k]);

    ok(otherBox2[k] !== box[k]);
    ok(otherBox2[k] !== otherBox1[k]);
    ok(otherBox2[k] !== otherBox3[k]);
    ok(otherBox2[k] !== otherBox4[k]);

    ok(otherBox3[k] !== box[k]);
    ok(otherBox3[k] !== otherBox1[k]);
    ok(otherBox3[k] !== otherBox2[k]);
    ok(otherBox3[k] !== otherBox4[k]);

    ok(otherBox4[k] !== box[k]);
    ok(otherBox4[k] !== otherBox1[k]);
    ok(otherBox4[k] !== otherBox2[k]);
    ok(otherBox4[k] !== otherBox3[k]);
  }
  return true;
})(), 'Varbox.createBox() with different box name');

ok((function(){
  var box = Varbox.createBox();

  var boxGetAgain1 = Varbox.createBox('');
  var boxGetAgain2 = Varbox.createBox({
    BOX_NAME: '',
  });
  var boxGetAgain3 = Varbox.createBox({});

  for (var k in box) {
    ok(box[k] !== boxGetAgain1[k]);
    ok(box[k] !== boxGetAgain2[k]);
    ok(box[k] !== boxGetAgain3[k]);

    ok(boxGetAgain1[k] !== box[k]);
    ok(boxGetAgain1[k] !== boxGetAgain2[k]);
    ok(boxGetAgain1[k] !== boxGetAgain3[k]);

    ok(boxGetAgain2[k] !== box[k]);
    ok(boxGetAgain2[k] !== boxGetAgain1[k]);
    ok(boxGetAgain2[k] !== boxGetAgain3[k]);

    ok(boxGetAgain3[k] !== box[k]);
    ok(boxGetAgain3[k] !== boxGetAgain1[k]);
    ok(boxGetAgain3[k] !== boxGetAgain2[k]);
  }
  return true;
})(), 'Varbox.createBox() with empty box name');

box.watch(function (event) {
  ok('object' === typeof event);
});

var unwatch = box.watchVariable(updateTestingKey, function (event) {
  ok('function' === typeof unwatch);
  unwatch();
  ok('object' === typeof event);
  ok('add' === event.eventType);
});

ok((function() {
  var newValue = { Tom: { age: 3 } };
  box.update(updateTestingKey, function (oldValue) {
    ok(2 === arguments.length);
    return newValue;
  })
  ok(box.get(updateTestingKey) === newValue);

  ok(box.get(updateTestingKey) !== undefined);
  ok(box.get(updateTestingKey) !== null);
  ok('object' === typeof box.get(updateTestingKey));

  ok(box.get(updateTestingKey).Tom !== undefined);
  ok(box.get(updateTestingKey).Tom !== null);
  ok('object' === typeof box.get(updateTestingKey).Tom);

  ok(box.get(updateTestingKey).Tom.age !== undefined);
  ok(box.get(updateTestingKey).Tom.age !== null);
  ok('number' === typeof box.get(updateTestingKey).Tom.age);
  ok(3 === box.get(updateTestingKey).Tom.age);

  return true;
})(), 'box.update() a new reference')

var unwatch = box.watchVariable(updateTestingKey, function (event) {
  ok('function' === typeof unwatch);
  unwatch();
  ok('object' === typeof event);
  ok('update' === event.eventType);
});


ok((function () {
  ok(box.get(updateTestingKey).Tom.age !== undefined);
  ok(box.get(updateTestingKey).Tom.age !== null);
  ok('number' === typeof box.get(updateTestingKey).Tom.age);
  ok(3 === box.get(updateTestingKey).Tom.age);

  var oldAge = box.get(updateTestingKey).Tom.age;

  box.update(updateTestingKey, function (oldValue) {
    ok(2 === arguments.length);
    oldValue.Tom.age += 1;
    return oldValue;
  })
  ok((oldAge + 1) === box.get(updateTestingKey).Tom.age);
  return true;
})(), 'box.update() the old reference');

/*
todo('box.watchPath()');
todo('box.get()');
todo('box.set()');
todo('box.merge()');
*/

console.info('All testing case passed');
