# JavaScript Full Mastery — Solutions & Notes 📘

**Contains:** solutions, explanations, pitfalls and variant answers for the Full Mastery Tracker (25 main problems + variants).  
Use this as a reference while practicing — try to solve on your own first, then read the solution.  

---

## 1. Hoisting Surprise
**Concepts:** Hoisting, var/let/const, Temporal Dead Zone (TDZ)  
**Difficulty:** Easy

**Explanation (short):**  
Declarations are processed before execution. `var` declarations are hoisted and initialized with `undefined`. `let`/`const` are hoisted but uninitialized — accessing them before declaration throws a ReferenceError (TDZ). Function declarations are hoisted with their body.

### Main
```js
console.log(a); // undefined
var a = 10;
```
**Why:** `var a` is hoisted; assignment stays after log.

**Pitfalls:** `let/const` throw ReferenceError if accessed before declaration.

### Variant 1
```js
console.log(a); // ReferenceError
let a = 5;
```
**Why:** TDZ for `let`.

### Variant 2
```js
test(); // "Hello"
function test(){ console.log("Hello"); }
```
**Why:** Function declarations hoisted with body.

### Variant 3
```js
console.log(b); // ReferenceError
const b = 10;
```
**Why:** TDZ for `const`.

---

## 2. Closure Counter
**Concepts:** Closures, lexical scope, encapsulation  
**Difficulty:** Easy–Medium

**Explanation:** Closures capture variables from outer scope allowing persistent private state.

### Main - basic counter
```js
function createCounter() {
  let count = 0;
  return function() {
    count++;
    return count;
  };
}
const c = createCounter();
c(); //1
c(); //2
```
**Why:** Inner function closes over `count`.

**Pitfalls:** Using a global `count` will share state across instances.

### Variant 1 - decrement
```js
function createCounter() {
  let count = 0;
  return {
    inc: () => ++count,
    dec: () => --count,
    get: () => count
  };
}
```

### Variant 2 - reset
Add `reset: () => count = 0`.

### Variant 3 - multiple independent
Each `createCounter()` call returns new closure with its own `count`.

---

## 3. Once Function
**Concepts:** Closures, caching, preserving `this`  
**Difficulty:** Medium

**Explanation:** Wrap a function, track if it executed, cache result, preserve `this` & args.

### Main
```js
function once(fn) {
  let called = false;
  let res;
  return function(...args) {
    if (!called) {
      res = fn.apply(this, args);
      called = true;
    }
    return res;
  };
}
```
**Pitfalls:** Not preserving `this` or args; handling async functions (returning a promise) requires awaiting and caching promise.

### Variant 1 - async-safe
```js
function once(fn) {
     let result;
     let isProgress = null;
    return function () {
        
        
        if(result){
            return Promise.resolve(result);
        }
        if(isProgress){
            return isProgress;
        }
        
        isProgress =  new Promise(function(resolve, reject) {
          fn().then((val) => {
              result = val;
              isProgress = null;
              resolve(val);
          })
          .catch((err) => {
              isProgress = null;
              throw err;
          })
            
        })
        
        return isProgress;
    }
```

### Variant 2 - reset after N calls
```js
function once (fn, limit) {
    let result;
   
    return function (args) {
        if(limit > 0){
            result = fn(args);
             --limit;
            return result;
           
        }
    }
}
```

### Variant 3 - retry on failure
If `fn` throws, reset `called` so next call retries:
```js
function onceRetry(fn) {
  let called = false;
  let res;
  return function(...args) {
    if (!called) {
      try {
        res = fn.apply(this, args);
        called = true;
      } catch (e) {
        throw e;
      }
    }
    return res;
  };
}
```
(For async, handle promise rejection to reset `called`.)

---

## 4. Private Variables
**Concepts:** Closures, WeakMap, private class fields (`#`)  
**Difficulty:** Medium

**Explanation:** Use closure or WeakMap (for classes) to store private state inaccessible from outside.

### Variant A - closure/factory
```js
function createAccount(initial) {
  let balance = initial;
  return {
    deposit: (v) => balance += v,
    withdraw: (v) => balance -= v,
    getBalance: () => balance
  };
}
```

### Variant B - WeakMap with class
```js
const _balance = new WeakMap();
class Bank {
  constructor(initial){
    _balance.set(this, initial);
  }
  deposit(v){ _balance.set(this, _balance.get(this)+v); }
  getBalance(){ return _balance.get(this); }
}
```

