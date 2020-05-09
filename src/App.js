import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"

import AddProduto from "./components/produto/add-produto.component";
import Produto from "./components/produto/produto.component";
import ProdutosList from "./components/produto/produtos-list.component";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <a href="/produtos" className="navbar-brand">
              Programação Web II - AV1
            </a>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/produtos"} className="nav-link">
                  Produtos
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/add"} className="nav-link">
                  Novo Produto
                </Link>
              </li>
            </div>
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/produtos"]} component={ProdutosList} />
              <Route exact path="/add" component={AddProduto} />
              <Route path="/produtos/:id" component={Produto} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
