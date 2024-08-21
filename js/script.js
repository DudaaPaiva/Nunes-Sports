// Validar entradas do formulario antes de entrar os dados 
function validateForm(){
    const name = document.getElementById("name").value;
    const productCode = document.getElementById("productCode").value;
    const description = document.getElementById("description").value;
    const price = document.getElementById("price").value;
    
    if(name === ""){
        alert("Nome é obrigatório");
        return false;
    }

    if(productCode === ""){
        alert("Código do Produto é obrigatório");
        return false;
    }

    if(description === ""){
        alert("Descrição é obrigatório");
        return false;
    }

    if(price === ""){
        alert("O preço é obrigatório");
        return false;
    }
    else if(price < 1){
        alert("Preço inválido");
        return false;
    }

    return true;
}


//função para exibir os dados 
function showData(){
    let productList;
    if(localStorage.getItem("productList") == null){
        productList = [];
    }
    else {
        productList = JSON.parse(localStorage.getItem("productList"));
    }

    let html = "";

    productList.forEach(function (element, index){
        console.log(element);
        html += "<tr>";
        html += "<td>" + element.name + "</td>";
        html += "<td>" + element.productCode + "</td>";
        html += "<td>" + element.description + "</td>";
        html += "<td>" + parseFloat(element.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) + "</td>";
        html +=
         '<td><button onclick="deleteData(' + 
         index +
         ')" class="btn btn-danger">Excluir</button><button onclick="updateData(' + 
         index +
         ')" class="btn btn-warning m-2">Editar</button></td>';
        html +="</tr>";
    });

    console.log(html);
    document.querySelector("#crudTable tbody").innerHTML = html;
}

// Carrega todos os dados do Local Storage quando a página é carregada
document.onload = showData();

// Função para adicionar dados ao Local Storage

function AddData(){
    // se o formulário estiver validado
  if(validateForm() === true){
    const name = document.getElementById("name").value;
    const productCode = document.getElementById("productCode").value;
    const description = document.getElementById("description").value;
    const price = document.getElementById("price").value;

    let productList;
    if (localStorage.getItem("productList") === null){
        productList = [];
    } else {
        productList = JSON.parse(localStorage.getItem("productList"));
    }

    productList.push({
        name,
        productCode,
        description,
        price,
    });

    localStorage.setItem("productList", JSON.stringify(productList));
    showData();
    document.getElementById("name").value = "";
    document.getElementById("productCode").value = "";
    document.getElementById("description").value = "";
    document.getElementById("price").value = "";
  }
}

// function to Delete Data from Local Storage
function deleteData(index){
    if(window.confirm("Tem certeza de que deseja excluir este item")){
    var productList;
    if (localStorage.getItem("productList") == null){
        productList = [];
    }else {
        productList = JSON.parse(localStorage.getItem("productList"));
    }

    productList.splice(index, 1);
    localStorage.setItem("productList", JSON.stringify(productList));
    showData();
    }
}

//Função para editar/atualizar dados no local Storage
function updateData(index){
    // O botão 'cadastrar' será oculto e aparecerá o botão 'salvar' para atualizar os dados 
    document.getElementById("Submit").style.display = "none";
    document.getElementById("Update").style.display = "block";

    var productList;
    if (localStorage.getItem("productList") == null){
        productList = [];
    }else {
        productList = JSON.parse(localStorage.getItem("productList"));
    }

    document.getElementById("name").value = productList[index].name;
    document.getElementById("productCode").value = productList[index].productCode;
    document.getElementById("description").value = productList[index].description;
    document.getElementById("price").value = productList[index].price;

    document.querySelector("#Update").onclick = function(){
        if(validateForm() == true){
            productList[index].name = document.getElementById("name").value;
            productList[index].productCode = document.getElementById("productCode").value;
            productList[index].description = document.getElementById("description").value;
            productList[index].price = document.getElementById("price").value;

            localStorage.setItem("productList", JSON.stringify(productList));

            showData();

            document.getElementById("name").value = "";
            document.getElementById("productCode").value = "";
            document.getElementById("description").value = "";
            document.getElementById("price").value = "";

            // O botão de atualizar ficará oculto e e o botão de envio será mostrado
            document.getElementById("Submit").style.display = "block";
            document.getElementById("Update").style.display = "none";            
        }
    }
}