### Variant C - private class fields (modern)
```js
class Bank {
  #balance;
  constructor(v){ this.#balance = v; }
  deposit(v){ this.#balance += v; }
  getBalance(){ return this.#balance; }
}
```

**Pitfalls:** Using `_` prefix is only convention (not real privacy).

---

## 5. Lost Context
**Concepts:** `this` behavior, call-site, bind/call/apply, arrow functions  
**Difficulty:** Medium

**Explanation:** `this` is determined by how a function is called. Extracting a method loses its object binding.

### Main - example
```js
const obj = { name: 'x', greet(){ console.log(this.name); } };
const fn = obj.greet;
fn(); // undefined (or window.name) 
```
**Fixes:** `fn.bind(obj)`, call as `obj.greet()` or use arrow when appropriate.

### Variant 1 - event listeners
Use `.bind(this)` in constructor or arrow to preserve context.

### Variant 2 - setTimeout and arrow
```js
const obj = {
  name: 'x',
  greet() { setTimeout(() => console.log(this.name), 0); }
};
obj.greet(); // 'x' because arrow inherits `this` from greet
```

### Variant 3 - binding in constructor
```js
class A {
  constructor(){ this.method = this.method.bind(this); }
  method(){ console.log(this); }
}
```

**Pitfalls:** Over-binding methods may cause issues when subclassing or with decorators.

---

## 6. Debounce Function
**Concepts:** Closures, timers, event handling  
**Difficulty:** Medium

**Explanation:** Debounce delays function execution until after `delay` since last call.

### Basic debounce
```js
function debounce(fn, delay = 300) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}
```

**Variants Quick:**
- Immediate invoke option: run on leading edge by checking `!timer` and optionally clearing.
- Cancel method: return object with `cancel()` to clear timer.
- Leading & trailing: track flags to run at start and end.

**Pitfalls:** Not clearing timer causes memory leak; not preserving `this` context.

---

## 7. Throttle Function
**Concepts:** Timers, rate-limiting, performance  
**Difficulty:** Medium

**Simple throttle (timestamp)**
```js
function throttle(fn, limit = 200) {
  let last = 0;
  return function(...args) {
    const now = Date.now();
    if (now - last >= limit) {
      last = now;
      fn.apply(this, args);
    }
  };
}
```
**Variants:** leading/trailing, using timers instead of timestamps, returning last result, throttling promises.

**Pitfalls:** Incorrect leading/trailing handling causing missed calls.

---

## 8. Deep Clone
**Concepts:** Recursion, handling built-in types, circular refs  
**Difficulty:** Medium–Hard

**Simple deep clone (no circular)**
```js
function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  if (Array.isArray(obj)) return obj.map(deepClone);
  const res = {};
  for (const k in obj) {
    if (obj.hasOwnProperty(k)) res[k] = deepClone(obj[k]);
  }
  return res;
}
```

**Variant - circular refs:** use WeakMap to track seen objects
```js
function deepCloneCircular(obj, seen = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (seen.has(obj)) return seen.get(obj);
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  const copy = Array.isArray(obj) ? [] : {};
  seen.set(obj, copy);
  for (const k in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, k)) {
      copy[k] = deepCloneCircular(obj[k], seen);
    }
  }
  return copy;
}
```

**Pitfalls:** Not handling Maps/Sets/functions/prototype chain.

---

## 9. Array Flatten
**Concepts:** Recursion, iterative approaches  
**Difficulty:** Medium

### Recursive flatten
```js
function flatten(arr) {
  return arr.reduce((acc, val) => 
    acc.concat(Array.isArray(val) ? flatten(val) : val), []
  , []);
}
```

**Variants:** depth-limited flatten (track current depth), iterative stack-based flatten.

**Pitfalls:** Performance with concat for huge arrays; use loops/push for better performance.

---

## 10. Promise.all (polyfill)
**Concepts:** Promises, async control flow, ordering  
**Difficulty:** Medium–Hard

### Simple polyfill
```js
function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    if (!promises || promises.length === 0) return resolve([]);
    const results = [];
    let completed = 0;
    promises.forEach((p, i) => {
      Promise.resolve(p).then(val => {
        results[i] = val;
        completed++;
        if (completed === promises.length) resolve(results);
      }).catch(reject);
    });
  });
}
```

**Variants:** allSettled (collect states), race (resolve on first), any (first fulfilled, reject if all reject).

