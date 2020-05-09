import React, { Component } from "react";
import ProdutoDataService from "../../services/produto.service";

export default class Produto extends Component {
  constructor(props) {
    super(props);
    this.onChangeNome = this.onChangeNome.bind(this);
    this.onChangePrecoCusto = this.onChangePrecoCusto.bind(this);
    this.getProduto = this.getProduto.bind(this);
    this.updatePrecoVenda = this.updatePrecoVenda.bind(this);
    this.updateProduto = this.updateProduto.bind(this);
    this.deleteProduto = this.deleteProduto.bind(this);

    this.state = {
      currentProduto: {
        id: null,
        nome: "",
        precoCusto: 0.0,
        precoVenda: 0.0
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getProduto(this.props.match.params.id);
  }

  onChangeNome(e) {
    const nome = e.target.value;

    this.setState(function(prevState) {
      return {
        currentProduto: {
          ...prevState.currentProduto,
          nome: nome
        }
      };
    });
  }

  onChangePrecoCusto(e) {
    const precoCusto = e.target.value;
    
    this.setState(prevState => ({
      currentProduto: {
        ...prevState.currentProduto,
        precoCusto: precoCusto
      }
    }));
  }

  getProduto(id) {
    ProdutoDataService.get(id)
      .then(response => {
        this.setState({
          currentProduto: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePrecoVenda(valor) {
    var data = {
      id: this.state.currentProduto.id,
      nome: this.state.currentProduto.nome,
      precoCusto: this.state.currentProduto.precoCusto
      // precoVenda: valor
    };

    ProdutoDataService.update(this.state.currentProduto.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentProduto: {
            ...prevState.currentProduto,
            precoVenda: valor
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateProduto() {
    ProdutoDataService.update(
      this.state.currentProduto.id,
      this.state.currentProduto
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "Produto atualizado com sucesso!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteProduto() {    
    ProdutoDataService.delete(this.state.currentProduto.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/produtos')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    // ...
    const { currentProduto } = this.state;

    return (
      <div>
        {currentProduto ? (
          <div className="edit-form">
            <h4>Produto</h4>
            <form>
              <div className="form-group">
                <label htmlFor="nome">Nome</label>
                <input
                  type="text"
                  className="form-control"
                  id="nome"
                  value={currentProduto.nome}
                  onChange={this.onChangeNome}
                />
              </div>
              <div className="form-group">
                <label htmlFor="precoCusto">Preço de Custo</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentProduto.precoCusto}
                  onChange={this.onChangePrecoCusto}
                />
              </div>

              <div className="form-group">
                <label htmlFor="precoVenda">Preço de Venda</label>
                {currentProduto.precoVenda}
              </div>
            </form>

            {/* {currentProduto.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )} */}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteProduto}
            >
              Excluir
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateProduto}
            >
              Atualizar
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Por favor selecione um Produto...</p>
          </div>
        )}
      </div>
    );
  }
}