var contadorID = null;
$(document).ready(function () {
  atualizaHome(false);

  $("#btn_filtro_home").click(() => {
    atualizaHome(false);
  });

  $("#btn_atualiza").click(() => {
    atualizaHome(true);
  });
});

function startCountdown(t) {
  var auxt = t;
  contadorID = setInterval(function () {
    t--;
    $("#contador_atualiza").text(t + "s");
    if (t == 0) {
      t = 30;
      $("#contador_atualiza").text(t + "s");
      atualizaHome(false);
    }
  }, 1000);

  return contadorID;
}

function chamaModal(event) {
  competenciaHome = $("#dataIdFiltroHome").val();

  if (event.id == "aguardando_aprovacao_dashboard") {
    $("#bell_aguardando_aprovacao_dashboard").css({ display: "none" });
    atualizaTableHome(competenciaHome, "AGUARDANDOAPROVACAO");
    $("#title_Model_Home").text("Ordens de Serviço Aguardando Aprovação");
  } else if (event.id == "finalizadas_dashboard") {
    $("#bell_finalizadas_dashboard").css({ display: "none" });
    $("#title_Model_Home").text("Ordens de Serviço Finalizadas");
    atualizaTableHome(competenciaHome, "FINALIZADA");
  } else if (event.id == "aguardando_atendimento_dashboard") {
    $("#bell_aguardando_atendimento_dashboard").css({ display: "none" });
    $("#title_Model_Home").text("Ordens de Serviço Aguardando Atendimento");
    atualizaTableHome(competenciaHome, "EMABERTO");
  } else if (event.id == "aguardando_pagamento_dashboard") {
    $("#bell_aguardando_pagamento_dashboard").css({ display: "none" });
    $("#title_Model_Home").text("Ordens de Serviço Aguardando pagamento");
    atualizaTableHome(competenciaHome, "AGUARDANDOPAGAMENTO");
  } else if (event.id == "aceita_dashboard") {
    $("#bell_aceita_dashboard").css({ display: "none" });
    $("#title_Model_Home").text("Ordens de Serviço Aceitas");
    atualizaTableHome(competenciaHome, "ACEITA");
  } else if (event.id == "aprovadas_dashboard") {
    $("#bell_aprovadas_dashboard").css({ display: "none" });
    $("#title_Model_Home").text("Ordens de Serviço Aprovadas");
    atualizaTableHome(competenciaHome, "APROVADA");
  } else if (event.id == "ematendimento_dashboard") {
    $("#bell_ematendimento_dashboard").css({ display: "none" });
    $("#title_Model_Home").text("Ordens de Serviço Em Atendimento");
    atualizaTableHome(competenciaHome, "EMATENDIMENTO");
  } else if (event.id == "canceladas_dashboard") {
    $("#bell_canceladas_dashboard").css({ display: "none" });
    $("#title_Model_Home").text("Ordens de Serviço Canceladas");
    atualizaTableHome(competenciaHome, "CANCELADO");
  }

  $("#modal_dashboard").modal("show");
}

function atualizaTableHome(competencia, status) {
  entry = {
    competencia: competencia,
    status: status,
  };

  var nomeBtn = "";

  if (status === "EMABERTO") {
    nomeBtn = "Aceitar";
  } else if (status === "ACEITA") {
    nomeBtn = "Registrar Orçamento";
  } else {
    nomeBtn = "Visualizar";
  }

  Envia(entry, "/OrdemDeServico/Home/BuscaOS", "POST").then((dados) => {
    $("#tbodyBuscaDadosHome tr").remove();
    $(dados).each(function () {
      $("#tbodyBuscaDadosHome").append(
        "<tr><td>" +
          this.id +
          "</td><td>" +
          this.placa +
          "</td><td>" +
          this.nomeRequerente +
          "</td><td>" +
          this.telefoneRequerente +
          "</td><td>" +
          '<button class="btn btn-secondary" onclick="abreOS(' +
          this.id +
          ');">' +
          nomeBtn +
          "</button>" +
          "</td></tr>"
      );
    });
  });
}

function abreOS(id) {
  window.location.href = "/OrdemDeServico?OS=" + id;
}

