const URL = `https://v1.appbackend.io/v1/rows/CoNj3HiybKsh`

async function getData(URL) {
  try {
    const res = await fetch(URL)
    const data = await res.json()
    return data
  } catch (error) {
    console.log(error)
    return []
  }
}

async function main() {
  const kaloris = await getData(URL)

  if (kaloris.status === "error") {
    const info = document.createElement("h2")
    info.textContent = "Error fetching data"
    document.body.append(info)
    return
  }

  if (kaloris.data.length === 0) {
    const info = document.createElement("h2")
    info.textContent = "No data found"
    document.body.append(info)
    return
  }

  kaloris.data.forEach((kalori) => {
    const container = document.createElement("div")
    const titleContainer = document.createElement("h3")
    const nameContainer = document.createElement("p")

    titleContainer.textContent = kalori.title
    nameContainer.textContent = kalori.name
    container.append(titleContainer, nameContainer)
    document.body.append(container)
  })
}

main()

const nameInput = document.getElementById("name")
const kaloriInput = document.getElementById("title")
const submitButton = document.getElementById("submit")

submitButton.addEventListener("click", async () => {
  const nameValue = nameInput.value
  const titleValue = kaloriInput.value

  const res = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify([{ name: nameValue, title: titleValue }]),
  })
  const data = await res.json()
  console.log(data)

  window.location.reload()
})
