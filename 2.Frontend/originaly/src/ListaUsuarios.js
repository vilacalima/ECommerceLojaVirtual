<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="ListaUsuarios.css">
</head>
<body>

<h2>PROCURAR USUÁRIOS</h2>

<label for="search">Buscar Usuário</label>
<div class="text-center">
  <a class='btn btn-search btn-xs' href="#"><img src="images/search.svg"></a>
</div>
<input type="text" id="search" placeholder="Digite o nome para buscar">

<button class="botao-adicionar" onclick="openCadastroUsuario()"> + Add Novo</button>

<table>
  <thead>
    <tr>
      <th>Alterar</th>
      <th>Nome</th>
      <th>E-mail</th>
      <th>Status</th>
      <th>Grupo</th>
      <th>Habilitar</th>
    </tr>
  </thead>

  <tbody id="userTable">
    <tr>
      <td class="text-center"><a class='btn btn-info btn-xs' href="alterarUsuario.js"><img src="images/pencil-square (1).svg"></a></td>
      <td>João</td>
      <td>joao@example.com</td>
      <td>Ativo</td>
      <td>--</td>
      <td><input type="checkbox" checked></td>
    </tr>
    <tr>
      <td class="text-center"><a class='btn btn-info btn-xs' href="alterarUsuario.js"><img src="images/pencil-square (1).svg"></a></td>
      <td>Maria</td>
      <td>maria@example.com</td>
      <td>Inativo</td>
      <td>--</td>
      <td><input type="checkbox"></td>
    </tr>
    <!-- Mais linhas de usuário podem ser adicionadas aqui -->
  </tbody>
</table>

<script>
  document.getElementById("search").addEventListener("keyup", function() {
    const input = this.value.toLowerCase();
    const tableRows = document.querySelectorAll("#userTable tr");

    tableRows.forEach(function(row) {
      const name = row.getElementsByTagName("td")[1].textContent.toLowerCase();
      if (name.includes(input)) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
  });

  function openCadastroUsuario() {
    // Lógica para abrir a página de cadastro de usuário
    // Aqui você pode usar JavaScript para redirecionar para a página correta ou realizar outras ações necessárias.
  }
</script>

</body>
</html>