**Pitfalls:** Not preserving order — must index results. Not wrapping non-promises with `Promise.resolve`.

---

## 11. EventEmitter
**Concepts:** Pub/Sub, memory leaks, once, remove listener  
**Difficulty:** Medium–Hard

### Basic EventEmitter
```js
class EventEmitter {
  constructor(){ this.events = {}; }
  on(evt, fn) {
    (this.events[evt] ||= []).push(fn);
  }
  emit(evt, ...args) {
    (this.events[evt] || []).slice().forEach(fn => fn(...args));
  }
  off(evt, fn) {
    this.events[evt] = (this.events[evt] || []).filter(f => f !== fn);
  }
  once(evt, fn) {
    const wrapper = (...args) => { fn(...args); this.off(evt, wrapper); };
    this.on(evt, wrapper);
  }
}
```

**Variants:** wildcard events, listener limits, async handlers (await results, return Promise.all of handlers).

**Pitfalls:** Not cloning listener array before emitting (mutations during emit), memory leak by never removing listeners.

---

## 12. Currying Function
**Concepts:** Functional programming, closures, toString/valueOf tricks  
**Difficulty:** Medium

### Curry any function
```js
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) return fn.apply(this, args);
    return (...more) => curried.apply(this, args.concat(more));
  };
}
```

### Infinite currying (sum example)
```js
function add(a) {
  const fn = b => add(a + b);
  fn.valueOf = () => a;
  return fn;
}
add(1)(2)(3) + 0; // 6
```

**Pitfalls:** Relying on implicit coercion can be confusing; prefer explicit `.value()` or terminating call.

---

## 13. Memoization
**Concepts:** Caching, closures, keying arguments  
**Difficulty:** Medium

### Basic memoize (single arg)
```js
function memoize(fn) {
  const cache = new Map();
  return function(arg) {
    if (cache.has(arg)) return cache.get(arg);
    const res = fn(arg);
    cache.set(arg, res);
    return res;
  };
}
```

### Multiple args & async
Use a serialized key (JSON.stringify) or nested Maps. For async, cache the promise.

**Pitfalls:** Using JSON.stringify for non-primitive args may be slow and incorrect for circular refs.

---

## 14. Call/Apply/Bind Polyfill
**Concepts:** `this` manipulation, prototypes, arguments handling  
**Difficulty:** Medium–Hard

### call
```js
Function.prototype.myCall = function(ctx, ...args) {
  ctx = ctx || globalThis;
  const fnSym = Symbol();
  ctx[fnSym] = this;
  const res = ctx[fnSym](...args);
  delete ctx[fnSym];
  return res;
};
```

### apply
Similar, accept `argsArray`.

### bind
```js
Function.prototype.myBind = function(ctx, ...boundArgs) {
  const fn = this;
  return function(...args) {
    return fn.apply(ctx, boundArgs.concat(args));
  };
};
```

**Pitfalls:** Handling used as constructor with `new` requires extra logic (preserve prototype chain).

---

## 15. Async/Await Sequential Execution
**Concepts:** Promise sequencing, concurrency limit  
**Difficulty:** Medium

### Run sequentially (array of functions returning promises)
```js
async function runSequential(tasks) {
  const results = [];
  for (const task of tasks) {
    results.push(await task());
  }
  return results;
}
```

### Concurrency limit
Use pool pattern: launch up to `n` tasks, await Promise.race, enqueue next.

**Pitfalls:** Using `forEach` with async/await doesn't await properly.

---

## 16. Infinite Scroll Loader
**Concepts:** DOM, IntersectionObserver, canceling requests  
**Difficulty:** Medium

### IntersectionObserver approach
Use sentinel element at list end and observe it; when visible, fetch next page. Use AbortController to cancel previous fetches when needed.

**Pitfalls:** Not unobserving sentinel or not handling end-of-data states.

---

## 17. Custom New Operator
**Concepts:** `new` semantics, constructor return handling, prototype chain  
**Difficulty:** Medium–Hard

### Implementation
```js
function myNew(Constructor, ...args) {
  const obj = Object.create(Constructor.prototype);
  const res = Constructor.apply(obj, args);
  return (res !== null && (typeof res === 'object' || typeof res === 'function')) ? res : obj;
}
```

**Pitfalls:** Forgetting to set prototype; handling constructors returning objects.

---

