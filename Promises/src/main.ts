interface ViaCepResponse<T = string> {
  cep: T;
  logradouro: T;
  complemento: T;
  bairro: T;
  localidade: T;
  uf: T;
  erro?: boolean;
}

const checkCEP = (e: Event) => {
  const input = e.target as HTMLInputElement;
  const cep = input.value.replace(/\D/g, "");

  if (cep.length === 8) {
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((res) => res.json() as Promise<ViaCepResponse>)
      .then((data) => {
        if (!data.erro) {
          (document.querySelector('input[name="rua"]') as HTMLInputElement).value = data.logradouro;
          (document.querySelector('input[name="cidade"]') as HTMLInputElement).value = data.localidade;
          (document.querySelector('input[name="estado"]') as HTMLInputElement).value = data.uf;
        } else {
          alert("CEP não encontrado!");
          limparCampos(); 
        }
      })
      .catch(() => {
        alert("Erro ao buscar o CEP. Tente novamente.");
        limparCampos();
      });
  } else {
    alert("CEP inválido! Certifique-se de que o CEP tem 8 dígitos.");
    limparCampos();
  }
};

const limparCampos = () => {
  (document.querySelector('input[name="rua"]') as HTMLInputElement).value = "";
  (document.querySelector('input[name="cidade"]') as HTMLInputElement).value = "";
  (document.querySelector('input[name="estado"]') as HTMLInputElement).value = "";
};

const cepInput = document.querySelector('input[name="cep"]');
if (cepInput) {
  cepInput.addEventListener("blur", checkCEP);
}
