// write code here
async function main() {
  const main = document.getElementById("main");
  main.style.display = "none";
  let count = 0;
  const table = document.getElementById("t1").getElementsByTagName("tbody")[0];
  for (const jsonfile of [
    "json/lab1to10.html",
    "json/lab11to20.html",
    "json/lab21to30.html",
  ]) {
    const response = await fetch(jsonfile);
    if (!response.ok) {
      throw new Error("HTTP Error:", response.statusText);
    }
    const topics = await response.json();
    for (let i = 0; i < topics.length; i++) {
      const data = `<th scope="row">${count + 1}</th>
                      <th scope="row">${topics[i].topicGroup}</th>
                        <td>${topics[i].topicName}</td>
                        <td>${topics[i].topicFocus}</td>
                        <td>${topics[i].topicDescription}</td>`;

      let row = table.insertRow(-1);
      row.setAttribute("data-bs-toggle", "collapse");
      row.setAttribute("data-bs-target", `#accordion${count}`);
      row.setAttribute("class", "clickable cursor-pointer");
      // row.addEventListener("click", (e) => {
      //   console.log("clicked!");
      //   console.log(
      //     document.querySelector(e.currentTarget.getAttribute("data-bs-target"))
      //   );
      //   let tdelem = document.querySelector(
      //     e.currentTarget.getAttribute("data-bs-target")
      //   );
      //   if (tdelem.style.display == "none") {
      //     tdelem.style.display = "initial";
      //     console.log("if clicked");
      //   } else {
      //     console.log("else clicked");
      //     setTimeout(() => {
      //       tdelem.style.display = "none";
      //     }, 300);
      //   }
      // });
      row.innerHTML = data;

      let subRow = table.insertRow(-1);
      subRow.innerHTML = subtopicGenerator(topics[i].subtopics, `${count}`);
      count++;
    }
  }

  // end code here

  document.getElementById("temp").style.display = "none";
  main.style.display = "block";
}


function subtopicGenerator(subtopics, id) {
  let rows = "";
  let num = 0;
  for (const subtopic of subtopics) {
    rows += `<tr>
    <th scope="row">${num + 1}</th>
                      <td>${subtopic.name}</td>
                      <td>${subtopic.difficulty}</td>
                      <td>
                        ${subtopic.description}
                      </td>
                    </tr>`;
    num++;
  }
  return `<div class="container">
            <td colspan="5">
              <div id=accordion${id} class="collapse">
                <table class="table table-sm">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Subtopic</th>
                      <th scope="col">Difficulty</th>
                      <th scope="col">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${rows}
                  </tbody>
                </table>
              </div>
            </td>
          </div>`;
}
main();
