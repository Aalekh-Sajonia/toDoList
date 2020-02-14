const urlPost = "https://sheltered-beach-66319.herokuapp.com/dataItems";
const urlDelData = "https://sheltered-beach-66319.herokuapp.com/deleteDataItems";
const addButton = document.querySelector("#sending-data");
const inputTask = document.querySelector("#inputTask");
const insertData = document.querySelector("#dataInsertion");
const urlGet = "https://sheltered-beach-66319.herokuapp.com/allItems";


async function getData() {
  try {
    clearHTMl();
    loader();
    const result = await fetch(urlGet, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    const resultJson = await result.json();
    clearHTMl();
    renderList(resultJson);
    // loader();
    console.log(resultJson);
  } catch (err) {
    console.log(err);
  }
}

function clearHTMl() {
  insertData.innerHTML = '';
}

function clearInput() {
  inputTask.value = '';
}

function loader() {
  const text = `<div style="text-align: center; padding: 30px; color:#6c567b">
    <div class="spinner-border" style="width: 10rem; height: 10rem;" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>`;
  insertData.insertAdjacentHTML('beforeend', text);
}

function renderList(items) {
  items.forEach((item) => {
    const text = `<div class="item">
      <input onclick="deleteFun(id)" type="checkbox" name="checkBox" id="${item._id}">
      <p>
        ${item.name}
      </p>
    </div>`;
    insertData.insertAdjacentHTML('beforeend', text);
  })
};


addButton.addEventListener('click', () => {
  const getTask = inputTask.value;
  clearInput();
  const data = {
    newItem: getTask,
    list: "Today"
  };
  if (getTask !== "") {
    postData(data);
  }
});

function deleteFun(item) {
  if (document.getElementById(item).checked) {
    const data1 = {
      checkBox: item,
      listName: "Today"
    };
    postDeleteData(data1);
  }
}

async function postDeleteData(data1) {
  try {
    const response = await fetch(urlDelData, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data1)
    });
    getData();
    console.log("deleted");
  } catch (err) {
    console.log(err);
  }
}

// console.log("hellow");

async function postData(data) {
  try {

    const response = await fetch(urlPost, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    getData();
    console.log("SuccessHere");
  } catch (err) {
    console.log(err);
  }
};

getData();