function atualizaHome(refresh) {
  clearInterval(contadorID);
  competencia = $("#dataIdFiltroHome").val();
  console.log("Fui Chamado");

  if (competencia == "") {
    $("#alerta_advertencia").css({ display: "block" });
    $("#title_alerta").text("Preenchimento incorreto");
    $("#body_alerta").text("Campo Competência em Branco");

    $(".toast").toast("show");
  } else {
    entry = {
      competencia: competencia,
    };

    Envia(entry, "/OrdemDeServico/Home/Totais", "POST").then((dados) => {
      if (dados.length == 0) {
        $("#cont_finalizadas").text("0");
        $("#cont_aguardando_atendimento").text("0");
        $("#cont_aguardando_aprovacao").text("0");
        $("#cont_aguardando_pagamento").text("0");
        $("#cont_aceita").text("0");
        $("#cont_aprovadas").text("0");
        $("#cont_ematendimento").text("0");
        $("#cont_canceladas").text("0");
      } else {
        dados_localStorage = JSON.parse(localStorage.getItem("quant_home"));

        $(dados_localStorage).each(function () {
          if (this.status_os == "FINALIZADA") {
            $("#cont_finalizadas").text(this.total_os);
          }
          if (this.status_os == "EMABERTO") {
            $("#cont_aguardando_atendimento").text(this.total_os);
          }
          if (this.status_os == "AGUARDANDOAPROVACAO") {
            $("#cont_aguardando_aprovacao").text(this.total_os);
          }
          if (this.status_os == "AGUARDANDOPAGAMENTO") {
            $("#cont_aguardando_pagamento").text(this.total_os);
          }
          if (this.status_os == "ACEITA") {
            $("#cont_aceita").text(this.total_os);
          }
          if (this.status_os == "APROVADA") {
            $("#cont_aprovadas").text(this.total_os);
          }
          if (this.status_os == "EMATENDIMENTO") {
            $("#cont_ematendimento").text(this.total_os);
          }
          if (this.status_os == "CANCELADO") {
            $("#cont_canceladas").text(this.total_os);
          }
        });

        var total_anterior_finalizadas = $("#cont_finalizadas").text();
        var total_anterior_atendimento = $(
          "#cont_aguardando_atendimento"
        ).text();
        var total_anterior_aguardando_aprovacao = $(
          "#cont_aguardando_aprovacao"
        ).text();
        var total_anterior_aguardando_pagamento = $(
          "#cont_aguardando_pagamento"
        ).text();
        var total_anterior_aceita = $("#cont_aceita").text();
        var total_anterior_aprovadas = $("#cont_aprovadas").text();
        var total_anterior_ematendimento = $("#cont_ematendimento").text();
        var total_anterior_canceladas = $("#cont_canceladas").text();
        for (var i = 0; i < dados.length; i++) {
          switch (dados[i]["status_os"]) {
            case "ACEITA":
              if (total_anterior_aceita < dados[i]["total_os"]) {
                $("#cont_aceita").text(dados[i]["total_os"]);
                $("#bell_aceita_dashboard").css({ display: "flex" });
              }
              break;
            case "FINALIZADA":
              if (total_anterior_finalizadas < dados[i]["total_os"]) {
                $("#cont_finalizadas").text(dados[i]["total_os"]);
                $("#bell_finalizadas_dashboard").css({ display: "flex" });
              }
              break;
            case "EMABERTO":
              if (total_anterior_atendimento < dados[i]["total_os"]) {
                $("#cont_aguardando_atendimento").text(dados[i]["total_os"]);
                $("#bell_aguardando_atendimento_dashboard").css({
                  display: "flex",
                });
              }
              break;
            case "AGUARDANDOAPROVACAO":
              if (total_anterior_aguardando_aprovacao < dados[i]["total_os"]) {
                $("#cont_aguardando_aprovacao").text(dados[i]["total_os"]);
                $("#bell_aguardando_aprovacao_dashboard").css({
                  display: "flex",
                });
              }
              break;
            case "AGUARDANDOPAGAMENTO":
              if (total_anterior_aguardando_pagamento < dados[i]["total_os"]) {
                $("#cont_aguardando_pagamento").text(dados[i]["total_os"]);
                $("#bell_aguardando_pagamento_dashboard").css({
                  display: "flex",
                });
              }
              break;
            case "APROVADA":
              if (total_anterior_aprovadas < dados[i]["total_os"]) {
                $("#cont_aprovadas").text(dados[i]["total_os"]);
                $("#bell_aprovadas_dashboard").css({ display: "flex" });
              }
              break;
            case "EMATENDIMENTO":
              if (total_anterior_ematendimento < dados[i]["total_os"]) {
                $("#cont_ematendimento").text(dados[i]["total_os"]);
                $("#bell_ematendimento_dashboard").css({ display: "flex" });
              }
              break;
            case "CANCELADO":
              if (total_anterior_canceladas < dados[i]["total_os"]) {
                $("#cont_canceladas").text(dados[i]["total_os"]);
                $("#bell_canceladas_dashboard").css({ display: "flex" });
              }
              break;
          }
        }
        localStorage.setItem("quant_home", JSON.stringify(dados));
      }
    });
  }

  if (refresh == true) {
    clearInterval(contadorID);
    startCountdown(30);
  } else if (refresh == false) {
    startCountdown(30);
  }
}
