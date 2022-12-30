const html_forms = document.querySelector("form");
const inputs = document.querySelectorAll("input");
const select = document.querySelector("#usuario");


async function actualizarValores() {
  const response = await fetch(`http://127.0.0.1:8000/api2/${getID('id')}/`);
  const data = await response.json()

  inputs.forEach((input) => {
    const valor = data[input.name]
    input.value = valor
  });
}

html_forms.onsubmit = async function (event) {
  event.preventDefault();

  const body = {
    usuario: select.value,
  };

  inputs.forEach((input) => {
    body[input.name] = input.value;
  });

  const body_json = JSON.stringify(body);
  try {
    const options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: body_json,
    };

    const url = `http://127.0.0.1:8000/api2/${getID("id")}/`;
    const response = await fetch(`http://127.0.0.1:8000/api2/${getID("id")}/`, options);

    if (response.ok) {
      console.log("Success");
    } else {
      console.log("Error");
    }
  } catch (error) {
    console.log("Error");
  }
};


function getID(pm_field) {
  const params = new URLSearchParams(window.location.search);
  return params.get(pm_field);
}


actualizarValores()
