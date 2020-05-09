import React, { Component } from "react";
import ProdutoDataService from "../../services/produto.service";


export default class AddProduto extends Component {
  constructor(props) {
    super(props);
    this.onChangeNome = this.onChangeNome.bind(this);
    this.onChangePrecoCusto = this.onChangePrecoCusto.bind(this);
    this.saveProduto = this.saveProduto.bind(this);
    this.newProduto = this.newProduto.bind(this);

    this.state = {
      id: null,
      nome: "",
      precoCusto: 0.0, 
      precoVenda: 0.0,

      submitted: false
    };
  }

  onChangeNome(e) {
    this.setState({
      nome: e.target.value
    });
  }

  onChangePrecoCusto(e) {
    this.setState({
      precoCusto: e.target.value
    });
  }

  saveProduto() {
    var data = {
      nome: this.state.title,
      precoCusto: this.state.precoCusto
    };

    ProdutoDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          nome: response.data.nome,
          precoCusto: response.data.precoCusto,
          precoVenda: 0,
          
          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newProduto() {
    this.setState({
      id: null,
      nome: "",
      precoCusto: 0.0,
      precoVenda: 0.0,

      submitted: false
    });
  }

  render() {
    // ...
    return (
        <div className="submit-form">
          {this.state.submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
              <button className="btn btn-success" onClick={this.newProduto}>
                Adicionar
              </button>
            </div>
          ) : (
            <div>
              <div className="form-group">
                <label htmlFor="nome">Nome: </label>
                <input
                  type="text"
                  className="form-control"
                  id="nome"
                  required
                  value={this.state.nome}
                  onChange={this.onChangeNome}
                  name="nome"
                />
              </div>
  
              <div className="form-group">
                <label htmlFor="precoCusto">Preço de Custo: </label>
                <input
                  type="text"
                  className="form-control"
                  id="precoCusto"
                  required
                  value={this.state.precoCusto}
                  onChange={this.onChangePrecoCusto}
                  name="precoCusto"
                />
              </div>
  
              <button onClick={this.saveProduto} className="btn btn-success">
                Salvar
              </button>
            </div>
          )}
        </div>
      );
  }
}