## 18. JSON.stringify Polyfill (basic)
**Concepts:** Recursion, type checking, quoting strings  
**Difficulty:** Hard

### Notes
Implementing full `JSON.stringify` is long. Key points:
- Handle primitives, strings (escape), null, arrays, objects.
- Skip functions & undefined in objects; in arrays replace with null.
- Detect circular refs and throw.

**Pitfalls:** Proper escaping and performance.

---

## 19. Custom Instanceof
**Concepts:** Prototype chain traversal  
**Difficulty:** Medium

### Implementation
```js
function myInstanceof(obj, constructor) {
  if (obj == null) return false;
  let proto = Object.getPrototypeOf(obj);
  const prototype = constructor.prototype;
  while (proto) {
    if (proto === prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
  return false;
}
```

**Pitfalls:** Using `__proto__` directly is outdated; check null handling.

---

## 20. Task Scheduler
**Concepts:** Queues, timers, concurrency control  
**Difficulty:** Medium–Hard

### Simple scheduler outline
Implement class with queue, `schedule(task, delay)`, process items with setTimeout; implement pause/resume by stopping processing.

**Pitfalls:** Managing concurrency and cancellation correctly.

---

## 21. Polyfill Array Methods
**Concepts:** Prototypes, proper callback invocation  
**Difficulty:** Medium

### map polyfill
```js
Array.prototype.myMap = function(cb, thisArg) {
  if (typeof cb !== 'function') throw new TypeError(cb + ' is not function');
  const res = [];
  for (let i = 0; i < this.length; i++) {
    if (i in this) res[i] = cb.call(thisArg, this[i], i, this);
  }
  return res;
};
```

**Pitfalls:** Respecting holes in arrays, passing proper args to callback.

---

## 22. LRU Cache
**Concepts:** Map + Doubly linked list (or use Map insertion order)  
**Difficulty:** Hard

### Using Map (simple)
```js
class LRU {
  constructor(limit=10) { this.limit = limit; this.map = new Map(); }
  get(key) {
    if (!this.map.has(key)) return -1;
    const val = this.map.get(key);
    this.map.delete(key);
    this.map.set(key, val); // move to end (most recent)
    return val;
  }
  put(key, val) {
    if (this.map.has(key)) this.map.delete(key);
    this.map.set(key, val);
    if (this.map.size > this.limit) {
      const firstKey = this.map.keys().next().value;
      this.map.delete(firstKey);
    }
  }
}
```

**Pitfalls:** Map insertion order semantics are key; for strict O(1) deletes and updates, combine Map + linked list.

---

## 23. Debounced Search
**Concepts:** Debounce, fetch cancellation, UX considerations  
**Difficulty:** Medium

### Implementation notes
Use debounce for input handler; on each fetch create AbortController and store latest controller to abort previous fetch when new input arrives.

**Pitfalls:** Not aborting previous requests causing race conditions (out-of-order responses).

---

## 24. Lazy Loading Images
**Concepts:** IntersectionObserver, placeholder handling  
**Difficulty:** Easy–Medium

### Implementation
Observe images with `data-src`, on intersection set `src` and unobserve. Add fade-in with CSS on `load` event.

**Pitfalls:** Fallback for older browsers; handling responsive `srcset`.

---

## 25. Chained Promises
**Concepts:** Promise chaining, error propagation  
**Difficulty:** Medium

### Main - simple chain
```js
doSomething()
  .then(r => doNext(r))
  .then(r => doMore(r))
  .catch(err => handle(err));
```

### Variants
- Stop chain on error by throwing or returning rejected promise.
- Parallel + sequential mix by using `Promise.all` for parallel parts.

**Pitfalls:** Forgetting to return promise inside `.then` leads to unexpected flows.

---

# Final Notes, Tips & Pitfalls (Condensed)

- **Always explain time/space complexity** for implementation-style problems.
- **Preserve `this`** where required (`apply`/`call`/`bind`) and ensure polyfills mimic spec behavior.
- **Edge cases:** null/undefined, sparse arrays, circular refs, huge recursion depth, promise rejection handling.
- **Debugging strategies:** console.log, drawing call stack, stepping through event loop microtask vs macrotask.
- **Practice:** Re-implement variants without looking, explain to a peer (Feynman technique).

---

Happy practicing — if you want, I can:
- Split this into individual `.md` files per question,
- Or generate a downloadable `js_full_solutions.md` file for your repo.

Which would you prefer?
