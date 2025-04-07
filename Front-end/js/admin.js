async function onLoadPage() {
  /* Acessando o conteudo da rota admin */
  //TODO: refatorar para deixar uma unica funcao de fetch
  const reply = await fetch("http://localhost:8080/auth/admin", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + window.localStorage.getItem("token"),
    },
  });

  const data = await reply.json();

  console.log(data);
  if (reply.status != 200)
    document.querySelector("h1").innerHTML = "Access Denied!";
  else document.querySelector("h1").innerHTML = data;
}
