*based on https://www.hackerrank.com/challenges/cube-summation*

Developed using `node 6.0.0`. 

1. Install dependencies: `npm install`
2. Run tests: `npm test`
3. Start web server: `npm start`
4. Navigate to: `http://localhost:3000`

## Description

No persistence needed. To display results use the `TestCase#handler` function (defaults to `stdout`/`console.log`).

To start the web server use `npm start`. You might set the `PORT` envvar for the server to bind to that port (defaults to `3000`).
Then navigate to `http://localhost:PORT/index.html`. The web client uses the [Fetch API](https://developer.mozilla.org/en/docs/Web/API/Fetch_API), 
so please use a modern browser.

#### Parser 
`function (inputText)`: `Object`

Parses the input and returns the test cases and operations in a nested object.

**Example**
```javascript
const parse = require('./lib/Parser');
parse(`2
4 5
UPDATE 2 2 2 4
QUERY 1 1 1 3 3 3
UPDATE 1 1 1 23
QUERY 2 2 2 4 4 4
QUERY 1 1 1 3 3 3
2 4
UPDATE 2 2 2 1
QUERY 1 1 1 1 1 1
QUERY 1 1 1 2 2 2
QUERY 2 2 2 2 2 2`);
```

**Output**
```json
{
  "T": 2,
  "cases": [
    {
      "N": 4,
      "M": 5,
      "operations": [
        {
          "OP": "UPDATE",
          "x": 2,
          "y": 2,
          "z": 2,
          "W": 4
        },
        {
          "OP": "QUERY",
          "x": 1,
          "y": 1,
          "z": 1,
          "x2": 3,
          "y2": 3,
          "z2": 3
        },
        {
          "OP": "UPDATE",
          "x": 1,
          "y": 1,
          "z": 1,
          "W": 23
        },
        {
          "OP": "QUERY",
          "x": 2,
          "y": 2,
          "z": 2,
          "x2": 4,
          "y2": 4,
          "z2": 4
        },
        {
          "OP": "QUERY",
          "x": 1,
          "y": 1,
          "z": 1,
          "x2": 3,
          "y2": 3,
          "z2": 3
        }
      ]
    },
    {
      "N": 2,
      "M": 4,
      "operations": [
        {
          "OP": "UPDATE",
          "x": 2,
          "y": 2,
          "z": 2,
          "W": 1
        },
        {
          "OP": "QUERY",
          "x": 1,
          "y": 1,
          "z": 1,
          "x2": 1,
          "y2": 1,
          "z2": 1
        },
        {
          "OP": "QUERY",
          "x": 1,
          "y": 1,
          "z": 1,
          "x2": 2,
          "y2": 2,
          "z2": 2
        },
        {
          "OP": "QUERY",
          "x": 2,
          "y": 2,
          "z": 2,
          "x2": 2,
          "y2": 2,
          "z2": 2
        }
      ]
    }
  ]
}
```

#### TestCase

Represent a test case from the input. It encapsulates the set of operations to be executed 
on the N \* N \* N matrix. 

**#run()**: 
Runs the TestCase on a new matriz with all blocks initialized with `0`.

#### Operation

Represent a single operation to be performed on a matrix. 
This can be an `UPDATE` operations, which sets he value of the `x,y,z` block to `W`.
Or can be a `QUERY` operation, which returns the sum of the sub-blocks between `x,y,z` and `x2,y2,z2`.