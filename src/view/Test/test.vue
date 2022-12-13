<script lang="ts" setup>
// const result = addUserAge(1, (result1: number) => {
//   const age1 = result1;
//   console.log("age1", age1);
//   addUserAge(age1, (result2: number) => {
//     const age2 = result2;
//     console.log("age2", age2);
//     addUserAge(age2, (result3: number) => {
//       const age3 = result3;
//       console.log("age3", age3);
//       addUserAge(age3, (result4: number) => {
//         const age4 = result4;
//         console.log("age4", age4);
//         addUserAge(age4, (result5: number) => {
//           const age5 = result5;
//           console.log("age5", age5);
//           addUserAge(age5, (result6: number) => {
//             const age6 = result6;
//             console.log("age6", age6);
//             console.log("后面的逻辑代码");
//           });
//         });
//       });
//     });
//   });
// });
function addUserAge(age: number, callBackFn: Function) {
  setTimeout(() => {
    const result = age + 1;
    return result;
  }, 1000);
}

function addUserAge1(age: number): Promise<number> {
  const data = new Promise((resolve, reject) => {
    setTimeout(() => {
      const result = age + 1;
      resolve(result);
    }, 1000);
  });
  return data as Promise<number>;
}

const data = addUserAge1(1);

data
  .then((result1) => {
    const age1 = result1;
    console.log("age1", result1);
    return addUserAge1(age1);
  })
  .then((result2) => {
    const age2 = result2;
    console.log("age2", age2);
    return addUserAge1(age2);
  })
  .then((result3) => {
    const age3 = result3;
    console.log("age3", age3);
    return addUserAge1(age3);
  })
  .then((result4) => {
    const age4 = result4;
    console.log("age3", age4);
    return addUserAge1(age4);
  })
  .then((result5) => {
    const age5 = result5;
    console.log("age3", age5);
    return addUserAge1(age5);
  });

  
</script>
<template>
  <div>{{}}</div>
</template>
