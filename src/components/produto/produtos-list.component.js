import React, { Component } from "react";
import ProdutoDataService from "../../services/produto.service";
import { Link } from "react-router-dom";
import Produto from "./produto.component";

export default class ProdutosList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchNome = this.onChangeSearchNome.bind(this);
    this.retrieveProdutos = this.retrieveProdutos.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveProduto = this.setActiveProduto.bind(this);
    this.removeAllProdutos = this.removeAllProdutos.bind(this);
    this.searchNome = this.searchNome.bind(this);
    this.onChangeMargemLucro = this.onChangeMargemLucro.bind(this);
    this.margemLucro = this.margemLucro.bind(this);

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

  onChangeMargemLucro(e) {
    const margemLucro = e.target.value;

    this.setState({
      margemLucro: margemLucro
    })
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
    this.retrieveProdutos();
    this.setState({
      currentProduto: null,
      currentIndex: -1
    });
  }

  setActiveProduto(produto, index) {
    this.setState({
      currentProduto: produto,
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

  margemLucro() {
    ProdutoDataService.getAll()
      .then(response => {
        this.setState({
          produtos: response.data
        });
        var i;
        for (i = 0; i < this.produtos.lenght; i++) {
          this.setState({
            currentProduto: this.produtos[i]
          });
          currentProduto.precoVenda = currentProduto.precoCusto * (this.margemLucro / 100);
          ProdutoDataService.update(currentProduto.id, currentProduto);
        }
        this.refreshList();
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    // ...
    const { searchNome, produtos, currentProduto, currentIndex, margemLucro } = this.state;

    return (
      <div className="list row">
        <div className="col-md-12">
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
        <div className="col-lg">
          <h4>Lista de Produtos</h4>
        </div>

        <div class="table-responsive">
          <table class="table">
            <thead class="thead-dark">
              <tr>
                <th scope="col"># ID</th>
                <th scope="col">Nome</th>
                <th scope="col">Preço de Custo</th>
                <th scope="col">Preço de Venda</th>
              </tr>
            </thead>
            <tbody>
              {produtos &&
                produtos.map((produto, index) => (
                  <tr className={
                    (index === currentIndex ? "active" : "")
                  }
                    onClick={() => this.setActiveProduto(produto, index)}
                    key={index}
                  >
                    <th scope="row">{produto.id}</th>
                    <td>{produto.nome}</td>
                    <td>{produto.precoCusto}</td>
                    <td>{produto.precoVenda}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div class="acoesTabela row">
          <div className="col-sm-3">
            <button
              className="m-3 btn btn-sm btn-danger"
              onClick={this.removeAllProdutos}
            >
              Remover Todos
            </button>
          </div>
        </div>

        <div className="col-sm-6">
          <div className="input-group mb-3">
            <label htmlFor="margemLucro">Margem de Lucro (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              className="form-control"
              value={margemLucro}
              onChange={this.onChangeMargemLucro}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.margemLucro}
              >
                Atualizar Preço
              </button>
            </div>
          </div>
        </div>

      </div>
    );
  }
}