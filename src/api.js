const url = "https://torre.co/api";

function getOportunity(id) {
  return fetch(`${url}/opportunities/${id}`)
    .then(res => res.json())
}

function getBio() {
    return fetch(`https://bio.torre.co/api/bios/yurylcg`)
    .then(response => response.text())
    .then(contents => console.log(contents))
    .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
  }

export default {
  getOportunity,
  getBio
};
