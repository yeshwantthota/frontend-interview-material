// Input:
const obj = {
  a: 1,
  b: {
    c: "Hello World",
    d: 2,
    e: {
     f: {
      g: -4,
      },
    },
    h: "Good Night Moon",
  },
};

const filter = (s) => typeof s === "string";

// Output:
// {
//   b: {
//     c: "Hello World",
//     h: "Good Night Moon",
//   }
// };

function filterObject (ob, fn) {
    let tempObj = {};
    
    
        Object.keys(ob).forEach((k) => {
        if(typeof(ob[k]) !== 'object'){
            if(fn(ob[k])){
                tempObj[k] = ob[k];
            }
        }
        else{
            const tmp = filterObject(ob[k], fn)
            if(tmp) tempObj[k] = tmp;
        }
    })

    if(Object.keys(tempObj).length === 0) return;
    return tempObj;
}


const output = filterObject(obj, filter, {});
console.log("output==>", output)