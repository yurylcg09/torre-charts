//const url = "https://torre.co/api";

function getTestData() {
  // Simple POST request with a JSON body using fetch
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: "Vue POST Request Example" })
  };
  fetch(
    "https://search.torre.co/opportunities/_search/?offset=0&size=10&aggregate=true",
    requestOptions
  )
    //.then(res => res.json())
    //.then(res => res.aggregators.aggregators)
    .then(response => response.json());
  //.then(data => console.log(data));
}

export default {
  getTestData
};
