export const postFetchProduct = async (URL, init) => {
  await fetch(URL, init).then(r=>{
    r.json().then(r=>{
      console.log(r);
      return r
    })
  });
}

export const postFetchProductPromise = (URL, init) => new Promise((resolve, reject) => {
  fetch(URL, init).then(r=>{
      r.json().then(r=>{
      console.log(r);
      resolve(r);
    })
  });
})


