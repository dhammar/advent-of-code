enum OpCode {
  ADD = 1,
  MULTIPLY = 2,
  HALT = 99
}

const runIntcode = (program: number[]) => {
  let opCodeIndex = 0;
  let opCode = program[opCodeIndex];
  while(opCode !== OpCode.HALT) {
    // console.log('opCode: ' + opCode);
    const leftArg = program[program[opCodeIndex + 1]];
    const rightArg = program[program[opCodeIndex + 2]];
    const targetIndex  = program[opCodeIndex + 3];

    program[targetIndex] = opCode === OpCode.ADD ? leftArg + rightArg : leftArg * rightArg;
    opCodeIndex += 4;
    opCode = program[opCodeIndex];
  }
  return program[0];
}

const findInputsToProgramWithTargetOutput = (target: number, program: number[]) => {
  let result = -1;
  let noun = 0;
  let verb = 0;
  
  while(result !== target) {
    const programClone = [...program];
    programClone[1] = noun;  
    programClone[2] = verb;

    result = runIntcode(programClone);
    if(result !== target) {
      if(noun < 99) {
        //since the order of noun and verb do not matter when the operations are only add/multiply, previously "visited" values can be ignored for optimization, so this is not the most efficient solution
        noun++;
      }
      else if (noun === 99 && verb < 99) {
        noun = 0;
        verb++;
      }
      else {
        throw new Error('max input reached');
      }
    }
  }
  return [noun, verb];
}


// 1,0,0,0,99 becomes 2,0,0,0,99 (1 + 1 = 2).
// 2,3,0,3,99 becomes 2,3,0,6,99 (3 * 2 = 6).
// 2,4,4,5,99,0 becomes 2,4,4,5,99,9801 (99 * 99 = 9801).
// 1,1,1,4,99,5,6,0,99 becomes 30,1,1,4,2,5,6,0,99.

// console.log(runIntcode([1, 0, 0, 0, 99]));
// console.log(runIntcode([2, 3, 0, 3, 99]));
// console.log(runIntcode([2, 4, 4, 5, 99, 0]));
// console.log(runIntcode([1, 1, 1, 4, 99, 5, 6, 0, 99]));

console.log(findInputsToProgramWithTargetOutput(19690720, [1,12,2,3,1,1,2,3,1,3,4,3,1,5,0,3,2,1,9,19,1,19,5,23,1,13,23,27,1,27,6,31,2,31,6,35,2,6,35,39,1,39,5,43,1,13,43,47,1,6,47,51,2,13,51,55,1,10,55,59,1,59,5,63,1,10,63,67,1,67,5,71,1,71,10,75,1,9,75,79,2,13,79,83,1,9,83,87,2,87,13,91,1,10,91,95,1,95,9,99,1,13,99,103,2,103,13,107,1,107,10,111,2,10,111,115,1,115,9,119,2,119,6,123,1,5,123,127,1,5,127,131,1,10,131,135,1,135,6,139,1,10,139,143,1,143,6,147,2,147,13,151,1,5,151,155,1,155,5,159,1,159,2,163,1,163,9,0,99,2,14,0,0]));