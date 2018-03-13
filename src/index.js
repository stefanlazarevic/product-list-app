import React from 'react';
import ReactDOM from 'react-dom';
import * as style from './index.css';
import _ from './helper';
import data from './seeder';

// This is the root component of the product list application.
class ProductList extends React.Component {

    constructor() {
        super();

        this.state = {
            products: [],
        };

        this.getVotes = _.pluck('votes').bind(this);
        this.getId = _.pluck('id').bind(this);

        this.handleProductUpVote = this.handleProductUpVote.bind(this);
        this.handleProductDownVote = this.handleProductDownVote.bind(this);
    }

    componentDidMount() {
        this.setState({
            products: data,
        });
    }

    sortProductsByVote() {
        this.state.products.sort((productOne, productTwo) => {
            return this.getVotes(productTwo) - this.getVotes(productOne);
        });
    }

    handleProductUpVote(productId) {
        const products = this.state.products.map(product => {
            if (this.getId(product) === productId) {
                return Object.assign({}, product, {
                    votes: this.getVotes(product) + 1,
                });
            }

            return product;
        });

        this.setState({ products });
    }

    handleProductDownVote(productId) {
        const products = this.state.products.map(product => {
            if (this.getId(product) === productId) {
                return Object.assign({}, product, {
                    votes: this.getVotes(product) - 1,
                });
            }

            return product;
        });

        this.setState({ products });
    }

    render() {
        this.sortProductsByVote();
        return (
            <div className="products__container">
                <h1>Apple product voter.</h1>
                <hr />
                { this.state.products.map(product => <Product key={`product-${product.id}`}
                                                              id={product.id}
                                                              title={product.title}
                                                              description={product.description}
                                                              submitter={product.submitter}
                                                              votes={product.votes}
                                                              wikilink={product.wikilink}
                                                              onUpvote={this.handleProductUpVote}
                                                              onDownvote={this.handleProductDownVote}
                                                              />) }
            </div>
        )
    }
}

class Product extends React.Component {

    constructor(props) {
        super(props);

        this.onUpvote = this.onUpvote.bind(this);
        this.onDownvote = this.onDownvote.bind(this);
    }

    onUpvote() {
        this.props.onUpvote(this.props.id);
    }

    onDownvote() {
        this.props.onDownvote(this.props.id);
    }

    render() {
        return (
            <div className="row">
                <div className="product col-xs-12">
                    <div className="row">
                        <div className="product__image col-md-3 col-xs-5">
                            <img src={`images/products/${this.props.id}.png`} alt={this.props.id} className="image"/>
                        </div>
                        <div className="product__body col-md-9 col-xs-7">
                            <h3 className="product__title">
                                <span><a href={this.props.wikilink} target="_blank">{this.props.title}</a><span className="product__votes"><span class="product__star">&#9733;</span>{this.props.votes}</span></span>
                                <div className="product__votes">
                                    <div className="product-votes__controller">
                                        <span className="product-votes__up action" onClick={this.onUpvote}>&#9757;</span>
                                        <span className="product-votes__down action" onClick={this.onDownvote}>&#9759;</span>
                                    </div>
                                </div>
                            </h3>
                            <p className="product__description">{this.props.description}</p>
                            <div className="product__footer">
                                <div className="product-submitter__image">
                                    <img src={`images/avatars/${this.props.submitter.id}.png`} alt={this.props.submitter.name} className="image image--round"/>
                                </div>
                                <a href={this.props.submitter.wikilink} target="_blank"><span className="product__submitter">{this.props.submitter.name}</span></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

// Render root component "ProductList" to the DOM.
ReactDOM.render(
    <ProductList />,
    document.getElementById('root')
);
