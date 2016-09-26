# TOPO

a topo module powered by jtopo.

# Data structure

```javascript
Nodes = {
  "ip": String,
  "type": String,
  "firms": String,
  "series-name": String,
  "version": String,
  "area": String,
  "child-name": String,
  "important": String,
  "description": String,
  //Prop
  "x":Float,
  "y":Float,
  "img":String,
  "name":String,
  "_id":String
}

containers = {
  "SAL":String,
  "description":String,
  "important":String,
  "person":String,
  "phone":String,
  //Prop
  "x":Float,
  "y":Float,
  "height":Float,
  "width":Float,
  "_id":String,
  "name":String
}

Links = {
  "nodeA_id":String,
  "nodeZ_id":String
}
```
