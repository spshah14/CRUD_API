let myName = document.getElementById("name");
let myEmail = document.getElementById("email");
let myPhone = document.getElementById("phone");
let dataHtml = "";
let index;
var selectedRow = null

let tbody = document.getElementById("tbody");
window.addEventListener("load", () => {
  fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      // var dataHtml = "";
      data.forEach((element) => {

        // console.log(element);
        // console.log(element["id"])
        let datas = `
        <tr>
          <td scope="row"> ${element.id} </td>
          <td>${element.name}</td>
          <td>${element.email}</td>
          <td>${element.phone}</td>
          <td>
          <button type="button" id="update" class=" mx-3 btn btn-warning" onclick="onEdit(this)"><i id="edit" class="fa-solid fa-user-pen mx-2"></i></button>
          <button type="button" id="delete" class=" mx-3 btn btn-danger" onclick="deleteUser(this)"><i id="delete" class="fa-solid fa-trash mx-2"></i></button>
          </td>
        </tr>`
        // console.log(datas)
        index = `${element.id}`
        dataHtml += datas;
      });
      // console.log(dataHtml)
      tbody.innerHTML = dataHtml;
    });
});

document.getElementById("add").addEventListener("click", (e) => {
  fetch('https://jsonplaceholder.typicode.com/users', {
    method: 'POST',
    body: JSON.stringify({
      name: myName.value,
      email: myEmail.value,
      phone: myPhone.value,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      index++;
      let datas = `
        <tr>
          <td scope="row"> ${index} </td>
          <td>${data.name}</td>
          <td>${data.email}</td>
          <td>${data.phone}</td>
          <td>
            <button type="button" id="update" class=" mx-3 btn btn-warning" onclick="onEdit(this)"><i id="edit" class="fa-solid fa-user-pen mx-2"></i></button>
          <button type="button" id="delete" class=" mx-3 btn btn-danger" onclick="deleteUser(this)"><i id="delete" class="fa-solid fa-trash mx-2"></i></button>
          </td>
        </tr>`
      // dataHtml += datas;

      tbody.innerHTML = dataHtml += datas;
    });
})

function onEdit(td) {
  selectedRow = td.parentElement.parentElement;
  // document.getElementById("fullName").value = selectedRow.cells[0].innerHTML;
  myName.value = selectedRow.cells[1].innerHTML;
  myEmail.value = selectedRow.cells[2].innerHTML;
  myPhone.value = selectedRow.cells[3].innerHTML;
}

function updateRecord() {
  // selectedRow.cells[0].innerHTML = formData.fullName;
  selectedRow.cells[1].innerHTML = myName.value;
  selectedRow.cells[2].innerHTML = myEmail.value;
  selectedRow.cells[3].innerHTML = myPhone.value;
}

document.getElementById("update").addEventListener("click", () => {
  console.log("Edit")
  fetch(`https://jsonplaceholder.typicode.com/users/1`, {
    method: 'PUT',
    body: JSON.stringify({
      name: myName.value,
      email: myEmail.value,
      phone: myPhone.value,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      updateRecord();
    });
})


const deleteUser = (td) => {
  fetch(`https://jsonplaceholder.typicode.com/users/1`, {
    method: 'DELETE',
  }).then((response) => response.json())
    .then((data) => {
      console.log(data)
      onDelete(td);
    });;
}

function onDelete(td) {
  if (confirm('Are you sure to delete this record ?')) {
    row = td.parentElement.parentElement;
    document.getElementById("tbody").deleteRow(row.rowIndex - 1);
    resetForm();
  }
}

function resetForm() {
  // document.getElementById("fullName").value = "";
  myName.value = "";
  myEmail.value = "";
  myPhone.value = "";
  selectedRow = null;
}