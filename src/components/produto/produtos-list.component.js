import React, { Component } from "react";
import ProdutoDataService from "../../services/produto.service";
import { Link } from "react-router-dom";

export default class ProdutosList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchNome = this.onChangeSearchNome.bind(this);
    this.retrieveProdutos = this.retrieveProdutos.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveProduto = this.setActiveProduto.bind(this);
    this.removeAllProdutos = this.removeAllProdutos.bind(this);
    this.searchNome = this.searchNome.bind(this);

    this.state = {
      produtos: [],
      currentProduto: null,
      currentIndex: -1,
      searchProduto: ""
    };
  }

  componentDidMount() {
    this.retrieveProdutos();
  }

  onChangeSearchNome(e) {
    const searchNome = e.target.value;

    this.setState({
      searchNome: searchNome
    });
  }

  retrieveProdutos() {
    ProdutoDataService.getAll()
      .then(response => {
        this.setState({
          produtos: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveTutorials();
    this.setState({
      currentProduto: null,
      currentIndex: -1
    });
  }

  setActiveProduto(tutorial, index) {
    this.setState({
      currentProduto: tutorial,
      currentIndex: index
    });
  }

  removeAllProdutos() {
    ProdutoDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchNome() {
    ProdutoDataService.findByNome(this.state.searchNome)
      .then(response => {
        this.setState({
          produtos: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    // ...
    const { searchNome, produtos, currentProduto, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Procurar produto pelo nome"
              value={searchNome}
              onChange={this.onChangeSearchNome}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchNome}
              >
                Pesquisar
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Lista de Produtos</h4>

          <ul className="list-group">
            {produtos &&
              produtos.map((produto, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveProduto(produto, index)}
                  key={index}
                >
                  {produto.nome}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllProdutos}
          >
            Remover Todos
          </button>
        </div>
        <div className="col-md-6">
          {currentProduto ? (
            <div>
              <h4>Produto</h4>
              <div>
                <label>
                  <strong>Nome:</strong>
                </label>{" "}
                {currentProduto.nome}
              </div>
              <div>
                <label>
                  <strong>Preço de Custo:</strong>
                </label>{" "}
                {currentProduto.precoCusto}
              </div>
              <div>
                <label>
                  <strong>Preço de Venda:</strong>
                </label>{" "}
                {currentProduto.precoVenda}
              </div>

              <Link
                to={"/produtos/" + currentProduto.id}
                className="badge badge-warning"
              >
                Editar
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Por favor selecione um Produto...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}